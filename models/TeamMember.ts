import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITeamMember extends Document {
  name: string;
  designation: string;
  responsibility: string;
  category: "po" | "coordinator" | "lead";
  photo: string;
  email?: string;
  phone?: string;
  quote?: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },
    responsibility: {
      type: String,
      required: [true, "Responsibility/Role is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["po", "coordinator", "lead"],
      required: true,
      default: "coordinator",
    },
    photo: {
      type: String,
      default: "/images/avatar-placeholder.png",
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    quote: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

TeamMemberSchema.index({ category: 1, order: 1 });

export const TeamMember: Model<ITeamMember> =
  mongoose.models.TeamMember || mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);
