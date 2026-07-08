//src/components/about/AboutStory.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function AboutStory() {
  return (
    <section className="bg-white py-8 lg:py-14">
      <div className="mx-auto w-full max-w-[1450px] px-5 lg:px-8">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >

            {/* Small Heading */}
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#E10600]" />

              <span
                className={`${poppins.className} text-[10px] font-semibold uppercase tracking-[2px] text-[#E10600]`}
              >
                Our Story
              </span>
            </div>

            {/* Main Heading */}
            <h2
              className={`${poppins.className} max-w-xl text-[22px] font-bold leading-tight text-[#3E3E3E] lg:text-[30px]`}
            >
              Building Tomorrow's Workspaces
            </h2>

            {/* Paragraph 1 */}
            <p
              className={`${poppins.className} mt-4 md:mt-6 text-[14px] lg:text-[15px] leading-9 text-[#666666]`}
            >
              Founded over 15 years ago, MPR Furniture has grown from a
              small local business into one of Tamil Nadu's most trusted
              names in office furniture solutions. Our journey began with
              a simple vision: to provide high-quality, ergonomic
              furniture that enhances workplace productivity and employee
              well-being.
            </p>

            {/* Paragraph 2 */}
            <p
              className={`${poppins.className} mt-3 md:mt-4 text-[14px] lg:text-[15px] leading-9 text-[#666666]`}
            >
              Today, we serve hundreds of businesses across Tamil Nadu,
              from small startups to large corporations. Our commitment
              to quality, innovation, and customer satisfaction has earned
              us a reputation as a reliable partner for all office
              furniture needs.
            </p>

            {/* Paragraph 3 */}
            <p
              className={`${poppins.className} mt-3 md:mt-4 text-[14px] lg:text-[15px] leading-9 text-[#666666]`}
            >
              We don't just sell furniture — we create comprehensive
              workspace solutions. Our expert team works closely with
              clients to understand their unique requirements and deliver
              customized solutions that perfectly match their needs and
              budget.
            </p>

            {/* CTA Button */}
            <Link
              href="/services"
              className={`${poppins.className} mt-6 md:mt-10 inline-flex items-center gap-3 rounded-[8px] bg-[#E10600] px-8 py-3 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#C60000] hover:shadow-xl`}
            >
              View Our Services

              <ArrowRight
                size={15}
                strokeWidth={2.5}
              />
            </Link>

          </motion.div>

                    {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative overflow-hidden rounded-[14px] shadow-xl">
              <Image
                src="/about_img.png"
                alt="About MPR Furniture"
                width={700}
                height={700}
                priority
                className="h-[420px] w-full object-cover sm:h-[500px] lg:h-[680px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}