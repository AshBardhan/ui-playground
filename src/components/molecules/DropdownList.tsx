import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import clsx from 'clsx';

interface DropdownListProps {
	options: string[];
	disabled?: boolean;
	selectedOption: string;
	onSelect: (value: string) => void;
}

export const DropdownList = ({ options, disabled = false, selectedOption, onSelect }: DropdownListProps) => {
	const listboxClasses = clsx(
		'flex items-center justify-between gap-2 border px-2 rounded h-8 min-w-20',
		disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-white'
	);
	return (
		<Listbox value={selectedOption} onChange={onSelect} disabled={disabled}>
			{({ open }) => (
				<>
					<ListboxButton className={listboxClasses}>
						<span>{selectedOption}</span>
						{open ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
					</ListboxButton>
					<ListboxOptions className="mt-1 bg-white border rounded shadow w-32 z-10" anchor="bottom">
						{options.map((option) => (
							<ListboxOption key={option} value={option}>
								{({ selected }) => (
									<div
										className={clsx(
											'cursor-pointer px-2 py-1',
											selected ? 'bg-blue-200 font-medium' : 'hover:bg-gray-100'
										)}
									>
										{option}
									</div>
								)}
							</ListboxOption>
						))}
					</ListboxOptions>
				</>
			)}
		</Listbox>
	);
};
