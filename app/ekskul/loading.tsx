export default function LoadingEkskul() {
  return (
    <main className="max-w-6xl mx-auto p-6 animate-pulse">
      {/* Judul Skeleton */}
      <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>

      {/* Filter Skeleton */}
      <div className="mb-6 h-20 bg-slate-200 rounded-xl"></div>

      {/* Grid Kartu Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-48 bg-slate-200 rounded-xl"></div>
        ))}
      </div>
    </main>
  );
}