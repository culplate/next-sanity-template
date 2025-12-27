import { mockSiteSettings } from '../../mocks/siteSettings';
import { SiteSettings } from '../../types/siteSettings';
import { SiteSettingsSchema } from '../../schemas';

// Validate mock data once during module import
const validationResult = SiteSettingsSchema.safeParse(mockSiteSettings);
if (!validationResult.success) {
  const errorMessages = validationResult.error.issues
    .map((err) => `${err.path.join('.')}: ${err.message}`)
    .join('; ');
  throw new Error(
    `Mock site settings validation failed: ${errorMessages}. ` +
      `Please check the mock data structure in apps/web/src/content/mocks/siteSettings.ts`
  );
}

export async function getSiteSettings(): Promise<SiteSettings> {
  // Simulate async data fetching
  return Promise.resolve(mockSiteSettings);
}
