//src/lib/auth.ts

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export interface AuthResult {
  success: boolean;
  admin?: {
    id: string;
    username: string;
  };
  message?: string;
}

export async function authenticateAdmin(
  username: string,
  password: string
): Promise<AuthResult> {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        username,
      },
    });

    if (!admin) {
      return {
        success: false,
        message: "Invalid username or password.",
      };
    }

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatch) {
      return {
        success: false,
        message: "Invalid username or password.",
      };
    }

    return {
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
      },
    };
  } catch (error) {
    console.error("Authentication Error:", error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}