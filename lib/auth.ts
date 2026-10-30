import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { connectToDatabase } from "./mongodb";
import { User } from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "nss_dypcoe_jwt_secret_unit_a106_2025_prod";
const secretKey = new TextEncoder().encode(JWT_SECRET);
export const COOKIE_NAME = "nss_admin_token";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signAdminToken(payload: { id: string; email: string; name: string; role: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as { id: string; email: string; name: string; role: string };
  } catch (err) {
    return null;
  }
}

export async function getSessionFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function getSessionFromRequest(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value || req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function ensureDefaultAdmin() {
  await connectToDatabase();
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@nss.dypcoe.ac.in").toLowerCase();
  try {
    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      const rawPassword = process.env.ADMIN_PASSWORD || "Admin@NSS106#2025";
      const hashedPassword = await hashPassword(rawPassword);
      await User.create({
        email: adminEmail,
        password: hashedPassword,
        name: process.env.ADMIN_NAME || "NSS Admin Coordinator",
        role: "admin",
      });
      console.log(`[AUTH] Seeded default admin user: ${adminEmail}`);
    }
  } catch (err: any) {
    if (err.code !== 11000) {
      console.error("[AUTH] Error in ensureDefaultAdmin:", err);
    }
  }
}
