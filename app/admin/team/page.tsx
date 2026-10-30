import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import TeamManager from "@/components/admin/TeamManager";
import { connectToDatabase } from "@/lib/mongodb";
import { TeamMember } from "@/models/TeamMember";

async function getAdminTeamMembers() {
  try {
    await connectToDatabase();
    const members = await TeamMember.find().sort({ order: 1, createdAt: 1 }).lean();
    return JSON.parse(JSON.stringify(members));
  } catch (err) {
    console.error("Error fetching admin team:", err);
    return [];
  }
}

export default async function AdminTeamPage() {
  const members = await getAdminTeamMembers();

  return (
    <AdminLayout
      title="Team & Coordinators Management"
      subtitle="Add, edit, reorder, and update photos for Programme Officer and student leads"
    >
      <TeamManager initialMembers={members} />
    </AdminLayout>
  );
}
