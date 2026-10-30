import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  slug: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().optional(),
  venue: z.string().min(2, "Venue is required"),
  category: z.string().min(2, "Category is required"),
  status: z.enum(["completed", "upcoming"]),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters").max(300),
  description: z.string().min(20, "Full description must be at least 20 characters"),
  coverImage: z.string().min(1, "Cover photo is required"),
  gallery: z.array(z.string()).optional(),
  participants: z.coerce.number().optional(),
  organizedBy: z.string().optional(),
  coordinator: z.string().optional(),
  isHighlight: z.boolean().optional(),
});

export type EventInput = z.infer<typeof eventSchema>;
