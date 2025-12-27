import { HeroSchema } from './hero';
import { SeoSchema } from './seo';
import { z } from 'zod';

export const HomePageContentSchema = z.object({
  seo: SeoSchema,
  hero: HeroSchema,
});

export type HomePageContentType = z.infer<typeof HomePageContentSchema>;
