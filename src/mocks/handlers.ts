import { delay, http, HttpResponse } from 'msw';
import { conditionList } from '@/data/condition-list';
import { schemaList } from '@/data/schema-list';
import { campaignList } from '@/data/campaign-list';

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
];
