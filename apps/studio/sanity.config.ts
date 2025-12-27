import { schemaTypes } from 'sanity-schema';
import { defineConfig } from 'sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

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

export default defineConfig({
  name: 'default',
  title: 'Sanity Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [],
  schema: {
    types: schemaTypes,
  },
});
