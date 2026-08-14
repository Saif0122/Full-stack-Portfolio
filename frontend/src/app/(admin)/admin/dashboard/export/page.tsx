'use client';

import React, { useState } from 'react';
import { AdminLayout, WidgetCard } from '@/components/admin/ui';
import { useToast } from '@/providers/ToastProvider';

export default function DataExportPage() {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();
  
  const [resource, setResource] = useState('orders');
  const [format, setFormat] = useState('csv');

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const url = `http://localhost:5000/api/export?resource=${resource}&format=${format}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Export failed or no data found');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${resource}-export.${format === 'excel' ? 'xlsx' : format}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast(`Exported ${resource} successfully in ${format.toUpperCase()} format.`, 'success');
    } catch (error: any) {
      toast(error.message, 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10 mb-6">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 block mb-1">Data Management & Compliance</span>
        <h1 className="text-3xl font-black text-white tracking-tight">Data Export Service</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col gap-6">
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Select Dataset</label>
            <select 
              value={resource} 
              onChange={(e) => setResource(e.target.value)}
              className="w-full bg-black/50 border border-white/10 text-white p-3 rounded-xl focus:outline-none focus:border-cyan-500 font-mono text-sm"
            >
              <option value="orders">Commerce Orders</option>
              <option value="products">Store Products</option>
              <option value="users">User Profiles</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Export Format</label>
            <div className="flex gap-4">
              {['csv', 'excel', 'pdf'].map(f => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`flex-1 py-3 rounded-xl font-mono text-sm uppercase transition-all border ${
                    format === f ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-lg shadow-cyan-500/20' : 'bg-black/50 text-gray-400 border-white/10 hover:border-white/20'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform disabled:opacity-50 mt-4"
          >
            {isExporting ? 'Generating Payload...' : 'Execute Export Sequence'}
          </button>
        </div>

        <div className="space-y-6">
          <WidgetCard title="Supported Formats" value="CSV, XLSX, PDF" colorScheme="indigo" subtitle="Enterprise grade compliance" />
          <div className="p-6 rounded-3xl bg-black/40 border border-white/5 relative overflow-hidden">
             <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-indigo-500/10" />
             <h3 className="text-lg font-bold text-white mb-2">Audit & Compliance</h3>
             <p className="text-sm text-gray-400 font-mono leading-relaxed">
               All data exports are securely generated on the fly. 
               This module complies with GDPR standards. PII (Personally Identifiable Information) is included in full raw formats. Handle generated files securely.
             </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
