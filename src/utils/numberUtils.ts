export const formatCurrency = (value: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
	}).format(value);
};

export const formatNumber = (value: number) => {
	return value.toLocaleString();
};

export const formatPercentage = (value: number) => {
	const sign = value > 0 ? '+' : '';
	return `${sign}${value.toFixed(1)}%`;
};
