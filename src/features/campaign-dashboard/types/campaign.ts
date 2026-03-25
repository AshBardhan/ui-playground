export type CampaignStatus = 'DRAFT' | 'RUNNING' | 'PAUSED' | 'ARCHIVED';

export interface Campaign {
	id: string;
	name: string;
	status: CampaignStatus;
	metrics: {
		impressions: number;
		clicks: number;
		conversions: number;
		spend: number;
	};
	createdAt: string;
	updatedAt: string;
}

export interface CampaignFilters {
	status?: CampaignStatus[];
	search?: string;
}

export interface PaginationInfo {
	nextCursor: string | null;
	hasMore: boolean;
	total: number;
}

export interface CampaignPageResponse {
	data: Campaign[];
	pagination: PaginationInfo;
}
