//src/components/home/ServicesSection.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const services = [
  {
    title: "Office Furniture Sales",
    description:
      "Discover premium office furniture designed for modern workspaces with quality, comfort and durability.",
    image: "/service-sales.png",
    href: "/services",
  },
  {
    title: "Office Furniture Repair",
    description:
      "Professional repair and maintenance services to restore and extend the life of your office furniture.",
    image: "/service-repair.png",
    href: "/services",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-10 text-center"
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
            Our Services
          </p>

          <h2
            className="
              mt-3
              font-[Poppins]
              text-[24px]
              font-semibold
              text-[#202020]
              md:text-[36px]
            "
          >
            Complete Furniture Solutions
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-2xl
              font-[Inter]
              text-[13px]
              md:text-[16px]
              leading-8
              text-[#666]
            "
          >
            We provide premium office furniture along with reliable repair and
            maintenance services for businesses of every size.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">

          {services.map((service, index) => (
            <motion.div
              key={service.title}
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
                duration: 0.6,
                delay: index * 0.15,
              }}
            >
              <Link
                href={service.href}
                className="
                  group
                  relative
                  block
                  overflow-hidden
                  rounded-[8px]
                "
              >
                {/* Image */}

                <div className="relative h-[380px] md:h-[480px] overflow-hidden">

                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />

                  {/* Overlay */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/90
                      via-black/45
                      to-transparent
                    "
                  />

                </div>

                {/* Content */}

                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    p-8
                    text-white
                  "
                >
                  <h3
                    className="
                      font-[Poppins]
                      text-[24px]
                      md:text-[30px]
                      font-semibold
                      leading-tight
                    "
                  >
                    {service.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      md:mt-4
                      max-w-md
                      font-[Inter]
                      text-[12px]
                      md:text-[15px]
                      leading-5
                      md:leading-7
                      text-white/85
                    "
                  >
                    {service.description}
                  </p>

                  <div
                    className="
                      mt-5
                      md:mt-8
                      inline-flex
                      items-center
                      gap-3
                      font-[Poppins]
                      text-[15px]
                      font-medium
                    "
                  >
                    Learn More

                    <ArrowRight
                      size={18}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </div>
                </div>

              </Link>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}