import { useInfiniteQuery } from '@tanstack/react-query';
import { Campaign, CampaignFilters, CampaignPageResponse } from '../types/campaign';

interface FetchCampaignsParams {
	pageParam: string | null;
	filters: CampaignFilters;
}

const fetchCampaigns = async ({ pageParam, filters }: FetchCampaignsParams): Promise<CampaignPageResponse> => {
	const params = new URLSearchParams();

	// Pagination
	if (pageParam) {
		params.append('cursor', pageParam);
	}
	params.append('limit', '20');

	// Filters
	if (filters.status && filters.status.length > 0) {
		params.append('status', filters.status.join(','));
	}
	if (filters.search) {
		params.append('search', filters.search);
	}

	const response = await fetch(`/api/dashboard/campaigns?${params.toString()}`);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return response.json();
};

export const useInfiniteCampaigns = (filters: CampaignFilters) => {
	return useInfiniteQuery({
		queryKey: ['campaigns', filters],
		queryFn: ({ pageParam }) => fetchCampaigns({ pageParam: pageParam as string | null, filters }),
		initialPageParam: null as string | null,
		getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
	});
};
