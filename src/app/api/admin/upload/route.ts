//src/app/api/admin/upload/route.ts

import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("images") as File[];

    if (!files.length) {
      return NextResponse.json(
        { message: "No images selected." },
        { status: 400 }
      );
    }

    const uploadedImages = [];

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          {
            message: `${file.name} is not a supported image format.`,
          },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            message: `${file.name} exceeds the 10 MB limit.`,
          },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "mpr-furniture/products",
              resource_type: "image",
            },
            (error, result) => {
              if (error) return reject(error);

              resolve(result);
            }
          )
          .end(buffer);
      });

      uploadedImages.push({
        imageUrl: result.secure_url,
        publicId: result.public_id,
      });
    }

    return NextResponse.json(uploadedImages);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Image upload failed.",
      },
      {
        status: 500,
      }
    );
  }
}