import { SeoSchema } from './seo';
import { z } from 'zod';

export const SiteSettingsSchema = z.object({
  title: z.string(),
  defaultSeo: SeoSchema,
});

export type SiteSettingsContent = z.infer<typeof SiteSettingsSchema>;
