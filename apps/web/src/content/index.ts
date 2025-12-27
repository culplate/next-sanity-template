import { getSiteSettings as getSiteSettingsSanity } from './providers/sanity/getSiteSettings';
import { getSiteSettings as getSiteSettingsMock } from './providers/mock/getSiteSettings';
import { getHomePage as getHomePageSanity } from './providers/sanity/getHomePage';
import { getHomePage as getHomePageMock } from './providers/mock/getHomePage';
import { SiteSettings } from './types/siteSettings';
import { HomePageContent } from './types/home';

// Content source configuration
// Set CONTENT_SOURCE in .env.local (defaults to 'mock')
// Options: 'mock' | 'sanity'
const contentSource = process.env.CONTENT_SOURCE || 'mock';

const content = {
  async getHomePage(): Promise<HomePageContent> {
    switch (contentSource) {
      case 'sanity':
        return getHomePageSanity();
      case 'mock':
        return getHomePageMock();
      default:
        return getHomePageMock();
    }
  },
  async getSiteSettings(): Promise<SiteSettings> {
    switch (contentSource) {
      case 'sanity':
        return getSiteSettingsSanity();
      case 'mock':
        return getSiteSettingsMock();
      default:
        return getSiteSettingsMock();
    }
  },
};

export { content };
