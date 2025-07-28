import { fetchCampaigns } from '@/data/campaign-list';

export const fetchMap: Record<string, () => Promise<any>> = {
	'/api/campaigns': fetchCampaigns,
};
