//src/app/api/admin/categories/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET
 * Get all categories
 */
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch categories.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * POST
 * Create category
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = body.name?.trim();

    if (!name) {
      return NextResponse.json(
        {
          message: "Category name is required.",
        },
        {
          status: 400,
        }
      );
    }

    const exists = await prisma.category.findUnique({
      where: {
        name,
      },
    });

    if (exists) {
      return NextResponse.json(
        {
          message: "Category already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(category, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create category.",
      },
      {
        status: 500,
      }
    );
  }
}