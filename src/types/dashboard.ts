import { Campaign, CampaignFilters } from './campaign';

export interface DashboardState {
	campaigns: Campaign[];
	filters: CampaignFilters;
	loading: boolean;
	error: string | null;
}

export interface DashboardActions {
	setFilters: (filters: CampaignFilters) => void;
	clearFilters: () => void;
	refreshCampaigns: () => void;
}

