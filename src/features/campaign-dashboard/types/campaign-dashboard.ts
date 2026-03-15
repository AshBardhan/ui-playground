import { Campaign, CampaignFilters } from './campaign';

export interface CampaignDashboardState {
	campaigns: Campaign[];
	filters: CampaignFilters;
	loading: boolean;
	error: string | null;
}

export interface CampaignDashboardActions {
	setFilters: (filters: CampaignFilters) => void;
	clearFilters: () => void;
	refreshCampaigns: () => void;
}
