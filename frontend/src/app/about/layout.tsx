import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me | System Architect & Developer',
  description: 'Senior MERN stack developer and System Architect. Learn about my engineering principles, architecture strategies, and professional experience.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
