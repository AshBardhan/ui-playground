import { Checkbox, Field, Label } from '@headlessui/react';
import { Check } from 'lucide-react';
import { Button } from './Button';
import clsx from 'clsx';
import { Text } from './Text';

export interface FilterOption {
	label: string;
	value: string;
}

interface FilterGroupProps {
	title: string;
	options: FilterOption[];
	selectedValues: string[];
	onChange: (values: string[]) => void;
	className?: string;
}

export const FilterGroup = ({ title, options, selectedValues, onChange, className }: FilterGroupProps) => {
	const handleToggle = (value: string) => {
		const newValues = selectedValues.includes(value)
			? selectedValues.filter((v) => v !== value)
			: [...selectedValues, value];
		onChange(newValues);
	};

	const handleSelectAll = () => {
		onChange(options.map((opt) => opt.value));
	};

	const handleClearAll = () => {
		onChange([]);
	};

	return (
		<div className={clsx('space-y-2', className)}>
			<div className="flex items-center justify-between">
				<Text variant="h5">{title}</Text>
				<div className="flex gap-1 items-center">
					<Button onClick={handleSelectAll} theme="ghost" size="sm">
						All
					</Button>
					<Button type="reset" onClick={handleClearAll} theme="ghost" size="sm" className="text-gray-600">
						Clear
					</Button>
				</div>
			</div>

			<div>
				{options.map((option) => {
					const isSelected = selectedValues.includes(option.value);
					return (
						<Field
							key={option.value}
							className={clsx(
								'flex items-center gap-3 cursor-pointer',
								'px-2 py-1 rounded-md hover:bg-gray-50 transition-colors'
							)}
						>
							<Checkbox
								checked={isSelected}
								onChange={() => handleToggle(option.value)}
								className={clsx(
									'group h-5 w-5 rounded border flex items-center justify-center transition-colors',
									'border-gray-300 data-checked:bg-blue-600 data-checked:border-blue-600'
								)}
							>
								<Check className="h-3 w-3 text-white opacity-0 group-data-checked:opacity-100" strokeWidth={3} />
							</Checkbox>
							<Label className="flex-1 font-medium text-sm text-gray-800 cursor-pointer">{option.label}</Label>
						</Field>
					);
				})}
			</div>
		</div>
	);
};
