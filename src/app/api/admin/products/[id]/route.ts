//src/app/api/admin/products/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProductSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET Single Product
 */
export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        images: true,
        features: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    revalidatePath("/");
revalidatePath("/products");
revalidatePath(`/products/${product?.slug}`);

return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch product.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * UPDATE Product
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const data = ProductSchema.parse(body);

    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        {
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    const duplicateCode =
      await prisma.product.findFirst({
        where: {
          code: data.code,
          NOT: {
            id,
          },
        },
      });

    if (duplicateCode) {
      return NextResponse.json(
        {
          message:
            "Product code already exists.",
        },
        {
          status: 400,
        }
      );
    }

    const duplicateSlug =
      await prisma.product.findFirst({
        where: {
          slug: data.slug,
          NOT: {
            id,
          },
        },
      });

    if (duplicateSlug) {
      return NextResponse.json(
        {
          message:
            "Product slug already exists.",
        },
        {
          status: 400,
        }
      );
    }

    const product =
      await prisma.$transaction(async (tx) => {
        await tx.product.update({
          where: {
            id,
          },
          data: {
            name: data.name,
            slug: data.slug,
            code: data.code,
            description: data.description,
            status: data.status,
            categoryId: data.categoryId,
          },
        });

        await tx.productFeature.deleteMany({
          where: {
            productId: id,
          },
        });

        await tx.productImage.deleteMany({
          where: {
            productId: id,
          },
        });

        if (data.features.length > 0) {
          await tx.productFeature.createMany({
            data: data.features.map(
              (feature) => ({
                feature,
                productId: id,
              })
            ),
          });
        }

        if (data.images.length > 0) {
          await tx.productImage.createMany({
            data: data.images.map(
              (image) => ({
                imageUrl: image.imageUrl,
                publicId: image.publicId,
                productId: id,
              })
            ),
          });
        }

        return tx.product.findUnique({
          where: {
            id,
          },
          include: {
            category: true,
            images: true,
            features: true,
          },
        });
      });

    return NextResponse.json(product);
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
          "Failed to update product.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * DELETE Product
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.product.delete({
  where: {
    id,
  },
});

revalidatePath("/");
revalidatePath("/products");

return NextResponse.json({
  message: "Product deleted successfully.",
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Failed to delete product.",
      },
      {
        status: 500,
      }
    );
  }
}