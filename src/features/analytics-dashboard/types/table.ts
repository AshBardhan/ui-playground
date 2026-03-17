export type SortDirection = 'asc' | 'desc' | null;

export interface ColumnDefinition<T = any> {
	key: string;
	label: string;
	sortable?: boolean;
	width?: string;
	align?: 'left' | 'right';
	render?: (value: any, row: T) => React.ReactNode;
	sortValue?: (row: T) => string | number;
}

export interface SortConfig {
	key: string;
	direction: SortDirection;
}

export interface TableData<T = any> {
	id: string;
	title: string;
	columns: ColumnDefinition<T>[];
	rows: T[];
	searchable?: boolean;
	defaultSort?: SortConfig;
}

export interface ProductPerformance {
	id: string;
	product: string;
	category: string;
	revenue: number;
	units: number;
	growth: number;
	status: 'active' | 'low-stock' | 'out-of-stock';
}
