import { ImageContent } from '../types/image';
import { z } from 'zod';

export const ImageSchema: z.ZodType<ImageContent> = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});
