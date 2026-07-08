//src/app/MPRfuradm/products/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import ProductTable, {
  Product,
} from "@/components/admin/ProductTable";

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error(error);

      toast.error("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (
    product: Product
  ) => {
    const confirmed = window.confirm(
      `Delete "${product.name}"?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/admin/products/${product.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      toast.success(
        "Product deleted successfully."
      );

      fetchProducts();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete product."
      );
    }
  };

  return (
    <div className="space-y-8">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your furniture products.
          </p>
        </div>

        <Link
          href="/MPRfuradm/products/add"
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
        >
          <Plus size={20} />
          Add Product
        </Link>

      </div>

      <ProductTable
        products={products}
        loading={loading}
        onDelete={handleDelete}
      />

    </div>
  );
}