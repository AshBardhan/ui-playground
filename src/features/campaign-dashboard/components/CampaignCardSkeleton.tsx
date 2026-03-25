import { Skeleton } from '@/components/ui/Skeleton';
import clsx from 'clsx';

interface CampaignCardSkeletonProps {
	className?: string;
}

export const CampaignCardSkeleton = ({ className }: CampaignCardSkeletonProps) => {
	return (
		<div className={clsx('p-4', className)}>
			{/* Header row: Title and Badge */}
			<div className="flex items-start justify-between gap-4 mb-3">
				<div className="flex-1 max-w-md">
					<Skeleton height={28} /> {/* Campaign name skeleton */}
				</div>
				<div className="w-20">
					<Skeleton height={24} /> {/* Status badge skeleton */}
				</div>
			</div>

			{/* Metrics grid (4 columns on desktop, 2 on mobile) */}
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3">
				<Skeleton height={60} /> {/* Impressions */}
				<Skeleton height={60} /> {/* Clicks */}
				<Skeleton height={60} /> {/* Conversions */}
				<Skeleton height={60} /> {/* Spend */}
			</div>

			{/* Footer row: Timestamps */}
			<div className="flex justify-between gap-4">
				<div className="w-32">
					<Skeleton height={16} /> {/* Created date */}
				</div>
				<div className="w-32">
					<Skeleton height={16} /> {/* Updated date */}
				</div>
			</div>
		</div>
	);
};
