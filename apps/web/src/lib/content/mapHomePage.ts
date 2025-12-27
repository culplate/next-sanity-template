import { HomePageContent } from '@/content/types/home';
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

type SanityHomePageData = {
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: SanityImageAsset;
  };
  hero?: {
    title?: string;
    subtitle?: string;
    image?: SanityImageAsset;
    cta?: {
      text?: string;
      href?: string;
    };
  };
};

export function mapHomePage(data: SanityHomePageData | null): HomePageContent {
  if (!data) {
    throw new Error('Home page data is null or undefined');
  }

  // Map SEO
  const seo = data.seo;
  if (!seo?.title || !seo?.description) {
    throw new Error(
      'Home page is missing required SEO fields (title, description)'
    );
  }

  // Map Hero
  const hero = data.hero;
  if (!hero?.title) {
    throw new Error('Home page is missing required hero field (title)');
  }

  return {
    seo: {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords || undefined,
      ogImage: mapSanityImage(seo.ogImage) || undefined,
    },
    hero: {
      title: hero.title,
      subtitle: hero.subtitle || undefined,
      image: mapSanityImage(hero.image) || undefined,
      cta:
        hero.cta?.text && hero.cta?.href
          ? {
              text: hero.cta.text,
              href: hero.cta.href,
            }
          : undefined,
    },
  };
}
