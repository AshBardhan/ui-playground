import { http, HttpResponse } from 'msw';
import { conditionList } from '@/data/condition-list';
import { schemaList } from '@/data/schema-list';

export const handlers = [
	http.get('*/api/conditions', () => {
		console.log('[MSW] /api/conditions intercepted:');
		return HttpResponse.json(conditionList);
	}),

	http.get('*/api/schema', () => {
		console.log('[MSW] /api/schema intercepted:');
		return HttpResponse.json(schemaList);
	}),
];
