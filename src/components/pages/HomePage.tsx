import { Card } from '@/components/molecules/Card';

const pages = [
	{
		title: 'Dashboard',
		link: '/dashboard',
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
			<h1 className="text-3xl font-bold text-gray-900 mb-6">Implemented Pages</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{pages.map((page) => (
					<Card key={page.link} href={page.link}>
						<h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{page.title}</h2>
						<p className="font-normal text-gray-700">{page.description}</p>
					</Card>
				))}
			</div>
		</>
	);
};
