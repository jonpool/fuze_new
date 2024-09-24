import {
	ProfileAbout,
	ProfileActivity,
	ProfileAlbum,
	ProfileMediaItem,
	ProfilePost
} from 'src/app/(control-panel)/apps/profile/ProfileApi';
import mockApi from '../mock-api.json';
import ExtendedMockAdapter from '../ExtendedMockAdapter';

const activitiesApi = mockApi.components.examples.profile_activities.value as ProfileActivity[];
const postsApi = mockApi.components.examples.profile_posts.value as ProfilePost[];
const albumsApi = mockApi.components.examples.profile_albums.value as ProfileAlbum[];

const mediaItemsApi = mockApi.components.examples.profile_media_items.value as ProfileMediaItem[];
const aboutApi = mockApi.components.examples.profile_about.value as ProfileAbout;

export const profileApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/profile/activities').reply(() => {
		return [200, activitiesApi];
	});
	mock.onGet('/profile/posts').reply(() => {
		return [200, postsApi];
	});

	mock.onGet('/profile/albums').reply(() => {
		return [200, albumsApi];
	});

	mock.onGet('/profile/media-items').reply(() => {
		return [200, mediaItemsApi];
	});

	mock.onGet('/profile/about').reply(() => {
		return [200, aboutApi];
	});
};
