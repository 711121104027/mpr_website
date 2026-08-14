// src/components/products/ProductGallery.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  product: {
    images: {
      id: string;
      imageUrl: string;
    }[];

    name: string;
  };
}

export default function ProductGallery({
  product,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = product.images;

  return (
    <div className="w-full min-w-0 max-w-full">

      {/* =====================================================
          MAIN PRODUCT IMAGE
      ====================================================== */}

      <div
        className="
          relative
          w-full
          min-w-0
          max-w-full
          overflow-hidden
          rounded-lg
          border
          border-gray-200
          bg-white
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={images[selectedImage]?.id ?? "placeholder"}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              relative
              h-[240px]
              w-full
              min-w-0
              sm:h-[300px]
              lg:aspect-[4/3]
              lg:h-auto
            "
          >
            <Image
              src={
                images[selectedImage]?.imageUrl ??
                "/placeholder.png"
              }
              alt={product.name}
              fill
              priority={selectedImage === 0}
              unoptimized
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                50vw
              "
              className="
                object-contain
                p-3
                sm:p-4
              "
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =====================================================
          THUMBNAILS
      ====================================================== */}

      {images.length > 1 && (
        <div
          className="
            mt-4
            w-full
            min-w-0
            max-w-full
            overflow-x-auto
            overflow-y-hidden
            overscroll-x-contain
            pb-2
            scrollbar-thin
          "
        >
          <div
            className="
              flex
              w-max
              min-w-full
              gap-3
              sm:gap-4
            "
          >
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedImage(index)}
                aria-label={`View image ${index + 1}`}
                className={`
                  relative
                  h-[72px]
                  w-[72px]
                  flex-shrink-0
                  overflow-hidden
                  rounded-md
                  border-2
                  bg-white
                  transition-all
                  duration-200

                  sm:h-20
                  sm:w-24

                  lg:h-24
                  lg:w-28

                  ${
                    selectedImage === index
                      ? "border-[#B5161B]"
                      : "border-gray-200 hover:border-gray-400"
                  }
                `}
              >
                <Image
                  src={image.imageUrl}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  unoptimized
                  sizes="112px"
                  className="
                    object-contain
                    p-2
                  "
                />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}