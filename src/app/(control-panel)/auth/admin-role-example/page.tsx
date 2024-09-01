import AuthGuardRedirect from 'src/auth/AuthGuardRedirect';
import authRoles from 'src/auth/authRoles';
import AdminRoleExample from './AdminRoleExample';

function AdminRoleExamplePage() {
	return (
		<AuthGuardRedirect auth={authRoles.admin}>
			<AdminRoleExample />
		</AuthGuardRedirect>
	);
}

export default AdminRoleExamplePage;
