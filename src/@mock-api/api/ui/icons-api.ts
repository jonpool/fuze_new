import mockApi from '../../mock-api.json';
import ExtendedMockAdapter from '../../ExtendedMockAdapter';

const heroiconsApi = mockApi.components.examples.ui_feather_icons.value;
const materialIconsApi = mockApi.components.examples.ui_material_icons.value;
const featherIconsApi = mockApi.components.examples.ui_feather_icons.value;

export const iconsApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/ui/heroicons-icons').reply(() => {
		return [200, heroiconsApi];
	});

	mock.onGet('/ui/material-icons').reply(() => {
		return [200, materialIconsApi];
	});

	mock.onGet('/ui/feather-icons').reply(() => {
		return [200, featherIconsApi];
	});
};
