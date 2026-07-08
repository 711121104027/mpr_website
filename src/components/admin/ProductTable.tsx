//src/components/admin/ProductTable.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Pencil, Trash2, Search } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  code: string;
  slug: string;
  status: "ACTIVE" | "INACTIVE";

  category: {
    id: string;
    name: string;
  };

  images: {
    imageUrl: string;
  }[];

  features: {
    id: string;
    feature: string;
  }[];

  createdAt: string;
}

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onDelete: (product: Product) => void;
}

export default function ProductTable({
  products,
  loading,
  onDelete,
}: ProductTableProps) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const value = search.toLowerCase();

      return (
        product.name.toLowerCase().includes(value) ||
        product.code.toLowerCase().includes(value) ||
        product.category.name.toLowerCase().includes(value)
      );
    });
  }, [products, search]);

  return (
    <div className="rounded-2xl border bg-white shadow-sm">

      {/* Header */}

      <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage all furniture products.
          </p>
        </div>

        <div className="relative w-full md:w-80">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search product..."
            className="h-11 w-full rounded-xl border pl-11 pr-4 outline-none focus:border-red-600"
          />

        </div>

      </div>

      {/* Loading */}

      {loading && (
        <div className="flex h-64 items-center justify-center">
          Loading products...
        </div>
      )}

      {/* Empty */}

      {!loading &&
        filteredProducts.length === 0 && (
          <div className="flex h-64 items-center justify-center text-gray-500">
            No products found.
          </div>
        )}

      {/* Table */}

      {!loading &&
        filteredProducts.length > 0 && (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-5 py-4 text-left">
                    Image
                  </th>

                  <th className="px-5 py-4 text-left">
                    Product
                  </th>

                  <th className="px-5 py-4 text-left">
                    Code
                  </th>

                  <th className="px-5 py-4 text-left">
                    Category
                  </th>

                  <th className="px-5 py-4 text-center">
                    Features
                  </th>

                  <th className="px-5 py-4 text-center">
                    Status
                  </th>

                  <th className="px-5 py-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredProducts.map((product) => (

                  <tr
                    key={product.id}
                    className="border-t hover:bg-gray-50"
                  >

                    {/* Image */}

                    <td className="px-5 py-4">

                      <div className="relative h-16 w-16 overflow-hidden rounded-lg border">

                        <Image
                          src={
                            product.images[0]?.imageUrl ??
                            "/placeholder.png"
                          }
                          alt={product.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />

                      </div>

                    </td>

                    {/* Name */}

                    <td className="px-5 py-4">

                      <div className="font-semibold">
                        {product.name}
                      </div>

                      <div className="text-xs text-gray-500">
                        {product.slug}
                      </div>

                    </td>

                    {/* Code */}

                    <td className="px-5 py-4">
                      {product.code}
                    </td>

                    {/* Category */}

                    <td className="px-5 py-4">
                      {product.category.name}
                    </td>

                    {/* Features */}

                    <td className="px-5 py-4 text-center">

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        {product.features.length}
                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-5 py-4 text-center">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          product.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.status}
                      </span>

                    </td>

                    {/* Actions */}

                    <td className="px-5 py-4">

                      <div className="flex justify-center gap-2">

                        <Link
                          href={`/MPRfuradm/products/edit/${product.id}`}
                          className="rounded-lg bg-amber-100 p-2 text-amber-700 hover:bg-amber-200"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() =>
                            onDelete(product)
                          }
                          className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

    </div>
  );
}