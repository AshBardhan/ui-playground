import { DashboardWidget } from '../types/dashboard';

export const DASHBOARD_WIDGETS: DashboardWidget[] = [
	{ id: 'metric-1', type: 'metric', size: 'small', endpoint: '/api/analytics/metrics/metric-1' },
	{ id: 'metric-2', type: 'metric', size: 'small', endpoint: '/api/analytics/metrics/metric-2' },
	{ id: 'metric-3', type: 'metric', size: 'small', endpoint: '/api/analytics/metrics/metric-3' },
	{ id: 'metric-4', type: 'metric', size: 'small', endpoint: '/api/analytics/metrics/metric-4' },
	{ id: 'chart-1', type: 'chart', size: 'medium', endpoint: '/api/analytics/charts/chart-1' },
	{ id: 'chart-2', type: 'chart', size: 'medium', endpoint: '/api/analytics/charts/chart-2' },
	{ id: 'chart-3', type: 'chart', size: 'medium', endpoint: '/api/analytics/charts/chart-3' },
	{ id: 'chart-4', type: 'chart', size: 'medium', endpoint: '/api/analytics/charts/chart-4' },
	{ id: 'table-1', type: 'table', size: 'full', endpoint: '/api/analytics/tables/table-1' },
];
