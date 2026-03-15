import { Campaign } from '../types/campaign';
import { Badge } from '@/components/ui/Badge';
import { Metric } from '@/components/ui/Metric';
import clsx from 'clsx';

const getStatusVariant = (status: Campaign['status']) => {
	switch (status) {
		case 'RUNNING':
			return 'success';
		case 'PAUSED':
			return 'warning';
		case 'ARCHIVED':
			return 'error';
		case 'DRAFT':
		default:
			return 'neutral';
	}
};

const getStatusLabel = (status: Campaign['status']) => {
	switch (status) {
		case 'RUNNING':
			return 'Running';
		case 'PAUSED':
			return 'Paused';
		case 'ARCHIVED':
			return 'Archived';
		case 'DRAFT':
		default:
			return 'Draft';
	}
};

interface CampaignCardProps {
	campaign: Campaign;
	onClick?: (campaign: Campaign) => void;
	className?: string;
}

export const CampaignCard = ({ campaign, onClick, className }: CampaignCardProps) => {
	const handleClick = () => {
		onClick?.(campaign);
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
		}).format(amount);
	};

	const formatValue = (val: number) => {
		return val.toLocaleString();
	};

	const isDraft = campaign.status === 'DRAFT';

	return (
		<div
			className={clsx('p-4 hover:bg-gray-50 transition-colors', onClick && 'cursor-pointer', className)}
			onClick={handleClick}
		>
			<div className="flex items-start justify-between mb-3">
				<h3 className="text-lg font-semibold text-gray-900 truncate">{campaign.name}</h3>
				<Badge label={getStatusLabel(campaign.status)} variant={getStatusVariant(campaign.status)} />
			</div>

			{!isDraft && (
				<div className="flex flex-col sm:flex-row gap-4 mb-3">
					<Metric className="flex-1" label="Impressions" value={campaign.metrics.impressions} />
					<Metric className="flex-1" label="Clicks" value={campaign.metrics.clicks} />
					<Metric className="flex-1" label="Conversions" value={campaign.metrics.conversions} />
					<Metric className="flex-1" label="Spend" value={formatCurrency(campaign.metrics.spend)} />
				</div>
			)}

			<div className="flex justify-between text-xs text-gray-500">
				<span>Created: {new Date(campaign.createdAt).toLocaleDateString()}</span>
				{!isDraft && <span>Updated: {new Date(campaign.updatedAt).toLocaleDateString()}</span>}
			</div>
		</div>
	);
};
