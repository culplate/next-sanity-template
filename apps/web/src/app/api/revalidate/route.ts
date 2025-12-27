import { mapWebhookToTags } from '@/lib/sanity/mapWebhookToTags';
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: 'SANITY_REVALIDATE_SECRET is not configured' },
      { status: 500 }
    );
  }

  try {
    const { body, isValidSignature } = await parseBody<{
      _type?: string;
      slug?: { current?: string };
      [key: string]: unknown;
    }>(req, secret);

    if (!isValidSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const tags = mapWebhookToTags(body);

    for (const tag of tags) {
      revalidateTag(tag);
    }

    return NextResponse.json({ revalidated: true, tags });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json(
      { error: 'Error revalidating cache' },
      { status: 500 }
    );
  }
}
