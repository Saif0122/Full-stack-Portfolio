'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/ui';
import { Card, Button, Spinner, Alert } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { Activity, ArrowLeft, Lightbulb, ChevronRight, TrendingDown, EyeOff, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function AiAnalyticsAssistantPage() {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAiInsights = async () => {
      try {
        const res = await adminService.fetch('/analytics-integration/ai-recommendations');
        setRecommendations(res);
      } catch (err: any) {
        setError(err.message || 'Failed to generate AI recommendations.');
      } finally {
        setLoading(false);
      }
    };
    fetchAiInsights();
  }, []);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'traffic_drop': return <TrendingDown className="w-5 h-5 text-red-400" />;
      case 'high_bounce': return <ShieldAlert className="w-5 h-5 text-amber-400" />;
      case 'ranking_drop': return <EyeOff className="w-5 h-5 text-orange-400" />;
      default: return <Lightbulb className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard/seo/analytics" className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-purple-400" />
              AI Analytics Insights
            </h2>
            <p className="text-gray-400">Actionable recommendations generated from integrated provider data.</p>
          </div>
        </div>

        {error && <Alert variant="error">{error}</Alert>}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Spinner />
            <p className="text-purple-400 mt-4 animate-pulse">Gemini is analyzing cross-provider analytics...</p>
          </div>
        ) : recommendations ? (
          <>
            <Card className="p-6 bg-purple-900/10 border-purple-500/30">
              <h3 className="text-lg font-bold text-purple-300 mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Overall Assessment
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {recommendations.overallAssessment}
              </p>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mt-8 mb-4">Actionable Insights</h3>
              
              {recommendations.insights?.map((insight: any, index: number) => (
                <Card key={index} className="p-6 bg-gray-900 border-gray-800">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="p-3 bg-gray-800 rounded-lg shrink-0">
                      {getIconForType(insight.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          insight.expectedImpact === 'high' ? 'bg-red-900/30 text-red-400' :
                          insight.expectedImpact === 'medium' ? 'bg-amber-900/30 text-amber-400' :
                          'bg-blue-900/30 text-blue-400'
                        }`}>
                          {insight.expectedImpact.toUpperCase()} IMPACT
                        </span>
                        <span className="text-sm text-gray-500 font-mono">{insight.pageUrl}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">{insight.description}</h4>
                      <p className="text-gray-400 text-sm mb-4">
                        <strong className="text-gray-300">Suggested Action:</strong> {insight.suggestedAction}
                      </p>
                      <div className="flex gap-3">
                        <Button size="sm" variant="outline" className="text-green-400 border-green-400/30 hover:bg-green-400/10">
                          Approve Action
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-400 border-red-400/30 hover:bg-red-400/10">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              {(!recommendations.insights || recommendations.insights.length === 0) && (
                <div className="text-center py-10 text-gray-500">
                  No critical issues found in recent analytics data.
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </AdminLayout>
  );
}
