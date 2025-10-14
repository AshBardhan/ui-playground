import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '@/components/pages/HomePage';
import { DynamicFilterPage } from '@/components/pages/DynamicFilterPage';
import { DashboardPage } from '@/components/pages/DashboardPage';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/dynamic-filter" element={<DynamicFilterPage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
			</Routes>
		</div>
	);
}

export default App;
