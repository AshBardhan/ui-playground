import { ReactNode } from 'react';
import clsx from 'clsx';

interface CampaignDashboardLayoutProps {
	leftContent: ReactNode;
	rightContent: ReactNode;
	className?: string;
}

/**
 * Two-column layout for campaign dashboard
 * Left: Campaign list (2/3 width on large screens)
 * Right: Filter panel (1/3 width, sticky on large screens)
 */
export const CampaignDashboardLayout = ({ leftContent, rightContent, className }: CampaignDashboardLayoutProps) => {
	return (
		<div className={clsx('min-h-screen', className)}>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main content area - campaigns list */}
				<div className="lg:col-span-2">{leftContent}</div>

				{/* Sidebar - filters (sticky on scroll) */}
				<div className="lg:col-span-1">
					<div className="sticky top-8">{rightContent}</div>
				</div>
			</div>
		</div>
	);
};
