import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

interface DropdownListProps {
	options: string[];
	disabled?: boolean;
	selectedOption: string;
	onSelect: (value: string) => void;
}

export const DropdownList = ({ options, disabled = false, selectedOption, onSelect }: DropdownListProps) => {
	return (
		<Listbox value={selectedOption} onChange={onSelect} disabled={disabled}>
			<ListboxButton
				className={`border px-2 py-1 rounded h-8 leading-none min-w-20 text-left ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-white'}`}
			>
				{selectedOption}
			</ListboxButton>
			<ListboxOptions className="mt-1 bg-white border rounded shadow w-32 z-10" anchor="bottom">
				{options.map((option) => (
					<ListboxOption className="cursor-pointer px-2 py-1 hover:bg-gray-100" key={option} value={option}>
						{option}
					</ListboxOption>
				))}
			</ListboxOptions>
		</Listbox>
	);
};
