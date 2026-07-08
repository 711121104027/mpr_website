//src/components/home/HeroSection.tsx

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

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0">

        <Image
          src="/hero-chair.png"
          alt="Office Furniture"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/60" />

      </div>

      {/* Content */}

      <div className="relative mx-auto max-w-7xl px-5 py-10 md:py-24 lg:px-8">

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            {/* Badge */}

            <span
  className="
    inline-flex
    items-center
    rounded-full
    border
    border-[#B5161B]
    bg-black/10
    px-5
    py-2
    font-[Inter]
    text-[11px]
    font-semibold
    uppercase
    tracking-[2px]
    text-[#FF4A4A]
    backdrop-blur-sm
  "
>
              Premium Office Furniture
            </span>

            {/* Heading */}

            <h1
              className={`${headingFont.className}
              mt-5
                md:mt-8
                max-w-xl
                text-white
                text-[28px]
leading-[1.15]
md:text-[36px]
lg:text-[44px]
              `}
            >
              Premium Office Furniture Crafted For Modern Workspaces
            </h1>

            {/* Description */}

            <p
              className={`${inter.className}
              mt-4
                md:mt-7
                max-w-[560px]
text-[15px]
leading-7
md:text-[16px]
md:leading-8
                text-white/85
              `}
            >
              Transform your workspace with ergonomic chairs,
              executive furniture and expert servicing solutions
              across Tamil Nadu.
            </p>

            {/* Buttons */}

            <div className="mt-10 hidden items-center gap-4 lg:flex">

              {/* Explore */}

              <Link
                href="/products"
                className={`${poppins.className}
group
flex
h-[50px]
w-full
items-center
justify-center
gap-2
rounded-xl
bg-[#B5161B]
px-3
text-[13px]
font-medium
text-white
transition-all
duration-300
hover:-translate-y-1
hover:bg-[#991218]
hover:shadow-2xl
md:h-[54px]
md:w-auto
md:gap-3
md:px-8
md:text-[15px]
`}
              >
                Explore Collection

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              {/* Service */}

              <Link
                href="/contact"
                className={`${poppins.className}
flex
h-[50px]
w-full
items-center
justify-center
rounded-xl
bg-white
px-3
text-[13px]
font-medium
text-[#202020]
transition-all
duration-300
hover:-translate-y-1
hover:shadow-2xl
md:h-[54px]
md:w-auto
md:px-8
md:text-[15px]
`}
              >
                Book Service
              </Link>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
  initial={{
    opacity: 0,
    x: 60,
  }}
  animate={{
    opacity: 1,
    x: 0,
    y: [0, -8, 0],
  }}
  transition={{
    opacity: {
      duration: 0.8,
      delay: 0.2,
    },
    x: {
      duration: 0.8,
      delay: 0.2,
    },
    y: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  className="flex justify-center lg:justify-end"
>
            <div
  className="
    overflow-hidden
    rounded-[28px]
    border
    border-white/10
    bg-white/10
    shadow-[0_30px_80px_rgba(0,0,0,0.35)]
    backdrop-blur-md
  "
>
              <Image
                src="/hero-chair.png"
                alt="Office Chair"
                width={650}
                height={650}
                priority
                className="
  h-auto
  w-full
  max-w-[560px]
  object-cover
"
              />
            </div>

          </motion.div>

          {/* Mobile Buttons */}

<div className="mt-0 grid grid-cols-2 gap-3 lg:hidden">

  <Link
    href="/products"
    className={`${poppins.className}
      group
      flex
      h-[50px]
      items-center
      justify-center
      gap-2
      rounded-xl
      bg-[#B5161B]
      px-3
      text-[13px]
      font-medium
      text-white
      transition-all
      duration-300
      hover:bg-[#991218]
    `}
  >
    Explore

    <ArrowRight
      size={16}
      className="transition-transform duration-300 group-hover:translate-x-1"
    />
  </Link>

  <Link
    href="/contact"
    className={`${poppins.className}
      flex
      h-[50px]
      items-center
      justify-center
      rounded-xl
      bg-white
      px-3
      text-[13px]
      font-medium
      text-[#202020]
      transition-all
      duration-300
      hover:shadow-lg
    `}
  >
    Book Service
  </Link>

</div>

        </div>

      </div>

    </section>
  );
}