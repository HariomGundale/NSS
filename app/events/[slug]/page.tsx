import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/hero/PageHeader";
import EventDetailGallery from "@/components/events/EventDetailGallery";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { formatDateParts } from "@/lib/utils";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Building,
  UserCheck,
  ArrowLeft,
  Share2,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getEventBySlug(slug: string) {
  try {
    await connectToDatabase();
    const event = await Event.findOne({ slug }).lean();
    return event ? JSON.parse(JSON.stringify(event)) : null;
  } catch (err) {
    console.error("Error finding event by slug:", err);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found | NSS DYPCOE Akurdi",
    };
  }

  return {
    title: `${event.title} | NSS DYPCOE Akurdi`,
    description: event.shortDescription || event.description.slice(0, 160),
    openGraph: {
      title: `${event.title} | NSS DYPCOE Akurdi`,
      description: event.shortDescription,
      images: [{ url: event.coverImage }],
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const dateParts = formatDateParts(event.date);

  // Combine coverImage with gallery if not already present
  const allGalleryPhotos = Array.from(
    new Set([event.coverImage, ...(event.gallery || [])])
  );

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* Page Header */}
      <PageHeader
        title={event.title}
        breadcrumb={[
          { label: "Events & Activities", href: "/events" },
          { label: event.title },
        ]}
        backgroundImage={event.coverImage}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Events & Activities</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content (Span 8) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Featured Image */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs">
              <div className="relative h-72 sm:h-96 w-full">
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-600 text-white font-bold text-xs uppercase px-3 py-1.5 rounded-md shadow-md tracking-wider">
                    {event.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span
                    className={`font-semibold text-xs px-3 py-1.5 rounded-md shadow-md capitalize ${
                      event.status === "upcoming"
                        ? "bg-emerald-600 text-white"
                        : "bg-[#0B1A2F]/90 text-white"
                    }`}
                  >
                    {event.status} Event
                  </span>
                </div>
              </div>

              {/* Title & Short Description */}
              <div className="p-6 sm:p-8 space-y-4">
                <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#0B1A2F] tracking-[-0.015em] leading-tight">
                  {event.title}
                </h1>

                <p className="text-base text-slate-700 font-normal leading-relaxed border-l-4 border-orange-500 pl-4 py-1 bg-orange-50/50 rounded-r-md">
                  {event.shortDescription}
                </p>

                {/* Full Article Content */}
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3">About the Event</h3>
                  <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4 text-sm sm:text-base whitespace-pre-line">
                    {event.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Section */}
            {allGalleryPhotos.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs">
                <EventDetailGallery
                  gallery={allGalleryPhotos}
                  eventTitle={event.title}
                />
              </div>
            )}
          </div>

          {/* Sidebar Info Card (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-5">
              <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                Event Information
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Date
                    </span>
                    <span className="font-medium text-slate-800">{dateParts.full}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Time
                    </span>
                    <span className="font-medium text-slate-800">{event.time || "10:00 AM"}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Venue
                    </span>
                    <span className="font-medium text-slate-800">{event.venue}</span>
                  </div>
                </div>

                {event.participants && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Participants
                      </span>
                      <span className="font-medium text-slate-800">{event.participants}+ Volunteers</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Organized By
                    </span>
                    <span className="font-medium text-slate-800">
                      {event.organizedBy || "NSS DYPCOE Unit A-106"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Coordinator
                    </span>
                    <span className="font-medium text-slate-800">
                      {event.coordinator || "Programme Officer & Student Coordinators"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <Link
                  href="/contact"
                  className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Participate in Next Drive</span>
                </Link>

                <div className="text-center pt-1">
                  <span className="text-xs text-slate-500">
                    Unit A-106 · DYPCOE Akurdi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
