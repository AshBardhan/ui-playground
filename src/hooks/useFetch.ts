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
				setLoading(false);
				setData(null);
				setError(null);
				return;
			}

			// Set loading first, then clear previous data and error
			setLoading(true);
			setData(null);
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

				// Set data and clear error, then set loading to false
				setData(responseData);
				setError(null);
				setLoading(false);
				onSuccess?.(responseData);
			} catch (err) {
				if (err instanceof Error && err.name !== 'AbortError') {
					const errorObj = err instanceof Error ? err : new Error('An error occurred');
					// Set error and clear data, then set loading to false
					setError(errorObj);
					setData(null);
					setLoading(false);
					onError?.(errorObj);
				}
			}
		};

		fetchData();

		return () => {
			abortController.abort();
		};
	}, [url, method, body, headers, onSuccess, onError]);

	return { data, loading, error };
};
