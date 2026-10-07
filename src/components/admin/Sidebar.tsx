//src/components/admin/Sidebar.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Shapes,
  Wrench,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/MPRfuradm/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/MPRfuradm/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/MPRfuradm/categories",
    icon: Shapes,
  },
  {
    title: "Spare Parts",
    href: "/MPRfuradm/spare-parts",
    icon: Wrench,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[260px] flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-20 items-center justify-center border-b border-gray-200">
        <Image
          src="/logo.jpeg"
          alt="MPR Furniture"
          width={110}
          height={55}
          priority
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
                    active
                      ? "bg-red-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                  }`}
                >
                  <Icon size={20} />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-5">
        <p className="text-center text-xs text-gray-500">
          MPR Furniture Admin
        </p>
      </div>
    </aside>
  );
}