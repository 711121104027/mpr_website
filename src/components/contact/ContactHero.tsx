//src/components/contact/ContactHero.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="relative h-[180px] sm:h-[220px] lg:h-[260px] xl:h-[280px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/contact/hero-bg.png"
        alt="MPR Furniture Contact Hero"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="max-w-3xl"
        >
          <h1
            className="
              font-serif
              text-white
              text-[24px]
              sm:text-[28px]
              md:text-[38px]
              lg:text-[46px]
              leading-none
              tracking-[0.03em]
            "
            style={{
              fontFamily: "var(--font-cormorant-garamond)",
            }}
          >
            Get In Touch
          </h1>

          <p
            className="
              mt-3
              text-white
              text-[14px]
              sm:text-[15px]
              lg:text-[18px]
              font-normal
              leading-relaxed
            "
            style={{
              fontFamily: "var(--font-inter)",
            }}
          >
            Have questions about our furniture or services?
            <br className="hidden sm:block" />
            <span className="sm:inline block">
              We're here to help!
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}