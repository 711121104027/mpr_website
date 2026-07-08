//src/components/about/WhyChoose.tsx

"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Handshake, Lightbulb } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const features = [
  {
    icon: BadgeCheck,
    title: "Quality Assurance",
    description:
      "Every product undergoes rigorous quality checks to ensure durability, functionality, and customer satisfaction.",
  },
  {
    icon: Handshake,
    title: "Customer Focus",
    description:
      "We prioritize our customers' needs by providing personalized solutions, transparent communication, and reliable after-sales support.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Our modern furniture designs combine aesthetics with functionality to create inspiring and productive workspaces.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-8 lg:py-14 mb-6">
      <div className="mx-auto w-full max-w-[1450px] px-5 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 md:mb-14 max-w-3xl text-center"
        >
          <h2
            className={`${poppins.className} text-[20px] md:text-[24px] font-semibold text-[#3E3E3E] lg:text-[32px] tracking-[2px]`}
          >
            Why Choose MPR Furniture
          </h2>

          <p
            className={`${poppins.className} mt-5 text-[14px] md:text-[17px] leading-7 md:leading-8 text-[#666666]`}
          >
            We combine quality craftsmanship, customer satisfaction, and
            innovative solutions to create office furniture that lasts.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#E10600]/20 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[12px] bg-red-50">
                  <Icon
                    size={26}
                    strokeWidth={2.2}
                    className="text-[#E10600]"
                  />
                </div>

                {/* Title */}
                <h3
                  className={`${poppins.className} text-[20px] font-semibold text-[#3E3E3E]`}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className={`${poppins.className} mt-3 text-[14px] leading-7 text-[#666666]`}
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}