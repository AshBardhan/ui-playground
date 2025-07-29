import { Skeleton } from '@/components/atoms/Skeleton';

export const DynamicFilterBoxSkeleton = () => {
	return (
		<div className="flex flex-col gap-4" data-testid="dynamic-filter-box-skeleton">
			<Skeleton />
			<Skeleton />
			<Skeleton />
			<Skeleton />
		</div>
	);
};
