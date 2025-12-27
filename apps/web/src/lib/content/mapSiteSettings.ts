import { SiteSettings } from '@/content/types/siteSettings';
import { mapSanityImage } from './mapImage';

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

export function mapSiteSettings(
  data: SanitySiteSettingsData | null
): SiteSettings {
  if (!data) {
    throw new Error('Site settings data is null or undefined');
  }

  if (!data.title) {
    throw new Error('Site settings is missing required field (title)');
  }

  const defaultSeo = data.defaultSeo;
  if (!defaultSeo?.title || !defaultSeo?.description) {
    throw new Error(
      'Site settings is missing required default SEO fields (title, description)'
    );
  }

  return {
    title: data.title,
    defaultSeo: {
      title: defaultSeo.title,
      description: defaultSeo.description,
      keywords: defaultSeo.keywords || undefined,
      ogImage: mapSanityImage(defaultSeo.ogImage) || undefined,
    },
  };
}
