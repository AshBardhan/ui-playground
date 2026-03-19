import { useEffect, useState } from 'react';

/**
 * Global cache: URL → response data
 */
const cacheMap = new Map<string, any>();

/**
 * Track in-flight requests to avoid duplicate API calls
 */
const inflightRequests = new Map<string, Promise<any>>();

interface UseFetchOptions<T> {
	url: string | null;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	body?: any;
	headers?: HeadersInit;

	// Optional toggle for caching
	cache?: boolean;

	onSuccess?: (data: T) => void;
	onError?: (error: Error) => void;
}

interface UseFetchReturn<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
}

export const useFetch = <T>(options: UseFetchOptions<T>): UseFetchReturn<T> => {
	const { url, method = 'GET', body, headers, cache = false, onSuccess, onError } = options;

	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!url) {
			setData(null);
			setLoading(false);
			setError(null);
			return;
		}

		let isMounted = true;
		const controller = new AbortController();
		const signal = controller.signal;

		const fetchData = async () => {
			/**
			 * ✅ STEP 1: Cache lookup
			 */
			if (cache && cacheMap.has(url)) {
				const cached = cacheMap.get(url);

				if (!isMounted) return;

				setData(cached);
				setLoading(false);
				setError(null);
				onSuccess?.(cached);
				return;
			}

			/**
			 * ✅ STEP 2: Loading state (only if no cached data)
			 */
			setLoading(true);
			setError(null);

			try {
				/**
				 * ✅ STEP 3: Deduplication - wait for in-flight request
				 */
				if (inflightRequests.has(url)) {
					try {
						const result = await inflightRequests.get(url)!;

						if (!isMounted) return;

						setData(result);
						setLoading(false);
						setError(null);
						onSuccess?.(result);
						return;
					} catch (err) {
						// If the in-flight request was aborted or failed, continue to make our own request
						if (err instanceof Error && err.name === 'AbortError') {
							// Previous request was aborted, make our own request
							inflightRequests.delete(url);
						} else {
							// Other error - propagate it
							throw err;
						}
					}
				}

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

				const requestPromise = fetch(url, requestOptions)
					.then(async (res) => {
						if (!res.ok) {
							throw new Error(`HTTP error! status: ${res.status}`);
						}

						const contentType = res.headers.get('content-type');
						if (!contentType || !contentType.includes('application/json')) {
							throw new Error('Response is not JSON');
						}

						return res.json();
					})
					.then((result) => {
						/**
						 * ✅ Store in cache
						 */
						if (cache) {
							cacheMap.set(url, result);
						}
						return result;
					})
					.finally(() => {
						inflightRequests.delete(url);
					});

				inflightRequests.set(url, requestPromise);

				const result = await requestPromise;

				if (!isMounted) return;

				setData(result);
				setLoading(false);
				setError(null);
				onSuccess?.(result);
			} catch (err) {
				if (!isMounted) return;

				if (err instanceof Error && err.name !== 'AbortError') {
					setError(err);
					setLoading(false);
					onError?.(err);
				}
			}
		};

		fetchData();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [url, method, body, headers, cache]);

	return { data, loading, error };
};
