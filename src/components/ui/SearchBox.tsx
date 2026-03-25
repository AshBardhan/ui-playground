import { Input, Field, Label } from '@headlessui/react';
import { Search } from 'lucide-react';
import clsx from 'clsx';

interface SearchBoxProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	size?: 'sm' | 'md' | 'lg';
	variant?: 'default' | 'minimal';
	label?: string;
}

const sizeClasses = {
	sm: 'py-1 px-3 text-sm',
	md: 'py-2 px-4 text-base',
	lg: 'py-3 px-5 text-lg',
};

const variantClasses = {
	default: 'border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
	minimal: 'border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-blue-500',
};

export const SearchBox = ({
	value,
	onChange,
	placeholder = 'Search...',
	disabled = false,
	className,
	size = 'md',
	variant = 'default',
	label,
}: SearchBoxProps) => {
	const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;
	const iconPadding = size === 'sm' ? 'pl-8' : size === 'lg' ? 'pl-12' : 'pl-10';

	return (
		<Field className={className}>
			{label && <Label className="block text-sm font-medium text-gray-800 mb-2 cursor-pointer">{label}</Label>}
			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={iconSize} />
				<Input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					disabled={disabled}
					className={clsx(
						'w-full pr-4',
						iconPadding,
						sizeClasses[size],
						variantClasses[variant],
						'focus:outline-none focus:border-transparent',
						'disabled:bg-gray-100 disabled:cursor-not-allowed',
						'placeholder-gray-400'
					)}
				/>
			</div>
		</Field>
	);
};
