/**
 * Campaign status enum - represents lifecycle stages of a campaign
 */
export type CampaignStatus = 'DRAFT' | 'RUNNING' | 'PAUSED' | 'ARCHIVED';

/**
 * Campaign entity representing a marketing campaign with metrics
 */
export interface Campaign {
	id: string;
	name: string;
	status: CampaignStatus;
	metrics: {
		impressions: number;
		clicks: number;
		conversions: number;
		spend: number; // In USD
	};
	createdAt: string; // ISO 8601 date string
	updatedAt: string; // ISO 8601 date string
}

/**
 * Filter criteria for campaign queries
 */
export interface CampaignFilters {
	status?: CampaignStatus[]; // Filter by one or more statuses
	search?: string; // Search by campaign name (case-insensitive)
}

/**
 * Pagination metadata for cursor-based pagination
 */
export interface PaginationInfo {
	nextCursor: string | null; // Cursor for next page (null if no more pages)
	hasMore: boolean; // Whether more pages are available
	total: number; // Total count of filtered results
	statusCounts?: Record<CampaignStatus, number>; // Count of campaigns by status (all campaigns, not filtered)
}

/**
 * API response structure for paginated campaign data
 */
export interface CampaignPageResponse {
	data: Campaign[];
	pagination: PaginationInfo;
}
