const campaignList = ['Campaign 1', 'Campaign 2', 'Campaign 3', 'Campaign 4', 'Campaign 5'];

export const fetchCampaigns = async () => {
	// Simulate an API call to fetch campaigns
	return new Promise((resolve) => {
		setTimeout(resolve, 1000, campaignList);
	});
};
