import { FilterFieldSchema } from '@/types/filter-schema';
import { FilterCondition, LogicalOperator } from '@/types/filter-condition';
import { Button, Input } from '@headlessui/react';
import { DropdownList } from '@/components/molecules/DropdownList';

interface DynamicFilterBoxProps {
	schema: FilterFieldSchema[];
	conditions: FilterCondition[];
	isReadOnly?: boolean;
	onFieldChange?: (index: number, field: string) => void;
	onLogicalOperatorChange?: (index: number, operator: LogicalOperator) => void;
	onOperatorChange?: (index: number, operator: string) => void;
	onValueChange?: (index: number, value: string | number) => void;
	onLeftBracketToggle?: (index: number) => void;
	onRightBracketToggle?: (index: number) => void;
	onAddCondition?: () => void;
	onRemoveCondition?: (index: number) => void;
}

export const DynamicFilterBox = ({
	schema,
	conditions,
	isReadOnly = false,
	onFieldChange,
	onLogicalOperatorChange,
	onOperatorChange,
	onValueChange,
	onLeftBracketToggle,
	onRightBracketToggle,
	onAddCondition,
	onRemoveCondition,
}: DynamicFilterBoxProps) => {
	const getBracketLevel = (index: number) => {
		let level = 0;
		for (let i = 0; i < index; i++) {
			if (conditions[i].leftBracket) level++;
			if (conditions[i].rightBracket) level--;
		}
		return level;
	};

	return (
		<div className={isReadOnly ? 'space-y-2' : 'space-y-4'} data-testid={`${isReadOnly ? 'read-only' : 'config'}-mode`}>
			{conditions.map((cond, index) => {
				const fieldSchema = schema.find((f) => f.name === cond.field);

				const startLevel = getBracketLevel(index);
				const nestedLevel = (startLevel > 0 ? startLevel : 0) + (cond.leftBracket ? 1 : 0);
				const endLevel = Math.max(getBracketLevel(index + 1), 0);

				return (
					<div role="group" aria-label="Filter Condition Group" key={index}>
						{isReadOnly ? (
							<>
								{cond.leftBracket && <div style={{ marginLeft: `${startLevel * 10}px` }}>[</div>}

								<div style={{ marginLeft: `${nestedLevel * 10}px` }}>where</div>

								<div style={{ marginLeft: `${nestedLevel * 10}px` }}>
									<span className="mr-2 font-medium">{cond.field}</span>
									<span className="mr-2">{cond.operator}</span>
									{cond.loading ? (
										<span>Loading...</span>
									) : (
										<span className="font-medium">{cond.value || '--Empty--'}</span>
									)}
								</div>

								{cond.rightBracket && <div style={{ marginLeft: `${endLevel * 10}px` }}>]</div>}

								{index < conditions.length - 1 && (
									<div className="my-2 text-pink-600" style={{ marginLeft: `${endLevel * 10}px` }}>
										{cond.logicalOperator}
									</div>
								)}
							</>
						) : (
							<>
								<div className="flex gap-3 items-center">
									{/* Left Bracket */}
									<div
										className={`border-4 h-10 w-2 border-r-0 ${
											cond.leftBracket ? 'border-black' : 'border-gray-300'
										} hover:border-gray-600`}
										onClick={() => onLeftBracketToggle?.(index)}
									></div>

									{/* Field dropdown */}
									<DropdownList
										options={schema.map((field) => field.name)}
										selectedOption={cond.field}
										disabled={cond.loading}
										onSelect={(val) => onFieldChange?.(index, val)}
									/>

									{/* Operator dropdown */}
									{fieldSchema && (
										<DropdownList
											options={fieldSchema.operators}
											selectedOption={cond.operator}
											disabled={cond.loading}
											onSelect={(val) => onOperatorChange?.(index, val)}
										/>
									)}

									{/* Value input or dropdown */}
									{fieldSchema?.type === 'select' && fieldSchema?.values?.length ? (
										<DropdownList
											options={fieldSchema.values}
											disabled={cond.loading}
											selectedOption={cond.value as string}
											onSelect={(val) => onValueChange?.(index, val)}
										/>
									) : (
										<Input
											type={fieldSchema?.type === 'number' ? 'number' : 'text'}
											value={cond.value}
											disabled={cond.loading}
											onChange={(e) => onValueChange?.(index, e.target.value)}
											className="border px-2 py-1 rounded h-8 leading-none min-w-20 text-left"
										/>
									)}

									{/* Right Bracket */}
									<div
										className={`border-4 h-10 w-2 border-l-0 ${
											cond.rightBracket ? 'border-black' : 'border-gray-300'
										} hover:border-gray-600`}
										onClick={() => onRightBracketToggle?.(index)}
									></div>

									{/* Remove Condition */}
									{conditions.length > 1 && (
										<Button
											type="button"
											onClick={() => onRemoveCondition?.(index)}
											className="text-red-500 hover:text-red-700"
										>
											✕
										</Button>
									)}
								</div>

								{index < conditions.length - 1 && (
									<div className="my-4">
										<DropdownList
											options={['AND', 'OR']}
											selectedOption={cond.logicalOperator || 'AND'}
											onSelect={(val) => onLogicalOperatorChange?.(index, val as LogicalOperator)}
										/>
									</div>
								)}
							</>
						)}
					</div>
				);
			})}

			{!isReadOnly && (
				<Button
					type="button"
					onClick={onAddCondition}
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
				>
					Add Condition
				</Button>
			)}
		</div>
	);
};
