import { http, HttpResponse } from 'msw';

export const handlers = [
	http.get('*/api/user', () => {
		console.log('[MSW] /api/user intercepted:');
		return HttpResponse.json({
			id: 'abc-123',
			firstName: 'John',
			lastName: 'Maverick',
		});
	}),
];
