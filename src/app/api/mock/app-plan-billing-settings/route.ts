import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/app-plan-billing-settings
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('app_plan_billing_settings');
	const items = await api.findAll(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
