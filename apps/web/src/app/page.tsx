import { Hero } from '@/components/hero/Hero';
import { content } from '@/content';

export default async function HomePage() {
  const homePageContent = await content.getHomePage();

  return (
    <main>
      <Hero content={homePageContent.hero} />
    </main>
  );
}
