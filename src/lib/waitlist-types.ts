import { z } from "zod";

export const waitlistEntrySchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  appSlug: z.string().min(1, "App slug is required"),
});

export type WaitlistEntryFormData = z.infer<typeof waitlistEntrySchema>;

export type WaitlistActionResult = {
  success: boolean;
  message: string;
  position?: number;
  totalEntries?: number;
  errors?: Record<string, string[]>;
};
