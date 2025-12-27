import { buildMetadata, toNextMetadata } from '@/lib/metadata';
import type { Metadata as NextMetadata } from 'next';
import { content } from '@/content';
import '../styles/globals.scss';

export async function generateMetadata(): Promise<NextMetadata> {
  const siteSettings = await content.getSiteSettings();
  const metadata = buildMetadata(undefined, siteSettings.defaultSeo);
  return toNextMetadata(metadata);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
