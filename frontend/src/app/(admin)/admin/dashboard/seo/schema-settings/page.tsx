'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/ui';
import { adminService } from '@/services/admin.service';
import { useToast } from '@/providers/ToastProvider';
import { Database, Save } from 'lucide-react';
import { Button } from '@/components/ui';

export default function SchemaSettingsPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: config, isLoading } = useQuery({
    queryKey: ['schema-config'],
    queryFn: () => adminService.fetch('/schema-config').then((res: any) => res.data)
  });

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (config) {
      setFormData(config);
    }
  }, [config]);

  const saveMutation = useMutation({
    mutationFn: (data: any) => adminService.update('/schema-config', '', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schema-config'] });
      toast('Schema configuration saved successfully', 'success');
    },
    onError: (error: any) => {
      toast(error.response?.data?.message || 'Failed to save schema configuration', 'error');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400 block mb-1">Global Configuration</span>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Database size={28} className="text-emerald-500" /> Structured Data Settings
          </h1>
        </div>
      </div>

      <div className="max-w-4xl bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-2">Organization Information</h2>
        <p className="text-gray-400 text-sm mb-6">Global configuration for Organization, WebSite, and default schema fallbacks.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Organization / Person Name</label>
              <input type="text" name="organizationName" value={formData.organizationName || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-emerald-500" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Organization Logo URL</label>
              <input type="text" name="organizationLogo" value={formData.organizationLogo || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-emerald-500" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Contact Email</label>
              <input type="email" name="contactEmail" value={formData.contactEmail || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-emerald-500" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Website URL</label>
              <input type="url" name="websiteUrl" value={formData.websiteUrl || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-emerald-500" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Founding Date (YYYY-MM-DD)</label>
              <input type="text" name="foundingDate" value={formData.foundingDate || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-emerald-500" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Business Type (e.g. Organization, LocalBusiness)</label>
              <input type="text" name="businessType" value={formData.businessType || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-emerald-500" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-300">Default OpenGraph/Schema Image URL</label>
              <input type="text" name="defaultImage" value={formData.defaultImage || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-emerald-500" />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800 flex justify-end">
            <Button type="submit" disabled={saveMutation.isPending} className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2">
              <Save size={16} />
              {saveMutation.isPending ? 'Saving...' : 'Save Configuration'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
