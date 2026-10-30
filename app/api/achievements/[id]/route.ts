import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Achievement } from "@/models/Achievement";
import { getSessionFromRequest } from "@/lib/auth";
import { achievementSchema } from "@/schemas/achievement";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const achievement = await Achievement.findById(id).lean();
    if (!achievement) {
      return NextResponse.json({ error: "Achievement not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, achievement });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch achievement", details: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    const parseResult = achievementSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const updated = await Achievement.findByIdAndUpdate(id, parseResult.data, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Achievement not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, achievement: updated });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update achievement", details: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = await params;
    const deleted = await Achievement.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Achievement not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Achievement deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete achievement", details: error.message }, { status: 500 });
  }
}
