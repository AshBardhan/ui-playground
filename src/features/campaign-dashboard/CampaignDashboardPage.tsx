import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Campaign, CampaignFilters, CampaignStatus } from './types/campaign';
import { CampaignDashboardLayout } from './components/CampaignDashboardLayout';
import { CampaignListPanel } from './components/CampaignListPanel';
import { CampaignFilterPanel } from './components/CampaignFilterPanel';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { useInfiniteCampaigns } from './hooks/useInfiniteCampaigns';
import { getCampaignStatusFilterOptions } from './utils/campaignUtils';

export const CampaignDashboardPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	// Parse filters from URL query parameters (enables shareable/bookmarkable filters)
	const filters = useMemo<CampaignFilters>(() => {
		const statusParam = searchParams.get('status');
		const searchParam = searchParams.get('search');

		return {
			// Parse comma-separated status values, filter out empty strings
			status: statusParam ? (statusParam.split(',').filter(Boolean) as CampaignStatus[]) : undefined,
			search: searchParam || undefined,
		};
	}, [searchParams]);

	// Fetch campaigns with infinite scroll using React Query
	const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteCampaigns(filters);

	// Flatten paginated results into single array for rendering
	const campaigns = data?.pages.flatMap((page) => page.data) ?? [];
	const total = data?.pages[0]?.pagination.total ?? 0;

	// Generate filter options with counts from loaded campaigns (hides counts during loading)
	const statusFilterOptions = useMemo(
		() => getCampaignStatusFilterOptions(isLoading ? undefined : campaigns),
		[campaigns, isLoading]
	);

	const handleFiltersChange = (newFilters: CampaignFilters) => {
		// Sync filters to URL query parameters
		const params = new URLSearchParams();

		if (newFilters.status && newFilters.status.length > 0) {
			params.set('status', newFilters.status.join(','));
		}

		if (newFilters.search) {
			params.set('search', newFilters.search);
		}

		// Use replace to avoid cluttering browser history
		setSearchParams(params, { replace: true });
		// React Query automatically refetches when queryKey (includes filters) changes
	};

	const handleCampaignClick = (campaign: Campaign) => {
		console.log('Campaign clicked:', campaign);
		// TODO: Implement campaign detail view or navigation
	};

	const handleLoadMore = () => {
		// Trigger next page fetch if more pages available and not already fetching
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

	if (error) {
		return (
			<div className="h-full flex items-center justify-center">
				<div className="text-center">
					<div className="text-red-600 text-lg mb-2">Error loading campaigns</div>
					<div className="text-gray-600">{error.message}</div>
					<Button onClick={() => window.location.reload()} className="mt-4">
						Retry
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			{/* Header with dynamic count display */}{' '}
			<Text variant="h1">Campaigns {!isLoading && campaigns.length > 0 && `(${campaigns.length} of ${total})`}</Text>
			<CampaignDashboardLayout
				leftContent={
					<CampaignListPanel
						campaigns={campaigns}
						loading={isLoading}
						loadingMore={isFetchingNextPage}
						hasMore={hasNextPage}
						onLoadMore={handleLoadMore}
						onCampaignClick={handleCampaignClick}
					/>
				}
				rightContent={
					<CampaignFilterPanel
						filters={filters}
						onFiltersChange={handleFiltersChange}
						statusOptions={statusFilterOptions}
					/>
				}
			/>
		</div>
	);
};
