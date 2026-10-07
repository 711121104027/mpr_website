// src/app/api/admin/spare-parts/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET
 * Get all spare parts for admin
 */
export async function GET() {
  try {
    const spareParts = await prisma.sparePart.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(spareParts);
  } catch (error) {
    console.error("Failed to fetch spare parts:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch spare parts.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * POST
 * Create spare part
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = body.name?.trim();
    const imageUrl = body.imageUrl?.trim();
    const publicId = body.publicId?.trim() || null;

    if (!name) {
      return NextResponse.json(
        {
          message: "Spare part name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!imageUrl) {
      return NextResponse.json(
        {
          message: "Image is required.",
        },
        {
          status: 400,
        }
      );
    }

    const sparePart = await prisma.sparePart.create({
      data: {
        name,
        imageUrl,
        publicId,
      },
    });

    return NextResponse.json(sparePart, {
      status: 201,
    });
  } catch (error) {
    console.error("Failed to create spare part:", error);

    return NextResponse.json(
      {
        message: "Failed to create spare part.",
      },
      {
        status: 500,
      }
    );
  }
}
