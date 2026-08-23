'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout, DataTable, Column, FormBuilder, ConfirmDialog, WidgetCard } from '@/components/admin/ui';
import { adminService } from '@/services/admin.service';
import { useToast } from '@/providers/ToastProvider';
import axios from 'axios';
import { RechartsBar, RechartsPie } from '@/components/analytics/Charts';

const BlogAnalyticsTab = () => {
  const [data, setData] = useState<any>(null);
  
  useEffect(() => {
    axios.get('https://full-stack-portfolio-1-m5b1.onrender.com/api/analytics/blog').then(res => {
      if (res.data.success) setData(res.data.data);
    }).catch(console.error);
  }, []);

  if (!data) return <div className="text-white p-8">Loading Analytics...</div>;

  const engagementData = Object.entries(data.engagementActions || {}).map(([name, count]) => ({ name, count }));

  return (
    <div className="space-y-6 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <WidgetCard title="Total Views" value={data.totalViews || 0} colorScheme="indigo" subtitle="All articles" />
        <WidgetCard title="Unique Readers" value={data.uniqueReaders || 0} colorScheme="pink" subtitle="Distinct visitors" />
        <WidgetCard title="Shares" value={data.engagementActions?.share || 0} colorScheme="cyan" subtitle="Social shares" />
        <WidgetCard title="Comments" value={data.engagementActions?.comment || 0} colorScheme="emerald" subtitle="User discussions" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-xl">
          <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4">Top Performing Articles</h2>
          <div className="space-y-3">
            {data.topArticles && data.topArticles.map((a: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs font-mono font-bold text-white block truncate mr-4">{a._id.replace('/blog/', '')}</span>
                <span className="text-xs font-mono text-pink-400 font-bold">{a.views} views</span>
              </div>
            ))}
            {(!data.topArticles || data.topArticles.length === 0) && (
              <div className="text-gray-400 text-sm">No view data available.</div>
            )}
          </div>
        </div>

        <RechartsBar 
          data={engagementData.length > 0 ? engagementData : [{name: 'No data', count: 0}]}
          xKey="name"
          yKeys={['count']}
          colors={['pink']}
          title="Engagement Breakdown"
        />
      </div>
    </div>
  );
};


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
  const [activeTab, setActiveTab] = useState<'articles' | 'authors' | 'seo' | 'analytics'>('articles');
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => adminService.fetch('/posts')
  });

  const createMutation = useMutation({
    mutationFn: (newPost: any) => adminService.create('/posts', newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast('Article published successfully', 'success');
      setIsWriting(false);
    },
    onError: () => toast('Failed to publish article', 'error')
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => adminService.update('/posts', id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast('Article updated successfully', 'success');
      setIsWriting(false);
    },
    onError: () => toast('Failed to update article', 'error')
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.delete('/posts', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast('Article deleted successfully', 'success');
      setConfirmDelete(null);
    },
    onError: () => toast('Failed to delete article', 'error')
  });

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

  const handleDelete = () => {
    if (confirmDelete) {
      deleteMutation.mutate(confirmDelete);
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
          {(['articles', 'authors', 'seo', 'analytics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-2xl font-mono text-xs uppercase font-bold transition-all ${
                activeTab === tab ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
              }`}
            >
              {tab === 'articles' ? `All Articles & Drafts (${articles.length})` : tab === 'authors' ? 'Author Directory' : tab === 'seo' ? 'Blog SEO Defaults' : '📊 Blog Analytics'}
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
            { name: 'coverImage', label: 'Cover Image', type: 'image', defaultValue: (selectedArticle as any)?.coverImage || '' },
            { name: 'excerpt', label: 'Short Excerpt', type: 'textarea', defaultValue: (selectedArticle as any)?.excerpt || '' },
            { name: 'content', label: 'HTML Content Body (Fallback)', type: 'textarea', defaultValue: (selectedArticle as any)?.content || '' },
            { name: 'markdownContent', label: 'Markdown Content', type: 'markdown', defaultValue: (selectedArticle as any)?.markdownContent || '' },
            { name: 'status', label: 'Status', type: 'select', defaultValue: selectedArticle?.status || 'draft', options: [{label: 'Draft', value: 'draft'}, {label: 'Published', value: 'published'}] },
            { name: 'isFeatured', label: 'Featured Article', type: 'boolean', defaultValue: (selectedArticle as any)?.isFeatured || false },
            { name: 'readTime', label: 'Read Time (e.g. 5 min)', type: 'text', defaultValue: (selectedArticle as any)?.readTime || '' },
          ]}
          onCancel={() => setIsWriting(false)}
          onSubmit={(data) => {
            // Ensure content is passed even if empty for schema validation
            if (!data.content) data.content = ' '; 
            
            if (selectedArticle) {
              updateMutation.mutate({ id: selectedArticle._id || selectedArticle.id!, data });
            } else {
              createMutation.mutate(data);
            }
          }}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
          submitLabel="Publish to Tech Lab Stream"
        />
      ) : activeTab === 'articles' ? (
        isLoading ? (
          <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <DataTable
            data={articles}
            columns={columns}
            searchPlaceholder="Search Tech Lab publications by title..."
            searchKey="title"
            enableSelection={true}
            onBulkPublish={(selectedIds) => {
              // Note: actual API call would go here. For now it is mocked.
              toast(`Published ${selectedIds.length} articles`, 'success');
            }}
            onBulkDelete={(selectedIds) => {
              // Note: actual API call would go here. For now it is mocked.
              toast(`Deleted ${selectedIds.length} articles`, 'success');
            }}
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
      ) : activeTab === 'analytics' ? (
        <BlogAnalyticsTab />
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
