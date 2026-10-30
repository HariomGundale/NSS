import { connectToDatabase } from "./mongodb";
import { Event } from "@/models/Event";
import { TeamMember } from "@/models/TeamMember";
import { Achievement } from "@/models/Achievement";
import { SiteStat } from "@/models/SiteStat";
import { ensureDefaultAdmin } from "./auth";

export const initialEvents = [
  {
    title: "Independence Day Celebration",
    slug: "independence-day-celebration",
    date: new Date("2024-08-15T09:00:00Z"),
    time: "08:30 AM - 12:00 PM",
    venue: "DYPCOE Campus",
    category: "National Celebration",
    status: "completed" as const,
    shortDescription: "Flag hoisting, cultural programs and patriotic activities to celebrate the spirit of freedom.",
    description: "The 78th Independence Day was celebrated with great patriotic zeal and enthusiasm by NSS Unit A-106 at DYPCOE Akurdi. The event commenced with the ceremonial flag hoisting by college dignitaries followed by the National Anthem. Volunteers presented cultural performances, patriotic poetry recitation, and pledged towards national unity and community development. Over 150 volunteers and faculty members participated.",
    coverImage: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    ],
    participants: 150,
    organizedBy: "NSS DYPCOE Unit A-106",
    coordinator: "Prof. Programme Officer & Team",
    isHighlight: true,
  },
  {
    title: "Swachh Bharat Abhiyan",
    slug: "swachh-bharat-abhiyan",
    date: new Date("2024-10-02T08:00:00Z"),
    time: "07:30 AM - 11:30 AM",
    venue: "Akurdi Area",
    category: "Community Service",
    status: "completed" as const,
    shortDescription: "Cleanliness drive and awareness program for a cleaner and healthier society.",
    description: "On Gandhi Jayanti, NSS Unit A-106 organized an extensive cleanliness and hygiene drive across Akurdi railway station surroundings, bus stands, and public parks. Volunteers actively collected plastic waste, created awareness about wet and dry segregation, and distributed cloth bags to local vendors. The initiative received high appreciation from local residents and municipal corporators.",
    coverImage: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    ],
    participants: 120,
    organizedBy: "NSS DYPCOE Unit A-106",
    coordinator: "Prof. Programme Officer",
    isHighlight: true,
  },
  {
    title: "Blood Donation Camp",
    slug: "blood-donation-camp",
    date: new Date("2024-11-26T10:00:00Z"),
    time: "09:30 AM - 04:30 PM",
    venue: "DYPCOE Campus",
    category: "Health & Well-being",
    status: "completed" as const,
    shortDescription: "Organized a blood donation camp in collaboration with a local hospital.",
    description: "In commemoration of Constitution Day, a mega voluntary blood donation camp was conducted in partnership with Pune District Blood Bank. Doctors and paramedical staff conducted pre-donation screenings. More than 200 units of blood were safely collected, and donor certificates along with health checkups were provided to all donors.",
    coverImage: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    ],
    participants: 215,
    organizedBy: "NSS DYPCOE Unit A-106",
    coordinator: "Health Committee Leads",
    isHighlight: true,
  },
  {
    title: "Tree Plantation Drive",
    slug: "tree-plantation-drive",
    date: new Date("2025-01-05T08:30:00Z"),
    time: "08:00 AM - 01:00 PM",
    venue: "DYPCOE Campus & Surroundings",
    category: "Environment Conservation",
    status: "completed" as const,
    shortDescription: "Planted trees and spread awareness about environmental conservation.",
    description: "Under the Green Campus, Green Future initiative, NSS volunteers planted over 250 native saplings including Neem, Peepal, and Gulmohar across campus grounds and local open belts. A pledge for regular nurturing and watering was taken by student groups. Water irrigation drip systems were also demonstrated.",
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    ],
    participants: 90,
    organizedBy: "NSS DYPCOE Unit A-106",
    coordinator: "Eco Club & NSS Leads",
    isHighlight: true,
  },
  {
    title: "Educational Visit",
    slug: "educational-visit",
    date: new Date("2025-02-12T10:00:00Z"),
    time: "10:00 AM - 03:00 PM",
    venue: "Local NGO",
    category: "Awareness & Education",
    status: "completed" as const,
    shortDescription: "Visited an NGO to understand their work and contribute to their initiatives.",
    description: "Volunteers visited an orphanage and educational charity home in Pune. NSS members conducted basic computer literacy workshops, distributed educational kits, story books, and sports equipment, and spent quality interactive time tutoring students in mathematics and science.",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    ],
    participants: 60,
    organizedBy: "NSS DYPCOE Unit A-106",
    coordinator: "Education Outreach Team",
    isHighlight: false,
  },
  {
    title: "Women's Day Celebration",
    slug: "womens-day-celebration",
    date: new Date("2025-03-08T11:00:00Z"),
    time: "11:00 AM - 02:00 PM",
    venue: "DYPCOE Campus",
    category: "Awareness & Education",
    status: "completed" as const,
    shortDescription: "Celebrated women's strength and achievements with inspiring talks.",
    description: "International Women's Day was observed celebrating the dedication and contributions of female faculty, staff, and student leaders. Guest speakers delivered talks on women's legal rights, mental wellness, and self-defense demonstrations were held by certified trainers.",
    coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    ],
    participants: 110,
    organizedBy: "NSS DYPCOE Unit A-106",
    coordinator: "Women Empowerment Cell & NSS",
    isHighlight: false,
  },
  {
    title: "Social Awareness Rally",
    slug: "social-awareness-rally",
    date: new Date("2025-01-20T09:00:00Z"),
    time: "09:00 AM - 12:30 PM",
    venue: "Akurdi Town",
    category: "Awareness & Education",
    status: "completed" as const,
    shortDescription: "Together for a Better Society - spreading road safety and de-addiction awareness.",
    description: "A large-scale street awareness march with placards, slogans, and street plays (Nukkad Natak) on road safety, helmet awareness, and cyber safety was carried out through the heart of Akurdi town.",
    coverImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    ],
    participants: 180,
    organizedBy: "NSS DYPCOE Unit A-106",
    coordinator: "Cultural & Street Play Team",
    isHighlight: true,
  },
  {
    title: "Mega Health Checkup & Eye Camp",
    slug: "mega-health-checkup-and-eye-camp",
    date: new Date("2025-05-10T09:00:00Z"),
    time: "09:00 AM - 04:00 PM",
    venue: "Akurdi Community Centre",
    category: "Health & Well-being",
    status: "upcoming" as const,
    shortDescription: "Free general health, eye screening, and medication distribution for senior citizens.",
    description: "An upcoming free public health camp organized by NSS Unit A-106 featuring specialist ophthalmologists, general physicians, and pediatricians. Spectacles and basic medicines will be distributed free of cost.",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    ],
    participants: 250,
    organizedBy: "NSS DYPCOE Unit A-106",
    coordinator: "Healthcare Volunteers Committee",
    isHighlight: false,
  },
  {
    title: "Youth Leadership & Disaster Relief Workshop",
    slug: "youth-leadership-and-disaster-relief-workshop",
    date: new Date("2025-06-15T10:00:00Z"),
    time: "10:00 AM - 05:00 PM",
    venue: "DYPCOE Main Seminar Hall",
    category: "Personality Development",
    status: "upcoming" as const,
    shortDescription: "Hands-on first aid, CPR certification, and fire safety drill training for volunteers.",
    description: "Intensive training camp for NSS volunteers covering crisis response, NDRF protocols, first-aid administration, team leadership, and community coordination during emergencies.",
    coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    ],
    participants: 120,
    organizedBy: "NSS DYPCOE Unit A-106",
    coordinator: "Disaster Preparedness Cell",
    isHighlight: false,
  },
];

