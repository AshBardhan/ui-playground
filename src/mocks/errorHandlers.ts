import { http, HttpResponse } from 'msw';

export const errorHandlers = [
	http.get('*/api/dashboard/campaigns', () => {
		console.log('[MSW ERROR] /api/dashboard/campaigns intercepted');
		return HttpResponse.json({ message: 'Internal server error' }, { status: 500 });
	}),
];
