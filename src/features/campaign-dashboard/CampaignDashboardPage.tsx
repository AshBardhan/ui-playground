import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Campaign, CampaignFilters, CampaignStatus } from './types/campaign';
import { CampaignListPanel } from './components/CampaignListPanel';
import { CampaignFilterPanel } from './components/CampaignFilterPanel';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { useInfiniteCampaigns } from './hooks/useInfiniteCampaigns';
import { getCampaignStatusFilterOptions } from './utils/campaignUtils';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { PageContent } from '@/components/layout/PageContent';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Filter, X } from 'lucide-react';

export const CampaignDashboardPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [isFilterOpen, setIsFilterOpen] = useState(false);

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

	return (
		<PageLayout>
			<PageHeader>
				<div className="flex items-center justify-between gap-2">
					<div className="space-y-1">
						<Text variant="h1">
							Campaigns
							{!isLoading && campaigns.length > 0 && <span className="ml-2">({campaigns.length})</span>}
						</Text>
						<Text variant="p" className="text-gray-500">
							Manage your campaigns and view performance metrics
						</Text>
					</div>
					<div className="lg:hidden">
						<Button onClick={() => setIsFilterOpen(true)} theme="secondary" size="sm">
							<Filter className="h-4 w-4 mr-2" />
							Filters
						</Button>
					</div>
				</div>

				{/* Mobile filter modal */}
				<Dialog open={isFilterOpen} onClose={() => setIsFilterOpen(false)} className="relative z-50 lg:hidden">
					{/* Backdrop */}
					<div className="fixed inset-0 bg-black/30" aria-hidden="true" />

					{/* Full-screen modal */}
					<div className="fixed inset-0 flex items-center justify-center p-4">
						<DialogPanel className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-lg p-4">
							{/* Close button at top right */}
							<button
								onClick={() => setIsFilterOpen(false)}
								className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded transition-colors"
								aria-label="Close filters"
							>
								<X className="h-5 w-5" />
							</button>

							{/* Modal content */}
							<CampaignFilterPanel
								filters={filters}
								onFiltersChange={handleFiltersChange}
								statusOptions={statusFilterOptions}
							/>
						</DialogPanel>
					</div>
				</Dialog>
			</PageHeader>
			<PageContent>
				{/* Two-column grid layout */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main content area - campaigns list */}
					<div className="lg:col-span-2">
						<CampaignListPanel
							campaigns={campaigns}
							loading={isLoading}
							loadingMore={isFetchingNextPage}
							hasMore={hasNextPage}
							error={error}
							onLoadMore={handleLoadMore}
							onCampaignClick={handleCampaignClick}
						/>
					</div>

					{/* Sidebar - filters (sticky on scroll, hidden on mobile) */}
					<div className="hidden lg:block lg:col-span-1">
						<div className="sticky top-8">
							<Card>
								<CampaignFilterPanel
									filters={filters}
									onFiltersChange={handleFiltersChange}
									statusOptions={statusFilterOptions}
								/>
							</Card>
						</div>
					</div>
				</div>
			</PageContent>
		</PageLayout>
	);
};
