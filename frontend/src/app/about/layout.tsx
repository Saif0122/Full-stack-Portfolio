import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/helpers';
import { resolveAboutSeo } from '@/lib/seo/service';

export async function generateMetadata(): Promise<Metadata> {
  const seoOpts = await resolveAboutSeo();
  return generatePageMetadata(seoOpts);
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
