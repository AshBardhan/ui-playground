export type FilterCondition = {
  field: string;
  operator: string;
  value: string | number;
  logicalOperator?: 'AND' | 'OR'; // optional for first condition
};
