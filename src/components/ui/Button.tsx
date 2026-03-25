import { Button as HeadlessButton } from '@headlessui/react';
import clsx from 'clsx';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonTheme = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
	size?: ButtonSize;
	theme?: ButtonTheme;
	type?: ButtonType;
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
}

export const Button = ({
	size = 'md',
	theme = 'primary',
	type = 'button',
	onClick,
	children,
	className,
	disabled = false,
}: ButtonProps) => {
	const sizeClasses: Record<ButtonSize, string> = {
		sm: 'px-2 py-1 text-xs gap-1',
		md: 'px-4 py-2 text-base gap-2',
		lg: 'px-6 py-3 text-lg gap-3',
	};

	const themeClasses: Record<ButtonTheme, string> = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
		secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 active:bg-gray-200',
		danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
		success: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
		ghost: 'text-blue-600 hover:bg-blue-50 active:bg-blue-100',
	};

	return (
		<HeadlessButton
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={clsx(
				'inline-flex items-center justify-center',
				'font-medium rounded-lg transition-colors duration-200',
				'focus:outline-none focus:shadow-md',
				'disabled:opacity-50 disabled:cursor-not-allowed',
				disabled && 'pointer-events-none',
				!disabled && 'cursor-pointer',
				sizeClasses[size],
				themeClasses[theme],
				className
			)}
		>
			{children}
		</HeadlessButton>
	);
};
