'use client';

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout, FormBuilder } from '@/components/admin/ui';
import { adminService } from '@/services/admin.service';
import { useToast } from '@/providers/ToastProvider';
import { Settings, Cpu } from 'lucide-react';

export default function AiSettingsPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: aiSettings, isLoading } = useQuery({
    queryKey: ['ai-settings'],
    queryFn: () => adminService.fetch('/ai-settings').then(res => res as any)
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      await adminService.update('/ai-settings', '', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-settings'] });
      toast('AI Configuration saved successfully!', 'success');
    },
    onError: () => toast('Failed to save AI configuration', 'error')
  });

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-purple-400 block mb-1">Infrastructure Control</span>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Cpu size={28} className="text-purple-500" /> AI Provider & Settings
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <FormBuilder
              key={aiSettings?._id || 'new'}
              title="Global Language Model Configuration"
              fields={[
                { 
                  name: 'activeProvider', 
                  label: 'Active AI Provider', 
                  type: 'select', 
                  defaultValue: aiSettings?.activeProvider || 'gemini',
                  options: [
                    { label: 'Google Gemini', value: 'gemini' },
                    { label: 'OpenAI (Coming Soon)', value: 'openai' },
                    { label: 'Anthropic (Coming Soon)', value: 'anthropic' }
                  ]
                },
                { name: 'activeModel', label: 'Model Version', type: 'text', defaultValue: aiSettings?.activeModel || 'gemini-1.5-flash' },
                { name: 'contextWindow', label: 'Max Context Window (Tokens)', type: 'number', defaultValue: aiSettings?.contextWindow || 1048576 },
                { name: 'maxOutputTokens', label: 'Max Output Tokens', type: 'number', defaultValue: aiSettings?.maxOutputTokens || 8192 },
                { name: 'temperature', label: 'Temperature (0.0 to 2.0)', type: 'number', defaultValue: aiSettings?.temperature || 0.7 },
                { name: 'topP', label: 'Top P', type: 'number', defaultValue: aiSettings?.topP || 0.95 },
                { name: 'topK', label: 'Top K', type: 'number', defaultValue: aiSettings?.topK || 64 },
              ]}
              onSubmit={(data) => saveMutation.mutate(data)}
              isSubmitting={saveMutation.isPending}
              submitLabel="Save Global AI Settings"
            />
          )}
        </div>
        
        <div className="space-y-6">
          <div className="bg-purple-500/10 border border-purple-500/20 p-6 rounded-2xl">
            <h3 className="text-purple-400 font-bold flex items-center gap-2 mb-2">
              <Settings size={18} /> Provider Notes
            </h3>
            <p className="text-sm text-gray-300">
              The platform currently uses <strong>Google Gemini</strong> as the core reasoning engine. If you switch providers in the future, ensure the corresponding API keys are set in your environment variables.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
