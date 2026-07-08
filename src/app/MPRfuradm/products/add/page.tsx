//src/app/MPRfuradm/products/add/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ProductForm, {
  ProductFormValues,
} from "@/components/admin/ProductForm";

interface Category {
  id: string;
  name: string;
}

export default function AddProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] =
    useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const response = await fetch(
        "/api/admin/categories"
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setCategories(data);
    } catch {
      toast.error("Failed to load categories.");
    } finally {
      setLoadingCategories(false);
    }
  }

  async function handleSubmit(
    values: ProductFormValues
  ) {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/admin/products",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.message ??
            "Failed to create product."
        );
        return;
      }

      toast.success(
        "Product created successfully."
      );

      router.push("/MPRfuradm/products");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loadingCategories) {
    return (
      <div className="flex h-72 items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Add Product
        </h1>

        <p className="mt-1 text-gray-500">
          Create a new furniture product.
        </p>

      </div>

      <ProductForm
        categories={categories}
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
}