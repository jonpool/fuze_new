import { useContext } from 'react';
import { AuthContext, AuthContextType } from './AuthenticationProvider';

function useAuth(): AuthContextType {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within a AuthRouteProvider');
	}

	return context;
}

export default useAuth;
