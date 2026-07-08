//src/components/services/ServiceCTA.tsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function ServiceCTA() {
  return (
    <section className="relative overflow-hidden bg-[#b5161b] py-16 lg:py-18">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full border border-white" />
        <div className="absolute right-0 top-10 h-64 w-64 rounded-full border border-white" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full border border-white" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#8f0f14]/20 via-transparent to-[#8f0f14]/20" />

      <div className="relative mx-auto flex w-full max-w-[1450px] flex-col items-center px-5 text-center lg:px-8">
        {/* Heading */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-4 font-poppins text-xs font-semibold uppercase tracking-[4px] text-white/90"
        >
          Get Started Today
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-4xl font-poppins text-3xl font-bold leading-tight text-white lg:text-4xl"
        >
          Serving Across Tamil Nadu
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
          viewport={{ once: true }}
          className="mt-4 max-w-4xl font-inter text-[14px] md:text-[16px] leading-8 text-white/90 tracking-[1.5px] md:tracking-[1px]"
        >
          Whether you're setting up a new office, upgrading your workspace,
          or looking for reliable furniture maintenance, our experienced team
          is ready to assist you with premium solutions tailored to your needs.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.25,
          }}
          viewport={{ once: true }}
          className="mt-12 grid w-full max-w-xl grid-cols-2 gap-4 lg:flex lg:w-auto lg:max-w-none lg:flex-row"
        >
          {/* Contact */}
          <Link
            href="/contact"
            className="group flex items-center justify-center gap-2 rounded-md bg-white px-4 py-4 text-center font-poppins text-sm font-medium text-[#b5161b] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl lg:gap-3 lg:px-8 lg:text-base"
          >
            <Phone
              size={18}
              className="transition-transform duration-300 group-hover:rotate-12"
            />

            Contact Now

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>

          {/* WhatsApp */}
          <Link
            href="https://wa.me/919787822250"
            target="_blank"
            className="group flex items-center justify-center gap-2 rounded-md border border-white bg-transparent px-4 py-4 text-center font-poppins text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#b5161b] lg:gap-3 lg:px-8 lg:text-base"
          >
            <FaWhatsapp
  size={20}
  className="transition-transform duration-300 group-hover:scale-110"
/>

            WhatsApp Us

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}