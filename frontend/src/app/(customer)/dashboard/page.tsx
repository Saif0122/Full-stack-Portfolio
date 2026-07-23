'use client';

import { AuthGuard } from '@/guards/AuthGuard';
import { useAuth } from '@/providers/AuthProvider';

export default function CustomerDashboard() {
  const { user, logout } = useAuth();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-black text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
            <button 
              onClick={() => logout()}
              className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Orders Card */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-xl font-bold mb-2">Orders</h3>
              <p className="text-muted-foreground text-sm mb-4">View your recent purchases and invoices.</p>
              <div className="text-3xl font-black text-primary">0</div>
            </div>

            {/* Downloads Card */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-xl font-bold mb-2">Downloads</h3>
              <p className="text-muted-foreground text-sm mb-4">Access your purchased digital products.</p>
              <div className="text-3xl font-black text-secondary">0</div>
            </div>

            {/* Licenses Card */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-xl font-bold mb-2">Licenses</h3>
              <p className="text-muted-foreground text-sm mb-4">Manage your product license keys.</p>
              <div className="text-3xl font-black text-foreground">0</div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
