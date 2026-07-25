'use client';

import React, { useState } from 'react';
import { AdminLayout, DataTable, Column, ConfirmDialog } from '@/components/admin/ui';

interface LicenseRecord {
  id: string;
  licenseKey: string;
  product: string;
  assignedTo: string;
  seats: string;
  status: 'Active Verified' | 'Revoked' | 'Expired';
  activatedAt: string;
}

export default function LicensesManagementPage() {
  const [licenses, setLicenses] = useState<LicenseRecord[]>([
    { id: '1', licenseKey: 'SAIF-PRO-8921-X9A4-E7B2', product: 'AI Portfolio Pro Theme Edition', assignedTo: 'alex.mercer@enterprise.io', seats: '5 / 10 seats', status: 'Active Verified', activatedAt: '2026-07-24' },
    { id: '2', licenseKey: 'SAIF-ENT-4412-B8K9-M2W9', product: 'MERN SaaS Enterprise Starter Bundle', assignedTo: 's.jenkins@ai-labs.dev', seats: 'Unlimited Enterprise', status: 'Active Verified', activatedAt: '2026-07-22' },
    { id: '3', licenseKey: 'SAIF-KIT-1109-Q2R8-V5N4', product: 'Next 3D Glassmorphism Component Kit', assignedTo: 'thorne.d@vanguard.org', seats: '1 / 1 seat (Max)', status: 'Active Verified', activatedAt: '2026-07-20' },
    { id: '4', licenseKey: 'SAIF-OLD-0021-Z3L1-C9D8', product: 'Legacy UI Kit v1.0', assignedTo: 'revoked.user@domain.com', seats: '0 / 1 seat', status: 'Revoked', activatedAt: '2025-11-14' }
  ]);

  const [confirmRevoke, setConfirmRevoke] = useState<string | null>(null);

  const columns: Column<LicenseRecord>[] = [
    { header: 'Software License Key', accessorKey: 'licenseKey', cell: (l) => (
      <span className="font-mono font-bold text-xs text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20 tracking-wider block max-w-fit">
        {l.licenseKey}
      </span>
    )},
    { header: 'Licensed Product & Entity', accessorKey: 'product', cell: (l) => (
      <div>
        <div className="font-bold text-white text-xs">{l.product}</div>
        <span className="text-[10px] font-mono text-gray-400">Owner: {l.assignedTo}</span>
      </div>
    )},
    { header: 'Seat Allocations', accessorKey: 'seats', cell: (l) => <span className="font-mono text-xs text-emerald-400 font-bold">{l.seats}</span> },
    { header: 'Activation Status', accessorKey: 'status', cell: (l) => (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
        l.status === 'Active Verified' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
      }`}>{l.status}</span>
    )},
    { header: 'Issued Date', accessorKey: 'activatedAt', cell: (l) => <span className="font-mono text-xs text-gray-500">{l.activatedAt}</span> }
  ];

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-indigo-400 block mb-1">Software Licensing Hub</span>
        <h1 className="text-3xl font-black text-white tracking-tight">License Keys & Seat Administration</h1>
      </div>

      <DataTable
        data={licenses}
        columns={columns}
        searchPlaceholder="Search license keys or customer owner emails..."
        searchKey="licenseKey"
        actions={(item) => (
          item.status === 'Active Verified' ? (
            <button
              onClick={() => setConfirmRevoke(item.id)}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono text-xs border border-rose-500/20"
            >
              Revoke Key
            </button>
          ) : (
            <span className="text-[10px] font-mono text-gray-600">Archived</span>
          )
        )}
      />

      <ConfirmDialog
        isOpen={!!confirmRevoke}
        title="Revoke Software License"
        message="Are you sure you want to revoke this digital activation key? Further API telemetry handshakes from client machines using this key will fail."
        onConfirm={() => { setLicenses(prev => prev.map(l => l.id === confirmRevoke ? { ...l, status: 'Revoked' } : l)); setConfirmRevoke(null); }}
        onCancel={() => setConfirmRevoke(null)}
        isDestructive={true}
      />
    </AdminLayout>
  );
}
