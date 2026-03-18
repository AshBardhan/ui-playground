import { useState, useMemo } from 'react';
import { TableData, SortConfig, SortDirection, ColumnDefinition } from '../../types/table';
import { SearchBox } from '@/components/ui/SearchBox';
import { Skeleton } from '@/components/ui/Skeleton';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { ChevronUp, ChevronDown, ChevronsUpDown, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { useFetch } from '@/hooks/useFetch';

interface TableDataWidgetProps<T = any> {
	endpoint: string;
	title: string;
	refreshKey?: number;
	className?: string;
}

export const TableDataWidget = <T extends Record<string, any>>({
	endpoint,
	title,
	refreshKey = 0,
	className,
}: TableDataWidgetProps<T>) => {
	const { data, loading, error } = useFetch<TableData<T>>({
		url: `${endpoint}?v=${refreshKey}`,
	});
	const [searchQuery, setSearchQuery] = useState('');
	const [sortConfig, setSortConfig] = useState<SortConfig>(data?.defaultSort || { key: '', direction: null });

	// Filter rows based on search query
	const filteredRows = useMemo(() => {
		if (!data || !searchQuery || !data.searchable) return data?.rows || [];

		const query = searchQuery.toLowerCase();
		return data.rows.filter((row) => {
			return Object.values(row).some((value) => {
				if (value === null || value === undefined) return false;
				return String(value).toLowerCase().includes(query);
			});
		});
	}, [data, searchQuery]);

	// Sort rows
	const sortedRows = useMemo(() => {
		if (!data || !sortConfig.key || !sortConfig.direction) return filteredRows;

		const sorted = [...filteredRows].sort((a, b) => {
			const column = data.columns.find((col) => col.key === sortConfig.key);

			// Use custom sort value function if provided
			let aValue = column?.sortValue ? column.sortValue(a) : a[sortConfig.key];
			let bValue = column?.sortValue ? column.sortValue(b) : b[sortConfig.key];

			// Handle null/undefined values
			if (aValue == null) return 1;
			if (bValue == null) return -1;

			// Compare values
			if (typeof aValue === 'string' && typeof bValue === 'string') {
				return aValue.localeCompare(bValue);
			}

			if (aValue < bValue) return -1;
			if (aValue > bValue) return 1;
			return 0;
		});

		return sortConfig.direction === 'desc' ? sorted.reverse() : sorted;
	}, [filteredRows, sortConfig, data]);

	const handleSort = (columnKey: string) => {
		if (!data) return;
		const column = data.columns.find((col) => col.key === columnKey);
		if (!column?.sortable) return;

		setSortConfig((prev) => {
			if (prev.key !== columnKey) {
				return { key: columnKey, direction: 'asc' };
			}
			if (prev.direction === 'asc') {
				return { key: columnKey, direction: 'desc' };
			}
			if (prev.direction === 'desc') {
				return { key: '', direction: null };
			}
			return { key: columnKey, direction: 'asc' };
		});
	};

	const getSortIcon = (columnKey: string) => {
		if (sortConfig.key !== columnKey) {
			return <ChevronsUpDown className="h-4 w-4 text-gray-400" />;
		}
		if (sortConfig.direction === 'asc') {
			return <ChevronUp className="h-4 w-4 text-blue-600" />;
		}
		return <ChevronDown className="h-4 w-4 text-blue-600" />;
	};

	const renderCellValue = (column: ColumnDefinition<T>, row: T) => {
		const value = row[column.key];
		if (column.render) {
			return column.render(value, row);
		}
		return value;
	};

	return (
		<Card className={clsx('p-0 overflow-hidden', className)}>
			{loading && (
				<>
					<div className="p-6 border-b border-gray-200">
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<Skeleton height={24} />
								<Skeleton height={20} />
							</div>
							<Skeleton height={40} />
						</div>
					</div>
					<div className="p-6">
						<div className="space-y-3">
							<Skeleton height={40} />
							{[1, 2, 3, 4, 5].map((i) => (
								<Skeleton key={i} height={48} />
							))}
						</div>
					</div>
				</>
			)}

			{error && (
				<div className="p-6">
					<div className="flex items-center gap-2 text-red-600">
						<AlertCircle className="h-5 w-5" />
						<Text variant="p" className="text-sm">
							{error.message}
						</Text>
					</div>
				</div>
			)}

			{!loading && !error && data && (
				<>
					<div className="p-6 border-b border-gray-200">
						<div className="flex items-center justify-between mb-4">
							<Text variant="h3" className="text-lg font-semibold text-gray-900">
								{title}
							</Text>
							<Text className="text-sm text-gray-500">{sortedRows.length} items</Text>
						</div>

						{data.searchable && (
							<SearchBox
								value={searchQuery}
								onChange={setSearchQuery}
								placeholder="Search table..."
								className="max-w-md"
							/>
						)}
					</div>

					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50 border-b border-gray-200">
								<tr>
									{data.columns.map((column) => (
										<th
											key={column.key}
											className={clsx(
												'px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider',
												column.sortable && 'cursor-pointer hover:bg-gray-100 select-none'
											)}
											style={{ width: column.width }}
											onClick={() => column.sortable && handleSort(column.key)}
										>
											<div
												className={clsx(
													'flex items-center gap-2',
													column.align === 'right' && 'justify-end',
													column.align === 'left' && 'justify-start',
													!column.align && 'justify-start'
												)}
											>
												<span>{column.label}</span>
												{column.sortable && getSortIcon(column.key)}
											</div>
										</th>
									))}
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{sortedRows.length === 0 ? (
									<tr>
										<td colSpan={data.columns.length} className="px-6 py-8 text-center text-gray-500">
											No data found
										</td>
									</tr>
								) : (
									sortedRows.map((row, index) => (
										<tr key={row.id || index} className="hover:bg-gray-50 transition-colors">
											{data.columns.map((column) => (
												<td
													key={column.key}
													className={clsx(
														'px-6 py-4 text-sm text-gray-900',
														column.align === 'right' && 'text-right',
														column.align === 'left' && 'text-left',
														!column.align && 'text-left'
													)}
												>
													{renderCellValue(column, row)}
												</td>
											))}
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</>
			)}
		</Card>
	);
};
