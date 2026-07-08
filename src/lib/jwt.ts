//src/lib/jwt.ts

import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

const SECRET: string = JWT_SECRET;

export interface AdminJwtPayload extends JwtPayload {
  adminId: string;
  username: string;
}

const JWT_EXPIRES_IN = "7d";

export function signAdminToken(
  payload: Omit<AdminJwtPayload, "iat" | "exp">
): string {
  return jwt.sign(payload, SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as SignOptions);
}

export function verifyAdminToken(
  token: string
): AdminJwtPayload | null {
  try {
    return jwt.verify(token, SECRET) as AdminJwtPayload;
  } catch {
    return null;
  }
}