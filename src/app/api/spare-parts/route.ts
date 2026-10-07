// src/app/api/spare-parts/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const spareParts = await prisma.sparePart.findMany({
      orderBy: {
        createdAt: "asc",
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
