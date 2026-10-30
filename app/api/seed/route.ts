import { NextResponse } from "next/server";
import { seedDatabaseIfEmpty } from "@/lib/seedData";

export async function GET() {
  try {
    await seedDatabaseIfEmpty();
    return NextResponse.json({ success: true, message: "Database verified & seeded if needed" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    await seedDatabaseIfEmpty();
    return NextResponse.json({ success: true, message: "Database reseeded" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
