import { CampaignStatus } from '@/types/campaign';
import { Button } from '@headlessui/react';
import clsx from 'clsx';

interface FilterGroupProps {
	title: string;
	options: CampaignStatus[];
	selectedValues: CampaignStatus[];
	onChange: (values: CampaignStatus[]) => void;
	className?: string;
}

const statusLabels: Record<CampaignStatus, string> = {
	DRAFT: 'Draft',
	RUNNING: 'Running',
	PAUSED: 'Paused',
	ARCHIVED: 'Archived',
};

export const FilterGroup = ({ title, options, selectedValues, onChange, className }: FilterGroupProps) => {
	const handleToggle = (option: CampaignStatus) => {
		const newValues = selectedValues.includes(option)
			? selectedValues.filter((value) => value !== option)
			: [...selectedValues, option];
		onChange(newValues);
	};

	const handleSelectAll = () => {
		onChange(options);
	};

	const handleClearAll = () => {
		onChange([]);
	};

	return (
		<div className={clsx('space-y-3', className)}>
			<div className="flex items-center justify-between">
				<h3 className="text-sm font-medium text-gray-900">{title}</h3>
				<div className="flex gap-1">
					<Button onClick={handleSelectAll} className="text-xs text-blue-600 hover:text-blue-800">
						All
					</Button>
					<span className="text-gray-300">|</span>
					<Button onClick={handleClearAll} className="text-xs text-gray-600 hover:text-gray-800">
						Clear
					</Button>
				</div>
			</div>

			<div className="space-y-2">
				{options.map((option) => {
					const isSelected = selectedValues.includes(option);
					return (
						<label
							key={option}
							className={clsx(
								'flex items-center space-x-2 cursor-pointer',
								'p-2 rounded-md hover:bg-gray-50 transition-colors'
							)}
						>
							<input
								type="checkbox"
								checked={isSelected}
								onChange={() => handleToggle(option)}
								className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<span className="text-sm text-gray-700">{statusLabels[option]}</span>
						</label>
					);
				})}
			</div>
		</div>
	);
};
