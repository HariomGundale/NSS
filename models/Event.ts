import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  date: Date;
  time?: string;
  venue: string;
  category: string;
  status: "completed" | "upcoming";
  shortDescription: string;
  description: string;
  coverImage: string;
  gallery: string[];
  participants?: number;
  organizedBy?: string;
  coordinator?: string;
  isHighlight?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    time: {
      type: String,
      default: "10:00 AM",
    },
    venue: {
      type: String,
      required: [true, "Event venue is required"],
      trim: true,
    },
    category: {
      type: String,
      default: "Community Service",
      trim: true,
    },
    status: {
      type: String,
      enum: ["completed", "upcoming"],
      default: "completed",
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Full description is required"],
    },
    coverImage: {
      type: String,
      required: [true, "Cover image is required"],
    },
    gallery: {
      type: [String],
      default: [],
    },
    participants: {
      type: Number,
      default: 50,
    },
    organizedBy: {
      type: String,
      default: "NSS DYPCOE Unit A-106",
    },
    coordinator: {
      type: String,
      default: "Programme Officer & Student Coordinators",
    },
    isHighlight: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast lookups and sorting
EventSchema.index({ status: 1, date: -1 });

export const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
