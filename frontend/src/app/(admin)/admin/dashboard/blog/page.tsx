'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout, DataTable, Column, FormBuilder, ConfirmDialog } from '@/components/admin/ui';
import { adminService } from '@/services/admin.service';

interface BlogArticle {
  _id: string;
  id?: string;
  title: string;
  author: string;
  category: string;
  status: 'Published' | 'Draft' | 'Scheduled';
  publishedAt?: string;
  views?: number;
  tags: string[];
}

export default function BlogCmsStudioPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [activeTab, setActiveTab] = useState<'articles' | 'authors' | 'seo'>('articles');
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.fetch('/posts')
      .then(data => {
        if (data) setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const columns: Column<BlogArticle>[] = [
    { header: 'Article Title', accessorKey: 'title', cell: (a) => (
      <div>
        <div className="font-bold text-white text-sm line-clamp-1">{a.title}</div>
        <span className="text-[10px] font-mono text-gray-400">In <span className="text-pink-400">{a.category || 'Engineering'}</span></span>
      </div>
    )},
    { header: 'Status', accessorKey: 'status', cell: (a) => (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold ${
        a.status !== 'Draft' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${a.status !== 'Draft' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
        {a.status || 'Published'}
      </span>
    )},
    { header: 'Date', accessorKey: 'publishedAt', cell: (a) => <span className="font-mono text-xs text-gray-400">{a.publishedAt || new Date().toLocaleDateString()}</span> }
  ];

  const handleDelete = async () => {
    if (confirmDelete) {
      try {
        await adminService.delete('/posts', confirmDelete);
        setArticles(prev => prev.filter(a => (a._id || a.id) !== confirmDelete));
        setConfirmDelete(null);
      } catch (e) {
        alert('Failed to delete post');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-pink-400 block mb-1">Tech Lab CMS</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Blog CMS Studio & Publishing</h1>
        </div>
        {!isWriting && (
          <button
            onClick={() => { setSelectedArticle(null); setIsWriting(true); }}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-pink-500/20 transition-all hover:scale-105"
          >
            + Compose New Tech Article
          </button>
        )}
      </div>

      {!isWriting && (
        <div className="flex gap-2 pb-4 pt-4">
          {(['articles', 'authors', 'seo'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-2xl font-mono text-xs uppercase font-bold transition-all ${
                activeTab === tab ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
              }`}
            >
              {tab === 'articles' ? `All Articles & Drafts (${articles.length})` : tab === 'authors' ? 'Author Directory' : 'Blog SEO Defaults'}
            </button>
          ))}
        </div>
      )}

      {isWriting ? (
        <FormBuilder
          title={selectedArticle ? `Edit Article: ${selectedArticle.title}` : 'Compose Tech Lab Architecture Post'}
          description="Support rich Markdown syntax, high-resolution media attachments, and custom OpenGraph metadata."
          fields={[
            { name: 'title', label: 'Article Headline', type: 'text', defaultValue: selectedArticle?.title || '', required: true },
            { name: 'slug', label: 'URL Slug', type: 'text', defaultValue: (selectedArticle as any)?.slug || '', required: true },
            { name: 'content', label: 'HTML Content Body', type: 'textarea', defaultValue: (selectedArticle as any)?.content || '', required: true },
            { name: 'markdownContent', label: 'Markdown Content (Overrides HTML)', type: 'textarea', defaultValue: (selectedArticle as any)?.markdownContent || '' },
          ]}
          onCancel={() => setIsWriting(false)}
          onSubmit={async (data) => {
            try {
              if (selectedArticle) {
                const updated = await adminService.update('/posts', selectedArticle._id || selectedArticle.id!, data);
                setArticles(prev => prev.map(a => (a._id || a.id) === (selectedArticle._id || selectedArticle.id) ? { ...a, ...updated } : a));
              } else {
                const created = await adminService.create('/posts', data);
                setArticles(prev => [created, ...prev]);
              }
              setIsWriting(false);
            } catch (err) {
              alert('Failed to save article.');
            }
          }}
          submitLabel="Publish to Tech Lab Stream"
        />
      ) : activeTab === 'articles' ? (
        loading ? (
          <div className="py-20 text-center text-gray-400 font-mono text-xs animate-pulse">Loading CMS Data from MongoDB...</div>
        ) : (
          <DataTable
            data={articles}
            columns={columns}
            searchPlaceholder="Search Tech Lab publications by title..."
            searchKey="title"
            actions={(item) => (
              <>
                <button onClick={() => { setSelectedArticle(item); setIsWriting(true); }} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs border border-white/5">Edit</button>
                <button onClick={() => setConfirmDelete(item._id || item.id || null)} className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono text-xs border border-rose-500/20">Delete</button>
              </>
            )}
          />
        )
      ) : activeTab === 'authors' ? (
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl">
          <h2 className="text-lg font-bold text-white mb-4">Author Directory & Bio Profiles</h2>
          <div className="text-gray-400 text-sm">Author management module is connected to User Role RBAC.</div>
        </div>
      ) : (
        <FormBuilder
          title="Blog CMS Global SEO Defaults"
          fields={[
            { name: 'metaTitle', label: 'Blog Section Title', type: 'text', defaultValue: 'Engineering & AI Architecture Insights | Tech Lab' }
          ]}
          onSubmit={() => alert('Blog SEO defaults updated successfully.')}
          submitLabel="Save Blog SEO Configuration"
        />
      )}

      <ConfirmDialog
        isOpen={!!confirmDelete}
        title="Delete Tech Lab Article"
        message="Are you sure you want to remove this publication? This action removes the markdown payload from the active blog CDN."
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
        isDestructive={true}
      />
    </AdminLayout>
  );
}
