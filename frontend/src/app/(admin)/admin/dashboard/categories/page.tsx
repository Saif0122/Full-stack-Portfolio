'use client';

import React, { useState } from 'react';
import { AdminLayout, DataTable, Column, FormBuilder, ConfirmDialog } from '@/components/admin/ui';

interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  domain: 'Store' | 'Blog' | 'Projects';
  itemCount: number;
  description: string;
}

export default function CategoriesManagementPage() {
  const [categories, setCategories] = useState<CategoryRecord[]>([
    { id: '1', name: 'Next.js Templates', slug: 'nextjs-templates', domain: 'Store', itemCount: 8, description: 'Production full-stack Next.js applications and boilerplates.' },
    { id: '2', name: 'SaaS Architecture', slug: 'saas-architecture', domain: 'Projects', itemCount: 12, description: 'Enterprise structural design patterns and cloud devops.' },
    { id: '3', name: 'AI Engineering', slug: 'ai-engineering', domain: 'Blog', itemCount: 19, description: 'Autonomous agent workflows, RAG systems, and Gemini SDK integrations.' },
    { id: '4', name: 'UI Kits & Design Systems', slug: 'ui-kits', domain: 'Store', itemCount: 6, description: 'Glassmorphism and luxury Tailwind CSS components.' }
  ]);

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const columns: Column<CategoryRecord>[] = [
    { header: 'Category Name & Slug', accessorKey: 'name', cell: (c) => (
      <div>
        <span className="font-bold text-white text-sm block">{c.name}</span>
        <span className="text-[10px] font-mono text-indigo-400">/{c.slug}</span>
      </div>
    )},
    { header: 'Ecosystem Domain', accessorKey: 'domain', cell: (c) => (
      <span className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${
        c.domain === 'Store' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
        c.domain === 'Blog' ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      }`}>{c.domain} Hub</span>
    )},
    { header: 'Associated Records', accessorKey: 'itemCount', cell: (c) => <span className="font-mono text-xs font-bold text-white">{c.itemCount} active items</span> },
    { header: 'Description', accessorKey: 'description', cell: (c) => <span className="text-xs text-gray-400 max-w-xs truncate block">{c.description}</span> }
  ];

  const handleDelete = () => {
    if (confirmDelete) {
      setCategories(prev => prev.filter(c => c.id !== confirmDelete));
      setConfirmDelete(null);
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
            onClick={() => setIsCreating(true)}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-black font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
          >
            + Create Hierarchy Category
          </button>
        )}
      </div>

      {isCreating ? (
        <FormBuilder
          title="Create New Platform Category"
          fields={[
            { name: 'name', label: 'Category Display Name', type: 'text', required: true },
            { name: 'slug', label: 'URL Slug Identifier', type: 'text', required: true },
            { name: 'domain', label: 'Target Module Domain', type: 'select', options: [{ label: 'Store', value: 'Store' }, { label: 'Blog', value: 'Blog' }, { label: 'Projects', value: 'Projects' }], defaultValue: 'Store' },
            { name: 'description', label: 'Category Summary Description', type: 'textarea', required: true }
          ]}
          onCancel={() => setIsCreating(false)}
          onSubmit={(data) => {
            setCategories(prev => [{ id: Date.now().toString(), itemCount: 0, ...data } as CategoryRecord, ...prev]);
            setIsCreating(false);
          }}
          submitLabel="Save Category Node"
        />
      ) : (
        <DataTable
          data={categories}
          columns={columns}
          searchPlaceholder="Search category hierarchies by name..."
          searchKey="name"
          actions={(item) => (
            <button onClick={() => setConfirmDelete(item.id)} className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono text-xs border border-rose-500/20">Delete Node</button>
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
