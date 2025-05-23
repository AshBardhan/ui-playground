import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

interface DropdownListProps {
	options: string[];
	selectedOption: string;
	onSelect: (value: string) => void;
}

export default function DropdownList({ options, selectedOption, onSelect }: DropdownListProps) {
	return (
		<Listbox value={selectedOption} onChange={onSelect}>
			<ListboxButton className="border px-2 py-1 rounded w-32 text-left bg-white">{selectedOption}</ListboxButton>
			<ListboxOptions className="mt-1 bg-white border rounded shadow w-32 z-10" anchor="bottom">
				{options.map((option) => (
					<ListboxOption className="cursor-pointer px-2 py-1 hover:bg-gray-100" key={option} value={option}>
						{option}
					</ListboxOption>
				))}
			</ListboxOptions>
		</Listbox>
	);
}
