import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/dashboards/finance/widgets
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('dashboards_finance_widgets');
	const items = await api.findAll(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
