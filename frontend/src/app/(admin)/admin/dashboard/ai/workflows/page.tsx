'use client';

import { RoleGuard } from '@/guards/RoleGuard';
import Link from 'next/link';

export default function AIWorkflows() {
  return (
    <RoleGuard roles={['Admin', 'Super Admin']}>
      <div className="min-h-screen bg-background pt-24 pb-12 px-4 border-l-4 border-violet-500/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/admin/dashboard" className="text-muted-foreground hover:text-foreground mb-4 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-black text-foreground">Automation Workflows</h1>
            <p className="text-muted-foreground mt-2">Manage AI-Driven Triggers and Actions</p>
          </div>
          
          <div className="p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
            <div className="w-16 h-16 bg-violet-500/20 text-violet-400 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
              ⚡
            </div>
            <h2 className="text-2xl font-bold mb-4">Pending Implementation</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              This module will allow you to build automated AI sequences, such as auto-generating SEO tags when a new blog is published.
            </p>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
