import { Campaign, CampaignStatus } from '../types/campaign';

// Campaign name templates
const campaignPrefixes = [
	'Summer',
	'Winter',
	'Spring',
	'Fall',
	'Holiday',
	'Black Friday',
	'Cyber Monday',
	'New Year',
	'Valentine',
	'Easter',
	'Back to School',
	'Prime Day',
	'Flash',
	'Mega',
	'Super',
];

const campaignTypes = [
	'Sale',
	'Promotion',
	'Campaign',
	'Deal',
	'Offer',
	'Discount',
	'Special',
	'Event',
	'Launch',
	'Collection',
	'Showcase',
	'Clearance',
];

// Generate 100 campaigns
const generateCampaigns = (count: number): Campaign[] => {
	const statuses: CampaignStatus[] = ['DRAFT', 'RUNNING', 'PAUSED', 'ARCHIVED'];

	return Array.from({ length: count }, (_, i) => {
		const id = (i + 1).toString();
		const status = statuses[i % 4];
		const isDraft = status === 'DRAFT';

		const prefix = campaignPrefixes[i % campaignPrefixes.length];
		const type = campaignTypes[Math.floor(i / campaignPrefixes.length) % campaignTypes.length];
		const year = 2024 + Math.floor(i / 50);

		return {
			id,
			name: `${prefix} ${type} ${year} ${i > 15 ? `#${i}` : ''}`.trim(),
			status,
			metrics: {
				impressions: isDraft ? 0 : Math.floor(Math.random() * 500000) + 50000,
				clicks: isDraft ? 0 : Math.floor(Math.random() * 10000) + 1000,
				conversions: isDraft ? 0 : Math.floor(Math.random() * 500) + 50,
				spend: isDraft ? 0 : Math.floor(Math.random() * 10000) + 1000,
			},
			createdAt: new Date(2024, 0, (i % 30) + 1, 9 + (i % 12), 0, 0).toISOString(),
			updatedAt: new Date(2024, 0, (i % 30) + 1, 14 + (i % 10), 0, 0).toISOString(),
		};
	});
};

export const mockCampaigns: Campaign[] = generateCampaigns(100);
