'use client';

import React, { useState } from 'react';
import { AdminLayout, DataTable, Column, FormBuilder, ConfirmDialog } from '@/components/admin/ui';

interface CouponRecord {
  id: string;
  code: string;
  discountPct: number;
  maxUses: number;
  usedCount: number;
  expiry: string;
  status: 'Active Valid' | 'Expired' | 'Disabled';
}

export default function CouponsManagementPage() {
  const [coupons, setCoupons] = useState<CouponRecord[]>([
    { id: '1', code: 'ENTERPRISE2026', discountPct: 25, maxUses: 100, usedCount: 42, expiry: '2026-12-31', status: 'Active Valid' },
    { id: '2', code: 'AIFUTURE50', discountPct: 50, maxUses: 20, usedCount: 20, expiry: '2026-08-01', status: 'Expired' },
    { id: '3', code: 'WELCOME10', discountPct: 10, maxUses: 500, usedCount: 189, expiry: '2027-01-01', status: 'Active Valid' }
  ]);

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const columns: Column<CouponRecord>[] = [
    { header: 'Promo Code Identifier', accessorKey: 'code', cell: (c) => (
      <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-amber-300 font-mono font-black border border-amber-500/30 tracking-widest text-sm">
        {c.code}
      </span>
    )},
    { header: 'Discount Rule', accessorKey: 'discountPct', cell: (c) => <span className="font-mono font-bold text-white text-base">{c.discountPct}% OFF</span> },
    { header: 'Utilization Count', accessorKey: 'usedCount', cell: (c) => (
      <span className="font-mono text-xs text-gray-300"><strong className="text-white">{c.usedCount}</strong> / {c.maxUses} redeems</span>
    )},
    { header: 'Valid Expiry Date', accessorKey: 'expiry', cell: (c) => <span className="font-mono text-xs text-gray-400">{c.expiry}</span> },
    { header: 'Status', accessorKey: 'status', cell: (c) => (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
        c.status === 'Active Valid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400'
      }`}>{c.status}</span>
    )}
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400 block mb-1">Promotional Strategy</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Coupons & Discount Engine</h1>
        </div>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-black font-mono text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
          >
            + Generate Promo Code
          </button>
        )}
      </div>

      {isCreating ? (
        <FormBuilder
          title="Create Promotional Discount Rule"
          fields={[
            { name: 'code', label: 'Coupon Promo Code (Alphanumeric)', type: 'text', required: true, placeholder: 'e.g. SAIFPRO30' },
            { name: 'discountPct', label: 'Percentage Reduction (%)', type: 'number', required: true, defaultValue: 20 },
            { name: 'maxUses', label: 'Maximum Redemption Limit', type: 'number', required: true, defaultValue: 100 },
            { name: 'expiry', label: 'Valid Until Date', type: 'text', defaultValue: '2026-12-31', required: true }
          ]}
          onCancel={() => setIsCreating(false)}
          onSubmit={(data) => {
            setCoupons(prev => [{ id: Date.now().toString(), usedCount: 0, status: 'Active Valid', ...data } as CouponRecord, ...prev]);
            setIsCreating(false);
          }}
          submitLabel="Activate Promo Rule"
        />
      ) : (
        <DataTable
          data={coupons}
          columns={columns}
          searchPlaceholder="Search coupon codes or utilization records..."
          searchKey="code"
          actions={(item) => (
            <button onClick={() => setConfirmDelete(item.id)} className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono text-xs border border-rose-500/20">Revoke</button>
          )}
        />
      )}

      <ConfirmDialog
        isOpen={!!confirmDelete}
        title="Revoke Coupon Code"
        message="Are you sure you want to disable this discount code? Active shopping checkout attempts utilizing this promo code will be denied."
        onConfirm={() => { setCoupons(prev => prev.filter(c => c.id !== confirmDelete)); setConfirmDelete(null); }}
        onCancel={() => setConfirmDelete(null)}
        isDestructive={true}
      />
    </AdminLayout>
  );
}
