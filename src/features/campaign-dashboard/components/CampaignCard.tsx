import { Campaign } from '../types/campaign';
import { Badge } from '@/components/ui/Badge';
import { Metric } from '@/components/ui/Metric';
import { getCampaignStatusLabel, getCampaignStatusVariant } from '../constants/campaign-status';
import clsx from 'clsx';

interface CampaignCardProps {
	campaign: Campaign;
	onClick?: (campaign: Campaign) => void;
	className?: string;
}

export const CampaignCard = ({ campaign, onClick, className }: CampaignCardProps) => {
	const handleClick = () => {
		onClick?.(campaign);
	};

	// Format number as USD currency without decimals
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
		}).format(amount);
	};

	// Format number with thousand separators
	const formatValue = (val: number) => {
		return val.toLocaleString();
	};

	// Draft campaigns don't have metrics yet
	const isDraft = campaign.status === 'DRAFT';

	return (
		<div
			className={clsx('p-4 hover:bg-gray-50 transition-colors', onClick && 'cursor-pointer', className)}
			onClick={handleClick}
		>
			<div className="flex items-start justify-between mb-3">
				<h3 className="text-lg font-semibold text-gray-900 truncate">{campaign.name}</h3>
				{/* Display status badge with dynamic label and color variant */}
				<Badge label={getCampaignStatusLabel(campaign.status)} variant={getCampaignStatusVariant(campaign.status)} />
			</div>

			{/* Only show metrics for non-draft campaigns */}
			{!isDraft && (
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3">
					<Metric label="Impressions" value={campaign.metrics.impressions} />
					<Metric label="Clicks" value={campaign.metrics.clicks} />
					<Metric label="Conversions" value={campaign.metrics.conversions} />
					<Metric label="Spend" value={formatCurrency(campaign.metrics.spend)} />
				</div>
			)}

			<div className="flex justify-between text-xs text-gray-500">
				<span>Created: {new Date(campaign.createdAt).toLocaleDateString()}</span>
				{!isDraft && <span>Updated: {new Date(campaign.updatedAt).toLocaleDateString()}</span>}
			</div>
		</div>
	);
};
