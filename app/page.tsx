import React from "react";
import HomeHero from "@/components/hero/HomeHero";
import UnitAtGlance from "@/components/home/UnitAtGlance";
import Highlights from "@/components/home/Highlights";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { seedDatabaseIfEmpty } from "@/lib/seedData";

export const metadata = {
  title: "NSS DYPCOE Akurdi | Unit A-106",
  description:
    "Official website of National Service Scheme (NSS) Unit A-106, Dr. D. Y. Patil College of Engineering, Akurdi. Motto: Not Me But You.",
};

async function getHighlights() {
  try {
    await connectToDatabase();
    await seedDatabaseIfEmpty();

    const events = await Event.find({ isHighlight: true })
      .sort({ date: -1 })
      .limit(4)
      .lean();

    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error("Error fetching homepage highlights:", error);
    return [];
  }
}

export default async function HomePage() {
  const highlightEvents = await getHighlights();

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Section matching reference */}
      <HomeHero />

      {/* 2. Our Unit at a Glance & 4 Focus Areas */}
      <UnitAtGlance />

      {/* 3. Highlights: 4 Event Cards with View Gallery */}
      <Highlights events={highlightEvents} />
    </main>
  );
}
