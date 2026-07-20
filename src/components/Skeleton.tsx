export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm animate-pulse">
      <div className="mb-3 aspect-square rounded-xl bg-gray-100" />
      <div className="px-1 space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-100" />
        <div className="h-5 w-1/2 rounded bg-emerald-100" />
        <div className="h-3 w-1/3 rounded bg-gray-100" />
      </div>
      <div className="mt-3 h-10 w-full rounded-xl bg-gray-100" />
    </div>
  );
}

export function SectionSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
      {Array.from({ length: count }, (_, i) => <ProductCardSkeleton key={i} />)}
    </div>
  );
}
