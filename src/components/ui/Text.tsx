import { ReactNode } from 'react';
import clsx from 'clsx';

interface TextProps {
	variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
	children: ReactNode;
	className?: string;
}

export const Text = ({ variant = 'p', children, className }: TextProps) => {
	const baseClasses = clsx(
		variant === 'h1' && 'text-3xl font-bold text-gray-900',
		variant === 'h2' && 'text-2xl font-bold tracking-tight text-gray-900',
		variant === 'h3' && 'text-xl font-bold text-gray-900',
		variant === 'h4' && 'text-lg font-semibold text-gray-900',
		variant === 'h5' && 'text-base font-semibold text-gray-900',
		variant === 'h6' && 'text-sm font-semibold text-gray-900',
		variant === 'p' && 'font-normal text-gray-700',
		className
	);

	const Component = variant;

	return <Component className={baseClasses}>{children}</Component>;
};
