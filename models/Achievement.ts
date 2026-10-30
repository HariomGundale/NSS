import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAchievement extends Document {
  title: string;
  category: "award" | "camp" | "initiative" | "recognition";
  description: string;
  year?: string;
  icon?: string;
  badge?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema = new Schema<IAchievement>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["award", "camp", "initiative", "recognition"],
      default: "award",
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      default: "2024-2025",
    },
    icon: {
      type: String,
      default: "Award",
    },
    badge: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

AchievementSchema.index({ order: 1 });

export const Achievement: Model<IAchievement> =
  mongoose.models.Achievement ||
  mongoose.model<IAchievement>("Achievement", AchievementSchema);
