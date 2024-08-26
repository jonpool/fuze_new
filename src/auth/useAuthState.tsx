import { AuthProviderState } from './types/AuthProvider';
import useAuth from './useAuth';

function useAuthState(): AuthProviderState {
	const { authState } = useAuth();

	return authState;
}

export default useAuthState;
