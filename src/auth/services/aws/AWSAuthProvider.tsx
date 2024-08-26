'use client';

import React, { useEffect, useCallback, forwardRef, useImperativeHandle, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { fetchUserAttributes, updateUserAttributes } from '@aws-amplify/auth';
import { User } from 'src/auth/user';
import { PartialDeep } from 'type-fest';
import UserModel from '../../user/models/UserModel';
import awsAuthConfig from './awsAuthConfig';
import { AuthProviderComponentType } from '../../types/AuthProvider';

// Configure Amplify
Amplify.configure(awsAuthConfig);

export type AWSAuthStatus = 'configuring' | 'authenticated' | 'unauthenticated';

export type SignInPayload = {
	username: string;
	password: string;
};

export type SignUpPayload = {
	username: string;
	password: string;
	email: string;
};

export type AWSAuthContextType = {
	user?: User;
	updateUser: (U: User) => void;
	signOut?: () => Promise<void>;
	isAuthenticated: boolean;
	isLoading: boolean;
	setIsLoading?: (T: boolean) => void;
	authStatus: AWSAuthStatus;
};

const AWSAuthProviderContent: AuthProviderComponentType = forwardRef(({ children, onAuthStateChanged }, ref) => {
	const { user: awsUser, signOut, authStatus: awsAuthStatus } = useAuthenticator();

	const [authState, setAuthState] = useState<{
		user: User | undefined;
		authStatus: AWSAuthStatus;
		isAuthenticated: boolean;
	}>({
		user: null,
		authStatus: 'configuring',
		isAuthenticated: false
	});

	const fetchUser = useCallback(async () => {
		if (awsUser) {
			try {
				const userAttributes = await fetchUserAttributes();

				const newUser = UserModel({
					uid: awsUser.userId,
					role: ['admin'],
					data: {
						displayName: userAttributes?.name,
						email: userAttributes?.email,
						...((typeof userAttributes?.data === 'string'
							? JSON.parse(userAttributes.data)
							: {}) as User['data'])
					}
				});

				setAuthState({
					user: newUser,
					authStatus: 'authenticated',
					isAuthenticated: true
				});
			} catch (error) {
				console.error('Error fetching user attributes:', error);
				setAuthState({
					user: null,
					authStatus: 'unauthenticated',
					isAuthenticated: false
				});
			}
		} else {
			setAuthState({
				user: null,
				authStatus: 'unauthenticated',
				isAuthenticated: false
			});
		}
	}, [awsUser]);

	useEffect(() => {
		if (awsAuthStatus === 'authenticated') {
			fetchUser();
		} else {
			setAuthState({
				user: null,
				authStatus: awsAuthStatus,
				isAuthenticated: false
			});
		}
	}, [awsAuthStatus, fetchUser]);

	useEffect(() => {
		if (onAuthStateChanged) {
			onAuthStateChanged(authState);
		}
	}, [authState, onAuthStateChanged]);

	const handleSignOut = useCallback(async () => {
		signOut();
	}, [signOut]);

	const handleUpdateUser = useCallback(async (_userData: PartialDeep<User>) => {
		await updateUserAttributes({
			userAttributes: {
				data: JSON.stringify(_userData.data)
			}
		});
		await fetchUser();
	}, []);

	useImperativeHandle(ref, () => ({
		signOut: handleSignOut,
		updateUser: handleUpdateUser
	}));

	return <Authenticator.Provider>{children}</Authenticator.Provider>;
});

const AWSAuthProvider: AuthProviderComponentType = forwardRef(({ children, onAuthStateChanged }, ref) => {
	return (
		<Authenticator.Provider>
			<AWSAuthProviderContent
				ref={ref}
				onAuthStateChanged={onAuthStateChanged}
			>
				{children}
			</AWSAuthProviderContent>
		</Authenticator.Provider>
	);
});

export default AWSAuthProvider;
