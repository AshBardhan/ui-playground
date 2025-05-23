import { FilterFieldSchema } from "../types/filter-schema";

export const schemaList: FilterFieldSchema[] = [
  {
    name: "age",
    label: "User Age",
    type: "number",
    operators: ["=", "!=", ">", "<"]
  },
  {
    name: "status",
    label: "Account Status",
    type: "enum",
    operators: ["is", "is not", "in", "not in"],
    values: ["Active", "Inactive", "Pending"]
  },
  {
    name: "name",
    label: "User Name",
    type: "string",
    operators: ["is", "is not", "contains", "starts with"]
  }
];
