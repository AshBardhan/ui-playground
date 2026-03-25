import { ReactNode } from 'react';

interface PageHeaderProps {
	children: ReactNode;
	className?: string;
}

export const PageHeader = ({ children, className = '' }: PageHeaderProps) => {
	return (
		<div className={`sticky top-0 z-1 bg-white border-b border-gray-200 shadow-sm ${className}`}>
			<div className="container mx-auto px-4 py-4">{children}</div>
		</div>
	);
};
