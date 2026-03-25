import { useInfiniteQuery } from '@tanstack/react-query';
import { Campaign, CampaignFilters, CampaignPageResponse } from '../types/campaign';

interface FetchCampaignsParams {
	pageParam: string | null;
	filters: CampaignFilters;
}

/**
 * Fetch campaigns from API with cursor-based pagination and filters
 */
const fetchCampaigns = async ({ pageParam, filters }: FetchCampaignsParams): Promise<CampaignPageResponse> => {
	const params = new URLSearchParams();

	// Add cursor for pagination (null for first page)
	if (pageParam) {
		params.append('cursor', pageParam);
	}
	params.append('limit', '20'); // 20 campaigns per page

	// Apply status and search filters if provided
	if (filters.status && filters.status.length > 0) {
		params.append('status', filters.status.join(','));
	}
	if (filters.search) {
		params.append('search', filters.search);
	}

	const url = `/api/dashboard/campaigns?${params.toString()}`;

	try {
		const response = await fetch(url);

		// Validate HTTP status
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// Ensure response is JSON (prevents HTML error pages from breaking JSON.parse)
		const contentType = response.headers.get('content-type');
		if (!contentType || !contentType.includes('application/json')) {
			const text = await response.text();
			throw new Error(
				`Expected JSON response but received ${contentType || 'unknown content type'}. Response: ${text.substring(0, 100)}...`
			);
		}

		return response.json();
	} catch (error) {
		if (error instanceof Error) {
			// Provide user-friendly error message for JSON parsing failures
			if (error.message.includes('JSON')) {
				throw new Error(`Failed to parse API response as JSON. The API may be down or returning HTML errors.`);
			}
			throw error;
		}
		throw new Error(`Failed to fetch campaigns from ${url}`);
	}
};

/**
 * Custom hook for infinite scrolling campaigns with React Query
 * Automatically refetches when filters change
 */
export const useInfiniteCampaigns = (filters: CampaignFilters) => {
	return useInfiniteQuery({
		queryKey: ['campaigns', filters], // Cache key includes filters for automatic refetch on filter change
		queryFn: ({ pageParam }) => fetchCampaigns({ pageParam: pageParam as string | null, filters }),
		initialPageParam: null as string | null, // First page has no cursor
		getNextPageParam: (lastPage) => lastPage.pagination.nextCursor, // Extract cursor for next page
	});
};
