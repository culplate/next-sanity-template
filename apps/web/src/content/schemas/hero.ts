import { ImageSchema } from './image';
import { z } from 'zod';

export const HeroSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  image: ImageSchema.optional(),
  cta: z
    .object({
      text: z.string(),
      href: z.string(),
    })
    .optional(),
});

export type HeroContent = z.infer<typeof HeroSchema>;
