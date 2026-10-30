import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteStat extends Document {
  totalActivities: number;
  volunteerCount: number;
  peopleBenefited: number;
  awardsCount: number;
  poName: string;
  poDesignation: string;
  poMessage: string;
  poPhoto: string;
  poContact?: string;
  collegeName: string;
  collegeDescription: string;
  collegeImage: string;
  aboutNssText: string;
  aboutUnitText: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteStatSchema = new Schema<ISiteStat>(
  {
    totalActivities: { type: Number, default: 50 },
    volunteerCount: { type: Number, default: 500 },
    peopleBenefited: { type: Number, default: 10000 },
    awardsCount: { type: Number, default: 5 },
    poName: { type: String, default: "Prof. [Name Placeholder]" },
    poDesignation: { type: String, default: "Programme Officer, NSS Unit A-106" },
    poMessage: {
      type: String,
      default:
        "Together we can create a stronger, kinder and more sustainable society.",
    },
    poPhoto: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    },
    poContact: { type: String, default: "nss@dypcoe.ac.in" },
    collegeName: { type: String, default: "DY Patil College of Engineering, Akurdi" },
    collegeDescription: {
      type: String,
      default:
        "A premier engineering institute committed to academic excellence, innovation and holistic development of students.",
    },
    collegeImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    },
    aboutNssText: {
      type: String,
      default:
        "The National Service Scheme (NSS) is a central sector scheme of the Government of India, initiated in 1969, to encourage students to take part in community service and social development. It aims to develop the personality of students through voluntary work and service to society.",
    },
    aboutUnitText: {
      type: String,
      default:
        "NSS Unit A-106 of DY Patil College of Engineering, Akurdi actively organizes various social, educational, environmental and awareness programs for the welfare of society. We believe in creating responsible citizens who contribute to nation-building.",
    },
  },
  {
    timestamps: true,
  }
);

export const SiteStat: Model<ISiteStat> =
  mongoose.models.SiteStat || mongoose.model<ISiteStat>("SiteStat", SiteStatSchema);
