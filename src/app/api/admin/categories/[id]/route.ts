//src/app/api/admin/categories/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * UPDATE CATEGORY
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    const exists = await prisma.category.findFirst({
      where: {
        name,
        NOT: {
          id,
        },
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

    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to update category.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * DELETE CATEGORY
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        {
          message: "Category not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (category._count.products > 0) {
      return NextResponse.json(
        {
          message:
            "Cannot delete category because it contains products.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to delete category.",
      },
      {
        status: 500,
      }
    );
  }
}