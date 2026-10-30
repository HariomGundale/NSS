"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamMemberSchema, TeamMemberInput } from "@/schemas/team";
import ImageUploadField from "@/components/admin/ImageUploadField";
import DeleteModal from "@/components/admin/DeleteModal";
import {
  Plus,
  Edit,
  Trash2,
  Mail,
  CheckCircle,
  X,
  Loader2,
  User,
} from "lucide-react";

interface TeamManagerProps {
  initialMembers: any[];
}

export default function TeamManager({ initialMembers }: TeamManagerProps) {
  const [members, setMembers] = useState(initialMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TeamMemberInput>({
    resolver: zodResolver(teamMemberSchema) as any,
    defaultValues: {
      name: "",
      designation: "",
      responsibility: "",
      category: "coordinator",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      email: "",
      quote: "",
      order: 0,
      active: true,
    },
  });

  const photoUrl = watch("photo");

  const openAddModal = () => {
    setEditingMember(null);
    reset({
      name: "",
      designation: "",
      responsibility: "",
      category: "coordinator",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      email: "",
      quote: "",
      order: members.length + 1,
      active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (member: any) => {
    setEditingMember(member);
    reset({
      name: member.name,
      designation: member.designation,
      responsibility: member.responsibility,
      category: member.category,
      photo: member.photo,
      email: member.email || "",
      quote: member.quote || "",
      order: member.order || 0,
      active: member.active ?? true,
    });
    setIsModalOpen(true);
  };

  const onSubmit = async (data: TeamMemberInput) => {
    try {
      const url = editingMember
        ? `/api/team/${editingMember._id}`
        : "/api/team";
      const method = editingMember ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to save team member");
      }

      if (editingMember) {
        setMembers((prev) =>
          prev.map((m) => (m._id === editingMember._id ? json.member : m))
        );
        setNotification(`Updated member ${data.name}`);
      } else {
        setMembers((prev) => [...prev, json.member]);
        setNotification(`Added member ${data.name}`);
      }

      setIsModalOpen(false);
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      alert(err.message || "Operation failed");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/team/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete member");

      setMembers((prev) => prev.filter((m) => m._id !== deleteId));
      setNotification(`Member ${deleteName} deleted`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      alert(err.message || "Failed to delete");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {notification && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">NSS Team Directory</h3>
          <p className="text-xs text-slate-500">
            {members.length} Active committee members and leads
          </p>
        </div>
        <button
          onClick={openAddModal}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </button>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member) => (
          <div
            key={member._id}
            className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative"
          >
            {/* Category tag */}
            <div className="absolute top-3 right-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                {member.category}
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 mb-3 shadow-xs">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              <h4 className="font-bold text-slate-900 text-base">{member.name}</h4>
              <p className="text-xs font-semibold text-orange-600">{member.designation}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 bg-slate-100 rounded-full">
                {member.responsibility}
              </span>

              {member.email && (
                <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  <span className="truncate max-w-[160px]">{member.email}</span>
                </p>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Order: #{member.order}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => openEditModal(member)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                  title="Edit member"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteId(member._id);
                    setDeleteName(member.name);
                  }}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                  title="Delete member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingMember ? "Edit Team Member" : "Add New Team Member"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="e.g. Snehal Patil"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    {...register("category")}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white text-slate-900"
                  >
                    <option value="po">Programme Officer (PO)</option>
                    <option value="coordinator">Coordinator / Committee</option>
                    <option value="lead">Team Lead / Co-Lead</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    {...register("order")}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Designation *
                </label>
                <input
                  type="text"
                  {...register("designation")}
                  placeholder="e.g. Student Coordinator"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
                />
                {errors.designation && (
                  <p className="text-red-500 text-xs mt-1">{errors.designation.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Responsibility *
                </label>
                <input
                  type="text"
                  {...register("responsibility")}
                  placeholder="e.g. Event Logistics & SPPU Liaison"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
                />
                {errors.responsibility && (
                  <p className="text-red-500 text-xs mt-1">{errors.responsibility.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="name@dypcoe.ac.in"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <ImageUploadField
                  label="Member Photo"
                  required
                  value={photoUrl || ""}
                  onChange={(url) => setValue("photo", url, { shouldValidate: true })}
                />
                {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}
              </div>

              {/* Quote (Optional for PO) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Message / Quote (Optional)
                </label>
                <textarea
                  rows={2}
                  {...register("quote")}
                  placeholder="Guiding, motivating and supporting the volunteers..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(deleteId)}
        title="Delete Team Member"
        message={`Are you sure you want to remove ${deleteName} from the team directory?`}
        loading={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
