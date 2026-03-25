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
		<Card className={clsx('p-0! overflow-hidden', className)}>
			<div className="p-4 sm:p-6 border-b border-gray-200 flex items-start justify-between flex-col md:flex-row md:items-center gap-3">
				<Text variant="h3" className="text-lg font-semibold text-gray-900">
					{title} {!loading && data?.pagination && <span>({data?.pagination.total})</span>}
				</Text>

				{data?.searchable && (
					<SearchBox
						value={searchInput}
						onChange={handleSearch}
						placeholder="Search table..."
						className="md:max-w-sm w-full max-w-full"
					/>
				)}
			</div>

			{loading && (
				<div className="p-4 sm:p-6 space-y-3">
					{[1, 2, 3, 4, 5, 6].map((i) => (
						<Skeleton key={i} height={40} />
					))}
				</div>
			)}

			{error && (
				<div className="p-6 flex items-center gap-2 text-red-600">
					<AlertCircle className="h-5 w-5" />
					<Text variant="p" className="text-sm">
						{error.message}
					</Text>
				</div>
			)}

			{!loading && !error && data && (
				<>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50 border-b border-gray-200">
								<tr>
									{columns.map((column) => (
										<th
											key={String(column.key)}
											className={clsx(
												'px-3 py-2 sm:px-6 sm:py-4 text-xs font-medium text-gray-700 uppercase tracking-wider',
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
									data.rows.map((row, index) => (
										<tr
											key={row.id}
											className={clsx('hover:bg-gray-100 transition-colors', index % 2 === 1 && 'bg-gray-50')}
										>
											{columns.map((column) => (
												<td
													key={String(column.key)}
													className={clsx(
														'px-3 py-2 sm:px-6 sm:py-4 sm:text-sm text-xs text-gray-900',
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
							<Text className="text-xs md:text-base text-gray-800">
								Page <span className="font-semibold">{data.pagination.page}</span> of{' '}
								<span className="font-semibold">{data.pagination.totalPages}</span>
								<span className="ml-4 text-xs text-gray-500">
									(Showing{' '}
									<span className="font-medium">
										{Math.min((data.pagination.page - 1) * data.pagination.pageSize + 1, data.pagination.total)}-
										{Math.min(data.pagination.page * data.pagination.pageSize, data.pagination.total)}
									</span>{' '}
									of <span className="font-medium">{data.pagination.total}</span>)
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
