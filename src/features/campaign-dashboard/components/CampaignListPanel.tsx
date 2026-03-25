import { useEffect, useRef } from 'react';
import { Campaign } from '../types/campaign';
import { CampaignCard } from './CampaignCard';
import { Skeleton } from '@/components/ui/Skeleton';
import clsx from 'clsx';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { CampaignCardSkeleton } from './CampaignCardSkeleton';

interface CampaignListPanelProps {
	campaigns: Campaign[];
	loading?: boolean;
	loadingMore?: boolean;
	hasMore?: boolean;
	onLoadMore?: () => void;
	onCampaignClick?: (campaign: Campaign) => void;
	className?: string;
}

export const CampaignListPanel = ({
	campaigns,
	loading = false,
	loadingMore = false,
	hasMore = false,
	onLoadMore,
	onCampaignClick,
	className,
}: CampaignListPanelProps) => {
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
			<Card className={clsx('p-0!', className)}>
				<div className="divide-y divide-gray-200">
					{Array.from({ length: 4 }).map((_, index) => (
						<CampaignCardSkeleton key={index} />
					))}
				</div>
			</Card>
		);
	}

	// Empty state
	if (campaigns.length === 0) {
		return (
			<Card className={clsx('h-full flex flex-col items-center justify-center gap-2', className)}>
				<Text variant="h3">No campaigns found</Text>
				<Text variant="p">Try adjusting your search or filter criteria</Text>
			</Card>
		);
	}

	return (
		<Card className={clsx('p-0!', className)}>
			<div className="divide-y divide-gray-200">
				{campaigns.map((campaign, index) => (
					<CampaignCard
						key={campaign.id}
						campaign={campaign}
						onClick={onCampaignClick}
						className={index === 0 ? 'rounded-t-lg' : ''}
					/>
				))}

				{/* Intersection observer trigger for infinite scroll */}
				{hasMore && (
					<div ref={loadMoreRef}>
						{loadingMore ? (
							<div className="divide-y divide-gray-200">
								{Array.from({ length: 2 }).map((_, index) => (
									<CampaignCardSkeleton key={index} />
								))}
							</div>
						) : (
							<div className="flex items-center justify-center h-20">
								<Text className="text-sm">Scroll for more...</Text>
							</div>
						)}
					</div>
				)}

				{/* End of list indicator */}
				{!hasMore && campaigns.length > 0 && (
					<div className="flex items-center justify-center h-20">
						<Text className="text-sm">No more campaigns to load</Text>
					</div>
				)}
			</div>
		</Card>
	);
};
