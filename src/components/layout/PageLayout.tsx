import { ReactNode } from 'react';

interface PageLayoutProps {
	children: ReactNode;
	className?: string;
}

export const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
	return <div className={`flex flex-col h-full ${className}`}>{children}</div>;
};
