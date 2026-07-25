'use client';

import React, { useState } from 'react';
import { AdminLayout, DataTable, Column } from '@/components/admin/ui';

interface NotificationRecord {
  _id: string;
  title: string;
  message: string;
  type: 'SYSTEM' | 'COMMERCE' | 'AI' | 'SECURITY' | 'SEO';
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsHubPage() {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([
    { _id: '1', title: 'Phase 11 Enterprise Admin Online', message: 'All 16 operational suites deployed with luxury glassmorphism UI and 95+ Lighthouse performance.', type: 'SYSTEM', isRead: false, createdAt: 'Just now' },
    { _id: '2', title: 'New Pro License Purchased', message: 'Customer Alex Mercer completed payment for MERN SaaS Starter Bundle ($149.00).', type: 'COMMERCE', isRead: false, createdAt: '14 mins ago' },
    { _id: '3', title: 'AI Autonomous Schema Sync Complete', message: 'Gemini 3.1 Pro verified 6 required structured JSON-LD schemas across Vercel Edge CDN.', type: 'AI', isRead: true, createdAt: '1 hour ago' },
    { _id: '4', title: 'Zero Broken Links Verified', message: 'Automated SEO link crawler scanned 142 target routes with zero errors found.', type: 'SEO', isRead: true, createdAt: '3 hours ago' },
    { _id: '5', title: 'Strict CSP & Security Audit Clean', message: 'Zero regression security scan verified isolation between Admin Platform and public UI.', type: 'SECURITY', isRead: true, createdAt: '1 day ago' }
  ]);

  const columns: Column<NotificationRecord>[] = [
    { header: 'Alert Stream', accessorKey: 'title', cell: (n) => (
      <div className="flex items-start gap-3">
        <span className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${n.isRead ? 'bg-gray-600' : 'bg-indigo-500 animate-ping'}`} />
        <div>
          <div className="font-bold text-white text-sm flex items-center gap-2">
            <span>{n.title}</span>
            <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded ${
              n.type === 'COMMERCE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
              n.type === 'AI' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
            }`}>{n.type}</span>
          </div>
          <p className="text-xs text-gray-300 mt-1 leading-relaxed max-w-xl">{n.message}</p>
        </div>
      </div>
    )},
    { header: 'State', accessorKey: 'isRead', cell: (n) => (
      <span className="font-mono text-xs text-gray-400">{n.isRead ? 'Acknowledged' : <strong className="text-indigo-400">Unread Alert</strong>}</span>
    )},
    { header: 'Timestamp', accessorKey: 'createdAt', cell: (n) => <span className="font-mono text-xs text-gray-500">{n.createdAt}</span> }
  ];

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    alert('All executive alert notifications marked as acknowledged.');
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-indigo-400 block mb-1">Executive Event Stream</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Notifications Hub & Audit Trail</h1>
        </div>
        <button
          onClick={markAllRead}
          className="px-6 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider border border-white/10 transition-all hover:scale-105"
        >
          ✓ Mark All Acknowledged
        </button>
      </div>

      <DataTable
        data={notifications}
        columns={columns}
        searchPlaceholder="Filter event alerts by title or content message..."
        searchKey="title"
        actions={(item) => (
          <button
            onClick={() => setNotifications(prev => prev.map(n => n._id === item._id ? { ...n, isRead: !n.isRead } : n))}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs border border-white/5"
          >
            {item.isRead ? 'Mark Unread' : 'Acknowledge'}
          </button>
        )}
      />
    </AdminLayout>
  );
}
