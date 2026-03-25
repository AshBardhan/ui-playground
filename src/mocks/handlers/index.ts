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

	http.get('*/api/dashboard/campaigns', async ({ request }) => {
		console.log('[MSW] /api/dashboard/campaigns intercepted');
		await delay(800);

		const url = new URL(request.url);
		const cursor = url.searchParams.get('cursor');
		const limit = parseInt(url.searchParams.get('limit') || '50');
		const statusFilter = url.searchParams.get('status');
		const searchQuery = url.searchParams.get('search');

		// Calculate status counts for ALL campaigns (before filtering)
		const statusCounts = mockCampaigns.reduce(
			(counts, campaign) => {
				counts[campaign.status] = (counts[campaign.status] || 0) + 1;
				return counts;
			},
			{} as Record<string, number>
		);

		// Start with all campaigns
		let filteredCampaigns = [...mockCampaigns];

		// Apply status filter
		if (statusFilter) {
			const statuses = statusFilter.split(',');
			filteredCampaigns = filteredCampaigns.filter((campaign) => statuses.includes(campaign.status));
		}

		// Apply search filter
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filteredCampaigns = filteredCampaigns.filter((campaign) => campaign.name.toLowerCase().includes(query));
		}

		// Find cursor position
		let startIndex = 0;
		if (cursor) {
			const cursorIndex = filteredCampaigns.findIndex((c) => c.id === cursor);
			startIndex = cursorIndex >= 0 ? cursorIndex + 1 : 0;
		}

		// Paginate
		const paginatedData = filteredCampaigns.slice(startIndex, startIndex + limit);
		const hasMore = startIndex + limit < filteredCampaigns.length;
		const nextCursor = hasMore ? paginatedData[paginatedData.length - 1].id : null;

		return HttpResponse.json({
			data: paginatedData,
			pagination: {
				nextCursor,
				hasMore,
				total: filteredCampaigns.length,
				statusCounts,
			},
		});
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

	// Table endpoint with server-side pagination
	http.get('*/api/analytics/tables/table-1', async ({ request }) => {
		console.log('[MSW] /api/analytics/tables/table-1 intercepted');
		await delay(800); // Simulate network delay

		const url = new URL(request.url);
		const page = parseInt(url.searchParams.get('page') || '1');
		const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
		const search = url.searchParams.get('search') || '';
		const sortBy = url.searchParams.get('sortBy') || 'revenue';
		const sortDir = (url.searchParams.get('sortDir') as 'asc' | 'desc' | '') || 'desc';

		// Start with full dataset
		const baseData = randomData(productPerformanceTable, productPerformanceTableV2);
		let allRows = [...baseData.rows];

		// Step 1: Filter by search query (server-side search)
		if (search) {
			const query = search.toLowerCase();
			allRows = allRows.filter((row) =>
				Object.values(row).some((value) => {
					if (value === null || value === undefined) return false;
					return String(value).toLowerCase().includes(query);
				})
			);
		}

		// Step 2: Sort data (server-side sort)
		if (sortBy && sortDir) {
			allRows.sort((a, b) => {
				const aValue = a[sortBy as keyof typeof a];
				const bValue = b[sortBy as keyof typeof b];

				// Handle null/undefined
				if (aValue == null) return 1;
				if (bValue == null) return -1;

				// Compare values
				let comparison = 0;
				if (typeof aValue === 'string' && typeof bValue === 'string') {
					comparison = aValue.localeCompare(bValue);
				} else if (typeof aValue === 'number' && typeof bValue === 'number') {
					comparison = aValue - bValue;
				}

				return sortDir === 'desc' ? -comparison : comparison;
			});
		}

		// Step 3: Paginate (server-side pagination)
		const total = allRows.length;
		const totalPages = Math.ceil(total / pageSize);
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		const pageRows = allRows.slice(start, end);

		// Return paginated response (server sends column config, client has render functions)
		return HttpResponse.json({
			id: baseData.id,
			title: baseData.title,
			columns: [
				{ key: 'product', label: 'Product', sortable: true, align: 'left', width: '25%' },
				{ key: 'category', label: 'Category', sortable: true, align: 'left', width: '15%' },
				{ key: 'revenue', label: 'Revenue', sortable: true, align: 'right', width: '15%' },
				{ key: 'units', label: 'Units Sold', sortable: true, align: 'right', width: '12%' },
				{ key: 'growth', label: 'Growth', sortable: true, align: 'right', width: '12%' },
				{ key: 'status', label: 'Status', sortable: true, align: 'right', width: '13%' },
			],
			rows: pageRows,
			searchable: baseData.searchable,
			pagination: {
				page,
				pageSize,
				total,
				totalPages,
			},
			defaultSort: baseData.defaultSort,
		});
	}),
];
