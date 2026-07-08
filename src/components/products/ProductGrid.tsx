// src/components/products/ProductGrid.tsx

"use client";

import ProductCard from "./ProductCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductEnquiryModal from "./ProductEnquiryModal";

interface Product {
  id: string;
  name: string;
  slug: string;
  code: string;

  category: {
    id: string;
    name: string;
  };

  images: {
    id: string;
    imageUrl: string;
  }[];
}

interface ProductGridProps {
  products: Product[];
  enableEnquiry?: boolean;
}

export default function ProductGrid({
  products,
  enableEnquiry = true,
}: ProductGridProps) {
  if (!products.length) {
  return null;
}

  const router = useRouter();

const [open, setOpen] = useState(false);

const [selectedProduct, setSelectedProduct] =
  useState<Product | null>(null);

  function handleEnquiry(product: Product) {
  setSelectedProduct(product);
  setOpen(true);
}

function handleClose() {
  setOpen(false);

  if (selectedProduct) {
    router.push(`/products/${selectedProduct.slug}`);
  }
}

  return (
    <div
  className="
    grid
    grid-cols-2
    gap-4
    lg:grid-cols-3
    xl:grid-cols-4
  "
>
      {products.map((product) => (
        <ProductCard
  key={product.id}
  product={product}
  onEnquiry={
    enableEnquiry
      ? () => handleEnquiry(product)
      : undefined
  }
/>
      ))}

      {enableEnquiry && (
  <ProductEnquiryModal
    open={open}
    product={selectedProduct}
    onClose={handleClose}
  />
)}
    </div>
  );
}