export const initialTeamMembers = [
  {
    name: "Prof. Sandeep Shinde",
    designation: "Programme Officer, NSS Unit A-106",
    responsibility: "Unit Head & Faculty Advisor",
    category: "po" as const,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    email: "po.nss@dypcoe.ac.in",
    quote: "Guiding, motivating and supporting the volunteers to create a positive impact in society.",
    order: 1,
    active: true,
  },
  {
    name: "Rahul Deshmukh",
    designation: "Student Coordinator",
    responsibility: "Overall Unit Operations & SPPU Liaison",
    category: "coordinator" as const,
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    email: "rahul.deshmukh@dypcoe.ac.in",
    order: 2,
    active: true,
  },
  {
    name: "Snehal Patil",
    designation: "Event Coordinator",
    responsibility: "Event Execution & Volunteer Logistics",
    category: "coordinator" as const,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    email: "snehal.patil@dypcoe.ac.in",
    order: 3,
    active: true,
  },
  {
    name: "Aditya Kulkarni",
    designation: "Documentation Head",
    responsibility: "Reports, Records & Annual Audit",
    category: "coordinator" as const,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    email: "aditya.kulkarni@dypcoe.ac.in",
    order: 4,
    active: true,
  },
  {
    name: "Priya Sharma",
    designation: "Outreach Coordinator",
    responsibility: "Community Outreach & NGO Tie-ups",
    category: "coordinator" as const,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    email: "priya.sharma@dypcoe.ac.in",
    order: 5,
    active: true,
  },
  {
    name: "Rohan Joshi",
    designation: "Team Lead",
    responsibility: "Campus Cleanliness & Eco-Drives",
    category: "lead" as const,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    order: 6,
    active: true,
  },
  {
    name: "Neha Pawar",
    designation: "Co-Lead",
    responsibility: "Blood Donation & Health Camps",
    category: "lead" as const,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    order: 7,
    active: true,
  },
  {
    name: "Tanmay Shinde",
    designation: "Co-Lead",
    responsibility: "Digital Media, Photography & Design",
    category: "lead" as const,
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
    order: 8,
    active: true,
  },
  {
    name: "Ananya More",
    designation: "Co-Lead",
    responsibility: "Public Relations & Volunteer Induction",
    category: "lead" as const,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    order: 9,
    active: true,
  },
];

