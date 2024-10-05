import { v4 as uuidv4 } from 'uuid';
import mockDb from './mockDb.json';

// Helper function to simulate database operations
function getTable<T>(tableName: string) {
	return (mockDb[tableName] || []) as T[];
}

function saveTable<T>(tableName: string, items: T[]) {
	mockDb[tableName] = items;
}

// Generic CRUD operations for the mock API
const mockApi = (tableName: string) => ({
	async create<T extends { id?: string }>(data: T) {
		const newItem = { ...data, id: data.id || uuidv4() };
		const table = getTable(tableName);
		table.push(newItem);
		saveTable(tableName, table);
		return newItem;
	},

	async delete(ids: string[]) {
		let table = getTable(tableName);
		table = table.filter((item) => {
			const typedItem = item as { id: string };
			return !ids.includes(typedItem.id);
		});
		saveTable(tableName, table);
		return { success: true };
	},

	async update<T extends { id: string }>(id: string, updatedData: T) {
		const table = getTable<T>(tableName);

		let newItem: T;

		const newTable = table.map((item) => {
			if (item.id === id) {
				newItem = { ...item, ...updatedData };
				return newItem;
			}

			return item;
		});

		if (newItem) {
			saveTable(tableName, newTable);

			return newItem;
		}

		return null;
	},

	async find<T extends { id: string }>(id: string) {
		const table = getTable<T>(tableName);
		return table.find((item) => item.id === id) || null;
	},

	async findAll<T>(queryParams: Record<string, unknown> = {}) {
		const table = getTable<T>(tableName);

		if (Object.keys(queryParams).length > 0) {
			return table.filter((item) =>
				Object.entries(queryParams).every(([key, value]) => {
					const itemVal = item?.[key] as unknown;

					if (Array.isArray(itemVal)) {
						return itemVal.includes(value);
					}

					if (typeof itemVal === 'boolean') {
						return itemVal === (value === 'true');
					}

					if (value === 'not_null') {
						return itemVal !== null && itemVal !== undefined;
					}

					return itemVal === value;
				})
			);
		}

		return table;
	}
});

export default mockApi;