import {
	ProductStatus,
	ColumnRenderConfig,
	ColumnServerConfig,
	ColumnDefinition,
	ProductPerformance,
} from '../types/table';
import { formatCurrency, formatNumber, formatPercentage } from '@/utils/numberUtils';

/**
 * Client-side render functions for ProductPerformance columns.
 * Merged with server column configs by key to create complete column definitions.
 */
export const productPerformanceColumnRenderConfig: ColumnRenderConfig<ProductPerformance> = {
	revenue: (value: number) => formatCurrency(value),
	units: (value: number) => formatNumber(value),
	growth: (value: number) => (
		<span className={value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-gray-600'}>
			{formatPercentage(value)}
		</span>
	),
	status: (value: ProductStatus) => {
		const statusColors: Record<ProductStatus, string> = {
			active: 'bg-green-100 text-green-800',
			'low-stock': 'bg-yellow-100 text-yellow-800',
			'out-of-stock': 'bg-red-100 text-red-800',
		};
		const statusLabels: Record<ProductStatus, string> = {
			active: 'Active',
			'low-stock': 'Low Stock',
			'out-of-stock': 'Out of Stock',
		};
		return (
			<span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value]}`}>{statusLabels[value]}</span>
		);
	},
};

/**
 * Merges server column metadata with client render functions.
 * Server controls order/labels/sortability. Client provides custom formatting.
 */
export function mergeColumnConfig<T>(
	serverColumns: ColumnServerConfig<T>[],
	renderConfig: ColumnRenderConfig<T>
): ColumnDefinition<T>[] {
	return serverColumns.map((serverCol) => ({
		...serverCol,
		render: renderConfig[serverCol.key],
	})) as ColumnDefinition<T>[];
}
