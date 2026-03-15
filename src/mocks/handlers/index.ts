import { delay, http, HttpResponse } from 'msw';
import { conditionList } from '@/features/dynamic-filter/data/condition-list';
import { schemaList } from '@/features/dynamic-filter/data/schema-list';
import { campaignList } from '@/features/campaign-dashboard/data/campaign-list';
import { mockCampaigns } from '@/features/campaign-dashboard/data/campaigns';

export const handlers = [
	http.get('*/api/conditions', () => {
		console.log('[MSW] /api/conditions intercepted');
		return HttpResponse.json(conditionList);
	}),

	http.get('*/api/schema', () => {
		console.log('[MSW] /api/schema intercepted');
		return HttpResponse.json(schemaList);
	}),

	http.get('*/api/campaigns', async () => {
		console.log('[MSW] /api/campaigns intercepted');
		await delay(1500);
		return HttpResponse.json(campaignList);
	}),

	http.get('*/api/dashboard/campaigns', async () => {
		console.log('[MSW] /api/dashboard/campaigns intercepted');
		await delay(800);
		return HttpResponse.json(mockCampaigns);
	}),
];
