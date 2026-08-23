'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/ui';
import { Card } from '@/components/ui';
import { adminService } from '@/services/admin.service';

export default function MarketplaceSeoDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['marketplace-seo-overview'],
    queryFn: async () => {
      const response = await adminService.fetch('/marketplace-seo/overview');
      return response as any;
    }
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>
      </AdminLayout>
    );
  }

  const overview = data;

  const getBadge = (score: number) => {
    if (score >= 95) return { label: 'Excellent', color: 'bg-green-500', text: 'text-green-500' };
    if (score >= 80) return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-500' };
    if (score >= 60) return { label: 'Needs Improvement', color: 'bg-yellow-500', text: 'text-yellow-500' };
    return { label: 'Critical', color: 'bg-red-500', text: 'text-red-500' };
  };

  const seoBadge = getBadge(overview?.overallSeoScore || 0);
  const readinessBadge = getBadge(overview?.overallReadinessScore || 0);

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10 mb-6">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400 block mb-1">Marketplace SEO</span>
        <h1 className="text-3xl font-black text-white tracking-tight">Marketplace Health</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 bg-gray-900 border-gray-800 text-center">
          <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Overall SEO Score</h2>
          <div className={`text-6xl font-black ${seoBadge.text}`}>{overview?.overallSeoScore || 0}</div>
          <div className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${seoBadge.color}`}>
            {seoBadge.label}
          </div>
        </Card>

        <Card className="p-6 bg-gray-900 border-gray-800 text-center">
          <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Digital Product Readiness</h2>
          <div className="text-6xl font-black text-white">{overview?.overallReadinessScore || 0}</div>
          <div className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${readinessBadge.color}`}>
            {readinessBadge.label}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Missing Descriptions', value: overview?.stats?.missingMetaDescription, color: 'text-yellow-500' },
          { label: 'Missing Focus Keywords', value: overview?.stats?.missingFocusKeyword, color: 'text-yellow-500' },
          { label: 'Missing Alt Text', value: overview?.stats?.missingAltText, color: 'text-red-400' },
          { label: 'Missing Documentation', value: overview?.stats?.missingDocumentation, color: 'text-orange-400' },
          { label: 'Missing License', value: overview?.stats?.missingLicense, color: 'text-red-500' },
          { label: 'Missing Downloads', value: overview?.stats?.missingDownload, color: 'text-red-500' },
          { label: 'Duplicate Slugs', value: overview?.stats?.duplicateSlugs, color: 'text-red-500' },
        ].map((stat, i) => (
          <Card key={i} className="p-4 bg-gray-900 border-gray-800 flex flex-col justify-center items-center text-center">
            <div className={`text-3xl font-black mb-1 ${stat.value > 0 ? stat.color : 'text-emerald-500'}`}>{stat.value || 0}</div>
            <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden bg-gray-900 border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-gray-300 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Product</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">SEO Score</th>
                <th className="p-4 font-semibold">Readiness Score</th>
                <th className="p-4 font-semibold">Issues</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {overview?.products?.map((product: any) => {
                const pSeoBadge = getBadge(product.seoScore || 0);
                const pReadyBadge = getBadge(product.readinessScore || 0);
                
                const issues = [];
                if (!product.seo?.metaDescription) issues.push('No Description');
                if (!product.documentationUrl) issues.push('No Docs');
                if (!product.licenseType) issues.push('No License');
                if (!product.localFileUrl && !product.githubRepoUrl) issues.push('No DL');

                return (
                  <tr key={product._id} className="text-gray-300 hover:bg-gray-800/50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-white">{product.title}</div>
                      <div className="text-xs text-gray-500">/{product.slug}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${product.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700 text-gray-300'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`font-bold ${pSeoBadge.text}`}>{product.seoScore || 0}</span>
                    </td>
                    <td className="p-4">
                      <span className={`font-bold ${pReadyBadge.text}`}>{product.readinessScore || 0}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1 flex-wrap">
                        {issues.length > 0 ? (
                          issues.map((issue, idx) => (
                            <span key={idx} className="bg-red-500/10 text-red-400 text-[10px] px-2 py-0.5 rounded font-medium whitespace-nowrap">
                              {issue}
                            </span>
                          ))
                        ) : (
                          <span className="text-emerald-500 text-sm">✓ Optimized</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {(!overview?.products || overview.products.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}
