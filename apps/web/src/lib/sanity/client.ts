import { createClient, SanityClient } from '@sanity/client';

let clientInstance: SanityClient | null = null;

function createSanityClient(): SanityClient {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

  if (!projectId) {
    throw new Error(
      'Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable. Please add it to your .env file.'
    );
  }

  if (!dataset) {
    throw new Error(
      'Missing NEXT_PUBLIC_SANITY_DATASET environment variable. Please add it to your .env file.'
    );
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to true if you want to use CDN
  });
}

export function getClient(): SanityClient {
  if (!clientInstance) {
    clientInstance = createSanityClient();
  }
  return clientInstance;
}
