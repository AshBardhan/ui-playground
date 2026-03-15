import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import clsx from 'clsx';

interface DropdownListProps {
	options: string[];
	disabled?: boolean;
	selectedOption: string;
	onSelect: (value: string) => void;
	theme?: 'light' | 'dark';
}

export const DropdownList = ({
	options,
	disabled = false,
	selectedOption,
	onSelect,
	theme = 'light',
}: DropdownListProps) => {
	const listboxClasses = clsx(
		'flex items-center justify-between gap-2 border px-2 rounded h-8 min-w-20',
		disabled && 'opacity-50 cursor-not-allowed',
		theme === 'light' && (disabled ? 'bg-gray-100' : 'bg-white border-gray-300 text-gray-900'),
		theme === 'dark' && (disabled ? 'bg-gray-700' : 'bg-gray-800 border-gray-600 text-gray-100')
	);

	const listBoxOptionClasses = (selected: boolean) =>
		clsx(
			'cursor-pointer px-2 py-1',
			theme === 'light' ? 'text-gray-900' : 'text-gray-100',
			theme === 'light' && (selected ? 'bg-blue-200 font-medium' : 'hover:bg-gray-100'),
			theme === 'dark' && (selected ? 'bg-gray-900 font-medium' : 'hover:bg-gray-700')
		);

	return (
		<Listbox value={selectedOption} onChange={onSelect} disabled={disabled} as="div">
			{({ open }) => (
				<>
					<ListboxButton className={listboxClasses}>
						<span>{selectedOption}</span>
						{open ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
					</ListboxButton>

					<ListboxOptions
						className={clsx(
							'mt-1 border rounded shadow min-w-36 z-10',
							theme === 'light' && 'bg-white border-gray-300',
							theme === 'dark' && 'bg-gray-800 border-gray-600'
						)}
						anchor="bottom start"
					>
						{options.map((option) => (
							<ListboxOption key={option} value={option}>
								{({ selected }) => <div className={listBoxOptionClasses(selected)}>{option}</div>}
							</ListboxOption>
						))}
					</ListboxOptions>
				</>
			)}
		</Listbox>
	);
};
