import { ImageContent } from '@/content/types/image';

/**
 * Sanity image asset structure from GROQ query
 */
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

/**
 * Maps a Sanity image asset to ImageContent
 * @param image - Sanity image asset object
 * @returns ImageContent or null if image is invalid
 */
export function mapSanityImage(
  image: SanityImageAsset | null | undefined
): ImageContent | null {
  if (!image) {
    return null;
  }

  // Handle structure from GROQ query: image{ asset->{ url, metadata }, alt }
  if (image.asset?.url) {
    return {
      src: image.asset.url,
      alt: image.alt || '',
      width: image.asset.metadata?.dimensions?.width,
      height: image.asset.metadata?.dimensions?.height,
    };
  }

  // Handle direct URL (fallback for other query structures)
  if (image.url) {
    return {
      src: image.url,
      alt: image.alt || '',
      width: image.metadata?.dimensions?.width,
      height: image.metadata?.dimensions?.height,
    };
  }

  // Return null if no URL is available
  return null;
}
