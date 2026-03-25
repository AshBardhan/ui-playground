import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Campaign, CampaignFilters, CampaignStatus } from './types/campaign';
import { CampaignDashboardLayout } from './components/CampaignDashboardLayout';
import { CampaignList } from './components/CampaignList';
import { FilterPanel } from './components/FilterPanel';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { useInfiniteCampaigns } from './hooks/useInfiniteCampaigns';

export const CampaignDashboardPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	// Read filters from URL
	const filters = useMemo<CampaignFilters>(() => {
		const statusParam = searchParams.get('status');
		const searchParam = searchParams.get('search');

		return {
			status: statusParam ? (statusParam.split(',').filter(Boolean) as CampaignStatus[]) : undefined,
			search: searchParam || undefined,
		};
	}, [searchParams]);

	// Fetch campaigns with infinite scroll
	const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteCampaigns(filters);

	// Flatten all pages into single array
	const campaigns = data?.pages.flatMap((page) => page.data) ?? [];
	const total = data?.pages[0]?.pagination.total ?? 0;

	const handleFiltersChange = (newFilters: CampaignFilters) => {
		// Update URL with new filters
		const params = new URLSearchParams();

		if (newFilters.status && newFilters.status.length > 0) {
			params.set('status', newFilters.status.join(','));
		}

		if (newFilters.search) {
			params.set('search', newFilters.search);
		}

		setSearchParams(params, { replace: true });
		// React Query automatically refetches with new filters from URL
	};

	const handleCampaignClick = (campaign: Campaign) => {
		console.log('Campaign clicked:', campaign);
		// TODO: Implement campaign detail view or navigation
	};

	const handleLoadMore = () => {
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
			<Text variant="h1">Campaigns {!isLoading && campaigns.length > 0 && `(${campaigns.length} of ${total})`}</Text>
			<CampaignDashboardLayout
				leftContent={
					<CampaignList
						campaigns={campaigns}
						loading={isLoading}
						loadingMore={isFetchingNextPage}
						hasMore={hasNextPage}
						onLoadMore={handleLoadMore}
						onCampaignClick={handleCampaignClick}
					/>
				}
				rightContent={<FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />}
			/>
		</div>
	);
};
