import { ResourcesConfig } from '@aws-amplify/core';

const awsAuthConfig: ResourcesConfig = {
	Auth: {
		Cognito: {
			userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
			userPoolClientId: process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID,
			identityPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID,
			signUpVerificationMethod: 'code',
			loginWith: {
				email: true,
				phone: false,
				username: false,
				oauth: {
					domain: process.env.NEXT_PUBLIC_AWS_OAUTH_DOMAIN,
					scopes: ['phone', 'email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
					redirectSignIn: [process.env.NEXT_PUBLIC_AWS_OAUTH_REDIRECT_SIGN_IN],
					redirectSignOut: [process.env.NEXT_PUBLIC_AWS_OAUTH_REDIRECT_SIGN_OUT],
					responseType: 'code',
					providers: ['Google']
				}
			},
			mfa: {
				status: 'off',
				smsEnabled: true
			},
			userAttributes: {
				email: { required: true },
				name: { required: true }
			},
			passwordFormat: {
				minLength: 8,
				requireLowercase: false,
				requireUppercase: false,
				requireNumbers: false,
				requireSpecialCharacters: false
			}
		}
	}
};

export default awsAuthConfig;
