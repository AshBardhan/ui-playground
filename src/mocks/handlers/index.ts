import { delay, http, HttpResponse } from 'msw';
import { conditionList } from '@/features/dynamic-filter/data/condition-list';
import { schemaList } from '@/features/dynamic-filter/data/schema-list';
import { campaignList } from '@/features/campaign-dashboard/data/campaign-list';
import { mockCampaigns } from '@/features/campaign-dashboard/data/campaigns';
import { metricsData, metricsDataV2 } from '@/features/analytics-dashboard/data/metrics';
import {
	revenueOverTimeData,
	revenueOverTimeDataV2,
	userActivityData,
	userActivityDataV2,
	salesByCategoryData,
	salesByCategoryDataV2,
	trafficSourcesData,
	trafficSourcesDataV2,
} from '@/features/analytics-dashboard/data/charts';
import { productPerformanceTable, productPerformanceTableV2 } from '@/features/analytics-dashboard/data/tables';

// Helper to randomly select between two data versions
const randomData = <T>(dataV1: T, dataV2: T): T => (Math.random() > 0.5 ? dataV1 : dataV2);

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

	// All metrics in one call
	http.get('*/api/analytics/metrics', async () => {
		console.log('[MSW] /api/analytics/metrics intercepted');
		await delay(500); // Reasonable delay for multiple metrics
		const metrics = randomData(metricsData, metricsDataV2);
		return HttpResponse.json(metrics.slice(0, 4));
	}),

	// Individual chart widget endpoints
	http.get('*/api/analytics/charts/chart-1', async () => {
		console.log('[MSW] /api/analytics/charts/chart-1 intercepted');
		await delay(800); // Charts take longer
		return HttpResponse.json(randomData(revenueOverTimeData, revenueOverTimeDataV2));
	}),

	http.get('*/api/analytics/charts/chart-2', async () => {
		console.log('[MSW] /api/analytics/charts/chart-2 intercepted');
		await delay(900);
		return HttpResponse.json(randomData(userActivityData, userActivityDataV2));
	}),

	http.get('*/api/analytics/charts/chart-3', async () => {
		console.log('[MSW] /api/analytics/charts/chart-3 intercepted');
		await delay(700);
		return HttpResponse.json(randomData(salesByCategoryData, salesByCategoryDataV2));
	}),

	http.get('*/api/analytics/charts/chart-4', async () => {
		console.log('[MSW] /api/analytics/charts/chart-4 intercepted');
		await delay(850);
		return HttpResponse.json(randomData(trafficSourcesData, trafficSourcesDataV2));
	}),

	// Table endpoint
	http.get('*/api/analytics/tables/table-1', async () => {
		console.log('[MSW] /api/analytics/tables/table-1 intercepted');
		await delay(1200); // Tables are heavy
		return HttpResponse.json(randomData(productPerformanceTable, productPerformanceTableV2));
	}),
];
