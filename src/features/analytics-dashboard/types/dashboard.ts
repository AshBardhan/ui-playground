export type WidgetType = 'metric' | 'chart' | 'table';

export interface BaseWidget {
	id: string;
	type: WidgetType;
	endpoint: string;
	size?: 'small' | 'medium' | 'large' | 'full';
}

export interface MetricWidget extends BaseWidget {
	type: 'metric';
}

export interface ChartWidget extends BaseWidget {
	title: string;
	type: 'chart';

	// Optional control options for interactive charts
	sortOptions?: string[];
	rangeOptions?: string[];
	periodOptions?: string[];
}

export interface TableWidget extends BaseWidget {
	title: string;
	type: 'table';
}

export type DashboardWidget = MetricWidget | ChartWidget | TableWidget;

export interface DashboardData {
	id: string;
	title: string;
	description?: string;
	widgets: DashboardWidget[];
	lastUpdated: string;
}
