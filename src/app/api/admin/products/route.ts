//src/app/api/admin/products/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProductSchema } from "@/lib/validators";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true,
        features: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch products." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = ProductSchema.parse(body);

    const existingCode = await prisma.product.findUnique({
      where: {
        code: data.code,
      },
    });

    if (existingCode) {
      return NextResponse.json(
        {
          message: "Product code already exists.",
        },
        {
          status: 400,
        }
      );
    }

    const existingSlug = await prisma.product.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingSlug) {
      return NextResponse.json(
        {
          message: "Product slug already exists.",
        },
        {
          status: 400,
        }
      );
    }

    const product = await prisma.$transaction(
      async (tx) => {
        const createdProduct =
          await tx.product.create({
            data: {
              name: data.name,
              slug: data.slug,
              code: data.code,
              description: data.description,
              status: data.status,
              categoryId: data.categoryId,
            },
          });

        if (data.features.length > 0) {
          await tx.productFeature.createMany({
            data: data.features.map(
              (feature) => ({
                feature,
                productId:
                  createdProduct.id,
              })
            ),
          });
        }

        if (data.images.length > 0) {
          await tx.productImage.createMany({
            data: data.images.map(
              (image) => ({
                imageUrl:
                  image.imageUrl,
                publicId:
                  image.publicId,
                productId:
                  createdProduct.id,
              })
            ),
          });
        }

        return tx.product.findUnique({
          where: {
            id: createdProduct.id,
          },
          include: {
            category: true,
            images: true,
            features: true,
          },
        });
      }
    );

    return NextResponse.json(product, {
      status: 201,
    });
  } catch (error: any) {
    console.error(error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          message: "Validation failed.",
          errors: error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message:
          "Failed to create product.",
      },
      {
        status: 500,
      }
    );
  }
}