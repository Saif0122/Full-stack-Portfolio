import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Initiate Project Handshake',
  description: 'Connect with a Senior MERN Stack Developer for enterprise SaaS, e-commerce, and high-performance system architecture.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
