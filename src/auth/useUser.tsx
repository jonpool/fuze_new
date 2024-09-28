import { useSession, signOut } from 'next-auth/react';
import { useMemo } from 'react';
import { User } from '@/auth/user';
import { updateDbUser } from '@/auth/authJs';
import _ from '@/@lodash/@lodash';

type useUser = {
	data: User;
	isGuest: boolean;
	updateUser: (T: Partial<User>) => Promise<User | undefined>;
	updateUserSettings: (newSettings: User['settings']) => Promise<User | undefined>;
	signOut: typeof signOut;
};

function useUser(): useUser {
	const { data, update } = useSession();
	const user = useMemo(() => data?.db, [data]);
	const isGuest = useMemo(() => !user?.role || user?.role?.length === 0, [user]);

	async function handleUpdateUser(_data: Partial<User>) {
		const response = await updateDbUser(_data);
		update();
		return response.json();
	}

	async function handleUpdateUserSettings(newSettings: User['settings']) {
		const newUser = _.setIn(user, 'settings', newSettings) as User;

		if (_.isEqual(user, newUser)) {
			return undefined;
		}

		const updatedUser = (await handleUpdateUser(newUser)) as User;

		return updatedUser?.settings;
	}

	return {
		data: user,
		isGuest,
		signOut,
		updateUser: handleUpdateUser,
		updateUserSettings: handleUpdateUserSettings
	} as useUser;
}

export default useUser;
