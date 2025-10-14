import { ReactNode } from 'react';
import clsx from 'clsx';

interface DashboardLayoutProps {
	leftContent: ReactNode;
	rightContent: ReactNode;
	className?: string;
}

export const DashboardLayout = ({ leftContent, rightContent, className }: DashboardLayoutProps) => {
	return (
		<div className={clsx('min-h-screen', className)}>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">{leftContent}</div>

				<div className="lg:col-span-1">
					<div className="sticky top-8">{rightContent}</div>
				</div>
			</div>
		</div>
	);
};
