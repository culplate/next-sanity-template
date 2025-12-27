import type { QueryParams } from '@sanity/client';
import { getClient } from './client';

interface SanityFetchOptions {
  query: string;
  params?: QueryParams;
  tags?: string[];
}

export async function sanityFetch<T>({
  query,
  params,
  tags,
}: SanityFetchOptions): Promise<T> {
  const client = getClient();
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

  // Build Sanity API URL
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;

  // Prepare fetch options with Next.js cache tags
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, params }),
    cache: 'force-cache',
    next: tags && tags.length > 0 ? { tags, revalidate: false } : undefined,
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(`Sanity query failed: ${response.statusText}`);
  }

  const result = await response.json();
  return result.result as T;
}
