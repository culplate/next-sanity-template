import type { HomePageContent } from '../types/home';

export const mockHomePageContent: HomePageContent = {
  seo: {
    title: 'Welcome to Next Sanity Template',
    description:
      'A monorepo template with Next.js and mock-first content workflow',
    keywords: ['nextjs', 'sanity', 'monorepo', 'template'],
  },
  hero: {
    title: 'Hello, World!',
    subtitle: 'This is a mock-first content workflow setup',
    cta: {
      text: 'Get Started',
      href: '#',
    },
  },
};
