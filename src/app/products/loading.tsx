//src/app/products/loading.tsx

export default function ProductsLoading() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

        {/* Header Skeleton */}

        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />

          <div className="h-14 w-full animate-pulse rounded-lg bg-gray-200 lg:w-[300px]" />
        </div>

        {/* Product Skeletons */}

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="aspect-[4/3] animate-pulse bg-gray-100" />

              <div className="p-4">
                <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200" />

                <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-gray-200" />

                <div className="mt-8 h-11 w-full animate-pulse rounded-md bg-gray-200" />
              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}