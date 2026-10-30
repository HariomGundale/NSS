"use client";

import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/gallery/Lightbox";
import { Maximize2, Images } from "lucide-react";

interface EventDetailGalleryProps {
  gallery: string[];
  eventTitle: string;
}

export default function EventDetailGallery({ gallery, eventTitle }: EventDetailGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!gallery || gallery.length === 0) {
    return null;
  }

  const openLightboxAt = (idx: number) => {
    setCurrentIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h3 className="text-xl font-bold text-[#0B1A2F] flex items-center gap-2">
          <Images className="w-5 h-5 text-orange-500" />
          Event Photo Gallery
        </h3>
        <span className="text-xs font-semibold text-slate-500">
          {gallery.length} {gallery.length === 1 ? "Photo" : "Photos"}
        </span>
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {gallery.map((imgUrl, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => openLightboxAt(idx)}
            className="group relative h-36 sm:h-44 w-full rounded-xl overflow-hidden border border-slate-200/90 shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label={`Open image ${idx + 1} of ${eventTitle}`}
          >
            <Image
              src={imgUrl}
              alt={`${eventTitle} gallery photo ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-2 rounded-full bg-white/20 text-white backdrop-blur-xs">
                <Maximize2 className="w-5 h-5" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={gallery}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setCurrentIndex((prev) => (prev + 1) % gallery.length)}
        onPrev={() => setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length)}
      />
    </div>
  );
}
