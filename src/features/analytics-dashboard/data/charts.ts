import { LineChartData, BarChartData, PieChartData, AreaChartData } from '../types/chart';

// Revenue over time (Line Chart)
export const revenueOverTimeData: LineChartData = {
	id: 'revenue-over-time',
	title: 'Revenue Trend (Last 30 Days)',
	type: 'line',
	color: '#3b82f6',
	points: [
		{ date: '2026-02-15', value: 24500 },
		{ date: '2026-02-16', value: 26800 },
		{ date: '2026-02-17', value: 23900 },
		{ date: '2026-02-18', value: 28200 },
		{ date: '2026-02-19', value: 27600 },
		{ date: '2026-02-20', value: 29100 },
		{ date: '2026-02-21', value: 25800 },
		{ date: '2026-02-22', value: 27300 },
		{ date: '2026-02-23', value: 30200 },
		{ date: '2026-02-24', value: 28900 },
		{ date: '2026-02-25', value: 31500 },
		{ date: '2026-02-26', value: 29800 },
		{ date: '2026-02-27', value: 32100 },
		{ date: '2026-02-28', value: 30600 },
		{ date: '2026-03-01', value: 33200 },
		{ date: '2026-03-02', value: 31800 },
		{ date: '2026-03-03', value: 34500 },
		{ date: '2026-03-04', value: 32900 },
		{ date: '2026-03-05', value: 35100 },
		{ date: '2026-03-06', value: 33700 },
		{ date: '2026-03-07', value: 36200 },
		{ date: '2026-03-08', value: 34800 },
		{ date: '2026-03-09', value: 37100 },
		{ date: '2026-03-10', value: 35500 },
		{ date: '2026-03-11', value: 38300 },
		{ date: '2026-03-12', value: 36900 },
		{ date: '2026-03-13', value: 39500 },
		{ date: '2026-03-14', value: 37800 },
		{ date: '2026-03-15', value: 40200 },
		{ date: '2026-03-16', value: 38600 },
	],
};

// User activity by hour (Area Chart)
export const userActivityData: AreaChartData = {
	id: 'user-activity',
	title: 'User Activity by Hour (Today)',
	type: 'area',
	color: '#8b5cf6',
	points: [
		{ date: '00:00', value: 245 },
		{ date: '01:00', value: 189 },
		{ date: '02:00', value: 132 },
		{ date: '03:00', value: 98 },
		{ date: '04:00', value: 76 },
		{ date: '05:00', value: 124 },
		{ date: '06:00', value: 287 },
		{ date: '07:00', value: 456 },
		{ date: '08:00', value: 623 },
		{ date: '09:00', value: 789 },
		{ date: '10:00', value: 892 },
		{ date: '11:00', value: 943 },
		{ date: '12:00', value: 876 },
		{ date: '13:00', value: 812 },
		{ date: '14:00', value: 934 },
		{ date: '15:00', value: 987 },
		{ date: '16:00', value: 1024 },
		{ date: '17:00', value: 956 },
		{ date: '18:00', value: 823 },
		{ date: '19:00', value: 687 },
		{ date: '20:00', value: 534 },
		{ date: '21:00', value: 423 },
		{ date: '22:00', value: 356 },
		{ date: '23:00', value: 298 },
	],
};

// Sales by category (Bar Chart)
export const salesByCategoryData: BarChartData = {
	id: 'sales-by-category',
	title: 'Sales by Category',
	type: 'bar',
	points: [
		{ label: 'Electronics', value: 87200, color: '#3b82f6' },
		{ label: 'Clothing', value: 125600, color: '#8b5cf6' },
		{ label: 'Home & Garden', value: 43900, color: '#10b981' },
		{ label: 'Sports', value: 98400, color: '#f59e0b' },
		{ label: 'Books', value: 76800, color: '#ef4444' },
		{ label: 'Toys', value: 29500, color: '#ec4899' },
		{ label: 'Beauty', value: 54300, color: '#06b6d4' },
		{ label: 'Automotive', value: 38700, color: '#6b7280' },
	],
};

// Traffic sources (Pie Chart)
export const trafficSourcesData: PieChartData = {
	id: 'traffic-sources',
	title: 'Traffic Sources',
	type: 'pie',
	points: [
		{ label: 'Organic Search', value: 45.2, color: '#ef4444' },
		{ label: 'Direct', value: 23.8, color: '#eab308' },
		{ label: 'Social Media', value: 15.6, color: '#10b981' },
		{ label: 'Paid Ads', value: 8.9, color: '#06b6d4' },
		{ label: 'Referral', value: 4.3, color: '#3b82f6' },
		{ label: 'Email', value: 2.2, color: '#d946ef' },
	],
};

export const allChartsData = [revenueOverTimeData, userActivityData, salesByCategoryData, trafficSourcesData];
