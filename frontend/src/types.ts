import { z } from "zod";

export const VideoSchema = z.object({
  name: z.string().nonempty('Name is required'),
  url: z.string().url('Invalid URL').nonempty('URL is required')
});

export type VideoFormData = z.infer<typeof VideoSchema>;