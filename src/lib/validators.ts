//src/lib/validators.ts

import { z } from "zod";

export const CategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name is required.")
    .max(100),
});

export const ProductSchema = z.object({
  categoryId: z.string().min(1, "Category is required."),

  name: z
    .string()
    .trim()
    .min(2, "Product name is required.")
    .max(150),

  code: z
    .string()
    .trim()
    .min(2, "Product code is required.")
    .max(50),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(180),

  description: z
    .string()
    .trim()
    .min(5, "Description is required."),

  status: z.enum([
    "ACTIVE",
    "INACTIVE",
  ]),

  features: z.array(
    z.string().trim().min(1)
  ),

  images: z.array(
    z.object({
      imageUrl: z.string().url(),
      publicId: z.string(),
    })
  ),
});

export type ProductInput = z.infer<
  typeof ProductSchema
>;

export const ProductEnquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name is required."),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."),

  location: z
    .string()
    .trim()
    .min(2, "Location is required."),

  additionalDetails: z
    .string()
    .trim()
    .optional(),
});

export type ProductEnquiryInput =
  z.infer<typeof ProductEnquirySchema>;