import AuthGuardRedirect from 'src/auth/AuthGuardRedirect';
import authRoles from 'src/auth/authRoles';
import GuestRoleExample from './GuestRoleExample';

function GuestRoleExamplePage() {
	return (
		<AuthGuardRedirect auth={authRoles.onlyGuest}>
			<GuestRoleExample />
		</AuthGuardRedirect>
	);
}

export default GuestRoleExamplePage;
