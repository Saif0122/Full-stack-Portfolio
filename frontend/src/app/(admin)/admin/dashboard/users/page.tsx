'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout, DataTable, Column, FormBuilder, ConfirmDialog } from '@/components/admin/ui';
import { adminService } from '@/services/admin.service';
import { useToast } from '@/providers/ToastProvider';

interface UserRecord {
  _id: string;
  name: string;
  email: string;
  jobTitle?: string;
  avatarUrl?: string;
  isVerified: boolean;
  createdAt: string;
  password?: string; // Only for creation/updating
}

export default function UsersManagementPage() {
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => adminService.fetch('/users')
  });

  const createMutation = useMutation({
    mutationFn: (newUser: any) => adminService.create('/users', newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast('User added successfully', 'success');
      setIsEditing(false);
    },
    onError: () => toast('Failed to add user', 'error')
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => adminService.update('/users', id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast('User updated successfully', 'success');
      setIsEditing(false);
    },
    onError: () => toast('Failed to update user', 'error')
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.delete('/users', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast('User deleted successfully', 'success');
      setConfirmDelete(null);
    },
    onError: () => toast('Failed to delete user', 'error')
  });

  const columns: Column<UserRecord>[] = [
    { header: 'User', accessorKey: 'name', cell: (u) => (
      <div className="flex items-center gap-3">
        {u.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={u.avatarUrl} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-white/10" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/20">
            {u.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <span className="font-bold text-white text-sm block">{u.name}</span>
          <span className="text-[10px] font-mono text-gray-400">{u.email}</span>
        </div>
      </div>
    )},
    { header: 'Job Title', accessorKey: 'jobTitle', cell: (u) => <span className="text-xs text-gray-300">{u.jobTitle || '-'}</span> },
    { header: 'Verified', accessorKey: 'isVerified', cell: (u) => (
      <span className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${
        u.isVerified ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
      }`}>{u.isVerified ? 'Yes' : 'No'}</span>
    )},
    { header: 'Joined Date', accessorKey: 'createdAt', cell: (u) => <span className="text-xs text-gray-400 font-mono">{new Date(u.createdAt).toLocaleDateString()}</span> }
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-indigo-400 block mb-1">Access Control</span>
          <h1 className="text-3xl font-black text-white tracking-tight">User Management</h1>
        </div>
        {!isEditing && (
          <button
            onClick={() => { setSelectedUser(null); setIsEditing(true); }}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
          >
            + Add User
          </button>
        )}
      </div>

      {isEditing ? (
        <FormBuilder
          title={selectedUser ? 'Edit User' : 'Add New User'}
          fields={[
            { name: 'name', label: 'Full Name', type: 'text', defaultValue: selectedUser?.name || '', required: true },
            { name: 'email', label: 'Email Address', type: 'text', defaultValue: selectedUser?.email || '', required: true },
            { name: 'password', label: selectedUser ? 'New Password (leave blank to keep current)' : 'Password', type: 'text', required: !selectedUser },
            { name: 'jobTitle', label: 'Job Title', type: 'text', defaultValue: selectedUser?.jobTitle || '' },
            { name: 'avatarUrl', label: 'Avatar Image', type: 'image', defaultValue: selectedUser?.avatarUrl || '' },
            { name: 'isVerified', label: 'Is Verified', type: 'boolean', defaultValue: selectedUser?.isVerified || false }
          ]}
          onCancel={() => setIsEditing(false)}
          onSubmit={(data) => {
            if (selectedUser) {
              if (!data.password) delete data.password;
              updateMutation.mutate({ id: selectedUser._id, data });
            } else {
              createMutation.mutate(data);
            }
          }}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
          submitLabel={selectedUser ? 'Update User' : 'Add User'}
        />
      ) : isLoading ? (
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <DataTable
          data={users}
          columns={columns}
          searchPlaceholder="Search users by name or email..."
          searchKey="name"
          actions={(item) => (
            <>
              <button onClick={() => { setSelectedUser(item); setIsEditing(true); }} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs border border-white/5">Edit</button>
              <button onClick={() => setConfirmDelete(item._id!)} className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono text-xs border border-rose-500/20">Delete</button>
            </>
          )}
        />
      )}

      <ConfirmDialog
        isOpen={!!confirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? They will lose all access."
        onConfirm={() => { if (confirmDelete) deleteMutation.mutate(confirmDelete); }}
        onCancel={() => setConfirmDelete(null)}
        isDestructive={true}
      />
    </AdminLayout>
  );
}
