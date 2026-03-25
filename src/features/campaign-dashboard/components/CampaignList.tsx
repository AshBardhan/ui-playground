import { useEffect, useRef } from 'react';
import { Campaign } from '../types/campaign';
import { CampaignCard } from './CampaignCard';
import { Skeleton } from '@/components/ui/Skeleton';
import clsx from 'clsx';

interface CampaignListProps {
	campaigns: Campaign[];
	loading?: boolean;
	loadingMore?: boolean;
	hasMore?: boolean;
	onLoadMore?: () => void;
	onCampaignClick?: (campaign: Campaign) => void;
	className?: string;
}

export const CampaignList = ({
	campaigns,
	loading = false,
	loadingMore = false,
	hasMore = false,
	onLoadMore,
	onCampaignClick,
	className,
}: CampaignListProps) => {
	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement>(null);

	// Setup Intersection Observer for infinite scroll
	useEffect(() => {
		if (loading || !hasMore || !onLoadMore) return;

		observerRef.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !loadingMore) {
					onLoadMore();
				}
			},
			{ threshold: 0.1 }
		);

		if (loadMoreRef.current) {
			observerRef.current.observe(loadMoreRef.current);
		}

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [hasMore, loading, loadingMore, onLoadMore]);

	// Initial loading state
	if (loading) {
		return (
			<div className={clsx('space-y-1', className)}>
				{Array.from({ length: 4 }).map((_, index) => (
					<Skeleton key={index} height={100} />
				))}
			</div>
		);
	}

	// Empty state
	if (campaigns.length === 0) {
		return (
			<div className={clsx('text-center py-12', className)}>
				<div className="text-gray-500 text-lg mb-2">No campaigns found</div>
				<div className="text-gray-400 text-sm">Try adjusting your search or filter criteria</div>
			</div>
		);
	}

	return (
		<div className={clsx('space-y-0', className)}>
			<div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
				{campaigns.map((campaign, index) => (
					<CampaignCard
						key={campaign.id}
						campaign={campaign}
						onClick={onCampaignClick}
						className={index === 0 ? 'rounded-t-lg' : ''}
					/>
				))}
			</div>

			{/* Intersection observer trigger for infinite scroll */}
			{hasMore && (
				<div ref={loadMoreRef} className="py-4">
					{loadingMore ? (
						<div className="space-y-1">
							<Skeleton height={100} />
						</div>
					) : (
						<div className="text-center text-gray-500 text-sm">Scroll for more...</div>
					)}
				</div>
			)}

			{/* End of list indicator */}
			{!hasMore && campaigns.length > 0 && (
				<div className="text-center py-4 text-gray-400 text-sm">No more campaigns to load</div>
			)}
		</div>
	);
};
