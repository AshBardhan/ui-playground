import { useEffect, useState } from 'react';
import { FilterCondition, LogicalOperator } from '@/types/filter-condition';
import { FilterFieldSchema } from '@/types/filter-schema';
import { DynamicFilterBox } from '@/components/templates/DynamicFilterBox';
import { DynamicFilterBoxSkeleton } from '@/components/templates/DynamicFilterBoxSkeleton';

export const DynamicFilterPage = () => {
	const [loading, setLoading] = useState(true);
	const [conditions, setConditions] = useState<FilterCondition[]>([]);
	const [schemaList, setSchemaList] = useState<FilterFieldSchema[]>([]);

	const handleFieldChange = async (index: number, newField: string) => {
		const fieldSchema = schemaList.find((f) => f.name === newField);
		if (!fieldSchema) return;

		// Update the field instantly
		setConditions((prev) =>
			prev.map((condition, i) =>
				i === index && newField !== condition.field
					? {
							...condition,
							field: newField,
							operator: fieldSchema.operators[0],
							value: '',
							loading: fieldSchema.type === 'select' && !!fieldSchema.fetchURL,
						}
					: condition
			)
		);

		let defaultValue = '';

		// Fetch dynamic values (if applicable)
		if (fieldSchema.type === 'select') {
			if (fieldSchema.fetchURL && !fieldSchema.values) {
				// Only fetch if values haven't been fetched yet
				const fetchResponse = await fetch(fieldSchema.fetchURL);
				const fetched = await fetchResponse.json();
				defaultValue = fetched?.[0] ?? '';
				// Update the schema directly with fetched values
				setSchemaList((prev) =>
					prev.map((schema) => (schema.name === newField ? { ...schema, values: fetched } : schema))
				);
			} else if (fieldSchema.values?.length) {
				defaultValue = fieldSchema.values[0];
			}
		}

		// Update the condition
		setConditions((prev) =>
			prev.map((condition, i) =>
				i === index
					? {
							...condition,
							value: defaultValue,
							loading: false,
						}
					: condition
			)
		);
	};

	const handleLogicalOperatorChange = (index: number, newLogicalOperator: LogicalOperator) => {
		setConditions((prev) =>
			prev.map((condition, i) =>
				i === index && condition.logicalOperator !== newLogicalOperator
					? { ...condition, logicalOperator: newLogicalOperator }
					: condition
			)
		);
	};

	const handleOperatorChange = (index: number, newOperator: string) => {
		setConditions((prev) =>
			prev.map((condition, i) =>
				i === index && condition.operator !== newOperator ? { ...condition, operator: newOperator } : condition
			)
		);
	};

	const handleValueChange = (index: number, newValue: string | number) => {
		setConditions((prev) =>
			prev.map((condition, i) =>
				i === index && condition.value !== newValue ? { ...condition, value: newValue } : condition
			)
		);
	};

	const handleLeftBracketToggle = (index: number) => {
		setConditions((prev) =>
			prev.map((condition, i) => (i === index ? { ...condition, leftBracket: !condition.leftBracket } : condition))
		);
	};

	const handleRightBracketToggle = (index: number) => {
		setConditions((prev) =>
			prev.map((condition, i) => (i === index ? { ...condition, rightBracket: !condition.rightBracket } : condition))
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
				value: '',
				logicalOperator: 'AND',
			},
		]);
	};

	useEffect(() => {
		(async () => {
			setLoading(true);
			const [condResponse, schemaResponse] = await Promise.all([fetch('/api/conditions'), fetch('/api/schema')]);
			setConditions(await condResponse.json());
			setSchemaList(await schemaResponse.json());
			setLoading(false);
		})();
	}, []);

	return (
		<div className="p-4">
			<h1 className="text-xl font-bold mb-4">Dynamic Filter</h1>
			<div className="flex gap-5 min-h-[20vh]">
				<div className="border p-4 rounded-lg shadow-md w-1/2">
					<h2 className="text-lg font-semibold mb-4">Config Mode</h2>
					{loading ? (
						<DynamicFilterBoxSkeleton />
					) : (
						<DynamicFilterBox
							schema={schemaList}
							conditions={conditions}
							onFieldChange={handleFieldChange}
							onLogicalOperatorChange={handleLogicalOperatorChange}
							onOperatorChange={handleOperatorChange}
							onValueChange={handleValueChange}
							onLeftBracketToggle={handleLeftBracketToggle}
							onRightBracketToggle={handleRightBracketToggle}
							onAddCondition={addCondition}
							onRemoveCondition={removeCondition}
						/>
					)}
				</div>
				<div className="border p-4 rounded-lg shadow-md w-1/2">
					<h2 className="text-lg font-semibold mb-4">Read-Only Mode</h2>
					{loading ? (
						<DynamicFilterBoxSkeleton />
					) : (
						<DynamicFilterBox schema={schemaList} conditions={conditions} isReadOnly={true} />
					)}
				</div>
			</div>
		</div>
	);
};
