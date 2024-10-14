import NextAuth from 'next-auth';

import { createStorage } from 'unstorage';
import memoryDriver from 'unstorage/drivers/memory';
import vercelKVDriver from 'unstorage/drivers/vercel-kv';
import { UnstorageAdapter } from '@auth/unstorage-adapter';
import type { NextAuthConfig } from 'next-auth';
import type { Provider } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';
import Facebook from 'next-auth/providers/facebook';
import Google from 'next-auth/providers/google';
import { getDbUser, createDbUser } from './userApi';

const storage = createStorage({
	driver: process.env.VERCEL
		? vercelKVDriver({
				url: process.env.AUTH_KV_REST_API_URL,
				token: process.env.AUTH_KV_REST_API_TOKEN,
				env: false
			})
		: memoryDriver()
});

export const providers: Provider[] = [
	Credentials({
		authorize(formInput) {
			/**
			 * !! This is just for demonstration purposes
			 * You can create your own validation logic here
			 * !! Do not use this in production
			 */
			if (formInput.formType === 'signin') {
				if (formInput.password === '' || formInput.email !== 'admin@fusetheme.com') {
					return null;
				}
			}

			if (formInput.formType === 'signup') {
				if (formInput.password === '' || formInput.email === '') {
					return null;
				}
			}

			return {
				email: formInput?.email as string
			};
		}
	}),
	Google,
	Facebook
];

const config = {
	theme: { logo: '/assets/images/logo/logo.svg' },
	adapter: UnstorageAdapter(storage),
	pages: {
		signIn: '/sign-in'
	},
	providers,
	basePath: '/auth',
	trustHost: true,
	callbacks: {
		authorized({ request, auth }) {
			const { pathname } = request.nextUrl;

			if (pathname === '/middleware-example') return !!auth;

			return true;
		},
		jwt({ token, trigger, account, user }) {
			if (trigger === 'update') {
				token.name = user.name;
			}

			if (account?.provider === 'keycloak') {
				return { ...token, accessToken: account.access_token };
			}

			return token;
		},
		async session({ session, token }) {
			if (token.accessToken && typeof token.accessToken === 'string') {
				session.accessToken = token.accessToken;
			}

			if (session) {
				const userDbData = await getDbUser(session.user.email);

				if (userDbData) {
					session.db = userDbData;
				} else {
					const newUser = await createDbUser({
						email: session.user.email,
						role: ['admin'],
						displayName: session.user.name,
						photoURL: session.user.image
					});
					session.db = newUser;
				}
			}

			return session;
		}
	},
	experimental: {
		enableWebAuthn: true
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60 // 30 days
	},
	debug: process.env.NODE_ENV !== 'production'
} satisfies NextAuthConfig;

export type AuthJsProvider = {
	id: string;
	name: string;
	style?: {
		text?: string;
		bg?: string;
	};
};

export const authJsProviderMap: AuthJsProvider[] = providers
	.map((provider) => {
		const providerData = typeof provider === 'function' ? provider() : provider;

		return {
			id: providerData.id,
			name: providerData.name,
			style: {
				text: (providerData as { style?: { text: string } }).style?.text,
				bg: (providerData as { style?: { bg: string } }).style?.bg
			}
		};
	})
	.filter((provider) => provider.id !== 'credentials');

export const { handlers, auth, signIn, signOut } = NextAuth(config);
