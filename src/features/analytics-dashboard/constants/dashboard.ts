import { DashboardWidget } from '../types/dashboard';

export const DASHBOARD_WIDGETS: DashboardWidget[] = [
	{
		id: 'metrics',
		type: 'metric',
		size: 'full',
		endpoint: '/api/analytics/metrics',
	},
	{
		id: 'chart-1',
		type: 'chart',
		title: 'Revenue Over Time',
		size: 'medium',
		endpoint: '/api/analytics/charts/chart-1',
		rangeOptions: ['Last 7 Days', 'Last 30 Days', 'Last 90 Days'],
	},
	{
		id: 'chart-2',
		type: 'chart',
		title: 'User Activity',
		size: 'medium',
		endpoint: '/api/analytics/charts/chart-2',
		periodOptions: ['Hourly', 'Daily', 'Weekly'],
	},
	{
		id: 'chart-3',
		type: 'chart',
		title: 'Sales by Category',
		size: 'medium',
		endpoint: '/api/analytics/charts/chart-3',
		sortOptions: ['Default', 'Ascending', 'Descending'],
	},
	{
		id: 'chart-4',
		type: 'chart',
		title: 'Traffic Sources',
		size: 'medium',
		endpoint: '/api/analytics/charts/chart-4',
		sortOptions: ['Default', 'Ascending', 'Descending'],
	},
	{
		id: 'table-1',
		type: 'table',
		title: 'Recent Transactions',
		size: 'full',
		endpoint: '/api/analytics/tables/table-1',
	},
];
