import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { TeamMember } from "@/models/TeamMember";
import { getSessionFromRequest } from "@/lib/auth";
import { teamMemberSchema } from "@/schemas/team";
import { seedDatabaseIfEmpty } from "@/lib/seedData";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    await seedDatabaseIfEmpty();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const activeOnly = searchParams.get("active") !== "false";

    const filter: Record<string, any> = {};
    if (activeOnly) {
      filter.active = true;
    }
    if (category) {
      filter.category = category;
    }

    const members = await TeamMember.find(filter).sort({ order: 1, createdAt: 1 }).lean();
    return NextResponse.json({ success: true, count: members.length, members });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch team members", details: error.message }, { status: 500 });
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
    const parseResult = teamMemberSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const newMember = await TeamMember.create(parseResult.data);
    return NextResponse.json({ success: true, member: newMember }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create team member", details: error.message }, { status: 500 });
  }
}
