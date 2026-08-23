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
import { StructuredData } from '@/components/seo/StructuredData';

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
  return (
    <html lang={SEO_CONFIG.language} className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Global JSON-LD: WebSite + Organization — renders once, site-wide via the backend generator */}
        <StructuredData type="Organization" />
        <StructuredData type="WebSite" />
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
