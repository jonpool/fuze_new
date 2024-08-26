'use client';

import authRoles from 'src/auth/authRoles';
import AuthGuardRedirect from 'src/auth/AuthGuardRedirect';
import SignUpPage from './SignUpPage';

function Page() {
	return (
		<AuthGuardRedirect auth={authRoles.onlyGuest}>
			<SignUpPage />
		</AuthGuardRedirect>
	);
}

export default Page;
