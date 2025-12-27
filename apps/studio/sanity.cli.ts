import { defineCliConfig } from 'sanity/cli';

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

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
