import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { getSessionFromRequest } from "@/lib/auth";
import { eventSchema } from "@/schemas/event";
import { slugify } from "@/lib/utils";
import { seedDatabaseIfEmpty } from "@/lib/seedData";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    await seedDatabaseIfEmpty();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const highlight = searchParams.get("highlight");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "100", 10);

    const filter: Record<string, any> = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    if (highlight === "true") {
      filter.isHighlight = true;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { venue: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const events = await Event.find(filter)
      .sort({ date: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, count: events.length, events });
  } catch (error: any) {
    console.error("[GET_EVENTS_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch events", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const parseResult = eventSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const data = parseResult.data;
    let slug = data.slug ? slugify(data.slug) : slugify(data.title);

    // Ensure slug uniqueness
    const existing = await Event.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newEvent = await Event.create({
      ...data,
      slug,
      date: new Date(data.date),
    });

    return NextResponse.json({ success: true, event: newEvent }, { status: 201 });
  } catch (error: any) {
    console.error("[CREATE_EVENT_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to create event", details: error.message },
      { status: 500 }
    );
  }
}
