import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/mailbox/mails
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('mailbox_mails');
	const items = await api.findAll(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/mailbox/mails
 */
export async function POST(req: Request) {
	const api = mockApi('mailbox_mails');
	const requestData = await req.json();
	const newItem = await api.create(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}

/**
 * PUT api/mock/mailbox/mails
 */
export async function PUT(req: Request) {
	const api = mockApi('mailbox_mails');
	const updatedItems = await req.json();

	const result = await Promise.all(updatedItems.map((item: any) => api.update(item.id, item)));

	return new Response(JSON.stringify(result), { status: 200 });
}
