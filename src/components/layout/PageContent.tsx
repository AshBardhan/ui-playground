import { ReactNode } from 'react';

interface PageContentProps {
	children: ReactNode;
	className?: string;
	containerized?: boolean;
}

export const PageContent = ({ children, className = '', containerized = true }: PageContentProps) => {
	return (
		<div className={`flex-1 overflow-auto ${className}`}>
			{containerized ? <div className="container mx-auto px-4 py-6">{children}</div> : children}
		</div>
	);
};
