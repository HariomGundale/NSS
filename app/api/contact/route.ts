import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ContactMessage } from "@/models/ContactMessage";
import { getSessionFromRequest } from "@/lib/auth";
import { contactFormSchema } from "@/schemas/contact";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const parseResult = contactFormSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const saved = await ContactMessage.create(parseResult.data);
    return NextResponse.json(
      { success: true, message: "Thank you for reaching out! We will get back to you shortly.", id: saved._id },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to send message", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(50).lean();
    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to load messages", details: error.message }, { status: 500 });
  }
}
