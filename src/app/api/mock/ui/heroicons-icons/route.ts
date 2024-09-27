import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/ui/heroicons-icons
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('ui_heroicons_icons');
	const items = await api.findAll(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
