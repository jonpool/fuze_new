'use client';

import React, {
	createContext,
	useState,
	useEffect,
	useCallback,
	useMemo,
	forwardRef,
	useImperativeHandle
} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { initializeFirebase } from './initializeFirebase';
import { User } from '../../user';
import UserModel from '../../user/models/UserModel';
import { AuthProviderComponentType } from '../../types/AuthProvider';

export type FirebaseAuthStatus = 'configuring' | 'authenticated' | 'unauthenticated';

export type FirebaseAuthConfig = {
	tokenStorageKey: string;
	signInUrl: string;
	signUpUrl: string;
	tokenRefreshUrl: string;
	getUserUrl: string;
	updateUserUrl: string;
	updateTokenFromHeader: boolean;
};

export type SignInPayload = {
	email: string;
	password: string;
};

export type SignUpPayload = {
	displayName: string;
	password: string;
	email: string;
};

export type FirebaseAuthContextType = {
	user?: User;
	updateUser: (U: User) => void;
	signIn?: (credentials: SignInPayload) => Promise<firebase.auth.UserCredential>;
	signUp?: (U: SignUpPayload) => Promise<firebase.auth.UserCredential>;
	signOut?: () => void;
	refreshToken?: () => void;
	isLoading: boolean;
	setIsLoading?: (T: boolean) => void;
	authStatus: FirebaseAuthStatus;
};

const defaultAuthContext: FirebaseAuthContextType = {
	isLoading: false,
	user: null,
	updateUser: null,
	signIn: null,
	signUp: null,
	signOut: null,
	refreshToken: null,
	setIsLoading: () => {},
	authStatus: 'configuring'
};

export const FirebaseAuthContext = createContext<FirebaseAuthContextType>(defaultAuthContext);

const FirebaseAuthProvider: AuthProviderComponentType = forwardRef(({ children, onAuthStateChanged }, ref) => {
	const [user, setUser] = useState<User>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [authStatus, setAuthStatus] = useState<FirebaseAuthStatus>('configuring');

	useEffect(() => {
		if (onAuthStateChanged) {
			onAuthStateChanged({ authStatus, isAuthenticated, user });
		}
	}, [authStatus, isAuthenticated, user, onAuthStateChanged]);

	const fetchUser = useCallback((userId: string) => {
		try {
			firebase
				.database()
				.ref(`users/${userId}`)
				.once('value')
				.then((snapshot) => {
					const userSnapshot = snapshot.val() as User;
					setUser(userSnapshot);
					setIsAuthenticated(true);
					setAuthStatus('authenticated');
				});
		} catch (error) {
			console.error('Error fetching user data:', error);
			setAuthStatus('unauthenticated');
		}
	}, []);

	useEffect(() => {
		const initialized = initializeFirebase();

		if (!initialized) {
			console.error('Firebase is not initialized.');
			setAuthStatus('unauthenticated');
			setIsLoading(false);
			return undefined;
		}

		const unsubscribe = firebase.auth().onAuthStateChanged(
			(firebaseUser) => {
				if (firebaseUser) {
					fetchUser(firebaseUser.uid);
				} else {
					setUser(null);
					setIsAuthenticated(false);
					setAuthStatus('unauthenticated');
				}

				setIsLoading(false);
			},
			(error) => {
				console.error('Error with Firebase Auth state:', error);
				setAuthStatus('unauthenticated');
				setIsLoading(false);
			}
		);

		return () => {
			setAuthStatus('configuring');
			unsubscribe?.();
		};
	}, []);

	const updateUser = useCallback((_user: User & { uid: string }) => {
		try {
			firebase.database().ref(`users/${_user.uid}`).set(_user);
			fetchUser(_user.uid);
			return Promise.resolve(_user);
		} catch (error) {
			console.error('Error updating user:', error);
			return Promise.reject(error);
		}
	}, []);

	const signIn = useCallback(({ email, password }: SignInPayload) => {
		try {
			return firebase.auth().signInWithEmailAndPassword(email, password);
		} catch (error) {
			console.error('Error signing in:', error);
			return Promise.reject(error);
		}
	}, []);

	const signUp = useCallback(
		({ email, password }: SignUpPayload) => {
			try {
				return firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
					.then((userCredential) => {
						updateUser(
							UserModel({
								uid: userCredential.user.uid,
								data: {
									displayName: userCredential.user?.displayName,
									email: userCredential.user?.email
								},
								role: ['admin']
							})
						);
						return userCredential;
					})
					.catch((error) => {
						console.error('Error signing up:', error);
						throw error;
					});
			} catch (error) {
				console.error('Error during sign up:', error);
				return Promise.reject(error);
			}
		},
		[updateUser]
	);

	const handleSignOut = useCallback(() => {
		firebase
			.auth()
			.signOut()
			.catch((error) => {
				console.error('Error signing out:', error);
			});
	}, []);

	useImperativeHandle(ref, () => ({
		signOut: handleSignOut,
		updateUser
	}));

	const authContextValue = useMemo(
		() => ({
			user,
			authStatus,
			isAuthenticated,
			isLoading,
			signIn,
			signUp,
			signOut: handleSignOut,
			updateUser,
			setIsLoading
		}),
		[user, authStatus, isAuthenticated, isLoading, signIn, signUp, handleSignOut, updateUser]
	);

	return <FirebaseAuthContext.Provider value={authContextValue}>{children}</FirebaseAuthContext.Provider>;
});

export default FirebaseAuthProvider;
