import React from "react";
import { notFound } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import EventForm from "@/components/admin/EventForm";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/models/Event";
import mongoose from "mongoose";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

async function getEvent(id: string) {
  try {
    await connectToDatabase();
    let event = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      event = await Event.findById(id).lean();
    } else {
      event = await Event.findOne({ slug: id }).lean();
    }
    return event ? JSON.parse(JSON.stringify(event)) : null;
  } catch (err) {
    console.error("Error finding event for edit:", err);
    return null;
  }
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  return (
    <AdminLayout
      title={`Edit Event: ${event.title}`}
      subtitle="Modify event details, update status, and manage gallery photos"
    >
      <EventForm initialData={event} isEditing={true} />
    </AdminLayout>
  );
}
