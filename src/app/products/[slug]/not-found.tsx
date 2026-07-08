// src/app/products/[slug]/not-found.tsx

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-[Poppins] text-5xl font-bold text-[#B5161B]">
        404
      </h1>

      <h2 className="mt-4 font-[Poppins] text-2xl font-semibold text-[#202020]">
        Product Not Found
      </h2>

      <p className="mt-3 max-w-md font-[Inter] text-gray-600">
        The product you are looking for doesn't exist or has been removed.
      </p>

      <Link
        href="/products"
        className="mt-8 rounded-lg bg-[#B5161B] px-6 py-3 font-[Inter] font-medium text-white transition hover:bg-[#991218]"
      >
        Back to Products
      </Link>
    </div>
  );
}