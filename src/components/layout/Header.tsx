import { Link, useNavigate, useLocation } from 'react-router-dom';
import { DropdownList } from '@/components/ui/DropdownList';
import { useState, useEffect } from 'react';

const pages = [
	{ title: 'Home', path: '/' },
	{ title: 'Campaign Dashboard', path: '/campaign-dashboard' },
	{ title: 'Analytics Dashboard', path: '/analytics-dashboard' },
	{ title: 'Dynamic Filter', path: '/dynamic-filter' },
];

export const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentPage = pages.find((p) => p.path === location.pathname);
	const [selectedPage, setSelectedPage] = useState(currentPage?.title || 'Home');

	useEffect(() => {
		const page = pages.find((p) => p.path === location.pathname);
		if (page) {
			setSelectedPage(page.title);
		}
	}, [location.pathname]);

	const handlePageSelect = (pageTitle: string) => {
		const page = pages.find((p) => p.title === pageTitle);
		if (page) {
			navigate(page.path);
			setSelectedPage(pageTitle);
		}
	};

	return (
		<header className="flex-shrink-0 bg-gray-900 text-gray-100 shadow-md">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<Link to="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
					UI Playground
				</Link>
				<nav>
					<DropdownList
						options={pages.map((p) => p.title)}
						selectedOption={selectedPage}
						onSelect={handlePageSelect}
						theme="dark"
					/>
				</nav>
			</div>
		</header>
	);
};
