import AuthGuardRedirect from 'src/auth/AuthGuardRedirect';
import authRoles from 'src/auth/authRoles';
import StaffRoleExample from './StaffRoleExample';

function StaffRoleExamplePage() {
	return (
		<AuthGuardRedirect auth={authRoles.staff}>
			<StaffRoleExample />
		</AuthGuardRedirect>
	);
}

export default StaffRoleExamplePage;
