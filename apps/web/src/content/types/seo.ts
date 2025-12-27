import { ImageContent } from './image';

export interface SEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: ImageContent;
}
