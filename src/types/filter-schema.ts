export type FieldType = 'string' | 'number' | 'select';

export interface FilterFieldSchema {
	name: string; // field name (e.g., "Age", "Status")
	label: string; // display label (e.g., "User Age")
	type: FieldType;
	operators: string[]; // valid operators (e.g., '=', '!=', 'in')
	values?: string[]; // only for select-based (e.g., ['Active', 'Inactive'])
}
