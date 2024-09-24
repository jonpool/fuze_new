import mockApi from 'src/@mock-utils/mockApi';

export async function GET(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('users');
	const item = await api.find(id);

	if (!item) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(item), { status: 200 });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('users');
	const data = await req.json();
	const updatedItem = await api.update(id, data);

	if (!updatedItem) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(updatedItem), { status: 200 });
}
