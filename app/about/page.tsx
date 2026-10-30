import React from "react";
import Image from "next/image";
import PageHeader from "@/components/hero/PageHeader";
import { connectToDatabase } from "@/lib/mongodb";
import { SiteStat } from "@/models/SiteStat";
import { seedDatabaseIfEmpty } from "@/lib/seedData";
import {
  Target,
  Compass,
  CheckCircle,
  Quote,
  School,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "About Us | NSS DYPCOE Akurdi",
  description:
    "Learn about National Service Scheme (NSS), NSS Unit A-106 at DYPCOE Akurdi, our vision, mission, objectives, and Programme Officer's message.",
};

async function getAboutData() {
  try {
    await connectToDatabase();
    await seedDatabaseIfEmpty();
    const stats = await SiteStat.findOne().lean();
    return stats ? JSON.parse(JSON.stringify(stats)) : null;
  } catch (err) {
    console.error("Error fetching about data:", err);
    return null;
  }
}

export default async function AboutPage() {
  const data = await getAboutData();

  const poName = data?.poName || "Prof. Sandeep Shinde";
  const poDesignation = data?.poDesignation || "Programme Officer, NSS Unit A-106";
  const poMessage =
    data?.poMessage || "Together we can create a stronger, kinder and more sustainable society.";
  const poPhoto =
    data?.poPhoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80";
  const collegeName = data?.collegeName || "DY Patil College of Engineering, Akurdi";
  const collegeDescription =
    data?.collegeDescription ||
    "A premier engineering institute committed to academic excellence, innovation and holistic development of students.";
  const collegeImage =
    data?.collegeImage ||
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80";
  const aboutNssText =
    data?.aboutNssText ||
    "The National Service Scheme (NSS) is a central sector scheme of the Government of India, initiated in 1969, to encourage students to take part in community service and social development. It aims to develop the personality of students through voluntary work and service to society.";
  const aboutUnitText =
    data?.aboutUnitText ||
    "NSS Unit A-106 of DY Patil College of Engineering, Akurdi actively organizes various social, educational, environmental and awareness programs for the welfare of society. We believe in creating responsible citizens who contribute to nation-building.";

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* 1. Page Header matching reference */}
      <PageHeader
        title="About Us"
        breadcrumb={[{ label: "About Us" }]}
        backgroundImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Span 7) */}
          <div className="lg:col-span-7 space-y-8">
            {/* About NSS */}
            <section className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1A2F] mb-3 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-orange-500 rounded-sm inline-block" />
                About NSS
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {aboutNssText}
              </p>
            </section>

            {/* About Unit A-106 */}
            <section className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1A2F] mb-3 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-orange-500 rounded-sm inline-block" />
                About Unit A-106
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {aboutUnitText}
              </p>
            </section>

            {/* College Introduction Card */}
            <section className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200/90 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <School className="w-5 h-5 text-orange-500" />
                College Introduction
              </h3>
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <div className="relative w-full sm:w-44 h-32 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200">
                  <Image
                    src={collegeImage}
                    alt={collegeName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1.5 text-center sm:text-left">
                  <h4 className="font-bold text-slate-900 text-base">{collegeName}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {collegeDescription}
                  </p>
                  <span className="inline-block text-[11px] font-semibold text-orange-600 uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded">
                    Affiliated to SPPU, Approved by AICTE
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column (Span 5) */}
          <div className="lg:col-span-5 space-y-8">
            {/* NSS Symbol Card with Emblem */}
            <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">The NSS Symbol</h3>
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                    &ldquo;The NSS symbol represents the spirit of unity, service and progress.&rdquo;
                  </p>
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                    Inspired by the giant Rath wheel of the world-famous Konark Sun Temple in Odisha.
                    The wheel signifies the movement in life going towards development.
                  </p>
                </div>
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 relative">
                  <Image
                    src="/logo/nss-logo.png"
                    alt="NSS Symbol Emblem"
                    width={96}
                    height={96}
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Vision, Mission & Objectives */}
            <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-[#0B1A2F] border-b border-slate-100 pb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                Vision, Mission & Objectives
              </h3>

              {/* Vision */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Vision</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                    Develop socially responsible citizens for a better India.
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0 mt-0.5">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Mission</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                    To create awareness and bring positive change through service and action.
                  </p>
                </div>
              </div>

              {/* Objectives */}
              <div className="pt-2">
                <h4 className="font-bold text-slate-900 text-sm mb-3">Objectives</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span>Community Service</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span>Awareness & Education</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span>Environmental Protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span>Personality Development</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Featured Card: Programme Officer's Message */}
        <section className="mt-12 bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-bold text-[#0B1A2F] mb-6 flex items-center gap-2">
            <span className="w-2.5 h-5 bg-orange-500 rounded-sm inline-block" />
            Programme Officer&apos;s Message
          </h3>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8">
            {/* Avatar & Title */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left flex-shrink-0">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-orange-500/40 shadow-sm mb-3">
                <Image
                  src={poPhoto}
                  alt={poName}
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="font-bold text-slate-900 text-base">{poName}</h4>
              <p className="text-xs text-orange-600 font-semibold">{poDesignation}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Dr. D. Y. Patil College of Engineering, Akurdi</p>
            </div>

            {/* Quote Box matching reference */}
            <div className="flex-1 bg-amber-50/40 border border-amber-100 rounded-xl p-5 sm:p-6 relative">
              <Quote className="w-8 h-8 text-orange-300 absolute top-3 right-4 opacity-40 pointer-events-none" />
              <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed">
                &ldquo;{poMessage}&rdquo;
              </p>
              <div className="mt-4 flex justify-end">
                <span className="text-xs font-semibold text-slate-500">— Programme Officer</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
