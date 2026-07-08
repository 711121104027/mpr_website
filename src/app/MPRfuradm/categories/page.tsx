//src/app/MPRfuradm/categories/page.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import CategoryTable, {
  Category,
} from "@/components/admin/CategoryTable";
import CategoryForm from "@/components/admin/CategoryForm";
import DeleteDialog from "@/components/admin/DeleteDialog";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  /**
   * Fetch Categories
   */
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/categories", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(
          result.message || "Failed to fetch categories."
        );
        return;
      }

      setCategories(result);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  /**
   * Add Category
   */
  function handleAddCategory() {
    setSelectedCategory(null);
    setFormOpen(true);
  }

  /**
   * Edit Category
   */
  function handleEdit(category: Category) {
    setSelectedCategory(category);
    setFormOpen(true);
  }

  /**
   * Delete Category
   */
  function handleDelete(category: Category) {
    setSelectedCategory(category);
    setDeleteOpen(true);
  }

  /**
   * Refresh List
   */
  async function refreshCategories() {
    await fetchCategories();
  }

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Categories
          </h1>

          <p className="mt-1 text-gray-500">
            Manage furniture categories.
          </p>
        </div>

        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Category Table */}
      <CategoryTable
        categories={categories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add / Edit Category */}
      <CategoryForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelectedCategory(null);
        }}
        onSuccess={refreshCategories}
        category={selectedCategory}
      />

      {/* Delete Category */}
      {selectedCategory && (
        <DeleteDialog
          open={deleteOpen}
          onClose={() => {
            setDeleteOpen(false);
            setSelectedCategory(null);
          }}
          onSuccess={refreshCategories}
          id={selectedCategory.id}
          title="Category"
          endpoint="/api/admin/categories"
        />
      )}
    </div>
  );
}