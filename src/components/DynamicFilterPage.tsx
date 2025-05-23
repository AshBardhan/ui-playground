import { useState } from 'react';
import {schemaList} from '../data/schema-list';
import {conditionList} from '../data/condition-list';
import { FilterCondition } from '../types/filter-condition';
import DynamicFilterBox from './DynamicFilterBox';

export default function DynamicFilterPage() {
  const [conditions, setConditions] = useState<FilterCondition[]>(conditionList);

  const handleFieldChange = (index: number, newField: string) => {
    const fieldSchema = schemaList.find((f) => f.name === newField);
    if (!fieldSchema) return;
    setConditions((prev) => {
      const updated = [...prev];
      updated[index] = {
        field: newField,
        operator: fieldSchema.operators[0],
        value: ''
      };
      return updated;
    });
  };

  const handleOperatorChange = (index: number, newOperator: string) => {
    setConditions((prev) => {
      const updated = [...prev];
      updated[index].operator = newOperator;
      return updated;
    });
  };

  const handleValueChange = (index: number, newValue: string) => {
    setConditions((prev) => {
      const updated = [...prev];
      updated[index].value = newValue;
      return updated;
    });
  };

  const removeCondition = (index: number) => {
    setConditions((prev) => prev.filter((_, i) => i !== index));
    };


  const addCondition = () => {
    setConditions((prev) => [
      ...prev,
      { field: schemaList[0].name, operator: schemaList[0].operators[0], value: '' }
    ]);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dynamic Filter</h1>
      <DynamicFilterBox
        schema={schemaList}
        conditions={conditions}
        onFieldChange={handleFieldChange}
        onOperatorChange={handleOperatorChange}
        onValueChange={handleValueChange}
        onAddCondition={addCondition}
        onRemoveCondition={removeCondition}
      />
    </div>
  );
}
