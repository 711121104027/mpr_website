//src/app/MPRfuradm/dashboard/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  FolderTree,
  CheckCircle2,
  XCircle,
  Plus,
  Eye,
} from "lucide-react";

import DashboardCard from "@/components/admin/DashboardCard";
import QuickActionCard from "@/components/admin/QuickActionCard";

interface DashboardData {
  totalProducts: number;
  totalCategories: number;
  activeProducts: number;
  inactiveProducts: number;
  recentProducts: {
    id: string;
    name: string;
    code: string;
    status: "ACTIVE" | "INACTIVE";
    category: {
      name: string;
    };
  }[];
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const response = await fetch(
        "/api/admin/dashboard"
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setDashboard(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="text-red-600">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Welcome back to MPR Furniture Admin Panel.
          </p>

        </div>

        <Link
          href="/MPRfuradm/products/add"
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
        >
          <Plus size={20} />
          Add Product
        </Link>

      </div>

      {/* Dashboard Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Products"
          value={dashboard.totalProducts}
          icon={Package}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Categories"
          value={dashboard.totalCategories}
          icon={FolderTree}
          color="bg-orange-500"
        />

        <DashboardCard
          title="Active"
          value={dashboard.activeProducts}
          icon={CheckCircle2}
          color="bg-green-600"
        />

        <DashboardCard
          title="Inactive"
          value={dashboard.inactiveProducts}
          icon={XCircle}
          color="bg-red-600"
        />

      </div>

      {/* Quick Actions */}

      <div>

        <h2 className="mb-5 text-2xl font-bold">
          Quick Actions
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <QuickActionCard
            title="Add Product"
            description="Create a new furniture product."
            href="/MPRfuradm/products/add"
            icon={Plus}
          />

          <QuickActionCard
            title="Manage Products"
            description="Edit or delete existing products."
            href="/MPRfuradm/products"
            icon={Package}
          />

          <QuickActionCard
            title="Manage Categories"
            description="Create and organize product categories."
            href="/MPRfuradm/categories"
            icon={FolderTree}
          />

        </div>

      </div>

      {/* Recent Products */}

      <div className="rounded-2xl border bg-white shadow-sm">

        <div className="border-b p-6">

          <h2 className="text-xl font-bold">
            Recent Products
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left">
                  Product
                </th>

                <th className="px-6 py-4 text-left">
                  Category
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {dashboard.recentProducts.map(
                (product) => (
                  <tr
                    key={product.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">

                      <div className="font-semibold">
                        {product.name}
                      </div>

                      <div className="text-xs text-gray-500">
                        {product.code}
                      </div>

                    </td>

                    <td className="px-6 py-4">
                      {product.category.name}
                    </td>

                    <td className="px-6 py-4 text-center">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          product.status ===
                          "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.status}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-center">

                      <Link
                        href={`/MPRfuradm/products/edit/${product.id}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-blue-700 hover:bg-blue-200"
                      >
                        <Eye size={16} />
                        View
                      </Link>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}