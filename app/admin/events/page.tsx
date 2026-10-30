import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import EventsTable from "@/components/admin/EventsTable";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/models/Event";

async function getAdminEvents() {
  try {
    await connectToDatabase();
    const events = await Event.find().sort({ date: -1 }).lean();
    return JSON.parse(JSON.stringify(events));
  } catch (err) {
    console.error("Error fetching admin events:", err);
    return [];
  }
}

export default async function AdminEventsPage() {
  const events = await getAdminEvents();

  return (
    <AdminLayout
      title="Event Management"
      subtitle="View, create, edit, and organize NSS activities and drives"
    >
      <EventsTable initialEvents={events} />
    </AdminLayout>
  );
}
