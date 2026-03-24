import { useState, useEffect } from 'react';
import { PaginatedTableData, SortConfig, ColumnDefinition, ColumnRenderConfig } from '../../types/table';
import { mergeColumnConfig } from '../../configs/productTableConfig';
import { SearchBox } from '@/components/ui/SearchBox';
import { Skeleton } from '@/components/ui/Skeleton';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { ChevronUp, ChevronDown, ChevronsUpDown, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { useFetch } from '@/hooks/useFetch';
import { useDebounce } from '@/hooks/useDebounce';

interface TableDataWidgetProps<T extends { id: string }> {
	endpoint: string;
	title: string;
	renderConfig: ColumnRenderConfig<T>;
	refreshKey?: number;
	className?: string;
}

/**
 * Server-side paginated table with search, sort, and navigation.
 * Server sends column configs + rows. Client provides render functions.
 */
export const TableDataWidget = <T extends { id: string }>({
	endpoint,
	title,
	renderConfig,
	refreshKey = 0,
	className,
}: TableDataWidgetProps<T>) => {
	const [page, setPage] = useState(1);
	const [pageSize] = useState(10);

	const [searchInput, setSearchInput] = useState('');
	const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
		key: '',
		direction: null,
	});

	// Debounce search input to reduce API calls
	const debouncedSearchQuery = useDebounce(searchInput, 300);

	const params = new URLSearchParams({
		page: String(page),
		pageSize: String(pageSize),
		search: debouncedSearchQuery,
		sortBy: String(sortConfig.key),
		sortDir: sortConfig.direction || '',
		v: String(refreshKey),
	});

	const { data, loading, error } = useFetch<PaginatedTableData<T>>({
		url: `${endpoint}?${params}`,
		cache: false,
	});

	// Merge server column configs with client render functions
	const columns = data ? mergeColumnConfig(data.columns, renderConfig) : [];

	// Reset to page 1 when debounced search or sort changes
	useEffect(() => {
		setPage(1);
	}, [debouncedSearchQuery, sortConfig]);

	// Three-state sort cycle: none → asc → desc → none
	const handleSort = (columnKey: keyof T) => {
		const column = columns.find((col) => col.key === columnKey);
		if (!column?.sortable) return;

		setSortConfig((prev) => {
			if (prev.key !== columnKey) {
				return { key: columnKey, direction: 'asc' };
			}
			if (prev.direction === 'asc') {
				return { key: columnKey, direction: 'desc' };
			}
			return { key: '', direction: null };
		});
	};

	const handleSearch = (query: string) => {
		setSearchInput(query);
	};

	const getSortIcon = (columnKey: keyof T) => {
		if (sortConfig.key !== columnKey) {
			return <ChevronsUpDown className="h-4 w-4 text-gray-400" />;
		}
		if (sortConfig.direction === 'asc') {
			return <ChevronUp className="h-4 w-4 text-blue-600" />;
		}
		return <ChevronDown className="h-4 w-4 text-blue-600" />;
	};

	const renderCellValue = (column: ColumnDefinition<T>, row: T): React.ReactNode => {
		const value = row[column.key as keyof T];
		if (column.render) {
			return column.render(value);
		}
		return String(value);
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
							{data.pagination && <Text className="text-sm text-gray-500">{data.pagination.total} items</Text>}
						</div>

						{data.searchable && (
							<SearchBox
								value={searchInput}
								onChange={handleSearch}
								placeholder="Search table..."
								className="max-w-md"
							/>
						)}
					</div>

					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50 border-b border-gray-200">
								<tr>
									{columns.map((column) => (
										<th
											key={String(column.key)}
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
								{data.rows.length === 0 ? (
									<tr>
										<td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
											No data found
										</td>
									</tr>
								) : (
									data.rows.map((row) => (
										<tr key={row.id} className="hover:bg-gray-50 transition-colors">
											{columns.map((column) => (
												<td
													key={String(column.key)}
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

					{/* Pagination Controls */}
					{data.pagination && data.pagination.totalPages > 1 && (
						<div className="p-4 border-t border-gray-200 flex items-center justify-between">
							<Text className="text-sm text-gray-600">
								Page {data.pagination.page} of {data.pagination.totalPages}
								<span className="ml-2 text-gray-500">
									(Showing {Math.min((data.pagination.page - 1) * data.pagination.pageSize + 1, data.pagination.total)}-
									{Math.min(data.pagination.page * data.pagination.pageSize, data.pagination.total)} of{' '}
									{data.pagination.total})
								</span>
							</Text>

							<div className="flex items-center gap-2">
								<Button theme="secondary" size="sm" disabled={page === 1 || loading} onClick={() => setPage(page - 1)}>
									<ChevronLeft className="h-4 w-4" />
									Previous
								</Button>

								{/* Page number buttons */}
								<div className="flex gap-1">
									{Array.from(
										{ length: Math.min(5, data.pagination.totalPages) },
										(_, i) => i + Math.max(1, Math.min(page - 2, data.pagination.totalPages - 4))
									)
										.filter((pageNum) => pageNum <= data.pagination.totalPages)
										.map((pageNum) => (
											<Button
												key={pageNum}
												theme={page === pageNum ? 'primary' : 'secondary'}
												size="sm"
												onClick={() => setPage(pageNum)}
												disabled={loading}
											>
												{pageNum}
											</Button>
										))}
								</div>

								<Button
									theme="secondary"
									size="sm"
									disabled={page === data.pagination.totalPages || loading}
									onClick={() => setPage(page + 1)}
								>
									Next
									<ChevronRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
					)}
				</>
			)}
		</Card>
	);
};
