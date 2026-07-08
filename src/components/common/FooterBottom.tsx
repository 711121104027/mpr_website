//src/components/common/FooterBottom.tsx

"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-gray-200">
     <div className="mx-auto flex w-full max-w-[1450px] flex-col items-center justify-between gap-3 px-6 py-3 text-center md:flex-row md:text-left lg:px-8">
        {/* Copyright */}
        <p
          className={`${poppins.className} text-[14px] leading-6 text-gray-600`}
        >
          © {currentYear}{" "}
          <span className="font-semibold text-gray-900">
            MPR Furniture
          </span>
          . All Rights Reserved.
        </p>

        {/* Right Links */}
        <div
          className={`flex flex-wrap items-center justify-center gap-6 ${poppins.className}`}
        >
          <Link
            href="/privacy-policy"
            className="text-[14px] text-gray-600 transition-colors duration-300 hover:text-[#C41E1E]"
          >
            Privacy Policy
          </Link>

          <span className="hidden h-4 w-px bg-gray-300 sm:block" />

          <Link
            href="/terms-and-conditions"
            className="text-[14px] text-gray-600 transition-colors duration-300 hover:text-[#C41E1E]"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}