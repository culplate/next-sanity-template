import { ImageContent } from './image';

export interface Hero {
  title: string;
  subtitle?: string;
  image?: ImageContent;
  cta?: {
    text: string;
    href: string;
  };
}
