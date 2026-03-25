import { useState } from 'react';
import { AnalyticsDashboardLayout } from './AnalyticsDashboardLayout';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { PageContent } from '@/components/layout/PageContent';
import { RefreshCw } from 'lucide-react';
import { DASHBOARD_WIDGETS } from './constants/dashboard';

export const AnalyticsDashboardPage = () => {
	const [refreshKey, setRefreshKey] = useState(0);

	const handleRefresh = () => {
		setRefreshKey((prev) => prev + 1);
	};

	return (
		<PageLayout>
			<PageHeader>
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<Text variant="h1">Analytics Dashboard</Text>
						<Text variant="p" className="text-gray-500">
							Real-time analytics and insights
						</Text>
					</div>
					<Button onClick={handleRefresh} theme="secondary" size="lg">
						<RefreshCw className="h-5 w-5" />
						Refresh
					</Button>
				</div>
			</PageHeader>
			<PageContent>
				<AnalyticsDashboardLayout widgets={DASHBOARD_WIDGETS} refreshKey={refreshKey} />
			</PageContent>
		</PageLayout>
	);
};
