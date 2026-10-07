// src/app/MPRfuradm/spare-parts/page.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import SparePartTable, {
  SparePartItem,
} from "@/components/admin/SparePartTable";
import SparePartForm from "@/components/admin/SparePartForm";
import DeleteDialog from "@/components/admin/DeleteDialog";

export default function SparePartsPage() {
  const [spareParts, setSpareParts] = useState<SparePartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedPart, setSelectedPart] = useState<SparePartItem | null>(null);

  /**
   * Fetch Spare Parts
   */
  const fetchSpareParts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/spare-parts", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to fetch spare parts.");
        return;
      }

      setSpareParts(result);
    } catch {
      toast.error("Something went wrong loading spare parts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpareParts();
  }, [fetchSpareParts]);

  /**
   * Add Spare Part
   */
  function handleAddPart() {
    setSelectedPart(null);
    setFormOpen(true);
  }

  /**
   * Edit Spare Part
   */
  function handleEdit(part: SparePartItem) {
    setSelectedPart(part);
    setFormOpen(true);
  }

  /**
   * Delete Spare Part
   */
  function handleDelete(part: SparePartItem) {
    setSelectedPart(part);
    setDeleteOpen(true);
  }

  /**
   * Refresh List
   */
  async function refreshSpareParts() {
    await fetchSpareParts();
  }

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Spare Parts</h1>
          <p className="mt-1 text-gray-500">
            Manage replacement spare parts for office chairs and furniture.
          </p>
        </div>

        <button
          onClick={handleAddPart}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
        >
          <Plus size={18} />
          Add Spare Part
        </button>
      </div>

      {/* Spare Part Table */}
      <SparePartTable
        spareParts={spareParts}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add / Edit Form Modal */}
      <SparePartForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelectedPart(null);
        }}
        onSuccess={refreshSpareParts}
        sparePart={selectedPart}
      />

      {/* Delete Dialog */}
      {selectedPart && (
        <DeleteDialog
          open={deleteOpen}
          onClose={() => {
            setDeleteOpen(false);
            setSelectedPart(null);
          }}
          onSuccess={refreshSpareParts}
          id={selectedPart.id}
          title="Spare Part"
          endpoint="/api/admin/spare-parts"
        />
      )}
    </div>
  );
}
