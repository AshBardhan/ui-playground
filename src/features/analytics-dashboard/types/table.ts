/** Sort direction for table columns */
export type SortDirection = 'asc' | 'desc' | null;

/** Product status for inventory management */
export type ProductStatus = 'active' | 'low-stock' | 'out-of-stock';

/** Current sort configuration for a table */
export interface SortConfig<T> {
	key: keyof T | '';
	direction: SortDirection;
}

/**
 * Server-side column configuration (metadata only, JSON-serializable).
 * Server controls: order, labels, sorting, width, alignment.
 */
export interface ColumnServerConfig<T> {
	key: keyof T;
	label: string;
	sortable?: boolean;
	width?: string;
	align?: 'left' | 'right';
}

/** Configuration for a table column definition with strong typing */
export interface ColumnDefinition<T, K extends keyof T = keyof T> {
	key: K;
	label: string;
	sortable?: boolean;
	width?: string;
	align?: 'left' | 'right';
	render?: (value: T[K]) => React.ReactNode;
}

/** Client-side render function config */
export type ColumnRenderConfig<T> = {
	[K in keyof T]?: (value: T[K]) => React.ReactNode;
};

/** Client-side table data structure (all rows loaded) */
export interface TableData<T extends { id: string }> {
	id: string;
	title: string;
	rows: T[];
	searchable?: boolean;
	defaultSort?: SortConfig<T>;
}

/** Pagination metadata for server-side paginated tables */
export interface PaginationMeta {
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
}

/** Server-side paginated table data structure */
export interface PaginatedTableData<T extends { id: string }> {
	id: string;
	title: string;
	columns: ColumnServerConfig<T>[];
	rows: T[];
	searchable?: boolean;
	pagination: PaginationMeta;
	defaultSort?: SortConfig<T>;
}

/** Example domain model */
export interface ProductPerformance {
	id: string;
	product: string;
	category: string;
	revenue: number;
	units: number;
	growth: number;
	status: ProductStatus;
}
