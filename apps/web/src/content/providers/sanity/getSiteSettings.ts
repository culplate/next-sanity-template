import { mapSiteSettings } from '@/lib/content/mapSiteSettings';
import { SITE_SETTINGS_QUERY } from '@/lib/sanity/queries';
import { SiteSettings } from '../../types/siteSettings';
import { sanityFetch } from '@/lib/sanity/sanityFetch';
import { SiteSettingsSchema } from '../../schemas';
import { TAGS } from '@/lib/sanity/tags';

type SanityImageAsset = {
  asset?: {
    url?: string;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
  alt?: string;
  url?: string;
  metadata?: {
    dimensions?: {
      width?: number;
      height?: number;
    };
  };
};

type SanitySiteSettingsData = {
  title?: string;
  defaultSeo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: SanityImageAsset;
  };
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityFetch<SanitySiteSettingsData>({
    query: SITE_SETTINGS_QUERY,
    tags: [TAGS.siteSettings],
  });
  const mappedData = mapSiteSettings(data);

  // Validate the mapped data using Zod
  const validationResult = SiteSettingsSchema.safeParse(mappedData);
  if (!validationResult.success) {
    const errorMessages = validationResult.error.issues
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join('; ');
    throw new Error(
      `Site settings validation failed: ${errorMessages}. ` +
        `This indicates invalid data from Sanity CMS. Please check your Sanity content structure.`
    );
  }

  return validationResult.data;
}
