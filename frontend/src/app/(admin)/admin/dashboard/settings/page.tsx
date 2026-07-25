'use client';

import React, { useState } from 'react';
import { AdminLayout, FormBuilder, ConfirmDialog } from '@/components/admin/ui';

export default function GlobalSettingsPage() {
  const [activeGroup, setActiveGroup] = useState<'system' | 'security' | 'database' | 'backup'>('system');
  const [confirmClearCache, setConfirmClearCache] = useState<boolean>(false);

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400 block mb-1">Platform Control Parameters</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Global System Settings</h1>
        </div>
        <button
          onClick={() => setConfirmClearCache(true)}
          className="px-6 py-2.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-mono text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-md"
        >
          ⚡ Purge Edge Cache & Redis
        </button>
      </div>

      <div className="flex flex-wrap gap-2 pb-4">
        {(['system', 'security', 'database', 'backup'] as const).map((grp) => (
          <button
            key={grp}
            onClick={() => setActiveGroup(grp)}
            className={`px-5 py-2.5 rounded-2xl font-mono text-xs font-bold uppercase transition-all ${
              activeGroup === grp ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 scale-105' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
            }`}
          >
            {grp === 'system' ? 'Platform Preferences & Themes' : grp === 'security' ? 'API Keys & Role Access' : grp === 'database' ? 'Clustered MongoDB Telemetry' : 'Backups & Snapshot Restore'}
          </button>
        ))}
      </div>

      {activeGroup === 'system' ? (
        <FormBuilder
          title="Platform Preferences & Operational Rules"
          description="Manage site-wide maintenance switches, admin theme glow effects, and logging intensity."
          fields={[
            { name: 'platformName', label: 'Executive Platform Display Name', type: 'text', defaultValue: 'Saif AI Enterprise Command Platform v11.0' },
            { name: 'adminTheme', label: 'Admin Visual UI Theme Mode', type: 'select', defaultValue: 'Luxury Dark Glassmorphism (3D Amber/Indigo)', options: [{ label: 'Luxury Dark Glassmorphism (3D Amber/Indigo)', value: 'Luxury Dark Glassmorphism (3D Amber/Indigo)' }, { label: 'Oled Black Minimal', value: 'Oled Black Minimal' }] },
            { name: 'enableAnimations', label: 'GPU-Accelerated Framer & 3D Micro-animations', type: 'boolean', defaultValue: true },
            { name: 'maintenanceMode', label: 'Site-wide Maintenance Lockbox Mode', type: 'boolean', defaultValue: false },
            { name: 'auditLogLevel', label: 'Telemetry Logging Granularity', type: 'select', defaultValue: 'Verbose Enterprise Audit Stream', options: [{ label: 'Verbose Enterprise Audit Stream', value: 'Verbose Enterprise Audit Stream' }, { label: 'Errors Only', value: 'Errors Only' }] }
          ]}
          onSubmit={() => alert('Platform global preferences synchronized across distributed edge servers.')}
          submitLabel="Save System Preferences"
        />
      ) : activeGroup === 'security' ? (
        <FormBuilder
          title="API Keys, Security & Role Access Management"
          description="Manage cryptographic secrets for Stripe payment gateways, Gemini 3.1 Pro AI SDKs, and JWT token rotation."
          fields={[
            { name: 'geminiKey', label: 'Google Gemini AI Pro API Secret', type: 'text', defaultValue: 'AIzaSy_•••••••••••••••••••••••••••••_E29w', required: true },
            { name: 'stripeSecret', label: 'Stripe Commerce Live Webhook Key', type: 'text', defaultValue: 'whsec_•••••••••••••••••••••••••••••••89a2', required: true },
            { name: 'jwtSecret', label: 'JWT Authorization Signing Key (Base64)', type: 'text', defaultValue: 'saif_ai_enterprise_super_secret_key_2026', required: true },
            { name: 'requireMfa', label: 'Enforce Multi-Factor Auth (MFA) on Executive Roles', type: 'boolean', defaultValue: true }
          ]}
          onSubmit={() => alert('Cryptographic security parameters updated successfully.')}
          submitLabel="Update Security Secrets"
        />
      ) : activeGroup === 'database' ? (
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">MongoDB Enterprise Cluster Status</h2>
              <span className="text-xs font-mono text-emerald-400">● Replica Set Online (M10 High-Availability Cluster)</span>
            </div>
            <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
              Latency: 12ms
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-gray-400 block uppercase">Total Collections</span>
              <span className="text-xl font-bold text-white">16 Admin Domains</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-gray-400 block uppercase">Indexed Documents</span>
              <span className="text-xl font-bold text-white">4,821 Records</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-gray-400 block uppercase">Connection Pooling</span>
              <span className="text-xl font-bold text-white">Active (100% Valid)</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl space-y-6">
          <h2 className="text-lg font-bold text-white tracking-tight">System Backup & Snapshot Restore</h2>
          <p className="text-xs font-mono text-gray-300 leading-relaxed">
            Autonomous daily encrypted backups are captured and mirrored across multi-region AWS S3 buckets. You can trigger an instant point-in-time snapshot of all 16 Admin Module collections.
          </p>
          <button
            onClick={() => alert('Initiating zero-downtime database snapshot archival... Snapshot #SNAP_20260725_1100 created successfully!')}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
          >
            📥 Create Live System Snapshot Now
          </button>
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmClearCache}
        title="Purge Vercel Edge Cache & Redis"
        message="Are you sure you want to flush all distributed cache buffers? This will re-hydrate static generation routes directly from MongoDB on the next request."
        onConfirm={() => { setConfirmClearCache(false); alert('Distributed caching layer flushed successfully!'); }}
        onCancel={() => setConfirmClearCache(false)}
        isDestructive={true}
      />
    </AdminLayout>
  );
}
