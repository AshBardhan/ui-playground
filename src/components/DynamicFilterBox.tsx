import { FilterFieldSchema } from "../types/filter-schema";
import { FilterCondition } from "../types/filter-condition";
import {
  Button,
} from "@headlessui/react";
import DropdownList from "./DropdownList";

interface DynamicFilterBoxProps {
  schema: FilterFieldSchema[];
  conditions: FilterCondition[];
  onFieldChange: (index: number, field: string) => void;
  onOperatorChange: (index: number, operator: string) => void;
  onValueChange: (index: number, value: string | number) => void;
  onAddCondition: () => void;
  onRemoveCondition: (index: number) => void;
}

const DynamicFilterBox = ({
  schema,
  conditions,
  onFieldChange,
  onOperatorChange,
  onValueChange,
  onAddCondition,
  onRemoveCondition,
}: DynamicFilterBoxProps) => {
  return (
    <div className="space-y-4">
      {conditions.map((cond, index) => {
        const fieldSchema = schema.find((f) => f.name === cond.field);

        return (
          <div key={index} className="flex gap-3 items-center">
            {/* Field dropdown */}
            <DropdownList
              options={schema.map((field) => field.name)}
              selectedOption={cond.field}
              onSelect={(val) => onFieldChange(index, val)}
            />

            {/* Operator dropdown */}
            {fieldSchema && (
              <DropdownList
                options={fieldSchema.operators}
                selectedOption={cond.operator}
                onSelect={(val) => onOperatorChange(index, val)}
              />
            )}

            {/* Value input */}
            {fieldSchema?.type === "enum" && fieldSchema.values ? (
               <DropdownList
                options={fieldSchema.values}
                selectedOption={cond.value as string}
                onSelect={(val) => onValueChange(index, val)}
              />
            ) : (
              <input
                type={fieldSchema?.type === "number" ? "number" : "text"}
                value={cond.value}
                onChange={(e) => onValueChange(index, e.target.value)}
                className="border px-2 py-1 rounded w-32"
              />
            )}

            {/* Remove Condition */}
            {conditions.length > 1 && (
              <Button
                onClick={() => onRemoveCondition(index)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </Button>
            )}
          </div>
        );
      })}

      {/* Add Condition */}
      <Button
        onClick={onAddCondition}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        + Add Condition
      </Button>
    </div>
  );
};

export default DynamicFilterBox;
