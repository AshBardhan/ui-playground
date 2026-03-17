import { ProductPerformance, TableData, ColumnDefinition } from '../types/table';

export const productPerformanceRows: ProductPerformance[] = [
	{
		id: '1',
		product: 'iPhone 15 Pro',
		category: 'Electronics',
		revenue: 45600,
		units: 152,
		growth: 18.5,
		status: 'active',
	},
	{
		id: '2',
		product: 'MacBook Air M3',
		category: 'Electronics',
		revenue: 38900,
		units: 98,
		growth: 12.3,
		status: 'active',
	},
	{
		id: '3',
		product: 'Nike Air Max',
		category: 'Clothing',
		revenue: 28700,
		units: 287,
		growth: -3.2,
		status: 'low-stock',
	},
	{
		id: '4',
		product: 'Sony WH-1000XM5',
		category: 'Electronics',
		revenue: 24300,
		units: 215,
		growth: 24.6,
		status: 'active',
	},
	{
		id: '5',
		product: 'Dyson V15',
		category: 'Home & Garden',
		revenue: 21800,
		units: 76,
		growth: 8.9,
		status: 'active',
	},
	{
		id: '6',
		product: 'Lululemon Yoga Mat',
		category: 'Sports',
		revenue: 18500,
		units: 425,
		growth: 15.7,
		status: 'active',
	},
	{
		id: '7',
		product: 'Kindle Paperwhite',
		category: 'Books',
		revenue: 16200,
		units: 324,
		growth: 6.4,
		status: 'active',
	},
	{
		id: '8',
		product: 'LEGO Star Wars Set',
		category: 'Toys',
		revenue: 14900,
		units: 198,
		growth: -8.1,
		status: 'out-of-stock',
	},
	{
		id: '9',
		product: 'GoPro HERO12',
		category: 'Electronics',
		revenue: 13600,
		units: 87,
		growth: 11.2,
		status: 'active',
	},
	{
		id: '10',
		product: 'Fitbit Charge 6',
		category: 'Sports',
		revenue: 12300,
		units: 156,
		growth: 19.8,
		status: 'active',
	},
	{
		id: '11',
		product: 'Bose SoundLink',
		category: 'Electronics',
		revenue: 11700,
		units: 134,
		growth: 5.3,
		status: 'low-stock',
	},
	{
		id: '12',
		product: 'Instant Pot Duo',
		category: 'Home & Garden',
		revenue: 9800,
		units: 243,
		growth: -1.5,
		status: 'active',
	},
];

const formatCurrency = (value: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
	}).format(value);
};

const formatNumber = (value: number) => {
	return value.toLocaleString();
};

const formatPercentage = (value: number) => {
	const sign = value > 0 ? '+' : '';
	return `${sign}${value.toFixed(1)}%`;
};

const columns: ColumnDefinition<ProductPerformance>[] = [
	{
		key: 'product',
		label: 'Product',
		sortable: true,
		align: 'left',
		width: '25%',
	},
	{
		key: 'category',
		label: 'Category',
		sortable: true,
		align: 'left',
		width: '15%',
	},
	{
		key: 'revenue',
		label: 'Revenue',
		sortable: true,
		align: 'right',
		width: '15%',
		render: (value: number) => formatCurrency(value),
		sortValue: (row) => row.revenue,
	},
	{
		key: 'units',
		label: 'Units Sold',
		sortable: true,
		align: 'right',
		width: '12%',
		render: (value: number) => formatNumber(value),
		sortValue: (row) => row.units,
	},
	{
		key: 'growth',
		label: 'Growth',
		sortable: true,
		align: 'right',
		width: '12%',
		render: (value: number, row: ProductPerformance) => (
			<span className={value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-gray-600'}>
				{formatPercentage(value)}
			</span>
		),
		sortValue: (row) => row.growth,
	},
	{
		key: 'status',
		label: 'Status',
		sortable: true,
		align: 'right',
		width: '13%',
		render: (value: string) => {
			const statusColors = {
				active: 'bg-green-100 text-green-800',
				'low-stock': 'bg-yellow-100 text-yellow-800',
				'out-of-stock': 'bg-red-100 text-red-800',
			};
			const statusLabels = {
				active: 'Active',
				'low-stock': 'Low Stock',
				'out-of-stock': 'Out of Stock',
			};
			return (
				<span
					className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value as keyof typeof statusColors]}`}
				>
					{statusLabels[value as keyof typeof statusLabels]}
				</span>
			);
		},
	},
];

export const productPerformanceTable: TableData<ProductPerformance> = {
	id: 'product-performance',
	title: 'Product Performance',
	columns,
	rows: productPerformanceRows,
	searchable: true,
	defaultSort: {
		key: 'revenue',
		direction: 'desc',
	},
};
