'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout, DataTable, Column, FormBuilder, ConfirmDialog } from '@/components/admin/ui';
import { adminService } from '@/services/admin.service';
import { useToast } from '@/providers/ToastProvider';

interface NewsletterRecord {
  _id: string;
  email: string;
  status: 'subscribed' | 'unsubscribed';
  createdAt: string;
}

export default function NewsletterManagementPage() {
  const [selectedSubscriber, setSelectedSubscriber] = useState<NewsletterRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: subscribers = [], isLoading } = useQuery({
    queryKey: ['newsletter'],
    queryFn: () => adminService.fetch('/newsletter')
  });

  const createMutation = useMutation({
    mutationFn: (newSubscriber: any) => adminService.create('/newsletter', newSubscriber),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsletter'] });
      toast('Subscriber added successfully', 'success');
      setIsEditing(false);
    },
    onError: () => toast('Failed to add subscriber', 'error')
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => adminService.update('/newsletter', id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsletter'] });
      toast('Subscriber updated successfully', 'success');
      setIsEditing(false);
    },
    onError: () => toast('Failed to update subscriber', 'error')
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.delete('/newsletter', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsletter'] });
      toast('Subscriber deleted successfully', 'success');
      setConfirmDelete(null);
    },
    onError: () => toast('Failed to delete subscriber', 'error')
  });

  const columns: Column<NewsletterRecord>[] = [
    { header: 'Email Address', accessorKey: 'email', cell: (s) => <span className="font-bold text-white text-sm">{s.email}</span> },
    { header: 'Status', accessorKey: 'status', cell: (s) => (
      <span className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${
        s.status === 'subscribed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
      }`}>{s.status.toUpperCase()}</span>
    )},
    { header: 'Subscribed Date', accessorKey: 'createdAt', cell: (s) => <span className="text-xs text-gray-400 font-mono">{new Date(s.createdAt).toLocaleDateString()}</span> }
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 block mb-1">Audience</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Newsletter Subscribers</h1>
        </div>
        {!isEditing && (
          <button
            onClick={() => { setSelectedSubscriber(null); setIsEditing(true); }}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-black font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
          >
            + Add Subscriber
          </button>
        )}
      </div>

      {isEditing ? (
        <FormBuilder
          title={selectedSubscriber ? 'Edit Subscriber' : 'Add New Subscriber'}
          fields={[
            { name: 'email', label: 'Email Address', type: 'text', defaultValue: selectedSubscriber?.email || '', required: true },
            { name: 'status', label: 'Status', type: 'select', defaultValue: selectedSubscriber?.status || 'subscribed', options: [{label: 'Subscribed', value: 'subscribed'}, {label: 'Unsubscribed', value: 'unsubscribed'}] }
          ]}
          onCancel={() => setIsEditing(false)}
          onSubmit={(data) => {
            if (selectedSubscriber) {
              updateMutation.mutate({ id: selectedSubscriber._id, data });
            } else {
              createMutation.mutate(data);
            }
          }}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
          submitLabel={selectedSubscriber ? 'Update Subscriber' : 'Add Subscriber'}
        />
      ) : isLoading ? (
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <DataTable
          data={subscribers}
          columns={columns}
          searchPlaceholder="Search subscribers by email..."
          searchKey="email"
          actions={(item) => (
            <>
              <button onClick={() => { setSelectedSubscriber(item); setIsEditing(true); }} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs border border-white/5">Edit</button>
              <button onClick={() => setConfirmDelete(item._id!)} className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono text-xs border border-rose-500/20">Delete</button>
            </>
          )}
        />
      )}

      <ConfirmDialog
        isOpen={!!confirmDelete}
        title="Delete Subscriber"
        message="Are you sure you want to remove this subscriber from the list?"
        onConfirm={() => { if (confirmDelete) deleteMutation.mutate(confirmDelete); }}
        onCancel={() => setConfirmDelete(null)}
        isDestructive={true}
      />
    </AdminLayout>
  );
}
