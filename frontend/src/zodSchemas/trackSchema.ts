import { z } from "zod";

export const trackSchema = z.object({
  name: z.string().min(5, "Name is required"),
  album: z.string().min(1, "Album is required"),
  duration: z.string().min(1, "Duration is required"),
  youtubeLink: z.string().optional(),
});
