import { CampaignStatus } from '../types/campaign';
import type { FilterOption } from '@/components/ui/FilterGroup';

/**
 * Badge variant type for campaign statuses
 */
type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

/**
 * All available campaign status values
 */
export const CAMPAIGN_STATUS_OPTIONS: CampaignStatus[] = ['DRAFT', 'RUNNING', 'PAUSED', 'ARCHIVED'];

/**
 * Human-readable labels for campaign statuses
 */
export const CAMPAIGN_STATUS_LABELS: Record<CampaignStatus, string> = {
	DRAFT: 'Draft',
	RUNNING: 'Running',
	PAUSED: 'Paused',
	ARCHIVED: 'Archived',
};

/**
 * Filter options for campaign statuses (for FilterGroup component)
 */
export const CAMPAIGN_STATUS_FILTER_OPTIONS: FilterOption[] = [
	{ label: 'Draft', value: 'DRAFT' },
	{ label: 'Running', value: 'RUNNING' },
	{ label: 'Paused', value: 'PAUSED' },
	{ label: 'Archived', value: 'ARCHIVED' },
];

/**
 * Badge variant mapping for campaign statuses
 */
export const CAMPAIGN_STATUS_VARIANTS: Record<CampaignStatus, BadgeVariant> = {
	RUNNING: 'success',
	PAUSED: 'warning',
	ARCHIVED: 'error',
	DRAFT: 'neutral',
};

/**
 * Get human-readable label for a campaign status
 */
export const getCampaignStatusLabel = (status: CampaignStatus): string => {
	return CAMPAIGN_STATUS_LABELS[status] || status;
};

/**
 * Get badge variant for a campaign status
 */
export const getCampaignStatusVariant = (status: CampaignStatus): BadgeVariant => {
	return CAMPAIGN_STATUS_VARIANTS[status] || 'neutral';
};
