import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DynamicFilterPage } from './DynamicFilterPage';

describe('DynamicFilterPage', () => {
  it('should render loading before data', async () => {
    render(<DynamicFilterPage />);

    // Initial loading skeletons
    const loadingSkeletons = screen.getAllByTestId('dynamic-filter-box-skeleton');
    expect(loadingSkeletons.length).toBeGreaterThan(0);

    // Wait until skeletons disappear and renders config and read-only modes
    await waitFor(() => {
      const skeletonsGone = screen.queryAllByTestId('dynamic-filter-box-skeleton');
      const filterConfigBox = screen.getByTestId('config-mode');
      const filterReadOnlyBox = screen.getByTestId('read-only-mode');

      expect(skeletonsGone.length).toBe(0);
      expect(filterConfigBox).toBeInTheDocument();
      expect(filterReadOnlyBox).toBeInTheDocument();
    });
  });
});
