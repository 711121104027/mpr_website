//src/components/admin/ProductForm.tsx

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useState } from "react";

import FeatureInput from "@/components/admin/FeatureInput";
import ImageUploader, {
  UploadedImage,
} from "@/components/admin/ImageUploader";

import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

export interface ProductFormValues {
  categoryId: string;
  name: string;
  code: string;
  slug: string;
  description: string;

  status: "ACTIVE" | "INACTIVE";

  features: string[];
  images: UploadedImage[];
}


interface ProductFormProps {
  categories: Category[];
  defaultValues?: ProductFormValues;
  onSubmit: (data: ProductFormValues) => Promise<void>;
  loading?: boolean;
}

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProductForm({
  categories,
  defaultValues,
  onSubmit,
  loading = false,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm<ProductFormValues>({
    defaultValues: defaultValues ?? {
  categoryId: "",
  name: "",
  code: "",
  slug: "",
  description: "",
  status: "ACTIVE",

  features: [],
  images: [],
},
  });

  const productName = watch("name") ?? "";

  const [features, setFeatures] = useState<string[]>(
  defaultValues?.features ?? []
);

const [images, setImages] = useState<UploadedImage[]>(
  defaultValues?.images ?? []
);

const router = useRouter();

  useEffect(() => {
    if (!defaultValues) {
      setValue("slug", generateSlug(productName));
    }
  }, [productName, setValue, defaultValues]);

  useEffect(() => {
  if (defaultValues) {
    setFeatures(defaultValues.features);
    setImages(defaultValues.images);
  }
}, [defaultValues]);

  return (
    <form
  onSubmit={handleSubmit((data) =>
    onSubmit({
      ...data,
      features,
      images,
    })
  )}
      className="space-y-6 rounded-2xl bg-white p-8 shadow-sm"
    >
      <div>
        <h2 className="text-2xl font-bold">
          Product Details
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Fill all required product information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Category */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select
            {...register("categoryId")}
            className="h-11 w-full rounded-xl border px-4 outline-none focus:border-red-600"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product Name */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Name
          </label>

          <input
            {...register("name")}
            placeholder="Executive Chair"
            className="h-11 w-full rounded-xl border px-4 outline-none focus:border-red-600"
          />
        </div>

        {/* Product Code */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Code
          </label>

          <input
            {...register("code")}
            placeholder="MPR001"
            className="h-11 w-full rounded-xl border px-4 outline-none focus:border-red-600"
          />
        </div>

        {/* Slug */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Slug
          </label>

          <input
            {...register("slug")}
            className="h-11 w-full rounded-xl border bg-gray-100 px-4 outline-none"
            readOnly
          />
        </div>

      </div>

      {/* Description */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>

        <textarea
          {...register("description")}
          rows={6}
          placeholder="Enter product description..."
          className="w-full rounded-xl border p-4 outline-none focus:border-red-600"
        />
      </div>

      {/* Features */}

<FeatureInput
  features={features}
  onChange={setFeatures}
/>

{/* Images */}

<ImageUploader
  value={images}
  onChange={setImages}
  maxFiles={10}
/>

      {/* Status */}

      <div>
  <label className="mb-2 block text-sm font-medium">
    Status
  </label>

  <select
    {...register("status")}
    className="h-11 w-full rounded-xl border px-4 outline-none focus:border-red-600"
  >
    <option value="ACTIVE">
      Active
    </option>

    <option value="INACTIVE">
      Inactive
    </option>
  </select>
</div>

      {/* Buttons */}

      <div className="flex justify-end gap-3">

        <button
  type="button"
  onClick={() => router.back()}
  className="rounded-xl border px-6 py-3 hover:bg-gray-100"
>
  Cancel
</button>

        <button
          disabled={loading}
          type="submit"
          className="rounded-xl bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700 disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : "Save Product"}
        </button>

      </div>
    </form>
  );
}