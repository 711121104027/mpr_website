//src/components/products/ProductListing.tsx

"use client";

import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import Select from "@/components/ui/Select";

interface Category {
  id: string;
  name: string;
}

interface ProductImage {
  id: string;
  imageUrl: string;
  publicId: string;
}

interface ProductFeature {
  id: string;
  feature: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  code: string;
  description: string;

  category: Category;

  images: ProductImage[];

  features: ProductFeature[];
}

interface ProductListingProps {
  products: Product[];
  categories: Category[];
}

export default function ProductListing({
  products,
  categories,
}: ProductListingProps) {
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return products;
    }

    return products.filter(
      (product) =>
        product.category.id === selectedCategory
    );
  }, [products, selectedCategory]);

  const categoryOptions = [
    {
      label: "All Categories",
      value: "all",
    },

    ...categories.map((category) => ({
      label: category.name,
      value: category.id,
    })),
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-3 py-8 lg:px-4">

        {/* Header */}

        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          {/* Left */}

          <div>
            <p
              className="
                font-[Poppins]
                text-[16px]
                font-semibold
                text-[#202020]
              "
            >
              Showing{" "}
              <span className="text-[#B5161B]">
                {filteredProducts.length}
              </span>{" "}
              Products
            </p>
          </div>

          {/* Right */}

          <div className="w-full lg:w-[300px]">

            <Select
              label="FILTER BY CATEGORY"
              placeholder="All Categories"
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />

          </div>

        </div>

        {/* Products */}

        <ProductGrid products={filteredProducts} />

      </div>
    </section>
  );
}