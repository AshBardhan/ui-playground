import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomePage } from '@/features/home/HomePage';
import { DynamicFilterPage } from '@/features/dynamic-filter/DynamicFilterPage';
import { CampaignDashboardPage } from '@/features/campaign-dashboard/CampaignDashboardPage';
import { AnalyticsDashboardPage } from '@/features/analytics-dashboard/AnalyticsDashboardPage';
import { AppHeader } from '@/components/layout/AppHeader';

// Create a client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
			retry: 1,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="h-screen flex flex-col">
				<AppHeader />
				<main className="flex-1 bg-gray-50 overflow-hidden">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/dynamic-filter" element={<DynamicFilterPage />} />
						<Route path="/campaign-dashboard" element={<CampaignDashboardPage />} />
						<Route path="/analytics-dashboard" element={<AnalyticsDashboardPage />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</main>
			</div>
		</QueryClientProvider>
	);
}

export default App;
