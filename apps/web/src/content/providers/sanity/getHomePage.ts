import { mapHomePage } from '@/lib/content/mapHomePage';
import { sanityFetch } from '@/lib/sanity/sanityFetch';
import { HomePageContentSchema } from '../../schemas';
import { HomePageContent } from '../../types/home';
import { HOME_QUERY } from '@/lib/sanity/queries';
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

export async function getHomePage(): Promise<HomePageContent> {
  const data = await sanityFetch<SanityHomePageData>({
    query: HOME_QUERY,
    tags: [TAGS.home],
  });
  const mappedData = mapHomePage(data);

  // Validate the mapped data using Zod
  const validationResult = HomePageContentSchema.safeParse(mappedData);
  if (!validationResult.success) {
    const errorMessages = validationResult.error.issues
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join('; ');
    throw new Error(
      `Home page content validation failed: ${errorMessages}. ` +
        `This indicates invalid data from Sanity CMS. Please check your Sanity content structure.`
    );
  }

  return validationResult.data;
}
