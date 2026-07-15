//src/components/home/TrustedBrands.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

const logos = [
  "/trusted/logo1.png",
  "/trusted/logo2.png",
  "/trusted/logo3.png",
  "/trusted/logo4.png",
  "/trusted/logo5.png",
  "/trusted/logo6.png",
  "/trusted/logo7.png",
];

// Duplicate for seamless marquee
const marqueeLogos = [...logos, ...logos];

export default function TrustedBrands() {
  return (
    <section className="overflow-hidden bg-white py-8 lg:py-12">

      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p
            className="
              font-[Inter]
              text-[13px]
              font-semibold
              uppercase
              tracking-[3px]
              text-[#B5161B]
            "
          >
            Trusted By
          </p>

          <h2
            className="
              mt-4
              font-[Poppins]
              text-[24px]
              font-semibold
              text-[#202020]
              md:text-[36px]
            "
          >
            Brands That Trust MPR Furniture
          </h2>

          <p
            className="
              mx-auto
              mt-3
              md:mt-5
              max-w-2xl
              font-[Inter]
              text-[12px]
              md:text-[16px]
              leading-8
              text-[#666]
            "
          >
            We proudly serve businesses, institutions and organizations with
            premium office furniture solutions.
          </p>

        </motion.div>

      </div>

      {/* Logo Marquee */}

      <div className="relative">

        {/* Left Fade */}

        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />

        {/* Right Fade */}

        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

        {/* Marquee */}

        <motion.div
          className="flex w-max gap-8"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 28,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {marqueeLogos.map((logo, index) => (
            <div
              key={index}
              className="
                group
                flex
                h-28
                w-56
                flex-shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#B5161B]/20
                hover:shadow-xl
              "
            >
              <Image
                src={logo}
                alt={`Brand ${index + 1}`}
                width={150}
                height={70}
                className="
  h-auto
  max-h-16
  w-auto
  object-contain
  transition-all
  duration-300
  group-hover:scale-105
"
              />
            </div>
          ))}
        </motion.div>

      </div>

    </section>
  );
}