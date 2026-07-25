'use client';

import { RoleGuard } from '@/guards/RoleGuard';
import Link from 'next/link';

export default function AIPromptLibrary() {
  return (
    <RoleGuard roles={['Admin', 'Super Admin']}>
      <div className="min-h-screen bg-background pt-24 pb-12 px-4 border-l-4 border-pink-500/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/admin/dashboard" className="text-muted-foreground hover:text-foreground mb-4 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-black text-foreground">Prompt Library</h1>
            <p className="text-muted-foreground mt-2">Manage Reusable System Prompts</p>
          </div>
          
          <div className="p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
            <div className="w-16 h-16 bg-pink-500/20 text-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
              📝
            </div>
            <h2 className="text-2xl font-bold mb-4">Pending Implementation</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              This module will allow you to create, edit, and organize system prompts for specific AI tasks (e.g., SEO Generation, Blog Drafting).
            </p>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
