//src/app/api/admin/dashboard/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalProducts,
      totalCategories,
      activeProducts,
      inactiveProducts,
      recentProducts,
    ] = await Promise.all([
      prisma.product.count(),

      prisma.category.count(),

      prisma.product.count({
        where: {
          status: "ACTIVE",
        },
      }),

      prisma.product.count({
        where: {
          status: "INACTIVE",
        },
      }),

      prisma.product.findMany({
        take: 5,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          category: true,
          images: true,
        },
      }),
    ]);

    return NextResponse.json({
      totalProducts,
      totalCategories,
      activeProducts,
      inactiveProducts,
      recentProducts,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to load dashboard.",
      },
      {
        status: 500,
      }
    );
  }
}