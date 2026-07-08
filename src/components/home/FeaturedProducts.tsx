// src/components/home/FeaturedProducts.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/products/ProductGrid";
import {
    Cormorant_Garamond,
    Inter,
    Poppins,
} from "next/font/google";

const headingFont = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["500", "600"],
});

export default async function FeaturedProducts() {
    const products = await prisma.product.findMany({
        where: {
            status: "ACTIVE",
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
        <section className="bg-white py-8 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">

                {/* Header */}

                <div className="mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">

                    {/* Left */}
                    <div className="max-w-2xl">

                        <div className="mb-4 flex items-center gap-3">
                            <div className="h-[2px] w-10 bg-[#B5161B]" />

                            <p
                                className={`${inter.className}
          text-[12px]
          font-semibold
          uppercase
          tracking-[2px]
          text-[#B5161B]
        `}
                            >
                                Our Products
                            </p>
                        </div>

                        <h2
                            className={`${headingFont.className}
        text-[34px]
        leading-tight
        text-[#202020]
        md:text-[46px]
      `}
                        >
                            Featured Collection
                        </h2>

                        <p
                            className={`${inter.className}
        mt-3
        max-w-xl
        text-[14px]
        leading-7
        text-[#666666]
      `}
                        >
                            Discover our premium range of ergonomic office furniture designed for
                            comfort and productivity.
                        </p>

                    </div>

                    {/* Desktop Button */}
                    <Link
                        href="/products"
                        className={`${poppins.className}
      hidden
      lg:inline-flex
      h-12
      items-center
      justify-center
      gap-2
      rounded-lg
      bg-[#B5161B]
      px-7
      text-[14px]
      font-medium
      text-white
      transition-all
      duration-300
      hover:-translate-y-1
      hover:bg-[#991218]
      hover:shadow-lg
    `}
                    >
                        Show more Product
                        <ArrowRight size={16} />
                    </Link>

                </div>

                {/* Products */}

                <ProductGrid
                    products={products}
                    enableEnquiry={false}
                />

                {/* Mobile Button */}

<div className="mt-8 flex justify-center lg:hidden">

  <Link
    href="/products"
    className={`${poppins.className}
      inline-flex
      h-12
      w-full
      max-w-[260px]
      items-center
      justify-center
      gap-2
      rounded-lg
      bg-[#B5161B]
      px-7
      text-[14px]
      font-medium
      text-white
      transition-all
      duration-300
      hover:bg-[#991218]
    `}
  >
    Show more Product

    <ArrowRight size={16} />
  </Link>

</div>

            </div>
        </section>
    );
}