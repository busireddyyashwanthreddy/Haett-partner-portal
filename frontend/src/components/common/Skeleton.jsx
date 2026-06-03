const Skeleton = ({ className = "h-4 w-full" }) => (
  <div className={`animate-pulse rounded-md bg-slate-200 ${className}`} />
);

export const SkeletonCard = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <Skeleton className="mb-4 h-6 w-1/3" />
    <Skeleton className="mb-2 h-4 w-full" />
    <Skeleton className="mb-2 h-4 w-5/6" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

export default Skeleton;
