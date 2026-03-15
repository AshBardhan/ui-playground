import { useState, useEffect, useMemo } from 'react';
import { Campaign, CampaignFilters } from './types/campaign';
import { CampaignDashboardLayout } from './components/CampaignDashboardLayout';
import { CampaignList } from './components/CampaignList';
import { FilterPanel } from './components/FilterPanel';
import { Text } from '@/components/ui/Text';

export const CampaignDashboardPage = () => {
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [filters, setFilters] = useState<CampaignFilters>({});

	// Fetch campaigns on component mount
	useEffect(() => {
		const fetchCampaigns = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await fetch('/api/dashboard/campaigns');

				if (!response.ok) {
					throw new Error('Failed to fetch campaigns');
				}

				const data = await response.json();
				setCampaigns(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred');
			} finally {
				setLoading(false);
			}
		};

		fetchCampaigns();
	}, []);

	// Filter campaigns based on current filters
	const filteredCampaigns = useMemo(() => {
		return campaigns.filter((campaign) => {
			// Search filter
			if (filters.search) {
				const searchLower = filters.search.toLowerCase();
				if (!campaign.name.toLowerCase().includes(searchLower)) {
					return false;
				}
			}

			// Status filter
			if (filters.status && filters.status.length > 0) {
				if (!filters.status.includes(campaign.status)) {
					return false;
				}
			}

			return true;
		});
	}, [campaigns, filters]);

	const handleFiltersChange = (newFilters: CampaignFilters) => {
		setFilters(newFilters);
	};

	const handleCampaignClick = (campaign: Campaign) => {
		console.log('Campaign clicked:', campaign);
		// TODO: Implement campaign detail view or navigation
	};

	if (error) {
		return (
			<div className="h-full flex items-center justify-center">
				<div className="text-center">
					<div className="text-red-600 text-lg mb-2">Error loading campaigns</div>
					<div className="text-gray-600">{error}</div>
					<button
						onClick={() => window.location.reload()}
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			<Text variant="h1">Campaigns {!loading ? `(${filteredCampaigns.length})` : ''}</Text>
			<CampaignDashboardLayout
				leftContent={
					<CampaignList campaigns={filteredCampaigns} loading={loading} onCampaignClick={handleCampaignClick} />
				}
				rightContent={<FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />}
			/>
		</div>
	);
};
