"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Search, Calendar } from "lucide-react";
import { formatDateParts } from "@/lib/utils";

export interface IEventItem {
  _id: string;
  title: string;
  slug: string;
  date: string | Date;
  time?: string;
  venue: string;
  category: string;
  status: "completed" | "upcoming";
  shortDescription: string;
  coverImage: string;
}

interface EventsViewProps {
  initialEvents: IEventItem[];
}

export default function EventsView({ initialEvents }: EventsViewProps) {
  const [filter, setFilter] = useState<"all" | "completed" | "upcoming">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = useMemo(() => {
    return initialEvents.filter((item) => {
      const matchesFilter = filter === "all" ? true : item.status === filter;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [initialEvents, filter, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
        {/* Filter Pills matching reference: [ All ] [ Completed ] [ Upcoming ] */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              filter === "all"
                ? "bg-orange-600 text-white shadow-sm"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              filter === "completed"
                ? "bg-orange-600 text-white shadow-sm"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            Completed
          </button>
          <button
            type="button"
            onClick={() => setFilter("upcoming")}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              filter === "upcoming"
                ? "bg-orange-600 text-white shadow-sm"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            Upcoming
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, venues..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-900"
          />
        </div>
      </div>

      {/* Events Grid (3 Columns matching reference) */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => {
            const dateParts = formatDateParts(event.date);

            return (
              <div
                key={event._id || event.slug}
                className="group bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                {/* Event Cover Photo with Date Badge Overlay */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Prominent Orange Date Badge matching reference (Top Left) */}
                  <div className="absolute top-3.5 left-3.5 bg-orange-600 text-white rounded-lg px-3 py-1.5 shadow-md flex flex-col items-center justify-center min-w-[54px] text-center">
                    <span className="text-lg font-bold leading-none">{dateParts.day}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider leading-tight mt-0.5">
                      {dateParts.month}
                    </span>
                    <span className="text-[9px] font-medium text-orange-200 leading-none">
                      {dateParts.year}
                    </span>
                  </div>

                  {/* Status Pill Badge (Top Right) */}
                  <div className="absolute top-3.5 right-3.5">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs capitalize ${
                        event.status === "upcoming"
                          ? "bg-emerald-600 text-white"
                          : "bg-[#0B1A2F]/90 text-slate-200"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                </div>

                {/* Event Body */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-orange-600 font-semibold tracking-wide">
                      <span>{event.category}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-orange-600 transition-colors line-clamp-1 leading-snug">
                      {event.title}
                    </h3>

                    {/* Venue Location */}
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                      <span>{event.venue}</span>
                    </p>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed pt-1">
                      {event.shortDescription}
                    </p>
                  </div>

                  {/* Bottom Link: View Gallery → */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/events/${event.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors group/link"
                    >
                      <span>View Gallery</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-lg">No events found</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No activities matched "${searchQuery}". Try different keywords.`
              : `There are currently no ${filter} events listed.`}
          </p>
          {(searchQuery || filter !== "all") && (
            <button
              onClick={() => {
                setFilter("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
