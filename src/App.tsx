import './App.css';
import HomePage from './components/HomePage';
import DynamicFilterPage from './components/DynamicFilterPage';

function App() {
	return (
		<div className="App">
			<main>
				<HomePage />
				<DynamicFilterPage />
			</main>
		</div>
	);
}

export default App;
