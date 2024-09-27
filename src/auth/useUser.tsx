import { useSession, signOut } from 'next-auth/react';
import { useMemo } from 'react';
import { User } from '@/auth/user';
import { updateDbUser } from '@/auth/authJs';

type useUser = {
	data: User;
	isGuest: boolean;
	updateUser: (T: Partial<User>) => void;
	signOut: typeof signOut;
};

function useUser(): useUser {
	const { data, update } = useSession();
	const user = useMemo(() => data?.db, [data]);
	const isGuest = useMemo(() => !user?.role || user?.role?.length === 0, [user]);

	async function handleUpdateUser(_data: Partial<User>) {
		await updateDbUser(_data);
		update();
	}

	return {
		data: user,
		isGuest,
		signOut,
		updateUser: handleUpdateUser
	} as useUser;
}

export default useUser;
