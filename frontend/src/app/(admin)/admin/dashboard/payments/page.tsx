'use client';

import React, { useState } from 'react';
import { AdminLayout, DataTable, Column } from '@/components/admin/ui';

interface PaymentRecord {
  id: string;
  txId: string;
  gateway: 'Stripe' | 'PayPal' | 'Crypto / Web3';
  amount: string;
  status: 'Succeeded' | 'Refunded' | 'Processing';
  customerEmail: string;
  timestamp: string;
}

export default function PaymentsManagementPage() {
  const [payments] = useState<PaymentRecord[]>([
    { id: '1', txId: 'ch_3Ps7m9Lkd92k0129F0S92K1L', gateway: 'Stripe', amount: '$149.00', status: 'Succeeded', customerEmail: 'alex.mercer@enterprise.io', timestamp: '2026-07-24 14:22' },
    { id: '2', txId: 'ch_3Ps5a8Lkd92k0129A1P82N9Q', gateway: 'Stripe', amount: '$49.00', status: 'Succeeded', customerEmail: 's.jenkins@ai-labs.dev', timestamp: '2026-07-24 11:05' },
    { id: '3', txId: 'tx_web3_0x892f00a98c0b291a', gateway: 'Crypto / Web3', amount: '$99.00', status: 'Succeeded', customerEmail: 'thorne.d@vanguard.org', timestamp: '2026-07-23 19:40' },
    { id: '4', txId: 're_3Pr9m0Lkd92k0129L0S11Z8B', gateway: 'Stripe', amount: '-$39.00', status: 'Refunded', customerEmail: 'refunded@olddomain.com', timestamp: '2026-07-20 09:12' }
  ]);

  const columns: Column<PaymentRecord>[] = [
    { header: 'Transaction Identifier', accessorKey: 'txId', cell: (p) => (
      <span className="font-mono text-xs text-indigo-300 bg-black/60 px-2 py-1 rounded border border-white/10 block max-w-[220px] truncate">{p.txId}</span>
    )},
    { header: 'Gateway Channel', accessorKey: 'gateway', cell: (p) => (
      <span className="text-xs font-mono font-bold text-gray-300">{p.gateway}</span>
    )},
    { header: 'Net Settled Value', accessorKey: 'amount', cell: (p) => (
      <span className={`font-mono font-black text-sm ${p.status === 'Refunded' ? 'text-rose-400' : 'text-emerald-400'}`}>{p.amount}</span>
    )},
    { header: 'Customer Entity', accessorKey: 'customerEmail', cell: (p) => <span className="font-mono text-xs text-gray-400">{p.customerEmail}</span> },
    { header: 'Transaction State', accessorKey: 'status', cell: (p) => (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
        p.status === 'Succeeded' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
      }`}>{p.status}</span>
    )}
  ];

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400 block mb-1">Treasury & Settlement</span>
        <h1 className="text-3xl font-black text-white tracking-tight">Payments & Refund Gateway Control</h1>
      </div>
      <DataTable
        data={payments}
        columns={columns}
        searchPlaceholder="Search transactions by ID or customer email..."
        searchKey="customerEmail"
      />
    </AdminLayout>
  );
}
