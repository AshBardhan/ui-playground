import { DashboardWidget } from '../types/dashboard';

export const DASHBOARD_WIDGETS: DashboardWidget[] = [
	{ id: 'metrics', type: 'metric', size: 'full', endpoint: '/api/analytics/metrics' },
	{ id: 'chart-1', type: 'chart', size: 'medium', endpoint: '/api/analytics/charts/chart-1' },
	{ id: 'chart-2', type: 'chart', size: 'medium', endpoint: '/api/analytics/charts/chart-2' },
	{ id: 'chart-3', type: 'chart', size: 'medium', endpoint: '/api/analytics/charts/chart-3' },
	{ id: 'chart-4', type: 'chart', size: 'medium', endpoint: '/api/analytics/charts/chart-4' },
	{ id: 'table-1', type: 'table', size: 'full', endpoint: '/api/analytics/tables/table-1' },
];
