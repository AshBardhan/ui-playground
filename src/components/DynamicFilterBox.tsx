import { useState } from 'react';
import { FilterFieldSchema } from '../types/filter-schema';
import { FilterCondition } from '../types/filter-condition';

interface DynamicFilterBoxProps {
  schema: FilterFieldSchema[];
  conditions: FilterCondition[];
  onFieldChange: (index: number, field: string) => void;
  onOperatorChange: (index: number, operator: string) => void;
  onValueChange: (index: number, value: string) => void;
  onAddCondition: () => void;
  onRemoveCondition: (index: number) => void;
}

type Primitive = string | number | Date;

const Dropdown = ({
  value,
  options,
  onChange
}: {
  value: Primitive;
  options: Primitive[];
  onChange: (val: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="border px-2 py-1 rounded w-32 text-left bg-white"
      >
        {value?.toString() || 'Select'}
      </button>
      {open && (
        <div className="absolute mt-1 bg-white border rounded shadow w-32 z-10">
          {options.map((option) => (
            <div
              key={option.toString()}
              onClick={() => {
                onChange(option.toString());
                setOpen(false);
              }}
              className="cursor-pointer px-2 py-1 hover:bg-gray-100"
            >
              {option.toString()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const DynamicFilterBox = ({
  schema,
  conditions,
  onFieldChange,
  onOperatorChange,
  onValueChange,
  onAddCondition,
  onRemoveCondition
}: DynamicFilterBoxProps) => {
  return (
    <div className="space-y-4">
      {conditions.map((cond, index) => {
        const fieldSchema = schema.find((f) => f.name === cond.field);

        return (
          <div key={index} className="flex gap-3 items-center">
            {/* Field dropdown */}
            <Dropdown
              value={cond.field}
              options={schema.map((f) => f.name)}
              onChange={(val) => onFieldChange(index, val)}
            />

            {/* Operator dropdown */}
            {fieldSchema && (
              <Dropdown
                value={cond.operator}
                options={fieldSchema.operators}
                onChange={(val) => onOperatorChange(index, val)}
              />
            )}

            {/* Value input */}
            {fieldSchema?.type === 'enum' ? (
              <Dropdown
                value={cond.value}
                options={fieldSchema.values ?? []}
                onChange={(val) => onValueChange(index, val)}
              />
            ) : (
              <input
                type={
                  fieldSchema?.type === 'number'
                    ? 'number'
                    : 'text'
                }
                value={cond.value}
                onChange={(e) => onValueChange(index, e.target.value)}
                className="border px-2 py-1 rounded w-32"
              />
            )}

            {/* 🗑 Remove Button */}
            {
                conditions.length > 1 && (
                    <button type='button'
                        onClick={() => onRemoveCondition(index)}
                        className="text-red-500 hover:text-red-700">
                        ✕
                    </button>
                )
            }
          </div>
        );
      })}

      <button
        onClick={onAddCondition}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        + Add Condition
      </button>
    </div>
  );
};

export default DynamicFilterBox;
