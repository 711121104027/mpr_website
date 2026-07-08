//src/components/admin/AdminHeader.tsx

"use client";

import { Bell, UserCircle2 } from "lucide-react";
import LogoutButton from "./LogoutButton";

interface AdminHeaderProps {
  title: string;
}

export default function AdminHeader({
  title,
}: AdminHeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {title}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome to MPR Furniture Admin Panel
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="relative rounded-xl border border-gray-200 p-2 transition hover:bg-gray-100">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600"></span>
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
          <UserCircle2
            size={38}
            className="text-red-600"
          />

          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              mpradmin
            </h3>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
            
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}