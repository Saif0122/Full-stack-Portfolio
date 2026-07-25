'use client';

import React, { useState } from 'react';
import { AdminLayout, DataTable, Column } from '@/components/admin/ui';

interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  totalAmount: string;
  status: 'Completed' | 'Pending' | 'Refunded';
  items: string[];
  createdAt: string;
}

export default function OrdersManagementPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([
    { id: '1', orderNumber: 'ORD-98214', customerName: 'Alex Mercer', customerEmail: 'alex.mercer@enterprise.io', totalAmount: '$149.00', status: 'Completed', items: ['MERN SaaS Enterprise Starter Bundle (Unlimited)'], createdAt: '2026-07-24 14:22' },
    { id: '2', orderNumber: 'ORD-98213', customerName: 'Sarah Jenkins', customerEmail: 's.jenkins@ai-labs.dev', totalAmount: '$49.00', status: 'Completed', items: ['AI Portfolio Pro Theme Edition (Single Seat)'], createdAt: '2026-07-24 11:05' },
    { id: '3', orderNumber: 'ORD-98212', customerName: 'Devon Thorne', customerEmail: 'thorne.d@vanguard.org', totalAmount: '$99.00', status: 'Pending', items: ['Autonomous AI Agent Workflows Pack'], createdAt: '2026-07-23 19:40' },
    { id: '4', orderNumber: 'ORD-98211', customerName: 'Elena Rostova', customerEmail: 'elena@studio3d.io', totalAmount: '$39.00', status: 'Completed', items: ['Next 3D Glassmorphism Component Kit'], createdAt: '2026-07-22 09:12' }
  ]);

  const columns: Column<OrderRecord>[] = [
    { header: 'Order Identifier', accessorKey: 'orderNumber', cell: (o) => (
      <div>
        <span className="font-mono font-black text-indigo-400 text-sm block">{o.orderNumber}</span>
        <span className="text-[10px] font-mono text-gray-500">{o.createdAt}</span>
      </div>
    )},
    { header: 'Customer Entity', accessorKey: 'customerName', cell: (o) => (
      <div>
        <div className="font-bold text-white text-xs">{o.customerName}</div>
        <span className="text-[10px] font-mono text-gray-400">{o.customerEmail}</span>
      </div>
    )},
    { header: 'Purchased License Bundle', accessorKey: 'items', cell: (o) => (
      <span className="text-xs font-mono text-gray-300 truncate max-w-[260px] block" title={o.items.join(', ')}>{o.items[0]}</span>
    )},
    { header: 'Total Value', accessorKey: 'totalAmount', cell: (o) => <span className="font-mono text-sm font-black text-emerald-400">{o.totalAmount}</span> },
    { header: 'Fulfillment Status', accessorKey: 'status', cell: (o) => (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
        o.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
        o.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-rose-500/10 text-rose-400'
      }`}>{o.status}</span>
    )}
  ];

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-indigo-400 block mb-1">Commerce Fulfillment</span>
        <h1 className="text-3xl font-black text-white tracking-tight">Orders & Fulfillment Control</h1>
      </div>

      <DataTable
        data={orders}
        columns={columns}
        searchPlaceholder="Search orders by ORD number, email or customer..."
        searchKey="orderNumber"
        actions={(item) => (
          <button
            onClick={() => alert(`Fulfillment details for ${item.orderNumber}: Encrypted download links active.`)}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs border border-white/5"
          >
            Inspect License →
          </button>
        )}
      />
    </AdminLayout>
  );
}
