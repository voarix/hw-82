import { z } from "zod";

export const artistSchema = z.object({
  name: z.string().min(5, "Name is required, min 5 characters"),
  info: z.string().optional(),
  image: z.instanceof(File).nullable().optional(),
});
