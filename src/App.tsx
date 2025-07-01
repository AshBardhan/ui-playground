import './App.css';
import HomePage from './components/HomePage';
import DynamicFilterPage from './components/DynamicFilterPage';
import { Route, Routes } from 'react-router-dom';

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
