'use client';

import React, { useState } from 'react';
import { AdminLayout, DataTable, Column } from '@/components/admin/ui';

interface DownloadRecord {
  id: string;
  fileName: string;
  product: string;
  downloadedBy: string;
  ipAddress: string;
  timestamp: string;
  status: 'Success' | 'Rate Limited' | 'Verification Failed';
}

export default function DownloadsManagementPage() {
  const [downloads] = useState<DownloadRecord[]>([
    { id: '1', fileName: 'ai-portfolio-pro-v2.4.zip', product: 'AI Portfolio Pro Theme Edition', downloadedBy: 'alex.mercer@enterprise.io', ipAddress: '198.51.100.42', timestamp: '2026-07-24 15:44', status: 'Success' },
    { id: '2', fileName: 'mern-saas-starter-v1.8.2.tar.gz', product: 'MERN SaaS Enterprise Starter Bundle', downloadedBy: 's.jenkins@ai-labs.dev', ipAddress: '203.0.113.19', timestamp: '2026-07-24 12:10', status: 'Success' },
    { id: '3', fileName: 'next-3d-glass-kit-v3.0.0.zip', product: 'Next 3D Glassmorphism Component Kit', downloadedBy: 'elena@studio3d.io', ipAddress: '198.51.100.88', timestamp: '2026-07-23 21:05', status: 'Success' },
    { id: '4', fileName: 'ai-portfolio-pro-v2.4.zip', product: 'AI Portfolio Pro Theme Edition', downloadedBy: 'anon-unverified@proxy.net', ipAddress: '192.0.2.14', timestamp: '2026-07-23 18:02', status: 'Verification Failed' }
  ]);

  const columns: Column<DownloadRecord>[] = [
    { header: 'Distributed File & Product', accessorKey: 'fileName', cell: (d) => (
      <div>
        <div className="font-mono font-bold text-white text-xs">{d.fileName}</div>
        <span className="text-[10px] text-purple-400 font-sans font-semibold">[{d.product}]</span>
      </div>
    )},
    { header: 'Recipient Account', accessorKey: 'downloadedBy', cell: (d) => <span className="font-mono text-xs text-gray-300">{d.downloadedBy}</span> },
    { header: 'IP Telemetry Node', accessorKey: 'ipAddress', cell: (d) => <span className="font-mono text-xs text-gray-400 px-2 py-0.5 rounded bg-white/5">{d.ipAddress}</span> },
    { header: 'CDN Handshake Status', accessorKey: 'status', cell: (d) => (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold ${
        d.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
      }`}>{d.status}</span>
    )},
    { header: 'Timestamp', accessorKey: 'timestamp', cell: (d) => <span className="font-mono text-xs text-gray-500">{d.timestamp}</span> }
  ];

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-purple-400 block mb-1">CDN Telemetry Audit</span>
        <h1 className="text-3xl font-black text-white tracking-tight">Digital Downloads Audit Stream</h1>
      </div>

      <DataTable
        data={downloads}
        columns={columns}
        searchPlaceholder="Search downloads by file name or recipient email..."
        searchKey="downloadedBy"
      />
    </AdminLayout>
  );
}
