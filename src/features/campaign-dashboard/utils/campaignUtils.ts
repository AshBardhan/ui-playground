import { Campaign, CampaignStatus } from '../types/campaign';
import type { FilterOption } from '@/components/ui/FilterGroup';
import { CAMPAIGN_STATUS_OPTIONS, getCampaignStatusLabel } from '../constants/campaign-status';

/**
 * Generate filter options with campaign counts from loaded campaigns
 * @param campaigns - Array of loaded campaigns to count by status. If undefined/empty, returns options without counts (loading state)
 * @returns Filter options with counts in labels (e.g., "Draft (5)") or without counts during loading
 */
export const getCampaignStatusFilterOptions = (campaigns?: Campaign[]): FilterOption[] => {
	// If no campaigns loaded yet, show labels without counts
	if (!campaigns || campaigns.length === 0) {
		return CAMPAIGN_STATUS_OPTIONS.map((status) => ({
			label: getCampaignStatusLabel(status),
			value: status,
		}));
	}

	// Count campaigns by status from loaded campaigns
	const statusCounts = campaigns.reduce(
		(counts, campaign) => {
			counts[campaign.status] = (counts[campaign.status] || 0) + 1;
			return counts;
		},
		{} as Record<CampaignStatus, number>
	);

	// Map status options to filter options with counts
	return CAMPAIGN_STATUS_OPTIONS.map((status) => {
		const count = statusCounts[status] || 0;
		const label = getCampaignStatusLabel(status);
		return {
			label: `${label} (${count})`,
			value: status,
		};
	});
};
