import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { CampaignDashboardPage } from './CampaignDashboardPage';
import { server } from '@/mocks/server';
import { errorHandlers } from '@/mocks/errorHandlers';

// Create a test query client for each test
const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false, // Disable retries in tests
			},
		},
	});

const renderWithProviders = (component: React.ReactElement) => {
	const testQueryClient = createTestQueryClient();
	return render(
		<QueryClientProvider client={testQueryClient}>
			<MemoryRouter>{component}</MemoryRouter>
		</QueryClientProvider>
	);
};

describe('CampaignDashboardPage', () => {
	it('should render the dashboard header', () => {
		renderWithProviders(<CampaignDashboardPage />);
		expect(screen.getByRole('heading', { name: /Campaigns/ })).toBeInTheDocument();
	});

	it('should hide campaign count during loading', async () => {
		renderWithProviders(<CampaignDashboardPage />);
		expect(screen.getByText('Campaigns')).toBeInTheDocument();
	});

	it('should show campaign count after loading', async () => {
		renderWithProviders(<CampaignDashboardPage />);
		expect(await screen.findByText('Campaigns (20 of 100)')).toBeInTheDocument();
	});

	it('should render campaigns from MSW mock data', async () => {
		renderWithProviders(<CampaignDashboardPage />);

		// First page shows 20 campaigns with generated names
		expect(await screen.findByText('Summer Sale 2024')).toBeInTheDocument();
		expect(await screen.findByText('Winter Sale 2024')).toBeInTheDocument();
		expect(await screen.findByText('Spring Sale 2024')).toBeInTheDocument();
	});

	it('should render error state when API returns 500', async () => {
		// Use the 500 error handler for this specific test
		server.resetHandlers(...errorHandlers);

		renderWithProviders(<CampaignDashboardPage />);

		expect(await screen.findByText('Error loading campaigns')).toBeInTheDocument();
		expect(await screen.findByText('HTTP error! status: 500')).toBeInTheDocument();

		// Reset handlers after this test
		server.resetHandlers();
	});

	// TODO: Add test for URL parameter filtering
	// it('should read filters from URL parameters', async () => { ... });
});
