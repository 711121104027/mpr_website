//src/app/MPRfuradm/products/edit/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import ProductForm, {
  ProductFormValues,
} from "@/components/admin/ProductForm";
import { UploadedImage } from "@/components/admin/ImageUploader";

interface Category {
  id: string;
  name: string;
}

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] =
    useState<ProductFormValues | null>(null);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [categoryRes, productRes] =
        await Promise.all([
          fetch("/api/admin/categories"),
          fetch(`/api/admin/products/${id}`),
        ]);

      if (!categoryRes.ok || !productRes.ok) {
        throw new Error();
      }

      const categoryData = await categoryRes.json();
      const productData = await productRes.json();

      setCategories(categoryData);

      setProduct({
        categoryId: productData.categoryId,
        name: productData.name,
        code: productData.code,
        slug: productData.slug,
        description: productData.description,
        status: productData.status,

        features:
          productData.features.map(
            (item: any) => item.feature
          ),

        images:
          productData.images.map(
            (image: any): UploadedImage => ({
              imageUrl: image.imageUrl,
              publicId: image.publicId,
            })
          ),
      });
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load product."
      );
    } finally {
      setPageLoading(false);
    }
  }

  async function handleSubmit(
    values: ProductFormValues
  ) {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/admin/products/${id}`,
        {
          method: "PUT",
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
            "Update failed."
        );
        return;
      }

      toast.success(
        "Product updated successfully."
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

  if (pageLoading) {
    return (
      <div className="flex h-72 items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-red-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Product
        </h1>

        <p className="mt-1 text-gray-500">
          Update product information.
        </p>

      </div>

      <ProductForm
        categories={categories}
        defaultValues={product}
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
}