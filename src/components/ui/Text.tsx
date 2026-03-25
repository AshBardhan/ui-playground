import { ReactNode } from 'react';
import clsx from 'clsx';

interface TextProps {
	variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
	children: ReactNode;
	className?: string;
}

export const Text = ({ variant = 'div', children, className }: TextProps) => {
	const baseClasses = clsx(
		variant === 'h1' && 'text-2xl font-bold text-gray-900',
		variant === 'h2' && 'text-xl font-bold text-gray-900',
		variant === 'h3' && 'text-lg font-bold text-gray-900',
		variant === 'h4' && 'text-base font-semibold text-gray-900',
		variant === 'h5' && 'text-sm font-semibold text-gray-900',
		variant === 'h6' && 'text-xs font-semibold text-gray-900',
		variant === 'p' && 'text-sm font-normal text-gray-700',
		variant === 'div' && 'text-sm font-normal text-gray-700',
		className
	);

	const Component = variant;

	return <Component className={baseClasses}>{children}</Component>;
};
