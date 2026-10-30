import React from "react";
import { HeartHandshake, BookOpen, Trees, Trophy } from "lucide-react";

export default function UnitAtGlance() {
  const focusAreas = [
    {
      title: "Community Service",
      subtitle: "For a Better Society",
      icon: HeartHandshake,
      description: "Grassroots community initiatives, blood donation drives, village adoptions, and civic welfare.",
    },
    {
      title: "Awareness & Education",
      subtitle: "Education Programs",
      icon: BookOpen,
      description: "Literacy campaigns, digital education workshops, legal awareness, and child safety sessions.",
    },
    {
      title: "Environment Conservation",
      subtitle: "Green Initiatives",
      icon: Trees,
      description: "Tree plantation drives, plastic-free campus campaigns, river cleanups, and eco-pledges.",
    },
    {
      title: "Personality Development",
      subtitle: "& Leadership",
      icon: Trophy,
      description: "Nurturing leadership, crisis management, disciplined teamwork, and social sensitivity.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0B1A2F] tracking-[-0.015em] leading-tight">
            Our Unit at a Glance
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            NSS Unit A-106 of DY Patil College of Engineering, Akurdi is committed to creating positive
            social change through community service, awareness programs and various extension activities.
          </p>
        </div>

        {/* 4 Focus Area Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <div
                key={idx}
                className="group p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-200 flex flex-col items-center text-center"
              >
                {/* Icon Container with Soft Orange Circle */}
                <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-200">
                  <Icon className="w-8 h-8" />
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-semibold text-slate-900 text-lg sm:text-[21px] group-hover:text-orange-600 transition-colors">
                  {area.title}
                </h3>
                <span className="text-xs font-semibold text-orange-600 tracking-wide uppercase mt-1 mb-2">
                  {area.subtitle}
                </span>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {area.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
