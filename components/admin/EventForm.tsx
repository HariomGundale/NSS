"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, EventInput } from "@/schemas/event";
import ImageUploadField from "@/components/admin/ImageUploadField";
import {
  Loader2,
  X,
  Plus,
  ArrowLeft,
  Calendar,
  CheckCircle,
  AlertCircle,
  Images,
} from "lucide-react";

interface EventFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function EventForm({ initialData, isEditing = false }: EventFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Gallery state
  const [gallery, setGallery] = useState<string[]>(initialData?.gallery || []);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EventInput>({
    resolver: zodResolver(eventSchema) as any,
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      date: initialData?.date
        ? new Date(initialData.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      time: initialData?.time || "10:00 AM",
      venue: initialData?.venue || "",
      category: initialData?.category || "Community Service",
      status: initialData?.status || "completed",
      shortDescription: initialData?.shortDescription || "",
      description: initialData?.description || "",
      coverImage: initialData?.coverImage || "",
      gallery: initialData?.gallery || [],
      participants: initialData?.participants || 50,
      organizedBy: initialData?.organizedBy || "NSS DYPCOE Unit A-106",
      coordinator: initialData?.coordinator || "Programme Officer & Student Coordinators",
      isHighlight: initialData?.isHighlight ?? false,
    },
  });

  const coverImage = watch("coverImage");

  const handleAddGalleryUrl = () => {
    if (!newGalleryUrl.trim()) return;
    const updated = [...gallery, newGalleryUrl.trim()];
    setGallery(updated);
    setValue("gallery", updated);
    setNewGalleryUrl("");
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          uploadedUrls.push(data.url);
        }
      }

      const updated = [...gallery, ...uploadedUrls];
      setGallery(updated);
      setValue("gallery", updated);
    } catch (err) {
      console.error("Gallery upload error:", err);
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    const updated = gallery.filter((_, idx) => idx !== indexToRemove);
    setGallery(updated);
    setValue("gallery", updated);
  };

  const onSubmit = async (data: EventInput) => {
    setServerError(null);
    setSuccess(null);

    const payload = {
      ...data,
      gallery,
    };

    try {
      const url = isEditing
        ? `/api/events/${initialData._id}`
        : "/api/events";

      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || "Failed to save event");
      }

      setSuccess(`Event successfully ${isEditing ? "updated" : "published"}!`);
      setTimeout(() => {
        router.push("/admin/events");
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setServerError(err.message || "Failed to submit form");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events List</span>
        </Link>
      </div>

      {serverError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/90 shadow-2xs space-y-6">
        {/* Basic Details */}
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-bold text-slate-900 text-base">Basic Details</h3>
          <p className="text-xs text-slate-500">Event title, schedule, and category</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Event Title */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Event Name *
            </label>
            <input
              type="text"
              {...register("title")}
              placeholder="e.g. Swachh Bharat Abhiyan Cleanliness Drive"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Date *
            </label>
            <input
              type="date"
              {...register("date")}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
          </div>

          {/* Time */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Time
            </label>
            <input
              type="text"
              {...register("time")}
              placeholder="e.g. 09:00 AM - 01:00 PM"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
            />
          </div>

          {/* Venue */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Venue *
            </label>
            <input
              type="text"
              {...register("venue")}
              placeholder="e.g. DYPCOE Campus / Akurdi"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
            />
            {errors.venue && <p className="text-red-500 text-xs mt-1">{errors.venue.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              {...register("category")}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white text-slate-900"
            >
              <option value="Community Service">Community Service</option>
              <option value="Environment Conservation">Environment Conservation</option>
              <option value="Health & Well-being">Health & Well-being</option>
              <option value="Awareness & Education">Awareness & Education</option>
              <option value="National Celebration">National Celebration</option>
              <option value="Personality Development">Personality Development</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white text-slate-900"
            >
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          {/* Participants */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Participants Count
            </label>
            <input
              type="number"
              {...register("participants")}
              placeholder="50"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
            />
          </div>
        </div>

        {/* Descriptions */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Short Description * (Summary for event cards)
            </label>
            <input
              type="text"
              {...register("shortDescription")}
              placeholder="Brief 1-sentence summary"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
            />
            {errors.shortDescription && (
              <p className="text-red-500 text-xs mt-1">{errors.shortDescription.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Full Description *
            </label>
            <textarea
              rows={6}
              {...register("description")}
              placeholder="Detailed breakdown of activities, outcomes, student participation, and highlights..."
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>
        </div>

        {/* Cover Photo */}
        <div className="pt-2">
          <ImageUploadField
            label="Cover Photo"
            required
            value={coverImage || ""}
            onChange={(url) => setValue("coverImage", url, { shouldValidate: true })}
          />
          {errors.coverImage && (
            <p className="text-red-500 text-xs mt-1">{errors.coverImage.message}</p>
          )}
        </div>

        {/* Gallery Photos */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Event Gallery Photos ({gallery.length})
              </label>
              <p className="text-[11px] text-slate-400">Upload multiple photos from the drive</p>
            </div>
            <label className="px-3 py-1.5 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded-lg text-xs font-semibold cursor-pointer border border-orange-200 flex items-center gap-1">
              {uploadingGallery ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
              <span>Upload Photos</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleGalleryUpload}
                disabled={uploadingGallery}
                className="sr-only"
              />
            </label>
          </div>

          {/* Add URL fallback */}
          <div className="flex items-center gap-2">
            <input
              type="url"
              value={newGalleryUrl}
              onChange={(e) => setNewGalleryUrl(e.target.value)}
              placeholder="Or paste image URL..."
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={handleAddGalleryUrl}
              className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900"
            >
              Add URL
            </button>
          </div>

          {/* Gallery Preview Grid */}
          {gallery.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
              {gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative h-20 w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-50 group"
                >
                  <Image
                    src={imgUrl}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryImage(idx)}
                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove from gallery"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Coordinators & Homepage Highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Organized By
            </label>
            <input
              type="text"
              {...register("organizedBy")}
              placeholder="NSS DYPCOE Unit A-106"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Coordinator
            </label>
            <input
              type="text"
              {...register("coordinator")}
              placeholder="e.g. Prof. Sandeep Shinde & Student Leads"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-900"
            />
          </div>

          <div className="sm:col-span-2 pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                {...register("isHighlight")}
                className="w-4 h-4 text-orange-600 rounded border-slate-300 focus:ring-orange-500"
              />
              <span className="text-xs font-medium text-slate-700">
                Feature on Homepage &ldquo;Highlights&rdquo; section
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
          <Link
            href="/admin/events"
            className="px-5 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isEditing ? "Save Changes" : "Publish Event"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
