# Next.js Sanity Template

A monorepo template with Next.js and Sanity CMS, featuring a mock-first content workflow.

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Copy `.env.example` to `.env` and fill in your Sanity credentials:

```bash
cp .env.example .env
```

3. Run the development server:

```bash
pnpm dev
```

## Project Structure

- `apps/web` - Next.js web application
- `apps/studio` - Sanity Studio v3
- `packages/sanity-schema` - Shared Sanity schemas

## Environment Variables

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Your Sanity dataset (e.g., `production`)
- `NEXT_PUBLIC_SANITY_API_VERSION` - Sanity API version (optional, defaults to `2024-01-01`)
- `CONTENT_SOURCE` - Content provider to use (`mock` or `sanity`, defaults to `mock`)
- `SANITY_REVALIDATE_SECRET` - Secret for webhook revalidation (see On-demand Revalidation section)

## On-demand Revalidation (Sanity Webhook)

This template supports tag-based caching with on-demand revalidation via Sanity webhooks.

### How It Works

- Content is cached indefinitely using Next.js cache tags
- When content is published in Sanity, a webhook triggers cache revalidation
- Only the affected cache tags are revalidated, not the entire cache

### Setting Up the Webhook

1. **Generate a secret** (use a secure random string):

```bash
openssl rand -base64 32
```

2. **Add the secret to your environment variables**:

```env
SANITY_REVALIDATE_SECRET=your-generated-secret
```

3. **Create a webhook in Sanity**:
   - Go to your Sanity project dashboard
   - Navigate to **Settings** > **API** > **Webhooks**
   - Click **Create webhook**
   - Configure:
     - **Name**: Revalidate Cache
     - **URL**: `https://your-domain.com/api/revalidate`
     - **HTTP method**: POST
     - **Trigger on**: Create, Update, Delete
     - **Secret**: (paste the same secret from step 1)
     - **Filter** (optional): Limit to specific document types

### Cache Tags

The following cache tags are used:

- `home` - Home page content
- `settings` - Site settings
- `projects` - All projects
- `project:{slug}` - Specific project by slug
- `global` - Global fallback

When content is updated, the webhook automatically determines which tags to revalidate based on the document type.

### Tag Mapping

- `homePage` → `[home]`
- `siteSettings` → `[settings, home]`
- `project` (with slug) → `[projects, project:{slug}]`
- `project` (without slug) → `[projects]`
- Other types → `[global]`

### Endpoint

The revalidation endpoint is available at:

```
POST /api/revalidate
```

This endpoint:

- Verifies the request signature using `SANITY_REVALIDATE_SECRET`
- Maps the webhook payload to cache tags
- Revalidates the appropriate tags
- Returns a JSON response with revalidation status

**Note**: Pages are cached indefinitely until revalidated. This means content updates will only appear after the webhook triggers revalidation or the cache is manually cleared.
