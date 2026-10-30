import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Achievement } from "@/models/Achievement";
import { getSessionFromRequest } from "@/lib/auth";
import { achievementSchema } from "@/schemas/achievement";
import { seedDatabaseIfEmpty } from "@/lib/seedData";

export async function GET() {
  try {
    await connectToDatabase();
    await seedDatabaseIfEmpty();

    const achievements = await Achievement.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, count: achievements.length, achievements });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch achievements", details: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const parseResult = achievementSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const created = await Achievement.create(parseResult.data);
    return NextResponse.json({ success: true, achievement: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create achievement", details: error.message }, { status: 500 });
  }
}
