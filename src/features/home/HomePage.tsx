import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';

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
];

export const HomePage = () => {
	return (
		<>
			<Text variant="h1" className="mb-6">
				Implemented Pages
			</Text>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{pages.map((page) => (
					<Card key={page.link} href={page.link}>
						<Text variant="h2" className="mb-2">
							{page.title}
						</Text>
						<Text>{page.description}</Text>
					</Card>
				))}
			</div>
		</>
	);
};
