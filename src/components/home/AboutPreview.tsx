//src/components/home/AboutPreview.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

export default function AboutPreview() {
  return (
    <section className="bg-white py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">

          {/* Image */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative"
          >
            <div
              className="
                overflow-hidden
                rounded-[10px]
                shadow-[0_30px_70px_rgba(0,0,0,0.12)]
              "
            >
              <Image
                src="/about-preview.png"
                alt="About MPR Furniture"
                width={700}
                height={700}
                className="
                  h-full
                  w-full
                  object-cover
                  transition
                  duration-700
                  hover:scale-105
                "
              />
            </div>
          </motion.div>

          {/* Content */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
          >
            {/* Small Heading */}

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
              About MPR Furniture
            </p>

            {/* Title */}

            <h2
              className={`${headingFont.className}
                mt-3
                text-[28px]
                leading-tight
                text-[#202020]
                md:text-[42px]
              `}
            >
              Creating Inspiring
              Office Spaces
            </h2>

            {/* Red Line */}

            <div className="mt-4 h-[1.5px] md:h-[3px] w-34 md:w-54 rounded-full bg-[#B5161B]" />

            {/* Description */}

            <p
              className={`${inter.className}
                mt-4
                max-w-xl
                text-[13px]
                md:text-[16px]
                leading-8
                text-[#555]
              `}
            >
              At MPR Furniture, we specialize in premium office furniture,
              ergonomic seating solutions, modular workstations, and expert
              repair services. With years of experience, we deliver furniture
              that combines durability, comfort, and modern aesthetics for
              businesses of every size.
            </p>

            {/* Button */}

            <Link
              href="/about"
              className={`${poppins.className}
                group
                mt-6
                inline-flex
                h-[46px]
                items-center
                gap-3
                rounded-[8px]
                bg-[#B5161B]
                px-12
                text-[15px]
                font-medium
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#991218]
                hover:shadow-xl
              `}
            >
              Learn More

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
}