//src/components/home/WhyChooseUs.tsx

"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sofa,
  Wrench,
  Headset,
} from "lucide-react";
import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

const features = [
  {
    title: "Premium Quality",
    description:
      "We use durable materials and quality craftsmanship to ensure long-lasting office furniture.",
    icon: ShieldCheck,
  },
  {
    title: "Modern Designs",
    description:
      "Elegant furniture collections designed for contemporary office environments.",
    icon: Sofa,
  },
  {
    title: "Professional Service",
    description:
      "Experienced team providing installation, maintenance and repair support.",
    icon: Wrench,
  },
  {
    title: "Tamil Nadu Coverage",
    description:
      "Service available across all over the districts of Tamil Nadu.",
    icon: Headset,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#FFFFFF] py-8 lg:py-12">

      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-14 text-center"
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
            Why Choose Us
          </p>

          <h2
            className="
              mt-4
              font-[Poppins]
              text-[20px]
              md:text-[24px]
              font-semibold
              text-[#202020]
              md:text-[36px]
            "
          >
            Why Businesses Trust
            MPR Furniture
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-3xl
              font-[Inter]
              text-[15px]
              leading-8
              text-[#666]
            "
          >
            We deliver premium furniture solutions backed by quality,
            reliability and years of industry experience.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid gap-3 md:gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {features.map((item, index) => {

            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 30,
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
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="
                  rounded-2xl
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  duration-300
                  hover:shadow-xl
                "
              >
                {/* Icon */}

                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#B5161B]/10
                  "
                >
                  <Icon
                    size={30}
                    className="text-[#B5161B]"
                  />
                </div>

                {/* Title */}

                <h3
                  className="
                    mt-6
                    font-[Poppins]
                    text-[20px]
                    font-medium
                    text-[#202020]
                  "
                >
                  {item.title}
                </h3>

                {/* Description */}

                <p
                  className="
                    mt-4
                    font-[Inter]
                    text-[15px]
                    leading-7
                    text-[#666]
                  "
                >
                  {item.description}
                </p>
              </motion.div>
            );

          })}

        </div>

      </div>

    </section>
  );
}