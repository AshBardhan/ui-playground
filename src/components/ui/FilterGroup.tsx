import { Button } from '@headlessui/react';
import clsx from 'clsx';

interface FilterGroupProps<T extends string> {
	title: string;
	options: T[];
	selectedValues: T[];
	onChange: (values: T[]) => void;
	labels?: Record<T, string>;
	className?: string;
}

export const FilterGroup = <T extends string>({
	title,
	options,
	selectedValues,
	onChange,
	labels,
	className,
}: FilterGroupProps<T>) => {
	const handleToggle = (option: T) => {
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

	const getLabel = (option: T) => labels?.[option] || option;

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
							<span className="text-sm text-gray-700">{getLabel(option)}</span>
						</label>
					);
				})}
			</div>
		</div>
	);
};
