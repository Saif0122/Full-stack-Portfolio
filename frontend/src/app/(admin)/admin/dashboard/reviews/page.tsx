'use client';

import React, { useState } from 'react';
import { AdminLayout, DataTable, Column, ConfirmDialog } from '@/components/admin/ui';

interface ReviewRecord {
  id: string;
  product: string;
  customer: string;
  rating: number;
  comment: string;
  status: 'Approved Live' | 'Pending Moderation';
  date: string;
}

export default function ReviewsManagementPage() {
  const [reviews, setReviews] = useState<ReviewRecord[]>([
    { id: '1', product: 'MERN SaaS Enterprise Starter Bundle', customer: 'Alex Mercer', rating: 5, comment: 'Clean architectural design and incredible SOLID engineering principles. Best boilerplate on the market!', status: 'Approved Live', date: '2026-07-24' },
    { id: '2', product: 'AI Portfolio Pro Theme Edition', customer: 'Sarah Jenkins', rating: 5, comment: 'The 3D micro-animations and performance optimization blew my executive team away. Instant 98 Lighthouse score.', status: 'Approved Live', date: '2026-07-23' },
    { id: '3', product: 'Next 3D Glassmorphism Component Kit', customer: 'David Wu', rating: 4, comment: 'Extremely flexible tailwind design system. Saved weeks of custom WebGL integration work.', status: 'Pending Moderation', date: '2026-07-22' }
  ]);

  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);

  const columns: Column<ReviewRecord>[] = [
    { header: 'Product & Rating', accessorKey: 'product', cell: (r) => (
      <div>
        <div className="font-bold text-white text-sm">{r.product}</div>
        <div className="text-amber-400 font-mono text-xs font-bold">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)} <span className="text-gray-400">({r.rating}/5)</span></div>
      </div>
    )},
    { header: 'Customer & Comment', accessorKey: 'comment', cell: (r) => (
      <div className="max-w-md">
        <span className="text-xs font-bold text-indigo-400 block mb-1">{r.customer} wrote:</span>
        <p className="text-xs text-gray-300 italic line-clamp-2">&quot;{r.comment}&quot;</p>
      </div>
    )},
    { header: 'Moderation State', accessorKey: 'status', cell: (r) => (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold ${
        r.status === 'Approved Live' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
      }`}>{r.status}</span>
    )},
    { header: 'Date', accessorKey: 'date', cell: (r) => <span className="font-mono text-xs text-gray-500">{r.date}</span> }
  ];

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400 block mb-1">Reputation Engine</span>
        <h1 className="text-3xl font-black text-white tracking-tight">Customer Reviews & Rating Moderation</h1>
      </div>

      <DataTable
        data={reviews}
        columns={columns}
        searchPlaceholder="Search review comments or customer names..."
        searchKey="comment"
        actions={(item) => (
          <>
            <button
              onClick={() => setReviews(prev => prev.map(r => r.id === item.id ? { ...r, status: r.status === 'Approved Live' ? 'Pending Moderation' : 'Approved Live' } : r))}
              className="px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-mono text-xs border border-indigo-500/20"
            >
              {item.status === 'Approved Live' ? 'Unpublish' : 'Approve Live'}
            </button>
            <button
              onClick={() => setConfirmRemove(item.id)}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono text-xs border border-rose-500/20"
            >
              Delete
            </button>
          </>
        )}
      />

      <ConfirmDialog
        isOpen={!!confirmRemove}
        title="Delete Customer Review"
        message="Are you sure you want to permanently delete this customer testimonial from the product catalog?"
        onConfirm={() => { setReviews(prev => prev.filter(r => r.id !== confirmRemove)); setConfirmRemove(null); }}
        onCancel={() => setConfirmRemove(null)}
        isDestructive={true}
      />
    </AdminLayout>
  );
}
