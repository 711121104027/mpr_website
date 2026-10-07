// src/components/admin/SparePartTable.tsx

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Search, Wrench } from "lucide-react";

export interface SparePartItem {
  id: string;
  name: string;
  imageUrl: string;
  publicId?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SparePartTableProps {
  spareParts: SparePartItem[];
  loading: boolean;
  onEdit: (part: SparePartItem) => void;
  onDelete: (part: SparePartItem) => void;
}

export default function SparePartTable({
  spareParts,
  loading,
  onEdit,
  onDelete,
}: SparePartTableProps) {
  const [search, setSearch] = useState("");

  const filteredParts = useMemo(() => {
    return spareParts.filter((part) =>
      part.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [spareParts, search]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header & Search */}
      <div className="flex flex-col gap-4 border-b border-gray-200 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Spare Parts List
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage all chair spare parts and replacements.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search spare parts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-300 pl-11 pr-4 text-sm outline-none transition focus:border-red-600"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex h-72 items-center justify-center">
          <p className="text-gray-500">Loading spare parts...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredParts.length === 0 && (
        <div className="flex h-72 flex-col items-center justify-center">
          <Wrench size={54} className="text-gray-300" />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            No Spare Parts Found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Add your first spare part to display in the services section.
          </p>
        </div>
      )}

      {/* Table */}
      {!loading && filteredParts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  S.No
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Spare Part Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Created Date
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredParts.map((part, index) => (
                <tr
                  key={part.id}
                  className="transition hover:bg-gray-50/80"
                >
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-gray-200 bg-white p-1">
                      <Image
                        src={part.imageUrl}
                        alt={part.name}
                        fill
                        unoptimized
                        className="object-contain p-1"
                      />
                    </div>
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {part.name}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(part.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onEdit(part)}
                        title="Edit Spare Part"
                        className="rounded-lg bg-amber-100 p-2 text-amber-700 transition hover:bg-amber-200"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(part)}
                        title="Delete Spare Part"
                        className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
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
