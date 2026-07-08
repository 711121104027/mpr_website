// src/app/products/page.tsx

import { prisma } from "@/lib/prisma";
import ProductListing from "@/components/products/ProductListing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Furniture | MPR Furniture",
  description:
    "Explore our premium office furniture collection.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        status: "ACTIVE",
      },
      include: {
        category: true,
        images: {
          orderBy: {
            createdAt: "asc",
          },
        },
        features: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  return (
    <main className="min-h-screen bg-white">
      <ProductListing
        products={products}
        categories={categories}
      />
    </main>
  );
}