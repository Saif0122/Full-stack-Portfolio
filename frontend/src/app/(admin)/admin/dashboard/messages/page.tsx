'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout, DataTable, Column, FormBuilder, ConfirmDialog } from '@/components/admin/ui';
import { adminService } from '@/services/admin.service';
import { useToast } from '@/providers/ToastProvider';

interface MessageRecord {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export default function MessagesManagementPage() {
  const [selectedMessage, setSelectedMessage] = useState<MessageRecord | null>(null);
  const [isViewing, setIsViewing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: () => adminService.fetch('/messages')
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => adminService.update('/messages', id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast('Message status updated', 'success');
      setIsViewing(false);
    },
    onError: () => toast('Failed to update message', 'error')
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.delete('/messages', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast('Message deleted successfully', 'success');
      setConfirmDelete(null);
    },
    onError: () => toast('Failed to delete message', 'error')
  });

  const columns: Column<MessageRecord>[] = [
    { header: 'Sender', accessorKey: 'name', cell: (m) => (
      <div>
        <span className="font-bold text-white text-sm block">{m.name}</span>
        <span className="text-[10px] font-mono text-gray-400">{m.email}</span>
      </div>
    )},
    { header: 'Subject', accessorKey: 'subject', cell: (m) => <span className="text-sm text-gray-300">{m.subject || 'No Subject'}</span> },
    { header: 'Status', accessorKey: 'status', cell: (m) => (
      <span className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${
        m.status === 'unread' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
        m.status === 'replied' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
      }`}>{m.status.toUpperCase()}</span>
    )},
    { header: 'Date', accessorKey: 'createdAt', cell: (m) => <span className="text-xs text-gray-400 font-mono">{new Date(m.createdAt).toLocaleDateString()}</span> }
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-indigo-400 block mb-1">Communications</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Messages & Inquiries</h1>
        </div>
      </div>

      {isViewing ? (
        <FormBuilder
          title={`Message from ${selectedMessage?.name}`}
          fields={[
            { name: 'name', label: 'Sender Name', type: 'text', defaultValue: selectedMessage?.name || '' },
            { name: 'email', label: 'Sender Email', type: 'text', defaultValue: selectedMessage?.email || '' },
            { name: 'subject', label: 'Subject', type: 'text', defaultValue: selectedMessage?.subject || '' },
            { name: 'message', label: 'Message Body', type: 'textarea', defaultValue: selectedMessage?.message || '' },
            { name: 'status', label: 'Status', type: 'select', defaultValue: selectedMessage?.status || 'unread', options: [{label: 'Unread', value: 'unread'}, {label: 'Read', value: 'read'}, {label: 'Replied', value: 'replied'}] }
          ]}
          onCancel={() => setIsViewing(false)}
          onSubmit={(data) => {
            if (selectedMessage) {
              updateMutation.mutate({ id: selectedMessage._id, data });
            }
          }}
          isSubmitting={updateMutation.isPending}
          submitLabel="Update Message Status"
        />
      ) : isLoading ? (
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <DataTable
          data={messages}
          columns={columns}
          searchPlaceholder="Search messages by name or subject..."
          searchKey="name"
          actions={(item) => (
            <>
              <button onClick={() => { setSelectedMessage(item); setIsViewing(true); }} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs border border-white/5">View</button>
              <button onClick={() => setConfirmDelete(item._id!)} className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono text-xs border border-rose-500/20">Delete</button>
            </>
          )}
        />
      )}

      <ConfirmDialog
        isOpen={!!confirmDelete}
        title="Delete Message"
        message="Are you sure you want to delete this message? This action cannot be undone."
        onConfirm={() => { if (confirmDelete) deleteMutation.mutate(confirmDelete); }}
        onCancel={() => setConfirmDelete(null)}
        isDestructive={true}
      />
    </AdminLayout>
  );
}
