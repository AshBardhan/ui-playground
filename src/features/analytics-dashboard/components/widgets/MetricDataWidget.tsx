import { MetricWidgetData } from '../../types/metrics';
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { Card } from '@/components/ui/Card';
import { Metric } from '@/components/ui/Metric';
import { Text } from '@/components/ui/Text';
import { Skeleton } from '@/components/ui/Skeleton';
import { useFetch } from '@/hooks/useFetch';

interface MetricDataWidgetProps {
	endpoint: string;
	refreshKey?: number;
	className?: string;
}

// Single metric item component (without Card wrapper)
interface MetricItemProps {
	data: MetricWidgetData;
}

const MetricItem = ({ data }: MetricItemProps) => {
	const formatValue = () => {
		const { value, format, prefix = '', suffix = '' } = data;

		if (format === 'currency') {
			return new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 0,
				maximumFractionDigits: 2,
			}).format(value);
		}

		if (format === 'percentage') {
			return `${value}${suffix}`;
		}

		// Default number formatting
		const formatted = value.toLocaleString('en-US', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		});

		return `${prefix}${formatted}${suffix}`;
	};

	const getTrendIcon = () => {
		switch (data.trend) {
			case 'up':
				return <TrendingUp className="h-4 w-4" />;
			case 'down':
				return <TrendingDown className="h-4 w-4" />;
			case 'neutral':
			default:
				return <Minus className="h-4 w-4" />;
		}
	};

	const getTrendColor = () => {
		if (data.change === 0) return 'text-gray-600';
		return data.change > 0 ? 'text-green-600' : 'text-red-600';
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-start justify-between">
				<div className="flex-1">
					<Metric label={data.label} value={formatValue()} size="lg" className="mb-2" />
					{data.description && (
						<Text variant="p" className="text-xs text-gray-500">
							{data.description}
						</Text>
					)}
				</div>
			</div>

			<div className={clsx('flex items-center text-sm font-medium', getTrendColor())}>
				{getTrendIcon()}
				<span className="ml-1">
					{data.change > 0 ? '+' : ''}
					{data.change.toFixed(1)}%
				</span>
				<span className="ml-2 text-gray-500 font-normal">vs last period</span>
			</div>
		</div>
	);
};

// Main widget component that fetches and displays metrics in a grid
export const MetricDataWidget = ({ endpoint, refreshKey = 0, className }: MetricDataWidgetProps) => {
	const { data, loading, error } = useFetch<MetricWidgetData[]>({
		url: `${endpoint}?v=${refreshKey}`,
	});

	return (
		<Card className={className}>
			{loading && (
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
					{[1, 2, 3, 4].map((i) => (
						<div key={i} className="space-y-3">
							<Skeleton height={16} />
							<Skeleton height={36} />
							<Skeleton height={12} />
							<div className="pt-2">
								<Skeleton height={20} />
							</div>
						</div>
					))}
				</div>
			)}

			{error && (
				<div className="flex items-center gap-2 text-red-600">
					<AlertCircle className="h-5 w-5" />
					<Text variant="p" className="text-sm">
						{error.message}
					</Text>
				</div>
			)}

			{!loading && !error && data && (
				<div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
					{data.map((metric) => (
						<MetricItem key={metric.id} data={metric} />
					))}
				</div>
			)}
		</Card>
	);
};
