//src/app/products/[slug]/page.tsx


import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cache } from "react";
import type { Metadata } from "next";

import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import RelatedProducts from "@/components/products/RelatedProducts";
import ProductCTA from "@/components/products/ProductCTA";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/*
|--------------------------------------------------------------------------
| Get Product
|--------------------------------------------------------------------------
| cache() prevents duplicate product queries during the same request.
*/

const getProduct = cache(async (slug: string) => {
  return prisma.product.findFirst({
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
});

/*
|--------------------------------------------------------------------------
| Metadata
|--------------------------------------------------------------------------
*/

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProduct(slug);

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

      images: product.images[0]
        ? [
            {
              url: product.images[0].imageUrl,
            },
          ]
        : [],
    },
  };
}

/*
|--------------------------------------------------------------------------
| Product Details Page
|--------------------------------------------------------------------------
*/

export default async function ProductDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  /*
  |--------------------------------------------------------------------------
  | Main Product
  |--------------------------------------------------------------------------
  */

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  /*
  |--------------------------------------------------------------------------
  | Related Products
  |--------------------------------------------------------------------------
  */

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

    orderBy: {
      createdAt: "desc",
    },

    take: 4,
  });

  return (
    <main className="bg-white">

      {/* Product Section */}

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

        {/* Product Layout */}

        <div className="grid gap-12 lg:grid-cols-2">

          {/* Gallery */}

          <ProductGallery
            product={product}
          />

          {/* Information */}

          <ProductInfo
            product={product}
          />

        </div>

      </section>

      {/* Related Products */}

      <RelatedProducts
        products={relatedProducts}
        currentCategory={product.category.name}
      />

      {/* CTA */}

      <ProductCTA />

    </main>
  );
}