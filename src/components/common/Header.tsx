//src/components/common/Header.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Furniture", href: "/products" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white shadow-sm">
      <div className="mx-auto flex h-24 lg:h-28 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
  src="/logo.png"
  alt="MPR Furniture"
  width={180}
  height={100}
  priority
  className="h-auto w-[100px] sm:w-[105px] lg:w-[120px] xl:w-[140px]"
/>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className={`hidden items-center gap-14 lg:flex ${poppins.className}`}
        >
          {navLinks.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative text-[17px] font-semibold tracking-[0.2px] transition-all duration-300 hover:text-red-600 ${
  (
    item.href === "/products"
      ? pathname.startsWith("/products")
      : pathname === item.href
  )
    ? "text-red-600"
    : "text-neutral-900"
}`}
            >
              {item.name}

              {(
  item.href === "/products"
    ? pathname.startsWith("/products")
    : pathname === item.href
) && (
  <span className="absolute -bottom-[10px] left-0 h-[2px] w-full rounded-full bg-red-600" />
)}
            </Link>
          ))}
        </nav>

        {/* Desktop Call Button */}
        <Link
          href="tel:+919999999999"
          className={`hidden items-center gap-2 rounded-lg bg-red-600 px-7 py-2.5 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-red-700 lg:flex ${poppins.className}`}
        >
          <Phone size={18} />
          Call Now
        </Link>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="tel:+919999999999"
            className="rounded-lg bg-red-600 p-3 text-white"
          >
            <Phone size={18} strokeWidth={2.2} />
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="rounded-lg border border-neutral-200 p-2"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
  onClick={() => setOpen(false)}
  className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
/>

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
              className="fixed right-0 top-0 z-50 h-screen w-[82%] bg-white shadow-2xl lg:hidden"
            >
              {/* Top */}
              <div className="flex items-center justify-between border-b px-6 py-5">
                <Image
  src="/logo.png"
  alt="MPR Furniture"
  width={150}
  height={90}
  className="w-[120px]"
/>

                <button onClick={() => setOpen(false)}>
                  <X size={30} />
                </button>
              </div>

              {/* Menu */}
              <div
                className={`flex flex-col px-6 py-8 ${poppins.className}`}
              >
                {navLinks.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`border-b py-5 text-[20px] font-semibold transition-colors duration-300 ${
  (
    item.href === "/products"
      ? pathname.startsWith("/products")
      : pathname === item.href
  )
    ? "text-red-600"
    : "text-neutral-900 hover:text-red-600"
}`}
                  >
                    {item.name}
                  </Link>
                ))}

                <Link
                  href="tel:+919787822250"
                  className="mt-10 flex items-center justify-center gap-3 rounded-xl bg-red-600 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-red-700"
                >
                  <Phone size={22} />
                  Call Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </div>
    </header>
  );
}