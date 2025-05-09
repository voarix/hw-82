import { z } from "zod";

export const albumSchema = z.object({
  artist: z.string().min(1, "Artist is required"),
  name: z.string().min(5, "Name is required"),
  date: z.string().refine(
    (val) => {
      const year = parseInt(val, 10);
      return (
        !Number.isNaN(year) && year >= 1957 && year <= new Date().getFullYear()
      );
    },
    {
      message:
        "Date album must be bigger than 1910 and less than current year (or current year)",
    },
  ),

  info: z.string().optional(),
  image: z.instanceof(File).nullable().optional(),
});
