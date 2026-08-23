"use client";

import React, { useEffect, useState } from 'react';

export default function BlogSeoDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // In production, this would call NEXT_PUBLIC_API_URL + '/api/seo-dashboard/metrics'
        const response = await fetch('https://full-stack-portfolio-1-m5b1.onrender.com/api/seo-dashboard/metrics');
        const json = await response.json();
        if (json.success) {
          setMetrics(json.data);
        }
      } catch (error) {
        console.error('Failed to load SEO metrics', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (isLoading) return <div className="p-8 animate-pulse text-gray-500">Loading SEO Dashboard...</div>;
  if (!metrics) return <div className="p-8 text-red-500">Failed to load SEO Dashboard data.</div>;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog SEO Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Monitor overall SEO health, AdSense readiness, and optimization opportunities.
          </p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Run Full Corpus Audit
        </button>
      </div>

      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average SEO Score</h3>
          <p className={`text-3xl font-bold mt-2 ${metrics.overallScore >= 80 ? 'text-green-500' : 'text-yellow-500'}`}>
            {metrics.overallScore}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Published Articles</h3>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{metrics.publishedPosts}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Missing Metadata</h3>
          <p className="text-3xl font-bold mt-2 text-red-500">{metrics.missingMetadataCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Orphaned Pages (No Internal Links)</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-500">{metrics.missingAltCount} <span className="text-sm font-normal text-gray-400">(Simulated)</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lowest Scoring Articles */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Needs Optimization (Low Score)</h3>
          {metrics.lowestScoreArticles?.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {metrics.lowestScoreArticles.map((article: any) => (
                <li key={article.id} className="py-3 flex justify-between items-center">
                  <div className="truncate pr-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{article.title}</p>
                    <p className="text-xs text-gray-500 truncate">/blog/{article.slug}</p>
                  </div>
                  <div className="flex items-center space-x-4 flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      Score: {article.score}
                    </span>
                    <a href={`/admin/blog/${article.id}/edit`} className="text-sm text-blue-600 hover:underline">Edit</a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">All articles have a passing SEO score!</p>
          )}
        </div>

        {/* AdSense Readiness (Part 10) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AdSense Readiness Check</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Content Originality & Helpfulness</p>
                <p className="text-xs text-gray-500">Ensure articles offer unique value, not just AI-generated fluff.</p>
              </div>
              <span className="text-green-500 flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Adequate Word Count</p>
                <p className="text-xs text-gray-500">AdSense favors comprehensive content (typically 500+ words).</p>
              </div>
              <span className="text-yellow-500 flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Navigation & Policy Pages</p>
                <p className="text-xs text-gray-500">Required: Privacy Policy, About, Contact.</p>
              </div>
              <span className="text-green-500 flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
