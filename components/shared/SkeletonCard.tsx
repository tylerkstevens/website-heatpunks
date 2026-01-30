export function SkeletonCard() {
  return (
    <div className="p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-background)]">
      <div className="skeleton h-5 w-3/4 rounded mb-3" />
      <div className="skeleton h-4 w-full rounded mb-2" />
      <div className="skeleton h-4 w-2/3 rounded mb-3" />
      <div className="flex justify-between">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>
    </div>
  );
}
