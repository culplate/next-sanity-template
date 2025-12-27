import { mockHomePageContent } from '../../mocks/home';
import { HomePageContentSchema } from '../../schemas';
import { HomePageContent } from '../../types/home';

// Validate mock data once during module import
const validationResult = HomePageContentSchema.safeParse(mockHomePageContent);
if (!validationResult.success) {
  const errorMessages = validationResult.error.issues
    .map((err) => `${err.path.join('.')}: ${err.message}`)
    .join('; ');
  throw new Error(
    `Mock home page content validation failed: ${errorMessages}. ` +
      `Please check the mock data structure in apps/web/src/content/mocks/home.ts`
  );
}

export async function getHomePage(): Promise<HomePageContent> {
  // Simulate async data fetching
  return Promise.resolve(mockHomePageContent);
}
