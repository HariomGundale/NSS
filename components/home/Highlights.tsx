import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { formatDateParts } from "@/lib/utils";

interface HighlightEvent {
  _id?: string;
  title: string;
  slug: string;
  date: Date | string;
  venue: string;
  shortDescription: string;
  coverImage: string;
}

interface HighlightsProps {
  events?: HighlightEvent[];
}

export default function Highlights({ events = [] }: HighlightsProps) {
  // Fallback items matching the exact reference image if events aren't loaded yet
  const defaultEvents = [
    {
      title: "Tree Plantation Drive",
      slug: "tree-plantation-drive",
      date: "2025-01-05",
      venue: "DYPCOE Campus",
      shortDescription: "Green Campus, Green Future",
      coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Blood Donation Camp",
      slug: "blood-donation-camp",
      date: "2024-11-26",
      venue: "DYPCOE Campus",
      shortDescription: "Donate Blood, Save Lives",
      coverImage: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Swachh Bharat Abhiyan",
      slug: "swachh-bharat-abhiyan",
      date: "2024-10-02",
      venue: "Akurdi Area",
      shortDescription: "Cleanliness is Service",
      coverImage: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Social Awareness Rally",
      slug: "social-awareness-rally",
      date: "2025-01-20",
      venue: "Akurdi Town",
      shortDescription: "Together for a Better Society",
      coverImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const displayList = events.length > 0 ? events.slice(0, 4) : defaultEvents;

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0B1A2F] tracking-[-0.015em] leading-tight">
              Highlights
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Recent major drives and flagship activities conducted by NSS Unit A-106
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors group"
          >
            <span>View All Activities</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Event Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayList.map((event, idx) => {
            const dateParts = formatDateParts(event.date);
            return (
              <div
                key={idx}
                className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                {/* Event Photo */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2.5 right-2.5 bg-[#0B1A2F]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-orange-400" />
                    <span>{dateParts.full}</span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-base sm:text-lg group-hover:text-orange-600 transition-colors line-clamp-1 mb-1">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {event.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 truncate max-w-[120px]">
                      <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      {event.venue}
                    </span>
                    <Link
                      href={`/events/${event.slug}`}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 group/btn"
                    >
                      <span>View Gallery</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
