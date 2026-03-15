import clsx from 'clsx';

type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
	label: string;
	variant?: StatusVariant;
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

const variantClasses = {
	success: 'bg-green-100 text-green-800 border-green-200',
	warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
	error: 'bg-red-100 text-red-800 border-red-200',
	info: 'bg-blue-100 text-blue-800 border-blue-200',
	neutral: 'bg-gray-100 text-gray-800 border-gray-200',
};

const sizeClasses = {
	sm: 'px-2 py-0.5 text-xs',
	md: 'px-2.5 py-0.5 text-xs',
	lg: 'px-3 py-1 text-sm',
};

export const Badge = ({ label, variant = 'neutral', size = 'md', className }: BadgeProps) => {
	return (
		<span
			className={clsx(
				'inline-flex items-center rounded-full font-medium border',
				variantClasses[variant],
				sizeClasses[size],
				className
			)}
		>
			{label}
		</span>
	);
};
