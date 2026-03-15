import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CampaignCard } from './CampaignCard';
import { Campaign } from '../types/campaign';

const mockCampaign: Campaign = {
	id: '1',
	name: 'Test Campaign',
	status: 'RUNNING',
	metrics: {
		impressions: 1000,
		clicks: 50,
		conversions: 5,
		spend: 100,
	},
	createdAt: '2024-01-01T00:00:00Z',
	updatedAt: '2024-01-02T00:00:00Z',
};

const mockDraftCampaign: Campaign = {
	...mockCampaign,
	status: 'DRAFT',
};

describe('CampaignCard', () => {
	it('should render campaign name and status', () => {
		render(<CampaignCard campaign={mockCampaign} />);

		expect(screen.getByText('Test Campaign')).toBeInTheDocument();
		expect(screen.getByText('Running')).toBeInTheDocument();
	});

	it('should show metrics for non-draft campaigns', () => {
		render(<CampaignCard campaign={mockCampaign} />);

		expect(screen.getByText('Impressions')).toBeInTheDocument();
		expect(screen.getByText('Clicks')).toBeInTheDocument();
		expect(screen.getByText('Conversions')).toBeInTheDocument();
		expect(screen.getByText('Spend')).toBeInTheDocument();
		expect(screen.getByText('1,000')).toBeInTheDocument();
		expect(screen.getByText('50')).toBeInTheDocument();
		expect(screen.getByText('5')).toBeInTheDocument();
		expect(screen.getByText('$100')).toBeInTheDocument();
	});

	it('should hide metrics for draft campaigns', () => {
		render(<CampaignCard campaign={mockDraftCampaign} />);

		expect(screen.queryByText('Impressions')).not.toBeInTheDocument();
		expect(screen.queryByText('Clicks')).not.toBeInTheDocument();
		expect(screen.queryByText('Conversions')).not.toBeInTheDocument();
		expect(screen.queryByText('Spend')).not.toBeInTheDocument();
	});

	it('should show created and updated dates for non-draft campaigns', () => {
		render(<CampaignCard campaign={mockCampaign} />);

		expect(screen.getByText(/Created:/)).toBeInTheDocument();
		expect(screen.getByText(/Updated:/)).toBeInTheDocument();
	});

	it('should show only created date for draft campaigns', () => {
		render(<CampaignCard campaign={mockDraftCampaign} />);

		expect(screen.getByText(/Created:/)).toBeInTheDocument();
		expect(screen.queryByText(/Updated:/)).not.toBeInTheDocument();
	});

	it('should call onClick when clicked', () => {
		const onClick = vi.fn();
		render(<CampaignCard campaign={mockCampaign} onClick={onClick} />);

		screen.getByText('Test Campaign').click();
		expect(onClick).toHaveBeenCalledWith(mockCampaign);
	});
});
