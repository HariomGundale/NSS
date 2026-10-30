import { z } from "zod";

export const teamMemberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  designation: z.string().min(2, "Designation is required"),
  responsibility: z.string().min(2, "Responsibility/Role is required"),
  category: z.enum(["po", "coordinator", "lead"]),
  photo: z.string().min(1, "Photo URL is required"),
  email: z.string().optional(),
  phone: z.string().optional(),
  quote: z.string().optional(),
  order: z.coerce.number().optional(),
  active: z.boolean().optional(),
});

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
