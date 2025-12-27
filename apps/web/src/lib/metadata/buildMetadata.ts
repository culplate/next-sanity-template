import { ImageContent } from '@/content/types/image';
import { SeoContent } from '@/content/schemas';
import { SEO } from '@/content/types/seo';

/**
 * Framework-agnostic metadata object
 */
export interface Metadata {
  title: string;
  description: string;
  ogImage?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
}

/**
 * SEO-like type that can be either SEO interface or SeoContent
 */
type SeoLike = SEO | SeoContent;

/**
 * Builds metadata from SEO content with optional defaults.
 * Per-page SEO values override defaults when provided.
 *
 * @param seo - Optional per-page SEO content (overrides defaults)
 * @param defaults - Optional default SEO content (used as fallback)
 * @returns Metadata object suitable for Next.js or other frameworks
 */
export function buildMetadata(seo?: SeoLike, defaults?: SeoLike): Metadata {
  // Use per-page SEO, fallback to defaults
  const title = seo?.title || defaults?.title || '';
  const description = seo?.description || defaults?.description || '';

  // Handle ogImage: prefer seo.ogImage, fallback to defaults.ogImage
  let ogImage: Metadata['ogImage'] | undefined;
  const ogImageSource: ImageContent | undefined =
    seo?.ogImage || defaults?.ogImage;

  if (ogImageSource) {
    ogImage = {
      url: ogImageSource.src,
      alt: ogImageSource.alt,
      width: ogImageSource.width,
      height: ogImageSource.height,
    };
  }

  return {
    title,
    description,
    ...(ogImage && { ogImage }),
  };
}

import type { Metadata as NextMetadata } from 'next';

/**
 * Converts framework-agnostic metadata to Next.js Metadata format
 */
export function toNextMetadata(metadata: Metadata): NextMetadata {
  const nextMetadata: NextMetadata = {
    title: metadata.title,
    description: metadata.description,
  };

  if (metadata.ogImage) {
    nextMetadata.openGraph = {
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: metadata.ogImage.url,
          ...(metadata.ogImage.alt && { alt: metadata.ogImage.alt }),
          ...(metadata.ogImage.width && { width: metadata.ogImage.width }),
          ...(metadata.ogImage.height && { height: metadata.ogImage.height }),
        },
      ],
    };
  }

  return nextMetadata;
}
