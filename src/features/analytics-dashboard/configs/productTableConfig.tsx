import {
	ProductStatus,
	ColumnRenderConfig,
	ColumnServerConfig,
	ColumnDefinition,
	ProductPerformance,
} from '../types/table';
import { formatCurrency, formatNumber, formatPercentage } from '@/utils/numberUtils';
import { Badge } from '@/components/ui/Badge';
import clsx from 'clsx';

/**
 * Client-side render functions for ProductPerformance columns.
 * Merged with server column configs by key to create complete column definitions.
 */
export const productPerformanceColumnRenderConfig: ColumnRenderConfig<ProductPerformance> = {
	revenue: (value: number) => formatCurrency(value),
	units: (value: number) => formatNumber(value),
	growth: (value: number) => (
		<span
			className={clsx('font-semibold', value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-gray-600')}
		>
			{formatPercentage(value)}
		</span>
	),
	status: (value: ProductStatus) => {
		const variantMap: Record<ProductStatus, 'success' | 'warning' | 'error'> = {
			active: 'success',
			'low-stock': 'warning',
			'out-of-stock': 'error',
		};
		const labelMap: Record<ProductStatus, string> = {
			active: 'Active',
			'low-stock': 'Low Stock',
			'out-of-stock': 'Out of Stock',
		};
		return <Badge label={labelMap[value]} variant={variantMap[value]} size="sm" />;
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
