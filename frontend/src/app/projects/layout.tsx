import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Archive | System Designs',
  description: 'A collection of high-concurrency systems, micro-services, and enterprise-grade products built with the MERN stack.',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
