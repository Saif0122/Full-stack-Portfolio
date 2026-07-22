import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { AppProviders } from '@/providers/AppProviders';
import { PageLoader } from '@/components/ui/PageLoader';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ClientLayoutWrapper } from '@/components/Navigation';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: 'Saiful Islam | MERN Stack Developer & Full Stack Engineer',
  description: 'Senior MERN Stack Developer & Next.js specialist. Expert in scalable SaaS application development, high-performance web apps, and custom Node.js solutions.',
  keywords: ['MERN stack developer', 'full stack developer', 'Next.js developer', 'MongoDB expert', 'SaaS development', 'React engineer'],
  metadataBase: new URL('https://saiful.code'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://saiful.code',
    title: 'Saiful Islam | Principal MERN Stack Developer',
    description: 'Building scalable web applications with high-performance MERN architecture. Specializing in SaaS and custom API development.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Saiful Islam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saiful Islam | MERN & Next.js Specialist',
    description: 'Custom web development and scalable SaaS architecture. Senior Full Stack Engineer.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <AppProviders>
          <PageLoader />
          <CustomCursor />
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </AppProviders>
      </body>
    </html>
  );
}
