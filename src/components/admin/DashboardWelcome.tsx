//src/components/admin/DashboardWelcome.tsx

"use client";

import { motion } from "framer-motion";

interface DashboardWelcomeProps {
  username: string;
}

export default function DashboardWelcome({
  username,
}: DashboardWelcomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-gray-200 bg-gradient-to-r from-red-600 to-red-700 p-8 text-white shadow-lg"
    >
      <h2 className="text-3xl font-bold">
        Welcome back, {username} 👋
      </h2>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-red-100">
        Manage your furniture products, categories and website
        content from one place. This dashboard gives you quick
        access to everything you need.
      </p>
    </motion.div>
  );
}