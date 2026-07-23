'use client';

import { GuestGuard } from '@/guards/GuestGuard';
import Link from 'next/link';

export default function ResetPasswordPage() {
  return (
    <GuestGuard>
      <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
        <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl relative z-10 text-center">
          <h1 className="text-3xl font-black mb-2 text-foreground">New Password</h1>
          <p className="text-muted-foreground text-sm mb-6">Enter your new secure password below.</p>
          <input 
            type="password" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors mb-4"
            placeholder="New Password"
          />
          <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
            Save Password
          </button>
        </div>
      </div>
    </GuestGuard>
  );
}
