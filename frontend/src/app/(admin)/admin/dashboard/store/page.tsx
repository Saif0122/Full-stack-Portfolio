'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout, DataTable, Column, FormBuilder, ConfirmDialog } from '@/components/admin/ui';
import { adminService } from '@/services/admin.service';

interface ProductRecord {
  _id: string;
  id?: string;
  title: string;
  price: number;
  salePrice?: number;
  category: string;
  version: string;
  status?: string;
  downloadsCount?: number;
}

export default function StoreManagementPage() {
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductRecord | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.fetch('/products')
      .then(data => {
        if (data) setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const columns: Column<ProductRecord>[] = [
    { header: 'Product & Versioning', accessorKey: 'title', cell: (p) => (
      <div>
        <div className="font-bold text-white text-sm">{p.title}</div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">{p.version || 'v1.0'}</span>
        <span className="text-[10px] font-mono text-gray-400 ml-2">[{p.category}]</span>
      </div>
    )},
    { header: 'Pricing Model', accessorKey: 'price', cell: (p) => (
      <div className="font-mono text-xs">
        {p.salePrice ? (
          <>
            <span className="text-gray-500 line-through mr-1">${p.price}</span>
            <span className="text-emerald-400 font-black">${p.salePrice}</span>
          </>
        ) : (
          <span className="text-white font-bold">${p.price}</span>
        )}
      </div>
    )}
  ];

  const handleDelete = async () => {
    if (confirmDelete) {
      try {
        await adminService.delete('/products', confirmDelete);
        setProducts(prev => prev.filter(p => (p._id || p.id) !== confirmDelete));
        setConfirmDelete(null);
      } catch (e) {
        alert('Failed to delete product');
      }
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
          description="Configure product pricing, download asset ZIP archives, and store visibility."
          fields={[
            { name: 'title', label: 'Product Title', type: 'text', defaultValue: selectedProduct?.title || '', required: true },
            { name: 'slug', label: 'URL Slug', type: 'text', defaultValue: (selectedProduct as any)?.slug || '', required: true },
            { name: 'price', label: 'Standard Retail Price ($)', type: 'number', defaultValue: selectedProduct?.price || 99, required: true },
            { name: 'salePrice', label: 'Promoted Discount Price ($)', type: 'number', defaultValue: selectedProduct?.salePrice || 0 },
            { name: 'description', label: 'Detailed Description', type: 'textarea', defaultValue: (selectedProduct as any)?.description || '', required: true },
            { name: 'shortDescription', label: 'Short SEO Description', type: 'text', defaultValue: (selectedProduct as any)?.shortDescription || '', required: true }
          ]}
          onCancel={() => setIsEditing(false)}
          onSubmit={async (data) => {
            try {
              if (selectedProduct) {
                const updated = await adminService.update('/products', selectedProduct._id || selectedProduct.id!, data);
                setProducts(prev => prev.map(p => (p._id || p.id) === (selectedProduct._id || selectedProduct.id) ? { ...p, ...updated } : p));
              } else {
                const created = await adminService.create('/products', data);
                setProducts(prev => [created, ...prev]);
              }
              setIsEditing(false);
            } catch (err) {
              alert('Failed to save product');
            }
          }}
          submitLabel="Synchronize Store Product to Edge"
        />
      ) : loading ? (
        <div className="py-20 text-center text-gray-400 font-mono text-xs animate-pulse">Loading Store Database...</div>
      ) : (
        <DataTable
          data={products}
          columns={columns}
          searchPlaceholder="Search store inventory by name..."
          searchKey="title"
          actions={(item) => (
            <>
              <button onClick={() => { setSelectedProduct(item); setIsEditing(true); }} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs border border-white/5">Edit</button>
              <button onClick={() => setConfirmDelete(item._id || item.id || null)} className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono text-xs border border-rose-500/20">Archive</button>
            </>
          )}
        />
      )}

      <ConfirmDialog
        isOpen={!!confirmDelete}
        title="Archive Digital Product"
        message="Are you sure you want to remove this product from active storefront distribution? Existing license holders will retain access."
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
        isDestructive={true}
      />
    </AdminLayout>
  );
}
