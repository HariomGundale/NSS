"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UploadCloud, Link as LinkIcon, Loader2, X, Check } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  required = false,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [useUrlInput, setUseUrlInput] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPEG, PNG, WebP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      onChange(data.url);
    } catch (err: any) {
      setError(err.message || "Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleApplyUrl = () => {
    if (!inputUrl) return;
    onChange(inputUrl.trim());
    setInputUrl("");
    setUseUrlInput(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setUseUrlInput(!useUrlInput)}
          className="text-[11px] font-medium text-orange-600 hover:text-orange-700 underline"
        >
          {useUrlInput ? "Upload Local File" : "Enter Direct URL"}
        </button>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {useUrlInput ? (
        <div className="flex items-center gap-2">
          <input
            type="url"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-3 py-2 bg-orange-600 text-white rounded-lg text-xs font-semibold hover:bg-orange-700"
          >
            Apply
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <label className="relative flex items-center justify-center px-4 py-2 bg-slate-50 border border-dashed border-slate-300 hover:border-orange-500 rounded-lg cursor-pointer text-xs font-medium text-slate-600 hover:text-orange-600 transition-colors">
            {uploading ? (
              <span className="flex items-center gap-1.5 text-orange-600">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Uploading...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <UploadCloud className="w-4 h-4" />
                Choose Image File
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="sr-only"
            />
          </label>

          <span className="text-[11px] text-slate-400">Max 5MB (JPG, PNG, WebP)</span>
        </div>
      )}

      {/* Preview Box */}
      {value && (
        <div className="relative mt-2 w-32 h-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 group">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            sizes="128px"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            title="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
