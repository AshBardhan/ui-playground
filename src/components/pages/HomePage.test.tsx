import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { HomePage } from './HomePage';

describe('HomePage', () => {
	beforeEach(() => {
		cleanup();
		render(<HomePage />);
	});
	it('should have a list', () => {
		expect(screen.getByRole('list')).toBeInTheDocument();
		expect(screen.getAllByRole('listitem').length).toBe(3);
	});
	it('should update like count on clicking on the button', async () => {
		expect(await screen.findByText('Like (0)')).toBeInTheDocument();
		const likeButton = screen.getByRole('button');
		userEvent.click(likeButton);
		expect(await screen.findByText('Like (1)')).toBeInTheDocument();
	});
});
