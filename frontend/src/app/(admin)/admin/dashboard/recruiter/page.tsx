'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout, WidgetCard } from '@/components/admin/ui';
import { RechartsBar, RechartsArea, RechartsPie } from '@/components/analytics/Charts';
import axios from 'axios';

export default function RecruiterDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/analytics/recruiter');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching recruiter analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading || !data) return <AdminLayout><div className="text-white">Loading...</div></AdminLayout>;

  const engagementData = [
    { name: 'Resume DLs', count: data.resumeDownloads || 0 },
    { name: 'Previews', count: data.resumePreviews || 0 },
    { name: 'GitHub', count: data.githubClicks || 0 },
    { name: 'LinkedIn', count: data.linkedinClicks || 0 },
    { name: 'Email', count: data.emailClicks || 0 },
  ];

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10 mb-6">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-indigo-400 block mb-1">Talent Acquisition Insights</span>
        <h1 className="text-3xl font-black text-white tracking-tight">Recruiter Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <WidgetCard title="Resume Downloads" value={data.resumeDownloads || 0} colorScheme="indigo" subtitle="Total CV Downloads" />
        <WidgetCard title="GitHub Profile Clicks" value={data.githubClicks || 0} colorScheme="emerald" subtitle="Code reviews initiated" />
        <WidgetCard title="LinkedIn Clicks" value={data.linkedinClicks || 0} colorScheme="cyan" subtitle="Professional connections" />
        <WidgetCard title="Direct Emails" value={data.emailClicks || 0} colorScheme="amber" subtitle="Contact attempts" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RechartsBar 
          data={engagementData}
          xKey="name"
          yKeys={['count']}
          colors={['indigo']}
          title="Recruiter Engagement Overview"
        />
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-xl">
          <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4">Most Viewed Projects (Recruiters)</h2>
          <div className="space-y-3">
            {data.topProjects && data.topProjects.map((p: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs font-mono font-bold text-white block truncate mr-4">{p._id}</span>
                <span className="text-xs font-mono text-emerald-400 font-bold">{p.views} views</span>
              </div>
            ))}
            {(!data.topProjects || data.topProjects.length === 0) && (
              <div className="text-gray-400 text-sm">No project data available yet.</div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
