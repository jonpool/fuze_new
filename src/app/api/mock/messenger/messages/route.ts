import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/messenger/messages
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('messenger_messages');
	const items = await api.findAll(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/messenger/messages
 */
export async function POST(req: Request) {
	const api = mockApi('messenger_messages');
	const requestData = await req.json();
	const newItem = await api.create(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}
