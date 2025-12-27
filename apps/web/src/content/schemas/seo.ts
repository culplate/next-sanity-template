import { ImageContent } from '../types/image';
import { ImageSchema } from './image';
import { z } from 'zod';

export const SeoSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()).optional(),
  ogImage: ImageSchema.optional(),
});

export type SeoContent = z.infer<typeof SeoSchema>;
