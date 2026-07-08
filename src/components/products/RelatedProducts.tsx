//src/components/products/RelatedProducts.tsx

"use client";

import { motion } from "framer-motion";
import ProductGrid from "./ProductGrid";

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

interface RelatedProductsProps {
  products: Product[];
  currentCategory: string;
}

export default function RelatedProducts({
  products,
  currentCategory,
}: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-8 lg:py-12">

      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mb-12 text-center"
        >
          {/* Small Heading */}

          <div className="flex items-center justify-center gap-4">

            <span className="h-[1.5px] md:h-[1px] w-10 md:w-12 bg-[#B5161B]" />

            <p
              className="
                font-[Inter]
                text-[10px]
                md:text-[12px]
                font-semibold
                uppercase
                tracking-[3px]
                text-[#B5161B]
              "
            >
              You May Also Like
            </p>

            <span className="h-[1.5px] md:h-[1px] w-10 md:w-12 bg-[#B5161B]" />

          </div>

          {/* Main Heading */}

          <h2
            className="
              mt-5
              font-[Poppins]
              text-[24px]
              md:text-[20px]
              font-medium
              text-[#202020]
              lg:text-[42px]
            "
          >
            Related Products
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-2
              max-w-xl
              font-[Inter]
              text-[14px]
              md:text-[15px]
              leading-7
              text-gray-500
            "
          >
            Explore more premium furniture from our{" "}
            <span className="font-medium text-[#B5161B]">
              {currentCategory}
            </span>{" "}
            collection.
          </p>

        </motion.div>

        {/* Products */}

        <ProductGrid
  products={products}
  showEnquiry={false}
/>

      </div>

    </section>
  );
}