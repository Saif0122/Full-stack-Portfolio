import React from 'react';
import Link from 'next/link';
import { RoleGuard } from '@/guards/RoleGuard';

interface CmsLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const CmsLayout = ({ title, children }: CmsLayoutProps) => {
  return (
    <RoleGuard roles={['Admin', 'Super Admin']}>
      <div className="min-h-screen bg-background pt-24 pb-12 px-4 border-l-4 border-red-500/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link 
              href="/admin/dashboard"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-colors"
            >
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-black text-foreground">{title}</h1>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            {children}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
};
