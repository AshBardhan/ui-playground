import { delay, http, HttpResponse } from 'msw';
import { conditionList } from '@/features/dynamic-filter/data/condition-list';
import { schemaList } from '@/features/dynamic-filter/data/schema-list';
import { campaignList } from '@/features/campaign-dashboard/data/campaign-list';
import { mockCampaigns } from '@/features/campaign-dashboard/data/campaigns';
import { metricsData } from '@/features/analytics-dashboard/data/metrics';
import {
	revenueOverTimeData,
	userActivityData,
	salesByCategoryData,
	trafficSourcesData,
} from '@/features/analytics-dashboard/data/charts';
import { productPerformanceTable } from '@/features/analytics-dashboard/data/tables';

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

	// Individual metric widget endpoints
	http.get('*/api/analytics/metrics/metric-1', async () => {
		console.log('[MSW] /api/analytics/metrics/metric-1 intercepted');
		await delay(300); // Fast metrics
		return HttpResponse.json(metricsData[0]);
	}),

	http.get('*/api/analytics/metrics/metric-2', async () => {
		console.log('[MSW] /api/analytics/metrics/metric-2 intercepted');
		await delay(400);
		return HttpResponse.json(metricsData[1]);
	}),

	http.get('*/api/analytics/metrics/metric-3', async () => {
		console.log('[MSW] /api/analytics/metrics/metric-3 intercepted');
		await delay(350);
		return HttpResponse.json(metricsData[2]);
	}),

	http.get('*/api/analytics/metrics/metric-4', async () => {
		console.log('[MSW] /api/analytics/metrics/metric-4 intercepted');
		await delay(450);
		return HttpResponse.json(metricsData[3]);
	}),

	// Individual chart widget endpoints
	http.get('*/api/analytics/charts/chart-1', async () => {
		console.log('[MSW] /api/analytics/charts/chart-1 intercepted');
		await delay(800); // Charts take longer
		return HttpResponse.json(revenueOverTimeData);
	}),

	http.get('*/api/analytics/charts/chart-2', async () => {
		console.log('[MSW] /api/analytics/charts/chart-2 intercepted');
		await delay(900);
		return HttpResponse.json(userActivityData);
	}),

	http.get('*/api/analytics/charts/chart-3', async () => {
		console.log('[MSW] /api/analytics/charts/chart-3 intercepted');
		await delay(700);
		return HttpResponse.json(salesByCategoryData);
	}),

	http.get('*/api/analytics/charts/chart-4', async () => {
		console.log('[MSW] /api/analytics/charts/chart-4 intercepted');
		await delay(850);
		return HttpResponse.json(trafficSourcesData);
	}),

	// Table endpoint
	http.get('*/api/analytics/tables/table-1', async () => {
		console.log('[MSW] /api/analytics/tables/table-1 intercepted');
		await delay(1200); // Tables are heavy
		return HttpResponse.json(productPerformanceTable);
	}),
];
