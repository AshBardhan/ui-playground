import { FilterCondition } from "../types/filter-condition";

export const conditionList: FilterCondition[] = [
  {
    field: "age",
    operator: ">",
    value: 30
  },
  {
    field: "status",
    operator: "in",
    value: "Active",
    logicalOperator: "AND"
  }
];
