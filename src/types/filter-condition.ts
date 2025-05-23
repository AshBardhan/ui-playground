export type LogicalOperator = 'AND' | 'OR' | undefined;

export type FilterCondition = {
	field: string;
	operator: string;
	value: string | number;
	logicalOperator?: LogicalOperator;
};
