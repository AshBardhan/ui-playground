import { useState } from 'react';
import Header from './Header';
import { Button } from '@headlessui/react';

const HomePage = () => {
	const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
	const [likes, setLikes] = useState(0);

	const handleClick = () => {
		setLikes(likes + 1);
	};

	return (
		<div>
			<Header title="Develop. Preview. Ship. - Build in Vite" />
			<ul>
				{names.map((name) => (
					<li key={name}>{name}</li>
				))}
			</ul>
			<Button
				className="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 p-4 rounded-lg font-bold text-white cursor-pointer"
				onClick={handleClick}
			>
				Like ({likes})
			</Button>
		</div>
	);
};

export default HomePage;
