'use client';

import { GuestGuard } from '@/guards/GuestGuard';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <GuestGuard>
      <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
        <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl relative z-10 text-center">
          <h1 className="text-3xl font-black mb-2 text-foreground">Reset Password</h1>
          <p className="text-muted-foreground text-sm mb-6">Enter your email and we'll send you a recovery link.</p>
          <input 
            type="email" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors mb-4"
            placeholder="you@example.com"
          />
          <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
            Send Link
          </button>
          <p className="mt-6 text-sm">
            <Link href="/login" className="text-primary hover:underline">Back to Login</Link>
          </p>
        </div>
      </div>
    </GuestGuard>
  );
}
