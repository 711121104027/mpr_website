//src/app/MPRfuradm/layout.tsx

"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  // Login page should not have admin layout
  if (pathname === "/MPRfuradm/login") {
    return <>{children}</>;
  }

  const pageTitleMap: Record<string, string> = {
    "/MPRfuradm/dashboard": "Dashboard",
    "/MPRfuradm/products": "Products",
    "/MPRfuradm/categories": "Categories",
    "/MPRfuradm/spare-parts": "Spare Parts",
  };

  const title =
    pageTitleMap[pathname] ?? "Admin Panel";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <AdminHeader title={title} />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}