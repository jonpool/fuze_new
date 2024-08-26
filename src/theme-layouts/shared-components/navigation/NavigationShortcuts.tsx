'use client';

import { useAppSelector } from 'src/store/hooks';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import { usePrevious } from '@fuse/hooks';
import { useEffect, useState } from 'react';
import _ from '@lodash';
import useAuth from 'src/auth/useAuth';
import withSlices from 'src/store/withSlices';
import { User } from 'src/auth/user';
import { navigationSlice, selectFlatNavigation } from './store/navigationSlice';

type NavigationShortcutsProps = {
	className?: string;
	variant?: 'horizontal' | 'vertical';
};

/**
 * The navigation shortcuts.
 */
function NavigationShortcuts(props: NavigationShortcutsProps) {
	const { variant, className } = props;
	const navigation = useAppSelector(selectFlatNavigation);
	const { updateUser, authState } = useAuth();
	const { isAuthenticated, user } = authState;
	const [userShortcuts, setUserShortcuts] = useState<string[]>(user?.data?.shortcuts || []);
	const prevUserShortcuts = usePrevious(userShortcuts);

	useEffect(() => {
		if (isAuthenticated && prevUserShortcuts && !_.isEqual(userShortcuts, prevUserShortcuts)) {
			updateUser(_.setIn(user, 'data.shortcuts', userShortcuts) as User);
		}
	}, [isAuthenticated, userShortcuts]);

	function handleShortcutsChange(newShortcuts: string[]) {
		setUserShortcuts(newShortcuts);
	}

	return (
		<FuseShortcuts
			className={className}
			variant={variant}
			navigation={navigation}
			shortcuts={userShortcuts}
			onChange={handleShortcutsChange}
		/>
	);
}

const NavigationShortcutsWithSlices = withSlices<NavigationShortcutsProps>([navigationSlice])(NavigationShortcuts);

export default NavigationShortcutsWithSlices;
