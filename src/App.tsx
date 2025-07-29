import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '@/components/pages/HomePage';
import { DynamicFilterPage } from '@/components/pages/DynamicFilterPage';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/dynamic-filter" element={<DynamicFilterPage />} />
			</Routes>
		</div>
	);
}

export default App;
