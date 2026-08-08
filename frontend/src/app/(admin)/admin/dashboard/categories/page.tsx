'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout, DataTable, Column, FormBuilder, ConfirmDialog } from '@/components/admin/ui';
import { adminService } from '@/services/admin.service';
import { useToast } from '@/providers/ToastProvider';

interface CategoryRecord {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  isActive?: boolean;
}
export default function CategoriesManagementPage() {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryRecord | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => adminService.fetch('/categories')
  });

  const createMutation = useMutation({
    mutationFn: (newCategory: any) => adminService.create('/categories', newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast('Category created successfully', 'success');
      setIsCreating(false);
    },
    onError: () => toast('Failed to create category', 'error')
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => adminService.update('/categories', id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast('Category updated successfully', 'success');
      setIsCreating(false);
    },
    onError: () => toast('Failed to update category', 'error')
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.delete('/categories', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast('Category deleted successfully', 'success');
      setConfirmDelete(null);
    },
    onError: () => toast('Failed to delete category', 'error')
  });

  const columns: Column<CategoryRecord>[] = [
    { header: 'Category Name & Slug', accessorKey: 'name', cell: (c) => (
      <div>
        <span className="font-bold text-white text-sm block">{c.name}</span>
        <span className="text-[10px] font-mono text-indigo-400">/{c.slug}</span>
      </div>
    )},
    { header: 'Status', accessorKey: 'isActive', cell: (c) => (
      <span className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${
        c.isActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
      }`}>{c.isActive ? 'Active' : 'Inactive'}</span>
    )},
    { header: 'Icon', accessorKey: 'icon', cell: (c) => <span className="text-xs text-gray-400">{c.icon || '-'}</span> },
    { header: 'Description', accessorKey: 'description', cell: (c) => <span className="text-xs text-gray-400 max-w-xs truncate block">{c.description}</span> }
  ];

  const handleDelete = () => {
    if (confirmDelete) {
      deleteMutation.mutate(confirmDelete);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 block mb-1">Ecosystem Hierarchy</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Categories & Tag Management</h1>
        </div>
        {!isCreating && (
          <button
            onClick={() => { setSelectedCategory(null); setIsCreating(true); }}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-black font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
          >
            + Create Hierarchy Category
          </button>
        )}
      </div>

      {isCreating ? (
        <FormBuilder
          title={selectedCategory ? `Edit Category: ${selectedCategory.name}` : "Create New Platform Category"}
          fields={[
            { name: 'name', label: 'Category Display Name', type: 'text', defaultValue: selectedCategory?.name || '', required: true },
            { name: 'slug', label: 'URL Slug Identifier', type: 'text', defaultValue: selectedCategory?.slug || '', required: true },
            { name: 'icon', label: 'Icon String/Class', type: 'text', defaultValue: selectedCategory?.icon || '' },
            { name: 'description', label: 'Category Summary Description', type: 'textarea', defaultValue: selectedCategory?.description || '', required: true },
            { name: 'isActive', label: 'Is Active', type: 'boolean', defaultValue: selectedCategory?.isActive ?? true }
          ]}
          onCancel={() => setIsCreating(false)}
          onSubmit={(data) => {
            if (selectedCategory && selectedCategory._id) {
              updateMutation.mutate({ id: selectedCategory._id, data });
            } else {
              createMutation.mutate(data);
            }
          }}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
          submitLabel="Save Category Node"
        />
      ) : isLoading ? (
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <DataTable
          data={categories}
          columns={columns}
          searchPlaceholder="Search category hierarchies by name..."
          searchKey="name"
          actions={(item) => (
            <>
              <button onClick={() => { setSelectedCategory(item); setIsCreating(true); }} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs border border-white/5">Edit</button>
              <button onClick={() => setConfirmDelete(item._id!)} className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono text-xs border border-rose-500/20">Delete</button>
            </>
          )}
        />
      )}

      <ConfirmDialog
        isOpen={!!confirmDelete}
        title="Remove Category Hierarchy"
        message="Are you sure you want to delete this category node? Associated products or articles will be reassigned to Uncategorized."
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
        isDestructive={true}
      />
    </AdminLayout>
  );
}
