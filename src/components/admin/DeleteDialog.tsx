//src/components/admin/DeleteDialog.tsx

"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  id: string;
  title: string;
  endpoint: string;
}

export default function DeleteDialog({
  open,
  onClose,
  onSuccess,
  id,
  title,
  endpoint,
}: DeleteDialogProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      const response = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Delete failed.");
        return;
      }

      toast.success(result.message || "Deleted successfully.");

      onSuccess();
      onClose();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex flex-col items-center border-b px-6 py-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle
              className="text-red-600"
              size={34}
            />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            Delete {title}
          </h2>

          <p className="mt-2 text-center text-sm leading-6 text-gray-500">
            This action cannot be undone.
            <br />
            Are you sure you want to permanently delete this {title.toLowerCase()}?
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium transition hover:bg-gray-100 disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex min-w-[140px] items-center justify-center rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="mr-2 animate-spin"
                />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}