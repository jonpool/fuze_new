import { useSession, signOut } from 'next-auth/react';
import { useMemo } from 'react';
import { User } from '@auth/user';
import { updateDbUser } from '@auth/authJs';
import _ from 'lodash';
import setIn from '@/utils/setIn';

type useUser = {
	data: User | null;
	isGuest: boolean;
	updateUser: (updates: Partial<User>) => Promise<User | undefined>;
	updateUserSettings: (newSettings: User['settings']) => Promise<User['settings'] | undefined>;
	signOut: typeof signOut;
};

function useUser(): useUser {
	const { data, update } = useSession();

	const user = useMemo(() => data?.db, [data]);
	const isGuest = useMemo(() => !user?.role || user?.role?.length === 0, [user]);

	async function handleUpdateUser(_data: Partial<User>) {
		const response = await updateDbUser(_data);

		if (!response.ok) {
			throw new Error('Failed to update user');
		}

		const updatedUser = (await response.json()) as User;

		update();

		return updatedUser;
	}

	async function handleUpdateUserSettings(newSettings: User['settings']) {
		const newUser = setIn(user, 'settings', newSettings) as User;

		if (_.isEqual(user, newUser)) {
			return undefined;
		}

		const updatedUser = await handleUpdateUser(newUser);

		return updatedUser?.settings;
	}

	async function handleSignOut() {
		return signOut();
	}

	return {
		data: user,
		isGuest,
		signOut: handleSignOut,
		updateUser: handleUpdateUser,
		updateUserSettings: handleUpdateUserSettings
	} as useUser;
}

export default useUser;