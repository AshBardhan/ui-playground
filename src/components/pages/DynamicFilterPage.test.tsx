import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DynamicFilterPage } from './DynamicFilterPage';

describe('DynamicFilterPage', () => {
	it('should render loading before data', async () => {
		render(<DynamicFilterPage />);

		// Inital: Only skeletons are visible
		expect(screen.getAllByTestId('dynamic-filter-box-skeleton')).not.toHaveLength(0);
		expect(screen.queryByTestId('config-mode')).not.toBeInTheDocument();
		expect(screen.queryByTestId('read-only-mode')).not.toBeInTheDocument();

		// Later: Both filter boxes are visible and skeletons are removed
		await waitFor(() => {
			expect(screen.getByTestId('config-mode')).toBeInTheDocument();
			expect(screen.getByTestId('read-only-mode')).toBeInTheDocument();
			expect(screen.queryAllByTestId('dynamic-filter-box-skeleton')).toHaveLength(0);
		});
	});
});
