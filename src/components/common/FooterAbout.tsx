//src/components/common/FooterAbout.tsx

"use client";

import Image from "next/image";
import { Poppins, Cormorant_Garamond } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function FooterAbout() {
  return (
    <div className="flex flex-col">
      {/* Logo */}
      <Image
  src="/logo.jpeg"
  alt="MPR Furniture"
  width={180}
  height={110}
  className="h-auto w-[130px] sm:w-[145px]"
/>

      {/* Description */}
      <p
        className={`${poppins.className} mt-5 max-w-sm text-[14px] leading-7 text-gray-600`}
      >
        MPR Furniture is dedicated to crafting premium furniture that blends
        comfort, durability, and timeless design. We create elegant solutions
        for homes, offices, and commercial spaces with exceptional quality and
        craftsmanship.
      </p>
    </div>
  );
}