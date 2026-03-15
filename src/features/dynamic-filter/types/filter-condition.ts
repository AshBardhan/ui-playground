export type LogicalOperator = 'AND' | 'OR';

export type FilterCondition = {
	field: string;
	operator: string;
	value: string | number;
	logicalOperator?: LogicalOperator;
	leftBracket?: boolean;
	rightBracket?: boolean;
	loading?: boolean;
};
