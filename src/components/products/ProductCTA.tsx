//src/components/products/ProductCTA.tsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function ProductCTA() {
  return (
    <section className="bg-[#D50010] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Heading */}

          <h2
            className="
              font-[Poppins]
              text-[18px]
              md:text-[24px]
              font-semibold
              leading-tight
              tracking-[1px]
              text-white
              md:text-[32px]
            "
          >
            Can't Find What You're Looking For?
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-3xl
              font-[Inter]
              text-[14px]
              md:text-[12px]
              leading-8
              tracking-[1px]
              text-white/90
              md:text-[16px]
            "
          >
            Our experts are available to help you choose the right furniture
            for your needs.
          </p>

          {/* Buttons */}

          <div
            className="
              mx-auto
              mt-10
              grid
              max-w-[520px]
              grid-cols-2
              gap-4
              sm:gap-8
            "
          >
            {/* Contact */}

            <Link
              href="/contact"
              className="
                flex
                h-[58px]
                items-center
                justify-center
                gap-3
                rounded-[10px]
                bg-white
                font-[Poppins]
                text-[16px]
                font-medium
                text-[#D50010]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                sm:text-[18px]
              "
            >
              <FiPhoneCall
                className="text-[20px] sm:text-[24px]"
              />

              <span>Contact Now</span>
            </Link>

            {/* WhatsApp */}

            <a
              href="https://wa.me/919787822250"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                h-[58px]
                items-center
                justify-center
                gap-3
                rounded-[10px]
                border-2
                border-white
                bg-transparent
                font-[Poppins]
                text-[16px]
                font-medium
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white
                hover:text-[#D50010]
                hover:shadow-xl
                sm:text-[18px]
              "
            >
              <FaWhatsapp
                className="text-[20px] sm:text-[24px]"
              />

              <span>Whatsapp us</span>
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}