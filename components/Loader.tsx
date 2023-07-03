import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const Loader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between items-center gap-2">
      {Array.from({ length: 6 }, (_, i) => i + 1).map((id) => (
        <div className="Allproduct-card" key={id}>
          <Skeleton className="h-[270px] w-250 bg-gray-400" />
          <Skeleton className="bg-gray-200 Allproduct-name"> </Skeleton>
          <Skeleton className="Allproduct-tag"> </Skeleton>
          <Skeleton className="Allproduct-price"> </Skeleton>
        </div>
      ))}
    </div>
  );
};
