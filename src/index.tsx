import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

async function prepare() {
	if (import.meta.env.MODE === 'development') {
		const { worker } = await import('./mocks/browser');
		await worker.start({
			onUnhandledRequest: 'bypass',
		});
	}
}

prepare().then(() => {
	const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

	root.render(
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	);
});
