export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Define the types for options and configuration
type FetchOptions = RequestInit;

// Request Interceptor
const requestInterceptor = (config: FetchOptions): FetchOptions => {
	return config;
};

// Response Interceptor, passing the request method
const responseInterceptor = async (response: Response): Promise<Response> => {
	if (!response.ok) {
		// Handle specific status codes (e.g., unauthorized, refresh tokens)
		if (response.status === 401) {
			console.error('Unauthorized! Redirecting to login...');
		}

		// Throw an error with status and message for further handling
		throw new Error(`HTTP error! Status: ${response.status}`);
	}

	return response;
};

// Main apiFetch function with interceptors and type safety
const apiFetch = async <T>(endpoint: string, options: FetchOptions = {}) => {
	const { headers, ...restOptions } = options;
	const method = restOptions.method || 'GET';

	// Set default headers
	const config: FetchOptions = {
		headers: {
			...(method !== 'GET' && { 'Content-Type': 'application/json' }),
			...headers
		},
		...restOptions
	};

	// Apply request interceptor
	const interceptedConfig = requestInterceptor(config);

	// Perform the fetch
	const response = await fetch(`${BASE_URL}${endpoint}`, interceptedConfig);

	return responseInterceptor(response);
};

export default apiFetch;
