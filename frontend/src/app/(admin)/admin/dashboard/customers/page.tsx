'use client';

import React, { useState } from 'react';
import { AdminLayout, DataTable, Column, ConfirmDialog } from '@/components/admin/ui';

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  ordersCount: number;
  totalSpent: string;
  status: 'Verified Active' | 'Pending Verification' | 'Suspended';
  role: string;
  joinedAt: string;
}

export default function CustomersManagementPage() {
  const [customers, setCustomers] = useState<CustomerRecord[]>([
    { id: '801', name: 'Alex Mercer', email: 'alex.mercer@enterprise.io', ordersCount: 3, totalSpent: '$287.00', status: 'Verified Active', role: 'Customer Pro', joinedAt: '2026-06-12' },
    { id: '802', name: 'Sarah Jenkins', email: 's.jenkins@ai-labs.dev', ordersCount: 1, totalSpent: '$49.00', status: 'Verified Active', role: 'Customer Pro', joinedAt: '2026-07-02' },
    { id: '803', name: 'Devon Thorne', email: 'thorne.d@vanguard.org', ordersCount: 2, totalSpent: '$178.00', status: 'Verified Active', role: 'Customer Enterprise', joinedAt: '2026-06-25' },
    { id: '804', name: 'Marcus Vance', email: 'mvance@cloudcorp.net', ordersCount: 0, totalSpent: '$0.00', status: 'Pending Verification', role: 'Customer Standard', joinedAt: '2026-07-24' }
  ]);

  const [confirmBan, setConfirmBan] = useState<string | null>(null);

  const columns: Column<CustomerRecord>[] = [
    { header: 'Customer Profile', accessorKey: 'name', cell: (c) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-white text-xs font-mono shadow-md">
          {c.name.charAt(0)}
        </div>
        <div>
          <div className="font-bold text-white text-sm">{c.name}</div>
          <span className="text-[10px] font-mono text-gray-400">{c.email}</span>
        </div>
      </div>
    )},
    { header: 'Account Status', accessorKey: 'status', cell: (c) => (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold ${
        c.status === 'Verified Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
      }`}>{c.status}</span>
    )},
    { header: 'Orders Count', accessorKey: 'ordersCount', cell: (c) => <span className="font-mono text-xs text-white font-bold">{c.ordersCount} completed</span> },
    { header: 'Total Value', accessorKey: 'totalSpent', cell: (c) => <span className="font-mono text-sm font-black text-cyan-400">{c.totalSpent}</span> },
    { header: 'Joined Date', accessorKey: 'joinedAt', cell: (c) => <span className="font-mono text-xs text-gray-400">{c.joinedAt}</span> }
  ];

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 block mb-1">Customer Directory</span>
        <h1 className="text-3xl font-black text-white tracking-tight">Customer Profiles & Permissions</h1>
      </div>

      <DataTable
        data={customers}
        columns={columns}
        searchPlaceholder="Search customer directory by name or email address..."
        searchKey="name"
        actions={(item) => (
          <>
            <button
              onClick={() => alert(`Customer Profile ${item.name}: Pro license activations active without security alerts.`)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs border border-white/5"
            >
              Profile →
            </button>
            <button
              onClick={() => setConfirmBan(item.id)}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono text-xs border border-rose-500/20"
            >
              Suspend
            </button>
          </>
        )}
      />

      <ConfirmDialog
        isOpen={!!confirmBan}
        title="Suspend Customer Account"
        message="Are you sure you want to suspend this customer profile? They will be immediately blocked from accessing member downloads and software keys."
        onConfirm={() => { setCustomers(prev => prev.filter(c => c.id !== confirmBan)); setConfirmBan(null); }}
        onCancel={() => setConfirmBan(null)}
        isDestructive={true}
      />
    </AdminLayout>
  );
}