export const initialAchievements = [
  {
    title: "Best NSS Unit Award",
    category: "award" as const,
    description: "Awarded as one of the best performing NSS collegiate units for outstanding community interventions and discipline.",
    year: "2023-2024",
    icon: "Trophy",
    badge: "State Level",
    featured: true,
    order: 1,
  },
  {
    title: "Appreciation Certificate from SPPU",
    category: "recognition" as const,
    description: "Honored by Savitribai Phule Pune University for exemplary conduct during blood donation and environmental awareness.",
    year: "2024",
    icon: "Award",
    badge: "University Level",
    featured: true,
    order: 2,
  },
  {
    title: "Participation in State/National Level Camps",
    category: "camp" as const,
    description: "Volunteers selected and represented Pune District at prestigious State Republic Day and Adventure Camps.",
    year: "2024-2025",
    icon: "Medal",
    badge: "National Level",
    featured: true,
    order: 3,
  },
  {
    title: "Recognition for Outstanding Social Work",
    category: "recognition" as const,
    description: "Acknowledged by local municipal authorities for consistent sanitation drives and civic education campaigns in Akurdi.",
    year: "2024",
    icon: "ShieldCheck",
    badge: "District Level",
    featured: true,
    order: 4,
  },
];

export async function seedDatabaseIfEmpty() {
  await connectToDatabase();
  await ensureDefaultAdmin();

  try {
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.insertMany(initialEvents, { ordered: false });
      console.log("[SEED] Initialized events collection.");
    }
  } catch (err: any) {
    if (err.code !== 11000) console.error("[SEED] Events seed notice:", err.message);
  }

  try {
    const teamCount = await TeamMember.countDocuments();
    if (teamCount === 0) {
      await TeamMember.insertMany(initialTeamMembers, { ordered: false });
      console.log("[SEED] Initialized team members collection.");
    }
  } catch (err: any) {
    if (err.code !== 11000) console.error("[SEED] Team seed notice:", err.message);
  }

  try {
    const achievementCount = await Achievement.countDocuments();
    if (achievementCount === 0) {
      await Achievement.insertMany(initialAchievements, { ordered: false });
      console.log("[SEED] Initialized achievements collection.");
    }
  } catch (err: any) {
    if (err.code !== 11000) console.error("[SEED] Achievements seed notice:", err.message);
  }

  try {
    const statCount = await SiteStat.countDocuments();
    if (statCount === 0) {
      await SiteStat.create({
        totalActivities: 50,
        volunteerCount: 500,
        peopleBenefited: 10000,
        awardsCount: 5,
        poName: "Prof. Sandeep Shinde",
        poDesignation: "Programme Officer, NSS Unit A-106",
        poMessage: "Together we can create a stronger, kinder and more sustainable society.",
        poPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        poContact: "nss@dypcoe.ac.in",
        collegeName: "DY Patil College of Engineering, Akurdi",
        collegeDescription: "A premier engineering institute committed to academic excellence, innovation and holistic development of students.",
        collegeImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
        aboutNssText: "The National Service Scheme (NSS) is a central sector scheme of the Government of India, initiated in 1969, to encourage students to take part in community service and social development. It aims to develop the personality of students through voluntary work and service to society.",
        aboutUnitText: "NSS Unit A-106 of DY Patil College of Engineering, Akurdi actively organizes various social, educational, environmental and awareness programs for the welfare of society. We believe in creating responsible citizens who contribute to nation-building.",
      });
      console.log("[SEED] Initialized site statistics and content.");
    }
  } catch (err: any) {
    if (err.code !== 11000) console.error("[SEED] Stats seed notice:", err.message);
  }
}
