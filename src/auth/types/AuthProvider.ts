import React from 'react';
import { PartialDeep } from 'type-fest/source/partial-deep';
import { User } from '../user';

export type AuthProviderMethods = {
	signOut: () => void;
	updateUser: (U: PartialDeep<User>) => void;
};

export type AuthProviderComponentType = React.ForwardRefExoticComponent<
	React.PropsWithChildren<{
		onAuthStateChanged?: (T: AuthProviderState) => void;
	}> &
		React.RefAttributes<AuthProviderMethods>
>;

export type AuthProviderState = {
	authStatus: string;
	isAuthenticated: boolean;
	user: User | null;
};

export type AuthProvider = {
	name: string;
	Provider: AuthProviderComponentType;
};
