import { z } from "zod";

export const achievementSchema = z.object({
  title: z.string().min(2, "Title is required"),
  category: z.enum(["award", "camp", "initiative", "recognition"]),
  description: z.string().min(5, "Description is required"),
  year: z.string().optional(),
  icon: z.string().optional(),
  badge: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.coerce.number().optional(),
});

export type AchievementInput = z.infer<typeof achievementSchema>;
