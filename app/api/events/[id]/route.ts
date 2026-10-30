import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { getSessionFromRequest } from "@/lib/auth";
import { eventSchema } from "@/schemas/event";
import { slugify } from "@/lib/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    let event = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      event = await Event.findById(id).lean();
    }
    if (!event) {
      event = await Event.findOne({ slug: id }).lean();
    }

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, event });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching event", details: error.message },
      { status: 500 }
    );
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

    const parseResult = eventSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const data = parseResult.data;
    const updateData: any = {
      ...data,
      date: new Date(data.date),
    };

    if (data.slug) {
      updateData.slug = slugify(data.slug);
    }

    let updatedEvent = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });
    } else {
      updatedEvent = await Event.findOneAndUpdate({ slug: id }, updateData, { new: true });
    }

    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, event: updatedEvent });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update event", details: error.message },
      { status: 500 }
    );
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

    let deletedEvent = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      deletedEvent = await Event.findByIdAndDelete(id);
    } else {
      deletedEvent = await Event.findOneAndDelete({ slug: id });
    }

    if (!deletedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Event deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete event", details: error.message },
      { status: 500 }
    );
  }
}
