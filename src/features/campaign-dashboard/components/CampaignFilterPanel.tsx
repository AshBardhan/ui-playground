import { CampaignStatus, CampaignFilters } from '../types/campaign';
import { SearchBox } from '@/components/ui/SearchBox';
import { FilterGroup } from '@/components/ui/FilterGroup';
import { Button } from '@/components/ui/Button';
import type { FilterOption } from '@/components/ui/FilterGroup';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';

interface CampaignFilterPanelProps {
	filters: CampaignFilters;
	onFiltersChange: (filters: CampaignFilters) => void;
	statusOptions: FilterOption[];
	className?: string;
}

export const CampaignFilterPanel = ({
	filters,
	onFiltersChange,
	statusOptions,
	className,
}: CampaignFilterPanelProps) => {
	// Update search filter while preserving status filter
	const handleSearchChange = (search: string) => {
		onFiltersChange({ ...filters, search });
	};

	// Update status filter while preserving search filter (type cast to CampaignStatus[])
	const handleStatusChange = (statuses: string[]) => {
		onFiltersChange({ ...filters, status: statuses as CampaignStatus[] });
	};

	// Clear all filters (empty object)
	const handleClearFilters = () => {
		onFiltersChange({});
	};

	// Check if any filter is active (shows/hides clear button and active filter summary)
	const hasActiveFilters = filters.search || (filters.status && filters.status.length > 0);

	return (
		<Card>
			<div className="flex items-center justify-between mb-4">
				<Text variant="h5">Filters</Text>
				{hasActiveFilters && (
					<Button type="reset" onClick={handleClearFilters} theme="secondary">
						Clear all
					</Button>
				)}
			</div>

			<div className="space-y-6">
				<SearchBox
					label="Search campaigns"
					value={filters.search || ''}
					onChange={handleSearchChange}
					placeholder="Search by campaign name..."
				/>

				<FilterGroup
					title="Status"
					options={statusOptions}
					selectedValues={filters.status || []}
					onChange={handleStatusChange}
				/>
			</div>

			{hasActiveFilters && (
				<div className="mt-4 pt-4 border-t border-gray-200 flex gap-0.5 items-center flex-wrap">
					<Text variant="h6">Active filters:</Text>
					{filters.search && (
						<span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Search: "{filters.search}"</span>
					)}
					{filters.status && filters.status.length > 0 && (
						<span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
							Status: {filters.status.length} selected
						</span>
					)}
				</div>
			)}
		</Card>
	);
};
