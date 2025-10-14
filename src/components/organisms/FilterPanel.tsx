import { CampaignStatus, CampaignFilters } from '@/types/campaign';
import { SearchBox } from '@/components/atoms/SearchBox';
import { FilterGroup } from '@/components/molecules/FilterGroup';
import { Button } from '@headlessui/react';
import clsx from 'clsx';

interface FilterPanelProps {
	filters: CampaignFilters;
	onFiltersChange: (filters: CampaignFilters) => void;
	className?: string;
}

const statusOptions: CampaignStatus[] = ['DRAFT', 'RUNNING', 'PAUSED', 'ARCHIVED'];

export const FilterPanel = ({ filters, onFiltersChange, className }: FilterPanelProps) => {
	const handleSearchChange = (search: string) => {
		onFiltersChange({ ...filters, search });
	};

	const handleStatusChange = (status: CampaignStatus[]) => {
		onFiltersChange({ ...filters, status });
	};

	const handleClearFilters = () => {
		onFiltersChange({});
	};

	const hasActiveFilters = filters.search || (filters.status && filters.status.length > 0);

	return (
		<div className={clsx('bg-white rounded-lg border border-gray-200 p-4', className)}>
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-semibold text-gray-900">Filters</h2>
				{hasActiveFilters && (
					<Button onClick={handleClearFilters} className="text-sm text-blue-600 hover:text-blue-800">
						Clear all
					</Button>
				)}
			</div>

			<div className="space-y-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">Search Campaigns</label>
					<SearchBox
						value={filters.search || ''}
						onChange={handleSearchChange}
						placeholder="Search by campaign name..."
					/>
				</div>

				<FilterGroup
					title="Status"
					options={statusOptions}
					selectedValues={filters.status || []}
					onChange={handleStatusChange}
				/>
			</div>

			{hasActiveFilters && (
				<div className="mt-4 pt-4 border-t border-gray-200">
					<div className="text-sm text-gray-600">
						Active filters:
						{filters.search && (
							<span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
								Search: "{filters.search}"
							</span>
						)}
						{filters.status && filters.status.length > 0 && (
							<span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
								Status: {filters.status.length} selected
							</span>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
