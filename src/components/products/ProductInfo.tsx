//src/components/products/ProductInfo.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Share2 } from "lucide-react";
import ProductEnquiryModal from "./ProductEnquiryModal";
import { toast } from "sonner";

interface ProductInfoProps {
  product: {
    name: string;
    slug: string;
    code: string;
    description: string;

    category: {
      name: string;
    };

    features: {
      id: string;
      feature: string;
    }[];
  };
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  const [open, setOpen] = useState(false);

  async function handleShare() {
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : "";

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url,
        });

        return;
      } catch {}
    }

    await navigator.clipboard.writeText(url);

    toast.success("Product link copied to clipboard.");
  }

  return (
    <>
      <div className="flex flex-col">

        {/* Back */}

        <Link
          href="/products"
          className="
  mb-8
  hidden
  w-fit
  items-center
  gap-2
  font-[Inter]
  text-[15px]
  text-gray-700
  transition
  hover:text-[#B5161B]
  lg:inline-flex
"
        >
          <ArrowLeft size={18} />
          Back to Product
        </Link>

        {/* Category */}

        <p
          className="
            font-[Inter]
            text-[12px]
            font-semibold
            uppercase
            tracking-wider
            text-[#B5161B]
          "
        >
          {product.category.name}
        </p>

        {/* Name */}

        <h1
          className="
            mt-2
            font-[Poppins]
            text-[20px]
            md:text-[28px]
            font-medium
            text-[#202020]
          "
        >
          {product.name}
        </h1>

        {/* Code */}

        <p
          className="
            mt-3
            font-[Inter]
            text-[14px]
            text-gray-600
          "
        >
          Code: {product.code}
        </p>

        <hr className="my-8 border-gray-400 md:border-gray-200" />

        {/* Description */}

        <h2
          className="
            font-[Poppins]
            text-[24px]
            font-medium
            text-[#B5161B]
          "
        >
          Description
        </h2>

        <p
          className="
            mt-4
            whitespace-pre-line
            font-[Inter]
            text-[17px]
            leading-8
            text-gray-700
          "
        >
          {product.description}
        </p>

        <hr className="my-8 border-gray-400 md:border-gray-200" />

        {/* Features */}

        <h2
          className="
            font-[Poppins]
            text-[28px]
            font-semibold
            text-[#B5161B]
          "
        >
          Key Features
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">

          {product.features.map((feature) => (

            <div
              key={feature.id}
              className="flex items-start gap-3"
            >

              <div
                className="
                  mt-0.5
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-green-100
                "
              >
                <Check
                  size={14}
                  className="text-green-600"
                />
              </div>

              <p
                className="
                  font-[Inter]
                  text-[15px]
                  leading-7
                  text-gray-700
                "
              >
                {feature.feature}
              </p>

            </div>

          ))}

        </div>

        <hr className="my-10 border-gray-400 md:border-gray-200" />

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-3 sm:gap-5">

          <button
  onClick={() => setOpen(true)}
  className="
    flex
    h-12
    items-center
    justify-center
    rounded-lg
    bg-[#B5161B]
    px-3
    font-[Inter]
    text-[13px]
    font-semibold
    text-white
    transition
    hover:bg-[#991218]
    sm:h-14
    sm:text-[16px]
  "
>
  Enquiry Now
</button>

          <button
  onClick={handleShare}
  className="
    flex
    h-12
    items-center
    justify-center
    gap-2
    rounded-lg
    border
    border-[#B5161B]
    bg-white
    px-3
    font-[Inter]
    text-[13px]
    font-semibold
    text-[#B5161B]
    transition
    hover:bg-[#FFF6F6]
    sm:h-14
    sm:gap-3
    sm:text-[16px]
  "
>
  <Share2
    size={16}
    className="sm:h-[18px] sm:w-[18px]"
  />

  <span>Share</span>
</button>

        </div>

      </div>

      {/* Popup */}

      <ProductEnquiryModal
        open={open}
        onClose={() => setOpen(false)}
        product={{
          name: product.name,
          code: product.code,
          slug: product.slug,
        }}
      />
    </>
  );
}