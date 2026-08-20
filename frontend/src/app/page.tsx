import { Metadata } from 'next';
import { getPortfolioData } from '@/services/cms.server';
import HomeClient from './HomeClient';
import { generatePageMetadata, generateJsonLdScript } from '@/lib/seo/helpers';
import { resolveHomeSeo } from '@/lib/seo/service';
import { buildPersonSchema } from '@/lib/seo/schemas/person.schema';

export const revalidate = 300; // ISR — revalidate every 5 minutes

export async function generateMetadata(): Promise<Metadata> {
  const seoOpts = await resolveHomeSeo();
  return generatePageMetadata(seoOpts);
}

export default async function Page() {
  const portfolioData = await getPortfolioData();

  const personSchema = buildPersonSchema({
    sameAs: [
      'https://github.com/Saif0122',
      'https://linkedin.com/in/saifulislam',
    ],
  });

  return (
    <>
      <script {...generateJsonLdScript(personSchema)} />
      <HomeClient initialData={portfolioData} />
    </>
  );
}

