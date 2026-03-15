import clsx from 'clsx';

interface MetricProps {
	label: string;
	value: string | number;
	size?: 'sm' | 'md' | 'lg';
	variant?: 'positive' | 'negative' | 'neutral';
	className?: string;
}

const variantClasses = {
	positive: 'text-green-600',
	negative: 'text-red-600',
	neutral: 'text-gray-900',
};

const labelSizeClasses = {
	sm: 'text-xs',
	md: 'text-sm',
	lg: 'text-base',
};

const valueSizeClasses = {
	sm: 'text-base',
	md: 'text-lg',
	lg: 'text-xl',
};

export const Metric = ({ label, value, size = 'md', variant = 'neutral', className }: MetricProps) => {
	const formatValue = (val: string | number) => {
		if (typeof val === 'number') {
			return val.toLocaleString();
		}
		return val;
	};

	return (
		<div className={clsx('flex flex-col gap-0.25', className)}>
			<div className={clsx('text-gray-500', labelSizeClasses[size])}>{label}</div>
			<div className={clsx('font-semibold', valueSizeClasses[size], variantClasses[variant])}>{formatValue(value)}</div>
		</div>
	);
};
