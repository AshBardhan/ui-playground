import { Skeleton } from '@/components/atoms/Skeleton';

export const DynamicFilterBoxSkeleton = () => {
	return (
		<div className="flex flex-col gap-4">
			<Skeleton />
			<Skeleton />
			<Skeleton />
			<Skeleton />
		</div>
	);
};
