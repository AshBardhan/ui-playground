interface HeaderProps {
	title?: string;
}

export const Header = ({ title }: HeaderProps) => {
	return <h1 className="text-3xl font-bold">{title ? title : 'Default title'}</h1>;
};
