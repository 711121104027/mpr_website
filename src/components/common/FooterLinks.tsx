//src/components/common/FooterLinks.tsx

"use client";

import Link from "next/link";
import { Poppins, Cormorant_Garamond } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Furniture",
    href: "/products",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export default function FooterLinks() {
  return (
  <div>
    {/* Heading */}
    <h3
      className={`${cormorant.className} text-[28px] font-bold text-[#C41E1E]`}
    >
      Quick Links
    </h3>

    {/* Desktop View */}
    <ul className={`mt-5 hidden space-y-3 lg:block ${poppins.className}`}>
      {links.map((link) => (
        <li key={link.title}>
          <Link
            href={link.href}
            className="group inline-flex items-center text-[15px] font-medium text-gray-700 transition-all duration-300 hover:text-[#C41E1E]"
          >
            <span className="mr-2 h-[2px] w-0 bg-[#C41E1E] transition-all duration-300 group-hover:w-4" />
            {link.title}
          </Link>
        </li>
      ))}
    </ul>

    {/* Mobile View */}
    <div
      className={`mt-5 grid grid-cols-5 gap-2 text-center lg:hidden ${poppins.className}`}
    >
      {links.map((link) => (
        <Link
          key={link.title}
          href={link.href}
          className="text-[13px] font-medium text-gray-700 transition-colors duration-300 hover:text-[#C41E1E]"
        >
          {link.title}
        </Link>
      ))}
    </div>
  </div>
);
}