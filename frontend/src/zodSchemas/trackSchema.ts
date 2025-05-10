import { z } from "zod";

export const trackSchema = z.object({
  name: z.string().min(5, "Name is required, min 5 characters"),
  album: z.string().min(1, "Album is required"),
  duration: z.string().min(1, "Duration is required"),
  youtubeLink: z
    .union([z.string().url("Url must be valid"), z.literal("")])
    .optional(),
});
