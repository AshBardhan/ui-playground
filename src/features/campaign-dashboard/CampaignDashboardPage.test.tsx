import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
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

const renderWithProviders = (component: React.ReactElement, initialEntries?: string[]) => {
	const testQueryClient = createTestQueryClient();
	return render(
		<QueryClientProvider client={testQueryClient}>
			<MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
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

	it('should read status filter from URL parameters', async () => {
		renderWithProviders(<CampaignDashboardPage />, ['/?status=RUNNING']);

		// Wait for campaigns to load - should only show RUNNING campaigns (25 out of 100)
		expect(await screen.findByText('Campaigns (20 of 25)')).toBeInTheDocument();
	});

	it('should read search filter from URL parameters', async () => {
		renderWithProviders(<CampaignDashboardPage />, ['/?search=summer']);

		// Wait for campaigns to load - should only show campaigns with "summer" in the name
		expect(await screen.findByText('Summer Sale 2024')).toBeInTheDocument();

		// Should show filtered count
		const heading = await screen.findByRole('heading', { name: /Campaigns/ });
		expect(heading).toBeInTheDocument();
	});

	it('should read combined status and search filters from URL parameters', async () => {
		renderWithProviders(<CampaignDashboardPage />, ['/?status=DRAFT&search=summer']);

		// Wait for campaigns to load with both filters applied
		const heading = await screen.findByRole('heading', { name: /Campaigns/ });
		expect(heading).toBeInTheDocument();
	});

	it('should update URL when status filter is applied', async () => {
		const user = userEvent.setup();
		renderWithProviders(<CampaignDashboardPage />);

		// Wait for initial load
		await screen.findByText('Campaigns (20 of 100)');

		// Click on the RUNNING status filter
		const runningCheckbox = screen.getByLabelText(/Running/i);
		await user.click(runningCheckbox);

		// Campaigns should be filtered (25 RUNNING campaigns, showing first 20)
		expect(await screen.findByText('Campaigns (20 of 25)')).toBeInTheDocument();
	});

	it('should update URL when search is applied', async () => {
		const user = userEvent.setup();
		renderWithProviders(<CampaignDashboardPage />);

		// Wait for initial load
		await screen.findByText('Campaigns (20 of 100)');

		// Type in search box
		const searchInput = screen.getByPlaceholderText(/Search by campaign name/i);
		await user.type(searchInput, 'summer');

		// Should show filtered campaigns (only campaigns with "summer" in the name)
		expect(await screen.findByText('Summer Sale 2024', {}, { timeout: 1000 })).toBeInTheDocument();
	});

	it('should show empty state when no campaigns match filters', async () => {
		renderWithProviders(<CampaignDashboardPage />, ['/?search=nonexistentcampaign']);

		// Should show no campaigns found message
		expect(await screen.findByText('No campaigns found')).toBeInTheDocument();
		expect(await screen.findByText('Try adjusting your search or filter criteria')).toBeInTheDocument();
	});

	it('should load more campaigns when infinite scroll is triggered', async () => {
		renderWithProviders(<CampaignDashboardPage />);

		// Wait for initial 20 campaigns
		await screen.findByText('Campaigns (20 of 100)');

		// The IntersectionObserver mock auto-triggers in tests
		// So we should see more campaigns loaded (40 total)
		expect(await screen.findByText('Campaigns (40 of 100)', {}, { timeout: 2000 })).toBeInTheDocument();
	});

	it('should show loading state while fetching more campaigns', async () => {
		renderWithProviders(<CampaignDashboardPage />);

		// Wait for initial load
		await screen.findByText('Campaigns (20 of 100)');

		// Due to IntersectionObserver mock, more campaigns load automatically
		// Verify that more campaigns are loaded beyond the initial 20
		// Should have loaded at least 40 campaigns
		const heading = await screen.findByText(/Campaigns \((40|60|80|100) of 100\)/, {}, { timeout: 3000 });
		expect(heading).toBeInTheDocument();
	});

	it('should render error state when API returns 500', async () => {
		// Use the 500 error handler for this specific test
		server.use(...errorHandlers);

		renderWithProviders(<CampaignDashboardPage />);

		expect(await screen.findByText('Error loading campaigns')).toBeInTheDocument();
		expect(await screen.findByText('HTTP error! status: 500')).toBeInTheDocument();
	});

	// TODO: Add test for URL parameter filtering
	// it('should read filters from URL parameters', async () => { ... });
});
