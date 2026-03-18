import { useState, useMemo } from 'react';
import { ChartData, LineChartData, BarChartData, PieChartData, AreaChartData } from '../../types/chart';

import { LineChart } from '../charts/LineChart';
import { BarChart } from '../charts/BarChart';
import { PieChart } from '../charts/PieChart';
import { AreaChart } from '../charts/AreaChart';

import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Skeleton } from '@/components/ui/Skeleton';
import { DropdownList } from '@/components/ui/DropdownList';
import { AlertCircle } from 'lucide-react';
import { useFetch } from '@/hooks/useFetch';

interface ChartDataWidgetProps {
	endpoint: string;
	title: string;
	refreshKey?: number;
	className?: string;
	sortOptions?: string[];
	rangeOptions?: string[];
	periodOptions?: string[];
}

export const ChartDataWidget = ({
	endpoint,
	title,
	refreshKey,
	className,
	sortOptions,
	rangeOptions,
	periodOptions,
}: ChartDataWidgetProps) => {
	/**
	 * UI state for controls
	 */
	const [selectedSort, setSelectedSort] = useState(sortOptions?.[0] || 'Default');
	const [selectedRange, setSelectedRange] = useState(rangeOptions?.[0] || '');
	const [selectedPeriod, setSelectedPeriod] = useState(periodOptions?.[0] || '');

	/**
	 * Build API URL
	 * - Acts as unique cache key
	 * - Changing any param triggers new fetch
	 */
	const params = new URLSearchParams();

	if (selectedRange) {
		params.set('range', selectedRange.toLowerCase().replace(/\s+/g, '-'));
	}

	if (selectedPeriod) {
		params.set('period', selectedPeriod.toLowerCase());
	}

	params.set('r', String(refreshKey));

	const apiUrl = `${endpoint}?${params.toString()}`;

	/**
	 * Fetch data with caching enabled
	 * - cache: true → reuse responses
	 * - forceRefresh → bypass cache when parent triggers refresh
	 */
	const { data, loading, error } = useFetch<ChartData>({
		url: apiUrl,
	});

	/**
	 * Client-side sorting (derived state)
	 * - memoized to avoid unnecessary re-renders
	 */
	const sortedData = useMemo(() => {
		if (!data || !sortOptions) return data;

		const sortData = <T extends { value: number }>(points: T[]): T[] => {
			if (selectedSort === 'Ascending') {
				return [...points].sort((a, b) => a.value - b.value);
			}
			if (selectedSort === 'Descending') {
				return [...points].sort((a, b) => b.value - a.value);
			}
			return points;
		};

		if (data.type === 'bar') {
			return {
				...data,
				points: sortData((data as BarChartData).points),
			};
		}

		if (data.type === 'pie') {
			return {
				...data,
				points: sortData((data as PieChartData).points),
			};
		}

		return data;
	}, [data, selectedSort]);

	/**
	 * Chart renderer (factory pattern)
	 */
	const renderChart = () => {
		if (!sortedData) return null;

		switch (sortedData.type) {
			case 'line':
				return <LineChart data={sortedData as LineChartData} />;
			case 'bar':
				return <BarChart data={sortedData as BarChartData} />;
			case 'pie':
				return <PieChart data={sortedData as PieChartData} />;
			case 'area':
				return <AreaChart data={sortedData as AreaChartData} />;
			default:
				return <div className="text-gray-500">Unsupported chart type</div>;
		}
	};

	const hasControls = sortOptions || rangeOptions || periodOptions;

	/**
	 * Disable controls ONLY during initial load (no cached data yet)
	 */
	const disableControls = loading && !data;

	return (
		<Card className={className}>
			{/* HEADER */}
			<div className={`flex items-center justify-between mb-4 ${hasControls ? 'gap-4' : ''}`}>
				<Text variant="h4">{title}</Text>

				{hasControls && (
					<div className="flex items-center gap-2">
						{sortOptions && (
							<DropdownList
								options={sortOptions}
								selectedOption={selectedSort}
								onSelect={setSelectedSort}
								disabled={disableControls}
							/>
						)}
						{rangeOptions && (
							<DropdownList
								options={rangeOptions}
								selectedOption={selectedRange}
								onSelect={setSelectedRange}
								disabled={disableControls}
							/>
						)}
						{periodOptions && (
							<DropdownList
								options={periodOptions}
								selectedOption={selectedPeriod}
								onSelect={setSelectedPeriod}
								disabled={disableControls}
							/>
						)}
					</div>
				)}
			</div>

			{/* BODY STATES */}

			{/* Loading (only when no cached data exists) */}
			{loading && <Skeleton height={300} />}

			{/* Error */}
			{error && (
				<div className="flex items-center gap-2 text-red-600">
					<AlertCircle className="h-5 w-5" />
					<Text variant="p" className="text-sm">
						{error.message}
					</Text>
				</div>
			)}

			{/* Success */}
			{!loading && !error && sortedData && renderChart()}
		</Card>
	);
};
