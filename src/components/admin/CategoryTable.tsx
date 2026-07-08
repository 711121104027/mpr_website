//src/components/admin/CategoryTable.tsx

"use client";

import { useMemo, useState } from "react";
import {
  Pencil,
  Trash2,
  Search,
  FolderOpen,
} from "lucide-react";

export interface Category {
  id: string;
  name: string;
  _count: {
    products: number;
  };
}

interface CategoryTableProps {
  categories: Category[];
  loading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export default function CategoryTable({
  categories,
  loading,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [categories, search]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-200 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Category List
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage all furniture categories.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="h-11 w-full rounded-xl border border-gray-300 pl-11 pr-4 text-sm outline-none transition focus:border-red-600"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex h-72 items-center justify-center">
          <p className="text-gray-500">
            Loading categories...
          </p>
        </div>
      )}

      {/* Empty */}
      {!loading && filteredCategories.length === 0 && (
        <div className="flex h-72 flex-col items-center justify-center">
          <FolderOpen
            size={60}
            className="text-gray-300"
          />

          <h3 className="mt-5 text-xl font-semibold">
            No Categories Found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Add your first category to get started.
          </p>
        </div>
      )}

      {/* Table */}
      {!loading && filteredCategories.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  S.No
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Products
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map(
                (category, index) => (
                  <tr
                    key={category.id}
                    className="border-t border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-5 text-sm">
                      {index + 1}
                    </td>

                    <td className="px-6 py-5 font-medium text-gray-800">
                      {category.name}
                    </td>

                    <td className="px-6 py-5 text-center">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                        {category._count.products}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() =>
                            onEdit(category)
                          }
                          className="rounded-lg bg-amber-100 p-2 text-amber-700 transition hover:bg-amber-200"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() =>
                            onDelete(category)
                          }
                          className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}