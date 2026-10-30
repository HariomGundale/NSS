import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SiteStat } from "@/models/SiteStat";
import { getSessionFromRequest } from "@/lib/auth";
import { seedDatabaseIfEmpty } from "@/lib/seedData";

export async function GET() {
  try {
    await connectToDatabase();
    await seedDatabaseIfEmpty();

    let stats = await SiteStat.findOne().lean();
    if (!stats) {
      stats = await SiteStat.create({});
    }

    return NextResponse.json({ success: true, stats });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch stats", details: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();

    let stats = await SiteStat.findOne();
    if (!stats) {
      stats = await SiteStat.create(body);
    } else {
      Object.assign(stats, body);
      await stats.save();
    }

    return NextResponse.json({ success: true, stats });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update stats", details: error.message }, { status: 500 });
  }
}
