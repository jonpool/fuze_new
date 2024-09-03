import AuthGuardRedirect from 'src/auth/AuthGuardRedirect';
import MainLayout from 'src/components/MainLayout';

function Layout({ children }) {
	return (
		<AuthGuardRedirect auth={['admin']}>
			<MainLayout>{children}</MainLayout>
		</AuthGuardRedirect>
	);
}

export default Layout;
