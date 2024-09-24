import mockApi from 'src/@mock-utils/mockApi';

export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('notifications');
	const items = await api.findAll(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

export async function POST(req: Request) {
	const api = mockApi('notifications');
	const requestData = await req.json();
	const newItem = await api.create(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}

export async function DELETE(req: Request) {
	const api = mockApi('notifications');
	const ids = await req.json();
	const result = await api.delete(ids);

	return new Response(JSON.stringify({ success: result.success }), { status: 200 });
}
