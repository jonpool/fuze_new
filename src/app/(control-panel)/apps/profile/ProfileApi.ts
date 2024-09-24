import { apiService as api } from 'src/store/apiService';

export const addTagTypes = [
	'profile_albums',
	'profile_media_items',
	'profile_activities',
	'profile_posts',
	'profile_about'
] as const;

const ProfileApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getProfileAlbums: build.query<GetProfileAlbumsApiResponse, GetProfileAlbumsApiArg>({
				query: () => ({ url: `/api/mock/profile/albums` }),
				providesTags: ['profile_albums']
			}),
			getProfileMediaItems: build.query<GetProfileMediaItemsApiResponse, GetProfileMediaItemsApiArg>({
				query: () => ({ url: `/api/mock/profile/media-items` }),
				providesTags: ['profile_media_items']
			}),
			getProfileActivities: build.query<GetProfileActivitiesApiResponse, GetProfileActivitiesApiArg>({
				query: () => ({ url: `/api/mock/profile/activities` }),
				providesTags: ['profile_activities']
			}),
			getProfilePosts: build.query<GetProfilePostsApiResponse, GetProfilePostsApiArg>({
				query: () => ({ url: `/api/mock/profile/posts` }),
				providesTags: ['profile_posts']
			}),
			getProfileAbout: build.query<GetProfileAboutApiResponse, GetProfileAboutApiArg>({
				query: () => ({ url: `/api/mock/profile/about` }),
				providesTags: ['profile_about']
			})
		}),
		overrideExisting: false
	});

export default ProfileApi;

export type GetProfileAlbumsApiResponse = /** status 200 OK */ ProfileAlbum[];
export type GetProfileAlbumsApiArg = void;

export type GetProfileMediaItemsApiResponse = /** status 200 OK */ ProfileMediaItem[];
export type GetProfileMediaItemsApiArg = void;

export type GetProfileActivitiesApiResponse = /** status 200 OK */ ProfileActivity[];
export type GetProfileActivitiesApiArg = void;

export type GetProfilePostsApiResponse = /** status 200 OK */ ProfilePost[];
export type GetProfilePostsApiArg = void;

export type GetProfileAboutApiResponse = /** status 200 OK */ ProfileAbout;
export type GetProfileAboutApiArg = void;

export type ProfileAlbum = {
	id?: string;
	name?: string;
	info?: string;
	created_at?: string;
};

export type ProfileMediaItem = {
	id?: string;
	album_id?: string;
	type?: string;
	title?: string;
	preview?: string;
	created_at?: string;
};

export type ProfileActivity = {
	id?: string;
	user?: {
		name?: string;
		avatar?: string;
	};
	message?: string;
	time?: string;
};

export type ProfilePost = {
	id?: string;
	user?: {
		name?: string;
		avatar?: string;
	};
	message?: string;
	time?: string;
	type?: string;
	like?: number;
	share?: number;
	media?: {
		type?: string;
		preview?: string;
	};
	comments?: {
		id?: string;
		user?: {
			name?: string;
			avatar?: string;
		};
		time?: string;
		message?: string;
	}[];
	article?: {
		title?: string;
		subtitle?: string;
		excerpt?: string;
		media?: {
			type?: string;
			preview?: string;
		};
	};
};

export type ProfileAbout = {
	general?: {
		gender?: string;
		birthday?: string;
		locations?: string[];
		about?: string;
	};
	work?: {
		occupation?: string;
		skills?: string;
		jobs?: {
			company?: string;
			date?: string;
		}[];
	};
	contact?: {
		address?: string;
		tel?: string[];
		websites?: string[];
		emails?: string[];
	};
	groups?: {
		id?: string;
		name?: string;
		category?: string;
		members?: string;
	}[];
	friends?: {
		id?: string;
		name?: string;
		avatar?: string;
	}[];
};

export const {
	useGetProfileAlbumsQuery,
	useGetProfileMediaItemsQuery,
	useGetProfileActivitiesQuery,
	useGetProfilePostsQuery,
	useGetProfileAboutQuery
} = ProfileApi;
