export type WidgetType = 'metric' | 'chart' | 'table';

export interface BaseWidget {
	id: string;
	type: WidgetType;
	endpoint: string;
	gridArea?: string; // for CSS Grid positioning
	size?: 'small' | 'medium' | 'large' | 'full';
}

export interface MetricWidget extends BaseWidget {
	type: 'metric';
}

export interface ChartWidget extends BaseWidget {
	type: 'chart';
}

export interface TableWidget extends BaseWidget {
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
