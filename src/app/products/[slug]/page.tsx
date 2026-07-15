//src/app/products/[slug]/page.tsx


import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import RelatedProducts from "@/components/products/RelatedProducts";
import ProductCTA from "@/components/products/ProductCTA";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";


interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await prisma.product.findFirst({
    where: {
      slug,
      status: "ACTIVE",
    },
    include: {
      images: {
        take: 1,
      },
    },
  });

  if (!product) {
    return {
      title: "Product Not Found | MPR Furniture",
    };
  }

  return {
    title: `${product.name} | MPR Furniture`,
    description: product.description,

    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.length
        ? [product.images[0].imageUrl]
        : [],
    },
  };
}

export default async function ProductDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const product = await prisma.product.findFirst({
  where: {
    slug,
    status: "ACTIVE",
  },

  include: {
    category: true,

    images: {
      orderBy: {
        createdAt: "asc",
      },
    },

    features: {
      orderBy: {
        id: "asc",
      },
    },
  },
});

  if (!product || product.status !== "ACTIVE") {
  notFound();
}

  const relatedProducts = await prisma.product.findMany({
  where: {
    status: "ACTIVE",

    categoryId: product.categoryId,

    NOT: {
      id: product.id,
    },
  },

  include: {
    category: true,

    images: {
      take: 1,
      orderBy: {
        createdAt: "asc",
      },
    },
  },

  take: 4,
});

  return (
    <main className="bg-white">

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-4">
        {/* Mobile Back Button */}

<div className="mb-6 lg:hidden">
  <Link
    href="/products"
    className="
      inline-flex
      items-center
      gap-2
      font-[Inter]
      text-[15px]
      text-gray-700
      transition
      hover:text-[#B5161B]
    "
  >
    <ArrowLeft size={18} />
    Back to Product
  </Link>
</div>

        <div className="grid gap-12 lg:grid-cols-2">
            
            
          <ProductGallery
            product={product}
          />

          <ProductInfo
            product={product}
          />
        </div>

      </section>

      <RelatedProducts
        products={relatedProducts}
        currentCategory={product.category.name}
      />

      <ProductCTA />

    </main>
  );
}