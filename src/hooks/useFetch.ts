import { useEffect, useState } from 'react';

/**
 * Global cache: URL → response data
 */
const cacheMap = new Map<string, unknown>();

/**
 * Track in-flight requests to avoid duplicate API calls
 */
const inflightRequests = new Map<string, Promise<unknown>>();

interface UseFetchOptions {
	url: string | null;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	body?: unknown;
	headers?: HeadersInit;
	cache?: boolean;
}

interface UseFetchReturn<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
}

export const useFetch = <T = unknown>(
	options: UseFetchOptions & {
		onSuccess?: (data: T) => void;
		onError?: (error: Error) => void;
	}
): UseFetchReturn<T> => {
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
			if (cache && cacheMap.has(url)) {
				const cached = cacheMap.get(url) as T;

				if (!isMounted) return;

				setData(cached);
				setLoading(false);
				setError(null);
				onSuccess?.(cached);
				return;
			}

			setLoading(true);
			setError(null);

			try {
				if (inflightRequests.has(url)) {
					try {
						const result = (await inflightRequests.get(url)!) as T;

						if (!isMounted) return;

						setData(result);
						setLoading(false);
						onSuccess?.(result);
						return;
					} catch (err) {
						// If the in-flight request was aborted or failed, continue to make our own request
						if (err instanceof Error && err.name === 'AbortError') {
							inflightRequests.delete(url);
						} else {
							// Re-throw non-abort errors to be handled by outer catch
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
						if (cache) {
							cacheMap.set(url, result);
						}
						return result;
					})
					.finally(() => {
						inflightRequests.delete(url);
					});

				inflightRequests.set(url, requestPromise);

				const result = (await requestPromise) as T;

				if (!isMounted) return;

				setData(result);
				setLoading(false);
				setError(null);
				onSuccess?.(result);
			} catch (err) {
				if (!isMounted) return;

				if (err instanceof Error) {
					// Always set loading to false, even for AbortError
					setLoading(false);

					// Only set error state for non-abort errors
					if (err.name !== 'AbortError') {
						setError(err);
						onError?.(err);
					}
				}
			}
		};

		fetchData();

		return () => {
			isMounted = false;
			controller.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, method, JSON.stringify(body), JSON.stringify(headers), cache]);

	return { data, loading, error };
};
