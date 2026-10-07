// src/components/services/SparePartsSection.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Poppins,
  Inter,
} from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

export interface SparePartData {
  id: string;
  name: string;
  imageUrl: string;
}

interface SparePartsSectionProps {
  initialParts?: SparePartData[];
}

export default function SparePartsSection({
  initialParts = [],
}: SparePartsSectionProps) {
  const [parts, setParts] = useState<SparePartData[]>(initialParts);

  useEffect(() => {
    if (initialParts.length > 0) {
      setParts(initialParts);
    } else {
      // Fetch dynamic spare parts from API if not preloaded
      fetch("/api/spare-parts")
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setParts(data);
          }
        })
        .catch(() => {});
    }
  }, [initialParts]);

  if (parts.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#FAFAFA] py-14 lg:py-20">
      <div className="mx-auto w-full max-w-[1450px] px-5 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto mb-14 max-w-4xl text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-4">
            <div className="h-[1px] w-14 bg-[#c1121f]" />

            <span
              className={`
                ${poppins.className}
                text-[11px]
                font-semibold
                uppercase
                tracking-[3px]
                text-[#c1121f]
                md:text-xs
              `}
            >
              Spare Parts
            </span>

            <div className="h-[1px] w-14 bg-[#c1121f]" />
          </div>

          <h2
            className={`
              ${poppins.className}
              text-[24px]
              font-semibold
              text-[#1E1E1E]
              md:text-[40px]
            `}
          >
            Premium Chair Spare Parts
          </h2>

          <p
            className={`
              ${inter.className}
              mx-auto
              mt-5
              max-w-3xl
              text-[12px]
              leading-8
              text-gray-600
              md:text-[17px]
            `}
          >
            We provide premium quality replacement spare parts for office
            chairs including wheels, hydraulic systems, mechanisms, handles and
            bases for long-lasting performance and smooth operation.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          className="
            grid
            grid-cols-2
            gap-5
            md:grid-cols-3
            lg:grid-cols-4
            lg:gap-7
          "
        >
          {parts.map((part, index) => (
            <motion.div
              key={part.id || part.name + index}
              initial={{
                opacity: 0,
                y: 40,
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
                delay: (index % 12) * 0.06,
              }}
              whileHover={{
                y: -8,
              }}
              className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:border-[#c1121f]/20
                hover:shadow-2xl
              "
            >
              {/* Image */}
              <div
                className="
                  relative
                  aspect-square
                  overflow-hidden
                  bg-white
                  p-5
                "
              >
                <Image
                  src={part.imageUrl}
                  alt={part.name}
                  fill
                  unoptimized
                  className="
                    object-contain
                    p-3
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                />
              </div>

              {/* Name */}
              <div className="border-t border-gray-100 px-4 py-5">
                <h3
                  className={`
                    ${poppins.className}
                    text-center
                    text-[15px]
                    font-semibold
                    text-[#202020]
                    md:text-[17px]
                  `}
                >
                  {part.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}