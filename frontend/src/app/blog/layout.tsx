import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/helpers';
import { resolveBlogSeo } from '@/lib/seo/service';

export async function generateMetadata(): Promise<Metadata> {
  const seoOpts = await resolveBlogSeo();
  return generatePageMetadata(seoOpts);
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
