export type ChartType = 'line' | 'bar' | 'pie' | 'area';

export interface ChartDataPoint {
	label: string;
	value: number;
	category?: string;
	color?: string;
}

export interface TimeSeriesDataPoint {
	date: string;
	value: number;
	category?: string;
}

export interface ChartData {
	id: string;
	type: ChartType;
	title: string;
}

export interface AreaChartData extends ChartData {
	type: 'area';
	color?: string;
	points: TimeSeriesDataPoint[];
}

export interface LineChartData extends ChartData {
	type: 'line';
	color?: string;
	points: TimeSeriesDataPoint[];
}

export interface BarChartData extends ChartData {
	type: 'bar';
	points: ChartDataPoint[];
}

export interface PieChartData extends ChartData {
	type: 'pie';
	points: ChartDataPoint[];
}
