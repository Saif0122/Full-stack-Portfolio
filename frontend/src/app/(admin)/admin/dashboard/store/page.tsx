'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout, DataTable, Column, FormBuilder, ConfirmDialog } from '@/components/admin/ui';

interface ProductRecord {
  _id: string;
  title: string;
  price: number;
  discountPrice?: number;
  category: string;
  version: string;
  downloadsCount: number;
  status: 'Active' | 'Draft' | 'Archived';
  licenseType: string;
}

export default function StoreManagementPage() {
  const [products, setProducts] = useState<ProductRecord[]>([
    { _id: '501', title: 'AI Portfolio Pro Theme Edition', price: 79, discountPrice: 49, category: 'Next.js Templates', version: 'v2.4.0', downloadsCount: 412, status: 'Active', licenseType: 'Commercial Single & Multi-Seat' },
    { _id: '502', title: 'MERN SaaS Enterprise Starter Bundle', price: 149, category: 'Boilerplates', version: 'v1.8.2', downloadsCount: 389, status: 'Active', licenseType: 'Unlimited Enterprise' },
    { _id: '503', title: 'Next 3D Glassmorphism Component Kit', price: 39, category: 'UI Kits', version: 'v3.0.0', downloadsCount: 684, status: 'Active', licenseType: 'Personal & Commercial' },
    { _id: '504', title: 'Autonomous AI Agent Workflows Pack', price: 99, category: 'AI Tools', version: 'v1.0.0', downloadsCount: 142, status: 'Draft', licenseType: 'Pro Seat' }
  ]);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductRecord | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data && data.success && data.data?.length > 0) setProducts(data.data); })
      .catch(() => {});
  }, []);

  const columns: Column<ProductRecord>[] = [
    { header: 'Product & Versioning', accessorKey: 'title', cell: (p) => (
      <div>
        <div className="font-bold text-white text-sm">{p.title}</div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">{p.version}</span>
        <span className="text-[10px] font-mono text-gray-400 ml-2">[{p.category}]</span>
      </div>
    )},
    { header: 'Pricing Model', accessorKey: 'price', cell: (p) => (
      <div className="font-mono text-xs">
        {p.discountPrice ? (
          <>
            <span className="text-gray-500 line-through mr-1">${p.price}</span>
            <span className="text-emerald-400 font-black">${p.discountPrice}</span>
          </>
        ) : (
          <span className="text-white font-bold">${p.price}</span>
        )}
      </div>
    )},
    { header: 'License Term', accessorKey: 'licenseType', cell: (p) => <span className="text-xs text-indigo-300 font-mono">{p.licenseType}</span> },
    { header: 'Downloads', accessorKey: 'downloadsCount', cell: (p) => <span className="font-mono text-xs font-bold text-white">{p.downloadsCount.toLocaleString()}</span> },
    { header: 'Status', accessorKey: 'status', cell: (p) => (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold ${
        p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400'
      }`}>
        {p.status}
      </span>
    )}
  ];

  const handleDelete = () => {
    if (confirmDelete) {
      setProducts(prev => prev.filter(p => p._id !== confirmDelete));
      setConfirmDelete(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400 block mb-1">Commerce Engine</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Store Products & Digital Licensing</h1>
        </div>
        {!isEditing && (
          <button
            onClick={() => { setSelectedProduct(null); setIsEditing(true); }}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-xl shadow-emerald-500/20 transition-all hover:scale-105"
          >
            + Register Digital Product
          </button>
        )}
      </div>

      {isEditing ? (
        <FormBuilder
          title={selectedProduct ? `Edit Product: ${selectedProduct.title}` : 'Register New E-Commerce Product'}
          description="Configure product pricing, download asset ZIP archives, documentation links, and coupon eligibility."
          fields={[
            { name: 'title', label: 'Product Title', type: 'text', defaultValue: selectedProduct?.title || '', required: true },
            { name: 'version', label: 'Release Version', type: 'text', defaultValue: selectedProduct?.version || 'v1.0.0', required: true },
            { name: 'price', label: 'Standard Retail Price ($)', type: 'number', defaultValue: selectedProduct?.price || 99, required: true },
            { name: 'discountPrice', label: 'Promoted Discount Price ($)', type: 'number', defaultValue: selectedProduct?.discountPrice || 0 },
            { name: 'category', label: 'Store Category', type: 'select', defaultValue: selectedProduct?.category || 'Next.js Templates', options: [{ label: 'Next.js Templates', value: 'Next.js Templates' }, { label: 'Boilerplates', value: 'Boilerplates' }, { label: 'UI Kits', value: 'UI Kits' }, { label: 'AI Tools', value: 'AI Tools' }] },
            { name: 'licenseType', label: 'Supported License Term', type: 'text', defaultValue: selectedProduct?.licenseType || 'Commercial Multi-Seat' },
            { name: 'status', label: 'Catalog Visibility', type: 'select', defaultValue: selectedProduct?.status || 'Active', options: [{ label: 'Active (Available for Instant Checkout)', value: 'Active' }, { label: 'Draft (Hidden from Store UI)', value: 'Draft' }] },
            { name: 'description', label: 'Product Architecture Documentation & Benefits', type: 'textarea', defaultValue: 'High-performance production codebase engineered with React 19, TailwindCSS, and seamless MongoDB validation.', required: true }
          ]}
          onCancel={() => setIsEditing(false)}
          onSubmit={(data) => {
            if (selectedProduct) {
              setProducts(prev => prev.map(p => p._id === selectedProduct._id ? { ...p, ...data } as ProductRecord : p));
            } else {
              setProducts(prev => [{ _id: Date.now().toString(), downloadsCount: 0, ...data } as ProductRecord, ...prev]);
            }
            setIsEditing(false);
          }}
          submitLabel="Synchronize Store Product to Edge"
        />
      ) : (
        <DataTable
          data={products}
          columns={columns}
          searchPlaceholder="Search store inventory by name, version or license..."
          searchKey="title"
          actions={(item) => (
            <>
              <button onClick={() => { setSelectedProduct(item); setIsEditing(true); }} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs border border-white/5">Edit</button>
              <button onClick={() => setConfirmDelete(item._id)} className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono text-xs border border-rose-500/20">Archive</button>
            </>
          )}
        />
      )}

      <ConfirmDialog
        isOpen={!!confirmDelete}
        title="Archive Digital Product"
        message="Are you sure you want to remove this product from active storefront distribution? Existing license holders will retain download access via their profile."
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
        isDestructive={true}
      />
    </AdminLayout>
  );
}
