import React from "react";
import PageHeader from "@/components/hero/PageHeader";
import { connectToDatabase } from "@/lib/mongodb";
import { Achievement, IAchievement } from "@/models/Achievement";
import { SiteStat } from "@/models/SiteStat";
import { seedDatabaseIfEmpty } from "@/lib/seedData";
import {
  CalendarCheck2,
  Users2,
  HeartHandshake,
  Trophy,
  Award,
  Medal,
  ShieldCheck,
  CheckCircle2,
  Trees,
  Megaphone,
} from "lucide-react";

export const metadata = {
  title: "Achievements & Impact | NSS DYPCOE Akurdi",
  description:
    "Explore the social milestones, state awards, volunteer participation numbers, and community impact created by NSS Unit A-106 at DYPCOE Akurdi.",
};

async function getAchievementsData() {
  try {
    await connectToDatabase();
    await seedDatabaseIfEmpty();

    const [achievements, siteStats] = await Promise.all([
      Achievement.find().sort({ order: 1, createdAt: -1 }).lean(),
      SiteStat.findOne().lean(),
    ]);

    return {
      achievements: JSON.parse(JSON.stringify(achievements)) as IAchievement[],
      stats: siteStats ? JSON.parse(JSON.stringify(siteStats)) : null,
    };
  } catch (err) {
    console.error("Error fetching achievements data:", err);
    return { achievements: [], stats: null };
  }
}

export default async function AchievementsPage() {
  const { achievements, stats } = await getAchievementsData();

  const totalActivities = stats?.totalActivities || 50;
  const volunteerCount = stats?.volunteerCount || 500;
  const peopleBenefited = stats?.peopleBenefited || 10000;
  const awardsCount = stats?.awardsCount || 5;

  const getAwardIcon = (iconName?: string) => {
    switch (iconName) {
      case "Trophy":
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case "Award":
        return <Award className="w-5 h-5 text-orange-500" />;
      case "Medal":
        return <Medal className="w-5 h-5 text-indigo-500" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* 1. Header with Breadcrumb: Home > Achievements & Impact */}
      <PageHeader
        title="Achievements & Impact"
        breadcrumb={[{ label: "Achievements & Impact" }]}
        backgroundImage="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-14">
        {/* TOP 3 STATISTIC CARDS matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat 1: Total Activities */}
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200/90 shadow-xs flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
              <CalendarCheck2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Total Activities Conducted
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-bold text-slate-900">{totalActivities}+</span>
                <span className="text-xs text-slate-400 font-medium">(Annual Drives)</span>
              </div>
            </div>
          </div>

          {/* Stat 2: Volunteer Participation */}
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200/90 shadow-xs flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
              <Users2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Volunteer Participation
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-bold text-slate-900">{volunteerCount}+</span>
                <span className="text-xs text-slate-400 font-medium">(Active Youth)</span>
              </div>
            </div>
          </div>

          {/* Stat 3: People Benefited */}
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200/90 shadow-xs flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                People Benefited
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-bold text-slate-900">
                  {peopleBenefited.toLocaleString()}+
                </span>
                <span className="text-xs text-slate-400 font-medium">(Lives Touched)</span>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: 2 COLUMNS matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Social & Environmental Contributions */}
          <div className="lg:col-span-6 bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-[#0B1A2F] border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-orange-500 rounded-sm inline-block" />
              Social & Environmental Contributions
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50/80 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Community Development Programs
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Sustained community development and relief drives for underprivileged sections, orphanages, and rural schools.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50/80 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Trees className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Environmental Conservation & Sustainability
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Over 2,000+ saplings planted, organic waste compost pits created, and plastic ban campaigns enforced in the locality.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50/80 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Awareness Campaigns
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Mass street rallies, health education, blood donation camps, road safety, and gender equality workshops.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Major Achievements & Recognitions */}
          <div className="lg:col-span-6 bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-[#0B1A2F] border-b border-slate-100 pb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Major Achievements & Recognitions
            </h3>

            <div className="space-y-4">
              {achievements.map((item, idx) => (
                <div
                  key={String(item._id || idx)}
                  className="flex items-start gap-4 p-4 rounded-lg border border-slate-100 hover:border-orange-200 hover:bg-orange-50/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {getAwardIcon(item.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        {item.title}
                      </h4>
                      {item.year && (
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {item.year}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                    {item.badge && (
                      <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: "Our Impact in Numbers" Circular Counters matching reference */}
        <section className="bg-white p-8 sm:p-12 rounded-xl border border-slate-200/90 shadow-xs text-center">
          <div className="max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B1A2F] tracking-[-0.015em]">Our Impact in Numbers</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Measurable difference driven by the passion and commitment of our NSS volunteers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Circle 1 */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-orange-500 flex flex-col items-center justify-center shadow-inner bg-orange-50/40">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900">{totalActivities}+</span>
              </div>
              <span className="mt-3 text-xs sm:text-sm font-semibold text-slate-700">
                Activities Conducted
              </span>
            </div>

            {/* Circle 2 */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-blue-600 flex flex-col items-center justify-center shadow-inner bg-blue-50/40">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900">{volunteerCount}+</span>
              </div>
              <span className="mt-3 text-xs sm:text-sm font-semibold text-slate-700">
                Dedicated Volunteers
              </span>
            </div>

            {/* Circle 3 */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center shadow-inner bg-emerald-50/40">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {peopleBenefited.toLocaleString()}+
                </span>
              </div>
              <span className="mt-3 text-xs sm:text-sm font-semibold text-slate-700">
                People Benefited
              </span>
            </div>

            {/* Circle 4 */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-amber-500 flex flex-col items-center justify-center shadow-inner bg-amber-50/40">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900">{awardsCount}+</span>
              </div>
              <span className="mt-3 text-xs sm:text-sm font-semibold text-slate-700">
                Awards & Recognitions
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
