//src/components/products/ProductCard.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    code: string;

    category: {
      name: string;
    };

    images: {
      imageUrl: string;
    }[];
  };

  onEnquiry?: () => void;
}

export default function ProductCard({
  product,
  onEnquiry,
}: ProductCardProps) {
    return (
        <div
            className="
        overflow-hidden
        rounded-lg
        border
        border-gray-200
        bg-white
        transition-all
        duration-300
        hover:shadow-lg
      "
        >
            <Link href={`/products/${product.slug}`}>

                {/* Image Section */}

                <div className="relative">

                    {/* Category Badge */}

                    <div className="absolute left-3 top-3 z-10">

                        <span
                            className="
                rounded-[5px]
                border
                border-gray-200
                bg-white
                px-3
                py-2
                text-[8px]
                font-semibold
                uppercase
                tracking-wide
                text-[#B5161B]
              "
                        >
                            {product.category.name}
                        </span>

                    </div>

                    {/* Product Image */}

                    <div className="relative aspect-[4/3] bg-white p-3">
  <Image
    src={product.images[0]?.imageUrl ?? "/placeholder.png"}
    alt={product.name}
    fill
    unoptimized
    className="
      object-contain
      transition-transform
      duration-500
      hover:scale-105
    "
  />
</div>

                </div>

                {/* Content */}

                <div className="flex min-h-[180px] flex-col border-t border-gray-200 bg-white p-4">

                    {/* Title + Code */}

                    <div className="min-h-[72px]">

                        <h3
                            className="
      font-[Poppins]
      text-[16px]
      font-semibold
      leading-6
      text-[#231F20]
      line-clamp-2
    "
                        >
                            {product.name}
                        </h3>

                        <p
                            className="
      mt-2
      font-[Inter]
      text-[12px]
      text-[#555]
    "
                        >
                            Code: {product.code}
                        </p>

                    </div>

                    {/* Button */}

                    <button
  type="button"
  onClick={(e) => {
    e.preventDefault();

    if (onEnquiry) {
      onEnquiry();
    } else {
      window.location.href = `/products/${product.slug}`;
    }
  }}
  className="
    mt-auto
    h-11
    w-full
    rounded-md
    bg-[#B5161B]
    font-[Inter]
    text-[12px]
    md:text-[14px]
    font-medium
    text-white
    transition-colors
    duration-300
    hover:bg-[#991218]
  "
>
  View & Enquiry Product
</button>
                </div>

            </Link>
        </div>
    );
}