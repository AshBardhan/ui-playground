import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from '@/features/home/HomePage';
import { DynamicFilterPage } from '@/features/dynamic-filter/DynamicFilterPage';
import { CampaignDashboardPage } from '@/features/campaign-dashboard/CampaignDashboardPage';
import { Header } from '@/components/layout/Header';

function App() {
	return (
		<div className="h-screen flex flex-col">
			<Header />
			<main className="flex-1 bg-gray-50 overflow-auto">
				<div className="container mx-auto px-4 py-8">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/dynamic-filter" element={<DynamicFilterPage />} />
						<Route path="/campaign-dashboard" element={<CampaignDashboardPage />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</div>
			</main>
		</div>
	);
}

export default App;
