import { AuthProviderState } from './types/AuthProvider';
import useAuthState from './useAuthState';

type useUser = AuthProviderState['user'] & { isGuest: boolean };

function useUser(): useUser {
	const { user } = useAuthState();

	return {
		...user,
		isGuest: !user?.role || user?.role?.length === 0
	} as useUser;
}

export default useUser;
