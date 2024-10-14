import { User } from '@auth/user';
import UserModel from '@auth/user/models/UserModel';
import { PartialDeep } from 'type-fest';
import apiFetch from '@/utils/apiFetch';

export async function getDbUser(email: string): Promise<User | null> {
	try {
		const response = await apiFetch(`/api/mock/users?email=${email}`);
		const _users = (await response.json()) as User[];
		const user = _users?.[0];

		return user;
	} catch (error) {
		console.error('Error fetching user data:', error);
		return null;
	}
}

export function getDbUserById(userId: string) {
	return apiFetch(`/api/mock/users/${userId}`);
}

export function updateDbUser(user: PartialDeep<User>) {
	return apiFetch(`/api/mock/users/${user.id}`, {
		method: 'PUT',
		body: JSON.stringify(UserModel(user))
	});
}

export async function createDbUser(user: PartialDeep<User>) {
	try {
		const response = await apiFetch('/api/mock/users', {
			method: 'POST',
			body: JSON.stringify(UserModel(user))
		});

		return response.json() as Promise<User>;
	} catch (error) {
		console.error('Error creating user:', error);
		return null;
	}
}
