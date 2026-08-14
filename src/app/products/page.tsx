// src/app/products/page.tsx

import { prisma } from "@/lib/prisma";
import ProductListing from "@/components/products/ProductListing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Furniture | MPR Furniture",
  description:
    "Explore our premium office furniture collection.",
};

// Revalidate the product listing periodically.
// Admin changes can explicitly invalidate this page.
export const revalidate = 60;

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        status: "ACTIVE",
      },

      select: {
        id: true,
        name: true,
        slug: true,
        code: true,

        category: {
          select: {
            id: true,
            name: true,
          },
        },

        images: {
          select: {
            id: true,
            imageUrl: true,
          },
          orderBy: {
            createdAt: "asc",
          },
          take: 1,
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },

      orderBy: {
        name: "asc",
      },
    }),
  ]);

  return (
    <main className="bg-white">
      <ProductListing
        products={products}
        categories={categories}
      />
    </main>
  );
}