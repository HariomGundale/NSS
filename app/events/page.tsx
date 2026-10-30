import React from "react";
import PageHeader from "@/components/hero/PageHeader";
import EventsView from "@/components/events/EventsView";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { seedDatabaseIfEmpty } from "@/lib/seedData";

export const metadata = {
  title: "Events & Activities | NSS DYPCOE Akurdi",
  description:
    "Explore community drives, health camps, tree plantations, literacy campaigns, and social initiatives organized by NSS Unit A-106 at DYPCOE Akurdi.",
};

async function getEvents() {
  try {
    await connectToDatabase();
    await seedDatabaseIfEmpty();

    const events = await Event.find().sort({ date: -1 }).lean();
    return JSON.parse(JSON.stringify(events));
  } catch (err) {
    console.error("Error fetching events:", err);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* 1. Header with Breadcrumb: Home > Events & Activities */}
      <PageHeader
        title="Events & Activities"
        breadcrumb={[{ label: "Events & Activities" }]}
        backgroundImage="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1920&q=80"
      />

      {/* 2. Interactive Events Grid with Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <EventsView initialEvents={events} />
      </div>
    </main>
  );
}
