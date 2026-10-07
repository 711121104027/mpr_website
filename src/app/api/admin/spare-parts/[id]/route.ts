// src/app/api/admin/spare-parts/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

/**
 * GET SINGLE SPARE PART
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const sparePart = await prisma.sparePart.findUnique({
      where: { id },
    });

    if (!sparePart) {
      return NextResponse.json(
        { message: "Spare part not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(sparePart);
  } catch (error) {
    console.error("Failed to fetch spare part:", error);

    return NextResponse.json(
      { message: "Failed to fetch spare part." },
      { status: 500 }
    );
  }
}

/**
 * UPDATE SPARE PART
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const name = body.name?.trim();
    const imageUrl = body.imageUrl?.trim();
    const publicId = body.publicId?.trim() || null;

    if (!name) {
      return NextResponse.json(
        { message: "Spare part name is required." },
        { status: 400 }
      );
    }

    if (!imageUrl) {
      return NextResponse.json(
        { message: "Image is required." },
        { status: 400 }
      );
    }

    const existing = await prisma.sparePart.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "Spare part not found." },
        { status: 404 }
      );
    }

    // If image has changed and old image had a publicId, delete the old image from Cloudinary
    if (existing.publicId && publicId && existing.publicId !== publicId) {
      try {
        await cloudinary.uploader.destroy(existing.publicId);
      } catch (err) {
        console.warn("Failed to delete old image from Cloudinary:", err);
      }
    }

    const updated = await prisma.sparePart.update({
      where: { id },
      data: {
        name,
        imageUrl,
        publicId: publicId ?? existing.publicId,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update spare part:", error);

    return NextResponse.json(
      { message: "Failed to update spare part." },
      { status: 500 }
    );
  }
}

/**
 * DELETE SPARE PART
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.sparePart.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "Spare part not found." },
        { status: 404 }
      );
    }

    if (existing.publicId) {
      try {
        await cloudinary.uploader.destroy(existing.publicId);
      } catch (err) {
        console.warn("Failed to delete image from Cloudinary:", err);
      }
    }

    await prisma.sparePart.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Spare part deleted successfully.",
    });
  } catch (error) {
    console.error("Failed to delete spare part:", error);

    return NextResponse.json(
      { message: "Failed to delete spare part." },
      { status: 500 }
    );
  }
}
