'use client';

import React, { useState } from 'react';
import { AdminLayout, DataTable, Column } from '@/components/admin/ui';

interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  recipient: string;
  amount: string;
  status: 'Paid' | 'Issued' | 'Overdue';
  dueDate: string;
  generatedDate: string;
}

export default function InvoicesManagementPage() {
  const [invoices] = useState<InvoiceRecord[]>([
    { id: '1', invoiceNumber: 'INV-2026-0091', recipient: 'Enterprise Solutions Inc.', amount: '$4,850.00', status: 'Paid', dueDate: '2026-07-31', generatedDate: '2026-07-01' },
    { id: '2', invoiceNumber: 'INV-2026-0092', recipient: 'AI Research Labs LLC', amount: '$1,490.00', status: 'Paid', dueDate: '2026-08-15', generatedDate: '2026-07-15' },
    { id: '3', invoiceNumber: 'INV-2026-0093', recipient: 'Vanguard Media Group', amount: '$990.00', status: 'Issued', dueDate: '2026-08-30', generatedDate: '2026-07-24' }
  ]);

  const columns: Column<InvoiceRecord>[] = [
    { header: 'Invoice Reference', accessorKey: 'invoiceNumber', cell: (i) => <span className="font-mono font-bold text-amber-300 text-sm">{i.invoiceNumber}</span> },
    { header: 'Client Entity', accessorKey: 'recipient', cell: (i) => <span className="font-bold text-white text-xs">{i.recipient}</span> },
    { header: 'Billed Amount', accessorKey: 'amount', cell: (i) => <span className="font-mono font-black text-emerald-400 text-sm">{i.amount}</span> },
    { header: 'Settlement State', accessorKey: 'status', cell: (i) => (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
        i.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400'
      }`}>{i.status}</span>
    )},
    { header: 'Due Date', accessorKey: 'dueDate', cell: (i) => <span className="font-mono text-xs text-gray-400">{i.dueDate}</span> }
  ];

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400 block mb-1">Financial Accounting</span>
        <h1 className="text-3xl font-black text-white tracking-tight">Invoices & Billing Registry</h1>
      </div>
      <DataTable
        data={invoices}
        columns={columns}
        searchPlaceholder="Search invoice references or recipient entities..."
        searchKey="recipient"
        actions={(item) => (
          <button onClick={() => alert(`Generating printable PDF document for ${item.invoiceNumber}...`)} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs border border-white/5">Export PDF ↓</button>
        )}
      />
    </AdminLayout>
  );
}
