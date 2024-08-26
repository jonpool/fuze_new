'use client';

import authRoles from 'src/auth/authRoles';
import AuthGuardRedirect from 'src/auth/AuthGuardRedirect';
import SignInPage from './SignInPage';

function Page() {
	return (
		<AuthGuardRedirect auth={authRoles.onlyGuest}>
			<SignInPage />
		</AuthGuardRedirect>
	);
}

export default Page;
