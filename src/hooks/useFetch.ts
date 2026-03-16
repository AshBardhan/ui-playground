import { useState, useEffect, useRef } from 'react';

interface UseFetchOptions<T> {
	url: string | null;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	body?: any;
	headers?: HeadersInit;
	onSuccess?: (data: T) => void;
	onError?: (error: Error) => void;
}

interface UseFetchReturn<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
}

export const useFetch = <T>(options: UseFetchOptions<T>): UseFetchReturn<T> => {
	const { url, method = 'GET', body, headers, onSuccess, onError } = options;

	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		const fetchData = async () => {
			if (!url) {
				setData(null);
				setLoading(false);
				setError(null);
				return;
			}

			// Clear previous data and set loading immediately
			setData(null);
			setLoading(true);
			setError(null);

			try {
				const requestOptions: RequestInit = {
					method,
					headers: {
						'Content-Type': 'application/json',
						...headers,
					},
					signal,
				};

				if (body && method !== 'GET') {
					requestOptions.body = JSON.stringify(body);
				}

				const response = await fetch(url, requestOptions);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				// Check if response is JSON
				const contentType = response.headers.get('content-type');
				if (!contentType || !contentType.includes('application/json')) {
					throw new Error('Response is not JSON');
				}

				const responseData = await response.json();
				setData(responseData);
				setError(null);
				onSuccess?.(responseData);
			} catch (err) {
				if (err instanceof Error && err.name !== 'AbortError') {
					const errorObj = err instanceof Error ? err : new Error('An error occurred');
					setError(errorObj);
					onError?.(errorObj);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		return () => {
			abortController.abort();
		};
	}, [url, method, body, headers, onSuccess, onError]);

	return { data, loading, error };
};
