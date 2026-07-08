// src/components/common/FooterWhatsapp.tsx

"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Poppins, Cormorant_Garamond } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function FooterWhatsapp() {
  return (
    <div className="w-full">
      {/* Heading */}
      <h3
        className={`${cormorant.className} text-[30px] font-bold text-[#C41E1E]`}
      >
        Stay Connected
      </h3>

      {/* Description */}
      <p
        className={`${poppins.className} mt-4 max-w-md text-[14px] leading-7 text-gray-600`}
      >
        Connect with us on WhatsApp for product enquiries, custom furniture and instant support.
      </p>

      {/* WhatsApp Support Card */}
      <div className="mt-5 w-full rounded-2xl border border-green-100 bg-[#F2FFF6] p-5 shadow-sm transition-all duration-300 hover:shadow-md">

        {/* Top */}
        <div className="flex items-center gap-4">

          {/* Icon */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-sm">
            <FaWhatsapp
              size={28}
              className="text-white"
            />
          </div>

          {/* Text */}
          <div className="flex-1">
            <h4
              className={`${poppins.className} text-[16px] font-semibold text-gray-900`}
            >
              WhatsApp Support
            </h4>

            <p
              className={`${poppins.className} mt-1 text-[13px] leading-6 text-gray-600`}
            >
              Usually replies within a few minutes.
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-green-200" />

        {/* Button */}
        <Link
          href="https://wa.me/919787822250?text=Hello%20MPR%20Furniture,%20I%20would%20like%20to%20know%20more%20about%20your%20products."
          target="_blank"
          className={`${poppins.className} flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#C41E1E] text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#A91818]`}
        >
          <FaWhatsapp size={20} strokeWidth={2.2} />
          Chat on WhatsApp
        </Link>

      </div>
    </div>
  );
}