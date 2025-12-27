import { ImageContent } from '@/content/types/image';
import { ImageProps } from 'next/image';

/**
 * Resolves ImageContent to props compatible with next/image
 * @param image - ImageContent object
 * @returns Props object for next/image component
 */
export function resolveImage(
  image: ImageContent | null | undefined
): ImageProps | null {
  if (!image) {
    return null;
  }

  const props: ImageProps = {
    src: image.src,
    alt: image.alt,
  };

  if (image.width !== undefined) {
    props.width = image.width;
  }

  if (image.height !== undefined) {
    props.height = image.height;
  }

  return props;
}
