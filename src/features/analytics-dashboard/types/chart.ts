export type ChartType = 'line' | 'bar' | 'pie' | 'area';

export interface ChartDataPoint {
	label: string;
	value: number;
	category?: string;
}

export interface TimeSeriesDataPoint {
	date: string;
	value: number;
	category?: string;
}

export interface ChartData {
	id: string;
	title: string;
	type: ChartType;
	data: ChartDataPoint[] | TimeSeriesDataPoint[];
	color?: string;
	colors?: string[]; // for multi-series or pie charts
}

export interface LineChartData extends ChartData {
	type: 'line';
	data: TimeSeriesDataPoint[];
}

export interface BarChartData extends ChartData {
	type: 'bar';
	data: ChartDataPoint[];
}

export interface PieChartData extends ChartData {
	type: 'pie';
	data: ChartDataPoint[];
}

export interface AreaChartData extends ChartData {
	type: 'area';
	data: TimeSeriesDataPoint[];
}
