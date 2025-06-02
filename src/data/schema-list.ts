import { FilterFieldSchema } from '../types/filter-schema';

export const schemaList: FilterFieldSchema[] = [
	{
		name: 'age',
		label: 'User Age',
		type: 'number',
		operators: ['=', '!=', '>', '<'],
	},
	{
		name: 'status',
		label: 'Account Status',
		type: 'select',
		operators: ['is', 'is not'],
		values: ['Active', 'Inactive', 'Pending'],
	},
	{
		name: 'name',
		label: 'User Name',
		type: 'string',
		operators: ['is', 'is not', 'contains', 'starts with', 'ends with'],
	},
	{
		name: 'campaign',
		label: 'Campaign Name',
		type: 'select',
		operators: ['is', 'is not', 'contains', 'starts with', 'ends with'],
		fetchURL: '/api/campaigns',
	},
];
