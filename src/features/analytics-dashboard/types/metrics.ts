export type TrendDirection = 'up' | 'down' | 'neutral';

export interface MetricData {
	id: string;
	label: string;
	value: number;
	change: number; // percentage change
	trend: TrendDirection;
	prefix?: string; // e.g., '$', '€'
	suffix?: string; // e.g., '%', 'K', 'M'
	format?: 'number' | 'currency' | 'percentage';
}

export interface MetricWidgetData extends MetricData {
	description?: string;
	icon?: string;
}
