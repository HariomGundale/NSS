import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AchievementsManager from "@/components/admin/AchievementsManager";
import { connectToDatabase } from "@/lib/mongodb";
import { Achievement } from "@/models/Achievement";
import { SiteStat } from "@/models/SiteStat";

async function getAdminAchievementsData() {
  try {
    await connectToDatabase();
    const [achievements, stats] = await Promise.all([
      Achievement.find().sort({ order: 1, createdAt: -1 }).lean(),
      SiteStat.findOne().lean(),
    ]);

    return {
      achievements: JSON.parse(JSON.stringify(achievements)),
      stats: stats ? JSON.parse(JSON.stringify(stats)) : null,
    };
  } catch (err) {
    console.error("Error fetching achievements admin data:", err);
    return { achievements: [], stats: null };
  }
}

export default async function AdminAchievementsPage() {
  const { achievements, stats } = await getAdminAchievementsData();

  return (
    <AdminLayout
      title="Achievements & Metrics Management"
      subtitle="Edit site counters, college statistics, awards, and Programme Officer profile"
    >
      <AchievementsManager
        initialAchievements={achievements}
        initialStats={stats}
      />
    </AdminLayout>
  );
}
