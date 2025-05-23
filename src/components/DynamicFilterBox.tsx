import { FilterFieldSchema } from '../types/filter-schema';
import { FilterCondition, LogicalOperator } from '../types/filter-condition';
import { Button, Input } from '@headlessui/react';
import DropdownList from './DropdownList';

interface DynamicFilterBoxProps {
	schema: FilterFieldSchema[];
	conditions: FilterCondition[];
	isReadOnly?: boolean;
	onFieldChange?: (index: number, field: string) => void;
	onLogicalOperatorChange?: (index: number, operator: LogicalOperator) => void;
	onOperatorChange?: (index: number, operator: string) => void;
	onValueChange?: (index: number, value: string | number) => void;
	onAddCondition?: () => void;
	onRemoveCondition?: (index: number) => void;
}

const DynamicFilterBox = ({
	schema,
	conditions,
	isReadOnly = false,
	onFieldChange,
	onLogicalOperatorChange,
	onOperatorChange,
	onValueChange,
	onAddCondition,
	onRemoveCondition,
}: DynamicFilterBoxProps) => {
	return (
		<div className={isReadOnly ? 'space-y-2' : 'space-y-4'}>
			{conditions.map((cond, index) => {
				const fieldSchema = schema.find((f) => f.name === cond.field);

				return (
					<div key={index}>
						{isReadOnly ? (
							<div>
								{index > 0 && <span className="mr-2">{cond.logicalOperator}</span>}
								<span className="mr-2">where</span>
								<span className="mr-2">{cond.field}</span>
								<span className="mr-2">{cond.operator}</span>
								<span>{cond.value || '--Empty--'}</span>
							</div>
						) : (
							<>
								{index > 0 && (
									<>
										{/* Logical Operator dropdown */}
										<div className="flex my-4">
											<DropdownList
												options={['AND', 'OR']}
												selectedOption={cond.logicalOperator || 'AND'}
												onSelect={(val) =>
													onLogicalOperatorChange && onLogicalOperatorChange(index, val as LogicalOperator)
												}
											/>
										</div>
									</>
								)}
								<div className="flex gap-3 items-center">
									{/* Field dropdown */}
									<DropdownList
										options={schema.map((field) => field.name)}
										selectedOption={cond.field}
										onSelect={(val) => onFieldChange && onFieldChange(index, val)}
									/>

									{/* Operator dropdown */}
									{fieldSchema && (
										<DropdownList
											options={fieldSchema.operators}
											selectedOption={cond.operator}
											onSelect={(val) => onOperatorChange && onOperatorChange(index, val)}
										/>
									)}

									{/* Value input */}
									{fieldSchema?.type === 'select' && fieldSchema.values ? (
										<DropdownList
											options={fieldSchema.values}
											selectedOption={cond.value as string}
											onSelect={(val) => onValueChange && onValueChange(index, val)}
										/>
									) : (
										<Input
											type={fieldSchema?.type === 'number' ? 'number' : 'text'}
											value={cond.value}
											onChange={(e) => onValueChange && onValueChange(index, e.target.value)}
											className="border px-2 py-1 rounded w-32"
										/>
									)}

									{/* Remove Condition */}
									{conditions.length > 1 && (
										<Button
											onClick={() => onRemoveCondition && onRemoveCondition(index)}
											className="text-red-500 hover:text-red-700"
										>
											✕
										</Button>
									)}
								</div>
							</>
						)}
					</div>
				);
			})}

			{/* Add Condition */}
			{!isReadOnly && (
				<Button onClick={onAddCondition} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
					Add Condition
				</Button>
			)}
		</div>
	);
};

export default DynamicFilterBox;
