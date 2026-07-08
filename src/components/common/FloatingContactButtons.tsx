//src/components/common/FloatingContactButtons.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingContactButtons() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[999]">

      <AnimatePresence>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="mb-4 flex flex-col items-center gap-3"
          >
            {/* Phone */}

            <Link
              href="tel:+919787822250"
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-[#B5161B]
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:scale-110
                hover:shadow-2xl
              "
            >
              <Phone size={24} strokeWidth={2.3} />
            </Link>

            {/* WhatsApp */}

            <Link
              href="https://wa.me/919787822250"
              target="_blank"
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-[#25D366]
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:scale-110
                hover:shadow-2xl
              "
            >
              <FaWhatsapp size={28} />
            </Link>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Toggle */}

      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-white
          text-gray-700
          shadow-xl
          transition-all
          duration-300
          hover:scale-105
        "
      >
        {open ? (
          <X size={22} />
        ) : (
          <span className="text-2xl font-light leading-none">+</span>
        )}
      </button>

    </div>
  );
}