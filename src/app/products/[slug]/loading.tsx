//src/app/products/[slug]/loading.tsx

export default function Loading() {
  return (
    <main className="bg-white">

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-4">

        {/* Mobile Back */}

        <div className="mb-6 lg:hidden">
          <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2">

          {/* Gallery Skeleton */}

          <div>

            <div className="aspect-[4/3] w-full animate-pulse rounded-lg bg-gray-100" />

            <div className="mt-4 flex gap-4 overflow-hidden">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="
                    h-24
                    w-28
                    flex-shrink-0
                    animate-pulse
                    rounded-md
                    bg-gray-100
                  "
                />
              ))}

            </div>

          </div>

          {/* Product Information Skeleton */}

          <div className="flex flex-col">

            <div className="mb-8 h-5 w-32 animate-pulse rounded bg-gray-100" />

            <div className="h-4 w-28 animate-pulse rounded bg-gray-100" />

            <div className="mt-4 h-10 w-4/5 animate-pulse rounded bg-gray-100" />

            <div className="mt-4 h-5 w-28 animate-pulse rounded bg-gray-100" />

            <div className="my-8 h-px w-full bg-gray-200" />

            <div className="h-8 w-40 animate-pulse rounded bg-gray-100" />

            <div className="mt-5 space-y-3">

              <div className="h-4 w-full animate-pulse rounded bg-gray-100" />

              <div className="h-4 w-full animate-pulse rounded bg-gray-100" />

              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />

              <div className="h-4 w-4/6 animate-pulse rounded bg-gray-100" />

            </div>

            <div className="my-8 h-px w-full bg-gray-200" />

            <div className="h-8 w-44 animate-pulse rounded bg-gray-100" />

            <div className="mt-6 grid grid-cols-2 gap-5">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-6 animate-pulse rounded bg-gray-100"
                />
              ))}

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}