import mockApi from 'src/@mock-utils/mockApi';

export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('profile_about');
	const items = await api.findAll(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
