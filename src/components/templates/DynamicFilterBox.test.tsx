import { render, screen, waitFor, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DynamicFilterBox } from './DynamicFilterBox';
import { schemaList } from '@/data/schema-list';
import { conditionList } from '@/data/condition-list';

const getInputOrText = (container: HTMLElement, value: string | number) => {
	return within(container).queryByDisplayValue(value) ?? within(container).queryByText(value);
};

describe('DynamicFilterBox', async () => {
	it('should render the conditions in read-only mode', async () => {
		render(<DynamicFilterBox isReadOnly={true} schema={schemaList} conditions={conditionList} />);

		await waitFor(() => {
			expect(screen.getByTestId('read-only-mode')).toBeInTheDocument();
			expect(screen.queryByTestId('config-mode')).not.toBeInTheDocument();
		});

		const groups = screen.getAllByRole('group', { name: 'Filter Condition Group' });
		expect(groups.length).toBe(conditionList.length);

		groups.forEach((group, index) => {
			const { field, operator, value } = conditionList[index];
			expect(within(group).getByText(field)).toBeInTheDocument();
			expect(within(group).getByText(operator)).toBeInTheDocument();
			expect(within(group).getByText(value)).toBeInTheDocument();
		});
	});

	it('should render the conditions in config mode', async () => {
		render(<DynamicFilterBox schema={schemaList} conditions={conditionList} />);

		await waitFor(() => {
			expect(screen.getByTestId('config-mode')).toBeInTheDocument();
			expect(screen.queryByTestId('read-only-mode')).not.toBeInTheDocument();
		});

		const groups = screen.getAllByRole('group', { name: 'Filter Condition Group' });
		expect(groups.length).toBe(conditionList.length);

		groups.forEach((group, index) => {
			const { field, operator, value } = conditionList[index];
			expect(getInputOrText(group, field)).toBeInTheDocument();
			expect(getInputOrText(group, operator)).toBeInTheDocument();
			expect(getInputOrText(group, value)).toBeInTheDocument();
		});
	});
});
