import { Campaign } from '@/types/campaign';
import { CampaignCard } from '@/components/templates/CampaignCard';
import { Skeleton } from '@/components/atoms/Skeleton';
import clsx from 'clsx';

interface CampaignListProps {
	campaigns: Campaign[];
	loading?: boolean;
	onCampaignClick?: (campaign: Campaign) => void;
	className?: string;
}

export const CampaignList = ({ campaigns, loading = false, onCampaignClick, className }: CampaignListProps) => {
	if (loading) {
		return (
			<div className={clsx('space-y-1', className)}>
				{Array.from({ length: 4 }).map((_, index) => (
					<Skeleton key={index} height={100} />
				))}
			</div>
		);
	}

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
		</div>
	);
};
