import { useState } from "react";
import { schemaList } from "../data/schema-list";
import { conditionList } from "../data/condition-list";
import { FilterCondition, LogicalOperator } from "../types/filter-condition";
import DynamicFilterBox from "./DynamicFilterBox";

export default function DynamicFilterPage() {
  const [conditions, setConditions] =
    useState<FilterCondition[]>(conditionList);

  const handleFieldChange = (index: number, newField: string) => {
    const fieldSchema = schemaList.find((f) => f.name === newField);
    if (!fieldSchema) return;
    setConditions((prev) =>
      prev.map((condition, i) =>
        i === index
          ? {
              ...condition,
              field: newField,
              operator: fieldSchema.operators[0],
              value:
                fieldSchema.type === "enum" &&
                fieldSchema.values &&
                fieldSchema.values.length > 0
                  ? fieldSchema.values[0]
                  : "",
            }
          : condition,
      ),
    );
  };

  const handleLogicalOperatorChange = (
    index: number,
    newOperator: LogicalOperator,
  ) => {
    setConditions((prev) =>
      prev.map((condition, i) =>
        i === index
          ? { ...condition, logicalOperator: newOperator }
          : condition,
      ),
    );
  };

  const handleOperatorChange = (index: number, newOperator: string) => {
    setConditions((prev) =>
      prev.map((condition, i) =>
        i === index ? { ...condition, operator: newOperator } : condition,
      ),
    );
  };

  const handleValueChange = (index: number, newValue: string | number) => {
    setConditions((prev) =>
      prev.map((condition, i) =>
        i === index ? { ...condition, value: newValue } : condition,
      ),
    );
  };

  const removeCondition = (index: number) => {
    setConditions((prev) => prev.filter((_, i) => i !== index));
  };

  const addCondition = () => {
    setConditions((prev) => [
      ...prev,
      {
        field: schemaList[0].name,
        operator: schemaList[0].operators[0],
        value: "",
        logicalOperator: "AND",
      },
    ]);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dynamic Filter</h1>
      <div className="flex gap-5">
        <div className="border p-4 rounded-lg shadow-md w-1/2">
          <h2 className="text-lg font-semibold mb-4">Config Mode</h2>
          <DynamicFilterBox
            schema={schemaList}
            conditions={conditions}
            onFieldChange={handleFieldChange}
            onLogicalOperatorChange={handleLogicalOperatorChange}
            onOperatorChange={handleOperatorChange}
            onValueChange={handleValueChange}
            onAddCondition={addCondition}
            onRemoveCondition={removeCondition}
          />
        </div>
        <div className="border p-4 rounded-lg shadow-md w-1/2">
          <h2 className="text-lg font-semibold mb-4">Read-Only Mode</h2>
          <DynamicFilterBox
            schema={schemaList}
            conditions={conditions}
            isReadOnly={true}
          />
        </div>
      </div>
    </div>
  );
}
