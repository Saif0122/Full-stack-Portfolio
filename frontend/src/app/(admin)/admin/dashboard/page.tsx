'use client';

import { RoleGuard } from '@/guards/RoleGuard';
import { useAuth } from '@/providers/AuthProvider';

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <RoleGuard roles={['Admin', 'Super Admin']}>
      <div className="min-h-screen bg-background pt-24 pb-12 px-4 border-l-4 border-red-500/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-black text-foreground mb-2">Admin Portal</h1>
              <p className="text-red-400 font-medium">Logged in as {user?.role}</p>
            </div>
            <button 
              onClick={() => logout()}
              className="px-6 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-sm font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-bold mb-1">Total Sales</h3>
              <div className="text-3xl font-black text-foreground">$0.00</div>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-bold mb-1">Active Users</h3>
              <div className="text-3xl font-black text-foreground">0</div>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-bold mb-1">Products</h3>
              <div className="text-3xl font-black text-foreground">0</div>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-bold mb-1">Support Tickets</h3>
              <div className="text-3xl font-black text-foreground">0</div>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
