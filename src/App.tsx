import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '@/components/pages/HomePage';
import { DynamicFilterPage } from '@/components/pages/DynamicFilterPage';
import { DashboardPage } from '@/components/pages/DashboardPage';
import { Header } from '@/components/organisms/Header';

function App() {
	return (
		<div className="h-screen flex flex-col">
			<Header />
			<main className="flex-1 bg-gray-50 overflow-auto">
				<div className="container mx-auto px-4 py-8">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/dynamic-filter" element={<DynamicFilterPage />} />
						<Route path="/dashboard" element={<DashboardPage />} />
					</Routes>
				</div>
			</main>
		</div>
	);
}

export default App;
