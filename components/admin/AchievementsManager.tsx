"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { achievementSchema, AchievementInput } from "@/schemas/achievement";
import DeleteModal from "@/components/admin/DeleteModal";
import ImageUploadField from "@/components/admin/ImageUploadField";
import {
  Trophy,
  Award,
  Medal,
  ShieldCheck,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  X,
  Loader2,
  Save,
} from "lucide-react";

interface AchievementsManagerProps {
  initialAchievements: any[];
  initialStats: any;
}

export default function AchievementsManager({
  initialAchievements,
  initialStats,
}: AchievementsManagerProps) {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [stats, setStats] = useState(initialStats || {});
  const [savingStats, setSavingStats] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Modal state for Achievement item
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AchievementInput>({
    resolver: zodResolver(achievementSchema) as any,
    defaultValues: {
      title: "",
      category: "award",
      description: "",
      year: "2024-2025",
      icon: "Trophy",
      badge: "State Level",
      featured: true,
      order: 0,
    },
  });

  const openAddModal = () => {
    setEditingItem(null);
    reset({
      title: "",
      category: "award",
      description: "",
      year: "2024-2025",
      icon: "Trophy",
      badge: "State Level",
      featured: true,
      order: achievements.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    reset({
      title: item.title,
      category: item.category,
      description: item.description,
      year: item.year || "",
      icon: item.icon || "Trophy",
      badge: item.badge || "",
      featured: item.featured ?? true,
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  const onSubmitAchievement = async (data: AchievementInput) => {
    try {
      const url = editingItem
        ? `/api/achievements/${editingItem._id}`
        : "/api/achievements";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save achievement");

      if (editingItem) {
        setAchievements((prev) =>
          prev.map((a) => (a._id === editingItem._id ? json.achievement : a))
        );
        setNotification(`Updated award: ${data.title}`);
      } else {
        setAchievements((prev) => [...prev, json.achievement]);
        setNotification(`Added award: ${data.title}`);
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
      const res = await fetch(`/api/achievements/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete achievement");

      setAchievements((prev) => prev.filter((a) => a._id !== deleteId));
      setNotification(`Deleted: ${deleteTitle}`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      alert(err.message || "Failed to delete");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingStats(true);

    try {
      const res = await fetch("/api/stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stats),
      });

      if (!res.ok) throw new Error("Failed to update statistics");

      setNotification("Site metrics and Programme Officer details updated successfully!");
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      alert(err.message || "Error saving statistics");
    } finally {
      setSavingStats(false);
    }
  };

  return (
    <div className="space-y-10">
      {notification && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* 1. Global Metrics & PO Editor Form */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/90 shadow-2xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-bold text-slate-900 text-base">Key Impact Numbers & Metrics</h3>
          <p className="text-xs text-slate-500">
            These values appear on the public Homepage and Achievements circular counters
          </p>
        </div>

        <form onSubmit={handleSaveStats} className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Total Activities
              </label>
              <input
                type="number"
                value={stats.totalActivities ?? 50}
                onChange={(e) =>
                  setStats({ ...stats, totalActivities: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Volunteers
              </label>
              <input
                type="number"
                value={stats.volunteerCount ?? 500}
                onChange={(e) =>
                  setStats({ ...stats, volunteerCount: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                People Benefited
              </label>
              <input
                type="number"
                value={stats.peopleBenefited ?? 10000}
                onChange={(e) =>
                  setStats({ ...stats, peopleBenefited: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Awards Count
              </label>
              <input
                type="number"
                value={stats.awardsCount ?? 5}
                onChange={(e) =>
                  setStats({ ...stats, awardsCount: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
              />
            </div>
          </div>

          {/* Programme Officer Message Edit */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="font-bold text-slate-800 text-sm">Programme Officer Details & Message</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  PO Name
                </label>
                <input
                  type="text"
                  value={stats.poName || ""}
                  onChange={(e) => setStats({ ...stats, poName: e.target.value })}
                  placeholder="Prof. Sandeep Shinde"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  PO Designation
                </label>
                <input
                  type="text"
                  value={stats.poDesignation || ""}
                  onChange={(e) => setStats({ ...stats, poDesignation: e.target.value })}
                  placeholder="Programme Officer, NSS Unit A-106"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                PO Message / Quote
              </label>
              <textarea
                rows={3}
                value={stats.poMessage || ""}
                onChange={(e) => setStats({ ...stats, poMessage: e.target.value })}
                placeholder="Together we can create a stronger, kinder and more sustainable society."
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
              />
            </div>

            <div>
              <ImageUploadField
                label="PO Portrait Photo"
                value={stats.poPhoto || ""}
                onChange={(url) => setStats({ ...stats, poPhoto: url })}
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingStats}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              {savingStats ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>Save Metrics & Content</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. Major Achievements & Awards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Major Achievements & Recognitions</h3>
            <p className="text-xs text-slate-500">
              Awards, camp delegations, and institutional commendations
            </p>
          </div>
          <button
            onClick={openAddModal}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Achievement</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs flex items-start justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0 mt-0.5">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    {item.year && (
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">
                        {item.year}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  {item.badge && (
                    <span className="inline-block text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => openEditModal(item)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                  title="Edit achievement"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteId(item._id);
                    setDeleteTitle(item.title);
                  }}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                  title="Delete achievement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingItem ? "Edit Achievement" : "Add Achievement"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmitAchievement)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  {...register("title")}
                  placeholder="e.g. Best NSS Unit Award"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    {...register("year")}
                    placeholder="2024-2025"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Badge / Level
                  </label>
                  <input
                    type="text"
                    {...register("badge")}
                    placeholder="e.g. State Level"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  {...register("description")}
                  placeholder="Describe the recognition or event..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
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
                  <span>Save Achievement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(deleteId)}
        title="Delete Achievement"
        message={`Are you sure you want to delete "${deleteTitle}"?`}
        loading={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
