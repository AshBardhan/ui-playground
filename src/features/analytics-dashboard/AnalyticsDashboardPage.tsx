import { useState } from 'react';
import { AnalyticsDashboardLayout } from './AnalyticsDashboardLayout';
import { Text } from '@/components/ui/Text';
import { RefreshCw } from 'lucide-react';
import { Button } from '@headlessui/react';
import { DASHBOARD_WIDGETS } from './constants/dashboard';

export const AnalyticsDashboardPage = () => {
	const [refreshKey, setRefreshKey] = useState(0);

	const handleRefresh = () => {
		setRefreshKey((prev) => prev + 1);
	};

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div>
					<Text variant="h1" className="mb-2">
						Analytics Dashboard
					</Text>
					<Text variant="p" className="text-gray-500">
						Real-time analytics and insights
					</Text>
				</div>
				<Button
					onClick={handleRefresh}
					className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
				>
					<RefreshCw className="h-4 w-4" />
					Refresh
				</Button>
			</div>

			<AnalyticsDashboardLayout widgets={DASHBOARD_WIDGETS} refreshKey={refreshKey} />
		</div>
	);
};
