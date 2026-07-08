//src/components/services/ServicesList.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Office Furniture Sales",
    image: "/services/office-furniture.png",
    reverse: false,
    points: [
      "Wide range of ergonomic office chairs",
      "Modern desks and workstations",
      "Conference and meeting room furniture",
      "Free delivery across Tamil Nadu",
      "Competitive pricing and bulk discounts",
      "Professional installation support",
    ],
  },
  {
    id: "02",
    title: "Repair & Maintenance",
    image: "/services/repair-maintenance.png",
    reverse: true,
    points: [
      "Expert repair for all furniture types",
      "On-site service across Tamil Nadu",
      "Chair mechanism repairs",
      "Upholstery repair and replacement",
      "Regular maintenance contracts",
      "Quick response and flexible scheduling",
    ],
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

export default function ServicesList() {
  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="mx-auto w-full max-w-[1450px] px-5 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-[1px] w-14 bg-[#c1121f]" />

            <span className="font-poppins text-[12px] md:text-xs font-semibold uppercase tracking-[3px] text-[#c1121f]">
              Our Expertise
            </span>

            <div className="h-[1px] w-14 bg-[#c1121f]" />
          </div>

          <h2 className="font-serif text-3xl italic text-black md:text-[38px]">
            Comprehensive Workspace Solutions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl font-inter text-[16px] md:text-[18px] leading-8 text-gray-600">
            Maximize the lifecycle of your assets with our precision repair
            services and regular maintenance schedules.
          </p>
        </motion.div>

        {/* Services */}
        <div className="mx-auto max-w-[1320px] space-y-18 xl:max-w-[1260px]">
          {services.map((service) => (
            <div
              key={service.id}
              className={`grid items-center gap-10 md:gap-14 lg:grid-cols-2 ${
                service.reverse ? "" : ""
              }`}
            >
              {/* Content */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: service.reverse ? 80 : -80,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                }}
                viewport={{ once: true }}
                className={`order-2 ${
  service.reverse ? "lg:order-2" : "lg:order-1"
}`}
              >
                <span className="inline-flex rounded-full border border-[#c1121f] px-5 py-2 font-poppins text-xs font-medium uppercase tracking-wider text-[#c1121f]">
                  Service {service.id}
                </span>

                <h3
                  className="mt-7 text-[36px] md:text-[42px] leading-tight text-black"
                  style={{
                    fontFamily: "Times New Roman",
                  }}
                >
                  {service.title}
                </h3>

                <motion.ul
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mt-8 space-y-5"
                >
                  {service.points.map((point) => (
                    <motion.li
                      key={point}
                      variants={item}
                      className="flex items-start gap-3 font-inter text-lg text-gray-700"
                    >
                      <span className="mt-[10px] h-[6px] w-[6px] rounded-full bg-black" />

                      <span>{point}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <Link
                  href="/contact"
                  className="group mt-10 inline-flex items-center gap-3 font-inter text-lg font-medium text-[#c1121f]"
                >
                  Enquire about this service

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                </Link>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: service.reverse ? -80 : 80,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.9,
                }}
                viewport={{ once: true }}
                className={`order-1 ${
  service.reverse ? "lg:order-1" : "lg:order-2"
}`}
              >
                <motion.div
                  whileHover={{
                    scale: 1.03,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="overflow-hidden rounded-sm shadow-xl"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={700}
                    height={500}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}