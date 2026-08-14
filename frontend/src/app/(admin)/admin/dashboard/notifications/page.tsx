'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout, DataTable, Column } from '@/components/admin/ui';
import axios from 'axios';
import { useToast } from '@/providers/ToastProvider';

interface NotificationRecord {
  _id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsHubPage() {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notifications');
      if (res.data.success) {
        setNotifications(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000); // Polling fallback every 15s
    return () => clearInterval(interval);
  }, []);

  const columns: Column<NotificationRecord>[] = [
    { header: 'Alert Stream', accessorKey: 'title', cell: (n) => (
      <div className="flex items-start gap-3">
        <span className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${n.isRead ? 'bg-gray-600' : 'bg-indigo-500 animate-ping'}`} />
        <div>
          <div className="font-bold text-white text-sm flex items-center gap-2">
            <span>{n.title}</span>
            <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded ${
              n.type === 'commerce' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
              n.type === 'ai' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
            }`}>{n.type}</span>
          </div>
          <p className="text-xs text-gray-300 mt-1 leading-relaxed max-w-xl">{n.message}</p>
        </div>
      </div>
    )},
    { header: 'State', accessorKey: 'isRead', cell: (n) => (
      <span className="font-mono text-xs text-gray-400">{n.isRead ? 'Acknowledged' : <strong className="text-indigo-400">Unread Alert</strong>}</span>
    )},
    { header: 'Timestamp', accessorKey: 'createdAt', cell: (n) => <span className="font-mono text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</span> }
  ];

  const markAllRead = async () => {
    try {
      await axios.put('http://localhost:5000/api/notifications/mark-all-read');
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      toast('All executive alert notifications marked as acknowledged.', 'success');
    } catch (error) {
      toast('Failed to mark notifications as read', 'error');
    }
  };

  const toggleRead = async (item: NotificationRecord) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/${item._id}`, { isRead: !item.isRead });
      setNotifications(prev => prev.map(n => n._id === item._id ? { ...n, isRead: !n.isRead } : n));
    } catch (error) {
      toast('Failed to update notification', 'error');
    }
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

      {loading ? (
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <DataTable
          data={notifications}
          columns={columns}
          searchPlaceholder="Filter event alerts by title or content message..."
          searchKey="title"
          actions={(item) => (
            <button
              onClick={() => toggleRead(item)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs border border-white/5"
            >
              {item.isRead ? 'Mark Unread' : 'Acknowledge'}
            </button>
          )}
        />
      )}
    </AdminLayout>
  );
}
