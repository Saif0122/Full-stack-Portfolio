import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { AppProviders } from '@/providers/AppProviders';
import { PageLoader } from '@/components/ui/PageLoader';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ClientLayoutWrapper } from '@/components/Navigation';
import { AIContextProvider } from '@/components/providers/AIContextProvider';
import { generatePageMetadata, generateJsonLdScript } from '@/lib/seo/helpers';
import { SEO_CONFIG, CANONICAL_DOMAIN } from '@/lib/seo/config';
import { buildWebSiteSchema } from '@/lib/seo/schemas/website.schema';
import { buildOrganizationSchema } from '@/lib/seo/schemas/organization.schema';
import { fetchOrganizationLogoUrl } from '@/lib/seo/service';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    path: '/',
    keywords: SEO_CONFIG.defaultKeywords,
    og: { type: 'website' },
  }),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'qY4TKlCSlu1EzVgc6H51hQj_MUKZPB7dWUbjNVSBFCk',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch org logo from Admin media library (falls back to static config logo)
  const logoUrl = await fetchOrganizationLogoUrl();

  const websiteSchema = buildWebSiteSchema({
    name: SEO_CONFIG.siteName,
    url: CANONICAL_DOMAIN,
    description: SEO_CONFIG.defaultDescription,
  });

  const orgSchema = buildOrganizationSchema({
    name: SEO_CONFIG.organizationName,
    url: CANONICAL_DOMAIN,
    logoUrl,
    description: SEO_CONFIG.defaultDescription,
    sameAs: [
      'https://github.com/Saif0122',
      'https://linkedin.com/in/saifulislam',
    ],
  });

  return (
    <html lang={SEO_CONFIG.language} className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Global JSON-LD: WebSite + Organization — renders once, site-wide */}
        <script {...generateJsonLdScript([websiteSchema, orgSchema])} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <AppProviders>
          <PageLoader />
          <CustomCursor />
          <AIContextProvider>
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
          </AIContextProvider>
        </AppProviders>
      </body>
    </html>
  );
}
