'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout, DataTable, Column, FormBuilder, ConfirmDialog } from '@/components/admin/ui';

interface BlogArticle {
  _id: string;
  title: string;
  author: string;
  category: string;
  status: 'Published' | 'Draft' | 'Scheduled';
  publishedAt: string;
  views: number;
  tags: string[];
}

export default function BlogCmsStudioPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([
    { _id: '101', title: 'Architecting Autonomous AI Agents with Next.js & Gemini 3.1 Pro', author: 'Saiful Islam', category: 'AI Engineering', status: 'Published', publishedAt: '2026-07-24', views: 18420, tags: ['Gemini', 'Next.js', 'LangChain'] },
    { _id: '102', title: 'Building MERN Enterprise Systems with Zero Latency & Clean Architecture', author: 'Saiful Islam', category: 'System Architecture', status: 'Published', publishedAt: '2026-07-20', views: 12410, tags: ['MERN', 'Clean Architecture', 'MongoDB'] },
    { _id: '103', title: 'The Future of 3D Web UX: Spline & Three.js Glassmorphism Integration', author: 'Saiful Islam', category: 'Design Systems', status: 'Published', publishedAt: '2026-07-15', views: 9812, tags: ['Three.js', 'WebGL', 'UI/UX'] },
    { _id: '104', title: 'Deep-Dive: Optimizing Vercel Edge Cache with Custom Service Workers', author: 'Tech Lab Core', category: 'DevOps & Performance', status: 'Draft', publishedAt: 'Unpublished', views: 0, tags: ['Vercel', 'CDN', 'PWA'] }
  ]);

  const [activeTab, setActiveTab] = useState<'articles' | 'authors' | 'seo'>('articles');
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/posts', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data && data.success && data.data?.length > 0) setArticles(data.data); })
      .catch(() => {});
  }, []);

  const columns: Column<BlogArticle>[] = [
    { header: 'Article Title & Author', accessorKey: 'title', cell: (a) => (
      <div>
        <div className="font-bold text-white text-sm line-clamp-1">{a.title}</div>
        <span className="text-[10px] font-mono text-gray-400">By <strong>{a.author}</strong> in <span className="text-pink-400">{a.category}</span></span>
      </div>
    )},
    { header: 'Status', accessorKey: 'status', cell: (a) => (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold ${
        a.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${a.status === 'Published' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
        {a.status}
      </span>
    )},
    { header: 'Engagement Views', accessorKey: 'views', cell: (a) => (
      <span className="font-mono text-xs font-bold text-white">{a.views.toLocaleString()} <span className="text-gray-500 text-[10px]">reads</span></span>
    )},
    { header: 'Date', accessorKey: 'publishedAt', cell: (a) => <span className="font-mono text-xs text-gray-400">{a.publishedAt}</span> }
  ];

  const handleDelete = () => {
    if (confirmDelete) {
      setArticles(prev => prev.filter(a => a._id !== confirmDelete));
      setConfirmDelete(null);
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
        <div className="flex gap-2 pb-4">
          {(['articles', 'authors', 'seo'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-2xl font-mono text-xs uppercase font-bold transition-all ${
                activeTab === tab ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
              }`}
            >
              {tab === 'articles' ? 'All Articles & Drafts (4)' : tab === 'authors' ? 'Author Directory' : 'Blog SEO Defaults'}
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
            { name: 'category', label: 'Tech Lab Category', type: 'select', defaultValue: selectedArticle?.category || 'AI Engineering', options: [{ label: 'AI Engineering', value: 'AI Engineering' }, { label: 'System Architecture', value: 'System Architecture' }, { label: 'Design Systems', value: 'Design Systems' }, { label: 'DevOps & Performance', value: 'DevOps & Performance' }] },
            { name: 'author', label: 'Primary Author', type: 'text', defaultValue: selectedArticle?.author || 'Saiful Islam (Principal Architect)' },
            { name: 'status', label: 'Publishing Workflow Status', type: 'select', defaultValue: selectedArticle?.status || 'Published', options: [{ label: 'Published (Live Immediately)', value: 'Published' }, { label: 'Draft (Save for Review)', value: 'Draft' }] },
            { name: 'tags', label: 'Search Indexing Tags', type: 'tags', defaultValue: selectedArticle?.tags || ['Next.js', 'AI Platform', 'Clean Architecture'] },
            { name: 'content', label: 'Markdown / Rich Text Content Body', type: 'textarea', defaultValue: '# Enterprise Engineering Principles\n\nIn modern distributed SaaS systems, Clean Architecture enables zero regression deployments across scalable cloud boundaries...', required: true }
          ]}
          onCancel={() => setIsWriting(false)}
          onSubmit={(data) => {
            if (selectedArticle) {
              setArticles(prev => prev.map(a => a._id === selectedArticle._id ? { ...a, ...data } as BlogArticle : a));
            } else {
              setArticles(prev => [{ _id: Date.now().toString(), views: 0, publishedAt: 'Just now', ...data } as BlogArticle, ...prev]);
            }
            setIsWriting(false);
          }}
          submitLabel="Publish to Tech Lab Stream"
        />
      ) : activeTab === 'articles' ? (
        <DataTable
          data={articles}
          columns={columns}
          searchPlaceholder="Search Tech Lab publications by title or topic..."
          searchKey="title"
          actions={(item) => (
            <>
              <button onClick={() => { setSelectedArticle(item); setIsWriting(true); }} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs border border-white/5">Edit</button>
              <button onClick={() => setConfirmDelete(item._id)} className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono text-xs border border-rose-500/20">Delete</button>
            </>
          )}
        />
      ) : activeTab === 'authors' ? (
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl">
          <h2 className="text-lg font-bold text-white mb-4">Author Directory & Bio Profiles</h2>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center font-black text-white text-lg">S</div>
            <div>
              <h3 className="font-bold text-white text-sm">Saiful Islam</h3>
              <p className="text-xs font-mono text-indigo-400">Principal Software Architect & MERN Engineer</p>
            </div>
          </div>
        </div>
      ) : (
        <FormBuilder
          title="Blog CMS Global SEO Defaults"
          fields={[
            { name: 'metaTitle', label: 'Blog Section Title', type: 'text', defaultValue: 'Engineering & AI Architecture Insights | Tech Lab' },
            { name: 'metaDesc', label: 'Meta Description', type: 'textarea', defaultValue: 'Deep-dive technical tutorials, enterprise systems scaling discussions, autonomous AI agent blueprints, and cloud devops breakdowns.' }
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
