'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/ui';
import { Card } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { useToast } from '@/providers/ToastProvider';
import { SearchPreviewWidget } from '@/components/admin/seo/SearchPreviewWidget';
import { AiSeoAssistant } from '@/components/admin/seo/AiSeoAssistant';
import type { DbSeoRecord } from '@/lib/seo/types';

export default function KeywordManagerPage() {
  const [selectedPath, setSelectedPath] = useState<string>('/');
  const [formData, setFormData] = useState<Partial<DbSeoRecord>>({});
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: configs, isLoading } = useQuery({
    queryKey: ['seo', 'configs'],
    queryFn: () => adminService.fetch('/seo').then(res => res as DbSeoRecord[])
  });

  useEffect(() => {
    if (configs) {
      const active = configs.find(c => c.path === selectedPath);
      if (active) {
        setFormData(active);
      } else {
        setFormData({ path: selectedPath, metaTitle: '', metaDescription: '', focusKeyword: '' });
      }
    }
  }, [selectedPath, configs]);

  const saveMutation = useMutation({
    mutationFn: async (data: Partial<DbSeoRecord>) => {
      // updateConfig in controller uses the body with path
      return adminService.update('/seo', encodeURIComponent(data.path!), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seo', 'configs'] });
      toast('SEO metadata updated successfully!', 'success');
    },
    onError: () => toast('Failed to update SEO metadata', 'error')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.path || !formData.metaTitle || !formData.metaDescription) {
      toast('Path, Title, and Description are required', 'error');
      return;
    }
    saveMutation.mutate(formData);
  };

  const handleAiApply = (suggestions: { title?: string; description?: string }) => {
    setFormData(prev => ({
      ...prev,
      ...(suggestions.title && { metaTitle: suggestions.title }),
      ...(suggestions.description && { metaDescription: suggestions.description })
    }));
    toast('AI suggestions applied! Remember to save.', 'success');
  };

  const availablePaths = ['/', '/about', '/projects', '/store', '/contact'];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10 mb-6">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400 block mb-1">Portfolio SEO</span>
        <h1 className="text-3xl font-black text-white tracking-tight">Keyword Manager</h1>
      </div>

      <div className="flex gap-2 overflow-x-auto mb-6 pb-2">
        {availablePaths.map(p => (
          <button
            key={p}
            onClick={() => setSelectedPath(p)}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all whitespace-nowrap ${
              selectedPath === p 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
            }`}
          >
            {p === '/' ? 'Home ( / )' : p}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Form */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Metadata Editor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4 border-b border-gray-800 pb-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Focus Keyword</label>
                  <input
                    type="text"
                    value={formData.focusKeyword || ''}
                    onChange={e => setFormData({ ...formData, focusKeyword: e.target.value })}
                    placeholder="e.g. MERN Stack Developer"
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Search Intent</label>
                  <select
                    value={formData.searchIntent || 'informational'}
                    onChange={e => setFormData({ ...formData, searchIntent: e.target.value as any })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                  >
                    <option value="informational">Informational</option>
                    <option value="navigational">Navigational</option>
                    <option value="commercial">Commercial</option>
                    <option value="transactional">Transactional</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  SEO Title <span className="text-gray-500 font-normal">({formData.metaTitle?.length || 0} / 60)</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.metaTitle || ''}
                  onChange={e => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Meta Description <span className="text-gray-500 font-normal">({formData.metaDescription?.length || 0} / 160)</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.metaDescription || ''}
                  onChange={e => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={saveMutation.isPending}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md font-bold transition-colors"
              >
                {saveMutation.isPending ? 'Saving...' : 'Save Metadata'}
              </button>
            </form>
          </Card>

          <AiSeoAssistant 
            currentTitle={formData.metaTitle || ''}
            currentDescription={formData.metaDescription || ''}
            focusKeyword={formData.focusKeyword || ''}
            onApply={handleAiApply}
          />
        </div>

        {/* Live Previews */}
        <div>
          <SearchPreviewWidget 
            title={formData.metaTitle || ''}
            description={formData.metaDescription || ''}
            path={formData.path || '/'}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
