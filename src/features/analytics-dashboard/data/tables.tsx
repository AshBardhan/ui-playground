import { ProductPerformance, TableData } from '../types/table';

/** Generates test dataset with weighted random status for pagination testing */
const generateProductData = (count: number): ProductPerformance[] => {
	const productNames = [
		'iPhone 15 Pro',
		'MacBook Air M3',
		'Nike Air Max',
		'Sony WH-1000XM5',
		'Dyson V15',
		'Lululemon Yoga Mat',
		'Kindle Paperwhite',
		'LEGO Star Wars Set',
		'GoPro HERO12',
		'Fitbit Charge 6',
		'Bose SoundLink',
		'Instant Pot Duo',
		'Samsung Galaxy S24',
		'AirPods Pro',
		'Nintendo Switch',
		'PlayStation 5',
		'Xbox Series X',
		'Apple Watch Ultra',
		'iPad Pro 12.9',
		'Magic Keyboard',
	];

	const categories = ['Electronics', 'Clothing', 'Sports', 'Home & Garden', 'Books', 'Toys'];
	const statusWeights = [0.7, 0.2, 0.1]; // 70% active, 20% low-stock, 10% out-of-stock

	return Array.from({ length: count }, (_, i) => {
		const productIndex = i % productNames.length;
		const productVariant = Math.floor(i / productNames.length) + 1;

		// Weighted random status
		const rand = Math.random();
		let status: 'active' | 'low-stock' | 'out-of-stock' = 'active';
		if (rand < statusWeights[2]) status = 'out-of-stock';
		else if (rand < statusWeights[1] + statusWeights[2]) status = 'low-stock';

		return {
			id: String(i + 1),
			product:
				productVariant > 1
					? `${productNames[productIndex]} (${String.fromCharCode(64 + productVariant)})`
					: productNames[productIndex],
			category: categories[Math.floor(Math.random() * categories.length)],
			revenue: Math.floor(Math.random() * 50000) + 5000,
			units: Math.floor(Math.random() * 500) + 50,
			growth: (Math.random() - 0.5) * 50, // -25% to +25%
			status,
		};
	});
};

// Generate 100 rows for pagination testing
export const productPerformanceRows: ProductPerformance[] = generateProductData(100);

export const productPerformanceTable: TableData<ProductPerformance> = {
	id: 'product-performance',
	title: 'Product Performance',
	rows: productPerformanceRows,
	searchable: true,
	defaultSort: {
		key: 'revenue',
		direction: 'desc',
	},
};

// Keep V2 version for variety
export const productPerformanceRowsV2: ProductPerformance[] = generateProductData(100);

export const productPerformanceTableV2: TableData<ProductPerformance> = {
	id: 'product-performance',
	title: 'Product Performance',
	rows: productPerformanceRowsV2,
	searchable: true,
	defaultSort: {
		key: 'revenue',
		direction: 'desc',
	},
};
