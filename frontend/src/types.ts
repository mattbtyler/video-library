import { z } from "zod";
import { isValidYoutubeUrl } from "./app/utils";

export type Video = {
  id: number;
  name: string;
  url: string;
}

export const VideoSchema = z.object({
  name: z.string().nonempty('Name is required'),
  url: z.string().nonempty('URL is required').refine(isValidYoutubeUrl, {
    message: 'Invalid YouTube URL',
  }),
});

export type VideoFormData = z.infer<typeof VideoSchema>;