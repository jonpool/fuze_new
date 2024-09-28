import { useEffect, useMemo } from 'react';
import { setDefaultSettings, setInitialSettings } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import useUser from '@/auth/useUser';
import { useAppDispatch } from '@/store/hooks';

type AuthenticationProviderProps = {
	children: React.ReactNode;
};

function AuthenticationProvider(props: AuthenticationProviderProps) {
	const { children } = props;
	const { data: user, isGuest } = useUser();
	const userSettings = useMemo(() => user?.settings, [user]);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (userSettings) {
			// Set the default settings when the user settings are set
			dispatch(setDefaultSettings(userSettings));
		}
	}, [userSettings]);

	useEffect(() => {
		// User is not authenticated
		if (isGuest) {
			// Set the initial settings
			dispatch(setInitialSettings());
		}
	}, [isGuest]);

	return children;
}

export default AuthenticationProvider;
