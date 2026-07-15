//src/components/products/ProductGallery.tsx

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
    <div className="w-full">

      {/* Main Image */}

      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white">

        <AnimatePresence mode="wait">

          <motion.div
            key={images[selectedImage]?.id}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            whileHover={{
  scale: 1.02,
}}
            transition={{
              duration: 0.3,
            }}
            className="relative aspect-[4/3] w-full"
          >
            <Image
              src={
                images[selectedImage]?.imageUrl ??
                "/placeholder.png"
              }
              alt={product.name}
              fill
              priority
              unoptimized
              className="object-contain p-4"
            />
          </motion.div>

        </AnimatePresence>

      </div>

      {/* Thumbnails */}

      {images.length > 1 && (
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">

          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() =>
                setSelectedImage(index)
              }
              className={`
                relative
                h-24
                w-28
                flex-shrink-0
                overflow-hidden
                rounded-md
                border-2
                transition-all
                duration-300

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
                className="object-contain p-2"
              />
            </button>
          ))}

        </div>
      )}
    </div>
  );
}