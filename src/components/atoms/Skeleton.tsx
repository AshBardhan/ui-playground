interface SkeletonProps {
	height?: number;
}

export const Skeleton = ({ height = 10 }: SkeletonProps) => {
	return <div className={`w-full bg-gray-200 rounded animate-pulse`} style={{ height }}></div>;
};
