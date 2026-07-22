import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering Blog | The Nexus Logs',
  description: 'Deep-dives into distributed systems, full-stack performance tuning, and the 2026 AI-native architectural landscape.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
