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
            <a href="/dashboard/orders" className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md block hover:scale-[1.02] transition-transform cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Orders</h3>
              <p className="text-muted-foreground text-sm mb-4">View your recent purchases.</p>
              <div className="text-3xl font-black text-primary">0</div>
            </a>

            {/* Downloads Card */}
            <a href="/dashboard/downloads" className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md block hover:scale-[1.02] transition-transform cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Downloads</h3>
              <p className="text-muted-foreground text-sm mb-4">Access your purchased digital products.</p>
              <div className="text-3xl font-black text-secondary">0</div>
            </a>

            {/* Licenses Card */}
            <a href="/dashboard/licenses" className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md block hover:scale-[1.02] transition-transform cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Licenses</h3>
              <p className="text-muted-foreground text-sm mb-4">Manage your product license keys.</p>
              <div className="text-3xl font-black text-foreground">0</div>
            </a>
            
            {/* Invoices Card */}
            <a href="/dashboard/invoices" className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md block hover:scale-[1.02] transition-transform cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Invoices</h3>
              <p className="text-muted-foreground text-sm mb-4">Download your tax invoices.</p>
              <div className="text-3xl font-black text-gray-400">0</div>
            </a>

            {/* Payments Card */}
            <a href="/dashboard/payments" className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md block hover:scale-[1.02] transition-transform cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Payments</h3>
              <p className="text-muted-foreground text-sm mb-4">View your payment history.</p>
              <div className="text-3xl font-black text-purple-400">0</div>
            </a>

            {/* Profile Card */}
            <a href="/dashboard/profile" className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md block hover:scale-[1.02] transition-transform cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Profile</h3>
              <p className="text-muted-foreground text-sm mb-4">Update your account details.</p>
              <div className="text-3xl font-black text-emerald-400">&rarr;</div>
            </a>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
