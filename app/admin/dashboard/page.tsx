import React from "react";
import Link from "next/link";
import Image from "next/image";
import AdminLayout from "@/components/admin/AdminLayout";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { TeamMember } from "@/models/TeamMember";
import { Achievement } from "@/models/Achievement";
import { ContactMessage } from "@/models/ContactMessage";
import { formatDateParts } from "@/lib/utils";
import {
  Calendar,
  CalendarCheck,
  Clock,
  Images,
  Users,
  Trophy,
  Plus,
  ArrowRight,
  MapPin,
  ExternalLink,
} from "lucide-react";

async function getDashboardStats() {
  try {
    await connectToDatabase();

    const [
      totalEvents,
      upcomingEvents,
      completedEvents,
      allEvents,
      totalTeam,
      totalAchievements,
      unreadMessages,
    ] = await Promise.all([
      Event.countDocuments(),
      Event.countDocuments({ status: "upcoming" }),
      Event.countDocuments({ status: "completed" }),
      Event.find().select("gallery coverImage").lean(),
      TeamMember.countDocuments(),
      Achievement.countDocuments(),
      ContactMessage.countDocuments({ read: false }),
    ]);

    const totalGalleryPhotos = allEvents.reduce((acc, curr) => {
      const gCount = curr.gallery?.length || 0;
      return acc + (gCount > 0 ? gCount : 1);
    }, 0);

    const recentEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return {
      totalEvents,
      upcomingEvents,
      completedEvents,
      totalGalleryPhotos,
      totalTeam,
      totalAchievements,
      unreadMessages,
      recentEvents: JSON.parse(JSON.stringify(recentEvents)),
    };
  } catch (err) {
    console.error("Dashboard stats error:", err);
    return {
      totalEvents: 0,
      upcomingEvents: 0,
      completedEvents: 0,
      totalGalleryPhotos: 0,
      totalTeam: 0,
      totalAchievements: 0,
      unreadMessages: 0,
      recentEvents: [],
    };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: Calendar,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      href: "/admin/events",
    },
    {
      title: "Upcoming Events",
      value: stats.upcomingEvents,
      icon: Clock,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      href: "/admin/events",
    },
    {
      title: "Completed Events",
      value: stats.completedEvents,
      icon: CalendarCheck,
      color: "text-purple-600 bg-purple-50 border-purple-200",
      href: "/admin/events",
    },
    {
      title: "Total Gallery Photos",
      value: stats.totalGalleryPhotos,
      icon: Images,
      color: "text-orange-600 bg-orange-50 border-orange-200",
      href: "/admin/events",
    },
    {
      title: "Team Members",
      value: stats.totalTeam,
      icon: Users,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
      href: "/admin/team",
    },
    {
      title: "Achievements & Awards",
      value: stats.totalAchievements,
      icon: Trophy,
      color: "text-amber-600 bg-amber-50 border-amber-200",
      href: "/admin/achievements",
    },
  ];

  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="Overview of NSS DYPCOE Unit A-106 activities, records, and content"
    >
      <div className="space-y-8">
        {/* Quick Action Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div>
            <h2 className="text-base font-bold text-slate-900">Unit A-106 Activity Center</h2>
            <p className="text-xs text-slate-500">
              Manage website events, gallery, coordinators, and achievements
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/events/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Event</span>
            </Link>
            <Link
              href="/admin/team"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Manage Team</span>
            </Link>
          </div>
        </div>

        {/* 6 Dashboard Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.href}
                className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-800">
                    {card.title}
                  </span>
                  <div className={`p-2 rounded-lg border ${card.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-slate-900">{card.value}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Events Table */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Recent Activities</h3>
            <Link
              href="/admin/events"
              className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              <span>View All Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Event</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Venue</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.recentEvents.map((event: any) => {
                  const dateParts = formatDateParts(event.date);
                  return (
                    <tr key={event._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-10 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                            <Image
                              src={event.coverImage}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block line-clamp-1">
                              {event.title}
                            </span>
                            <span className="text-[11px] text-slate-400">{event.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-700 font-medium">
                        {dateParts.full}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="flex items-center gap-1 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {event.venue}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize ${
                            event.status === "upcoming"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/events/${event.slug}`}
                            target="_blank"
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                            title="Preview on site"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/events/${event._id}/edit`}
                            className="text-xs font-semibold text-orange-600 hover:text-orange-700 px-2 py-1 rounded hover:bg-orange-50"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
