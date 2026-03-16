import { DashboardWidget } from './types/dashboard';
import { MetricDataWidget } from './components/widgets/MetricDataWidget';
import { ChartDataWidget } from './components/widgets/ChartDataWidget';
import { TableDataWidget } from './components/widgets/TableDataWidget';
import clsx from 'clsx';

interface AnalyticsDashboardLayoutProps {
	widgets: DashboardWidget[];
	refreshKey?: number;
	className?: string;
}

export const AnalyticsDashboardLayout = ({ widgets, refreshKey = 0, className }: AnalyticsDashboardLayoutProps) => {
	const renderWidget = (widget: DashboardWidget) => {
		const sizeClasses = {
			small: 'col-span-1',
			medium: 'col-span-1 lg:col-span-1',
			large: 'col-span-1 lg:col-span-2',
			full: 'col-span-1 lg:col-span-2',
		};

		const widgetClassName = clsx(sizeClasses[widget.size || 'medium']);

		switch (widget.type) {
			case 'metric':
				return (
					<div key={widget.id} className={widgetClassName}>
						<MetricDataWidget endpoint={widget.endpoint} refreshKey={refreshKey} />
					</div>
				);
			case 'chart':
				return (
					<div key={widget.id} className={widgetClassName}>
						<ChartDataWidget endpoint={widget.endpoint} refreshKey={refreshKey} />
					</div>
				);
			case 'table':
				return (
					<div key={widget.id} className={widgetClassName}>
						<TableDataWidget endpoint={widget.endpoint} refreshKey={refreshKey} />
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className={clsx('grid grid-cols-1 lg:grid-cols-2 gap-6', className)}>
			{widgets.map((widget) => renderWidget(widget))}
		</div>
	);
};
