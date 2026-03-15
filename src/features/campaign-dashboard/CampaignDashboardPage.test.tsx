import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CampaignDashboardPage } from './CampaignDashboardPage';
import { server } from '@/mocks/server';
import { errorHandlers } from '@/mocks/errorHandlers';

describe('CampaignDashboardPage', () => {
	it('should render the dashboard header', () => {
		render(<CampaignDashboardPage />);
		expect(screen.getByRole('heading', { name: /Campaigns/ })).toBeInTheDocument();
	});

	it('should hide campaign count during loading', async () => {
		render(<CampaignDashboardPage />);
		expect(screen.getByText('Campaigns')).toBeInTheDocument();
	});

	it('should show campaign count after loading', async () => {
		render(<CampaignDashboardPage />);
		expect(await screen.findByText('Campaigns (8)')).toBeInTheDocument();
	});

	it('should render campaigns from MSW mock data', async () => {
		render(<CampaignDashboardPage />);

		expect(await screen.findByText('Summer Sale 2024')).toBeInTheDocument();
		expect(await screen.findByText('Black Friday Campaign')).toBeInTheDocument();
		expect(await screen.findByText('Holiday Shopping Spree')).toBeInTheDocument();
	});

	it('should render error state when API returns 500', async () => {
		// Use the 500 error handler for this specific test
		server.resetHandlers(...errorHandlers);

		render(<CampaignDashboardPage />);

		expect(await screen.findByText('Error loading campaigns')).toBeInTheDocument();
		expect(await screen.findByText('Failed to fetch campaigns')).toBeInTheDocument();

		// Reset handlers after this test
		server.resetHandlers();
	});
});
