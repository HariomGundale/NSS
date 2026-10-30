import React from "react";
import Image from "next/image";
import PageHeader from "@/components/hero/PageHeader";
import { connectToDatabase } from "@/lib/mongodb";
import { TeamMember, ITeamMember } from "@/models/TeamMember";
import { seedDatabaseIfEmpty } from "@/lib/seedData";
import { Mail, Quote } from "lucide-react";

export const metadata = {
  title: "Our Team | NSS DYPCOE Akurdi",
  description:
    "Meet our Programme Officer, Student Coordinators, Committee Members, and Team Leads of NSS Unit A-106 at DYPCOE Akurdi.",
};

async function getTeamData() {
  try {
    await connectToDatabase();
    await seedDatabaseIfEmpty();

    const members = await TeamMember.find({ active: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return JSON.parse(JSON.stringify(members)) as ITeamMember[];
  } catch (err) {
    console.error("Error fetching team:", err);
    return [];
  }
}

export default async function TeamPage() {
  const allMembers = await getTeamData();

  const poMembers = allMembers.filter((m) => m.category === "po");
  const po =
    poMembers[0] || {
      name: "Prof. Sandeep Shinde",
      designation: "Programme Officer, NSS Unit A-106",
      responsibility: "Faculty Head & Mentor",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      email: "po.nss@dypcoe.ac.in",
      quote: "Guiding, motivating and supporting the volunteers to create a positive impact in society.",
    };

  const coordinators = allMembers.filter((m) => m.category === "coordinator");
  const leads = allMembers.filter((m) => m.category === "lead");

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* 1. Page Header matching reference */}
      <PageHeader
        title="Our Team"
        breadcrumb={[{ label: "Our Team" }]}
        backgroundImage="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* SECTION 1: Programme Officer (Wide Card matching reference) */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1A2F] flex items-center gap-2">
              <span className="w-2.5 h-6 bg-orange-500 rounded-sm inline-block" />
              Programme Officer
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
              {/* Left Profile Info */}
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5 flex-shrink-0">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-3 border-orange-500 shadow-sm flex-shrink-0">
                  <Image
                    src={po.photo}
                    alt={po.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xl font-semibold text-slate-900">{po.name}</h3>
                  <p className="text-sm font-semibold text-orange-600">{po.designation}</p>
                  <p className="text-xs text-slate-500">Dr. D. Y. Patil College of Engineering, Akurdi</p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-2 text-xs text-slate-600">
                    {po.email && (
                      <span className="flex items-center justify-center sm:justify-start gap-1">
                        <Mail className="w-3.5 h-3.5 text-orange-500" />
                        {po.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Quote Callout matching reference */}
              <div className="flex-1 w-full md:max-w-md bg-amber-50/50 border border-amber-100 rounded-xl p-5 relative">
                <Quote className="w-6 h-6 text-orange-400/50 absolute top-3 right-3" />
                <p className="text-slate-700 italic text-sm leading-relaxed">
                  &ldquo;{po.quote || "Guiding, motivating and supporting the volunteers to create a positive impact in society."}&rdquo;
                </p>
                <div className="mt-3 text-right">
                  <span className="text-xs font-semibold text-slate-500">— Programme Officer</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: NSS Coordinators & Committee Members */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1A2F] flex items-center gap-2">
              <span className="w-2.5 h-6 bg-orange-500 rounded-sm inline-block" />
              NSS Coordinators & Committee Members
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Core student committee leading annual drives and organizational planning
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coordinators.map((member, idx) => (
              <div
                key={String(member._id || idx)}
                className="group bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-orange-200 transition-all duration-200 p-6 flex flex-col items-center text-center"
              >
                {/* Circular Photo */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 group-hover:border-orange-500 transition-colors mb-4 shadow-xs">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="96px"
                  />
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-orange-600 mt-0.5">
                  {member.designation}
                </p>
                <span className="inline-block mt-2 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 bg-slate-100 rounded-full">
                  {member.responsibility}
                </span>

                {member.email && (
                  <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    <span className="truncate max-w-[180px]">{member.email}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Team Leads & Co-Leads */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1A2F] flex items-center gap-2">
              <span className="w-2.5 h-6 bg-orange-500 rounded-sm inline-block" />
              Team Leads & Co-Leads
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Field heads leading cleanups, camps, digital outreach, and PR logistics
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leads.map((member, idx) => (
              <div
                key={String(member._id || idx)}
                className="group bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-orange-200 transition-all duration-200 p-6 flex flex-col items-center text-center"
              >
                {/* Circular Photo */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 group-hover:border-orange-500 transition-colors mb-4 shadow-xs">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="96px"
                  />
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-orange-600 mt-0.5">
                  {member.designation}
                </p>
                <span className="inline-block mt-2 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 bg-slate-100 rounded-full">
                  {member.responsibility}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
