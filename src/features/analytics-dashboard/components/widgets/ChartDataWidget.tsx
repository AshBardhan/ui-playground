import { ChartData, TimeSeriesDataPoint, ChartDataPoint } from '../../types/chart';
import { LineChart } from '../charts/LineChart';
import { BarChart } from '../charts/BarChart';
import { PieChart } from '../charts/PieChart';
import { AreaChart } from '../charts/AreaChart';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Skeleton } from '@/components/ui/Skeleton';
import { AlertCircle } from 'lucide-react';
import { useFetch } from '@/hooks/useFetch';

interface ChartDataWidgetProps {
	endpoint: string;
	refreshKey?: number;
	className?: string;
}

export const ChartDataWidget = ({ endpoint, refreshKey = 0, className }: ChartDataWidgetProps) => {
	const { data, loading, error } = useFetch<ChartData>({
		url: `${endpoint}?v=${refreshKey}`,
	});
	const renderChart = () => {
		if (!data) return null;
		switch (data.type) {
			case 'line':
				return <LineChart data={data.data as TimeSeriesDataPoint[]} color={data.color} />;
			case 'bar':
				return <BarChart data={data.data as ChartDataPoint[]} color={data.color} />;
			case 'pie':
				return <PieChart data={data.data as ChartDataPoint[]} colors={data.colors} />;
			case 'area':
				return <AreaChart data={data.data as TimeSeriesDataPoint[]} color={data.color} />;
			default:
				return <div className="text-gray-500">Unsupported chart type</div>;
		}
	};

	return (
		<Card className={className}>
			{loading && (
				<div className="space-y-4">
					<Skeleton height={24} />
					<div className="space-y-2">
						<Skeleton height={200} />
						<div className="flex gap-2 justify-center">
							<Skeleton height={12} />
							<Skeleton height={12} />
							<Skeleton height={12} />
						</div>
					</div>
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

			{data && (
				<>
					<Text variant="h4" className="mb-4">
						{data.title}
					</Text>
					<div className="w-full">{renderChart()}</div>
				</>
			)}
		</Card>
	);
};
