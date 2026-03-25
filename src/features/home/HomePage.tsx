import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { PageContent } from '@/components/layout/PageContent';

const pages = [
	{
		title: 'Campaign Dashboard',
		link: '/campaign-dashboard',
		description:
			'Campaign management dashboard with filtering capabilities. View and manage campaigns with status, budget, and performance metrics.',
	},
	{
		title: 'Dynamic Filter',
		link: '/dynamic-filter',
		description:
			'Advanced dynamic filtering system with configurable conditions, operators, and logical grouping for complex queries.',
	},
	{
		title: 'Analytics Dashboard',
		link: '/analytics-dashboard',
		description:
			'Interactive analytics dashboard with D3 visualizations, data tables with search and sorting, and real-time metrics in a responsive grid layout.',
	},
];

export const HomePage = () => {
	return (
		<PageLayout>
			<PageContent>
				<div className="space-y-4">
					<div className="space-y-1">
						<Text variant="h1">UI Playground</Text>
						<Text variant="p">Explore different UI components and patterns</Text>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{pages.map((page) => (
							<Card key={page.link} href={page.link}>
								<Text variant="h2" className="mb-2">
									{page.title}
								</Text>
								<Text variant="p">{page.description}</Text>
							</Card>
						))}
					</div>
				</div>
			</PageContent>
		</PageLayout>
	);
};
