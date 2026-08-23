import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { adminService } from '@/services/admin.service';

interface AiContentQualityAnalyzerProps {
  content: string;
  focusKeyword: string;
  moduleName: string; // 'Blog' | 'Product' | 'Portfolio'
}

export const AiContentQualityAnalyzer = ({ content, focusKeyword, moduleName }: AiContentQualityAnalyzerProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!content || !focusKeyword) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      // Calls the new unified AiSeoService backend endpoint
      const result = await adminService.create('/ai-seo/analyze-quality', {
        content,
        focusKeyword,
        moduleName
      });
      setAnalysis(result.data.suggestion); // The JSON from Gemini
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to analyze content.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-2 text-emerald-400">
          <Sparkles size={18} />
          <h3 className="font-bold">AI Content Quality Analyzer</h3>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !content || !focusKeyword}
          className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          {isAnalyzing ? (
            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Analyzing...</>
          ) : (
            'Analyze Now'
          )}
        </button>
      </div>

      <div className="p-6">
        {!analysis && !isAnalyzing && !error && (
          <div className="text-center py-8 text-gray-500">
            <p>Click "Analyze Now" to let AI evaluate your content's SEO quality.</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        {analysis && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Composite Confidence</p>
                <div className="flex items-baseline gap-2">
                  <div className={`text-2xl font-black ${
                    analysis.compositeConfidenceScore >= 90 ? 'text-emerald-400' : 
                    analysis.compositeConfidenceScore >= 75 ? 'text-blue-400' : 
                    analysis.compositeConfidenceScore >= 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {analysis.compositeConfidenceScore || analysis.confidenceScore}%
                  </div>
                  <span className="text-gray-500 text-xs font-mono">{analysis.confidenceLevel || 'Medium'}</span>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Readability</p>
                <div className="text-2xl font-black text-white">{analysis.readabilityScore || 80}/100</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Est. SEO Impact</p>
                <div className="text-2xl font-black text-white">{analysis.seoImpactScore || 85}/100</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Est. CTR Gain</p>
                <div className="text-2xl font-black text-emerald-400">+{analysis.estCtrGain || 2.4}%</div>
              </div>
            </div>

            {(analysis.explanation || analysis.confidenceExplanation) && (
              <p className="text-sm text-gray-300 bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                {analysis.confidenceExplanation || analysis.explanation}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-red-400 font-semibold flex items-center gap-2">
                  <AlertTriangle size={16} /> Issues Detected
                </h4>
                {analysis.issues?.length > 0 ? (
                  <ul className="space-y-2">
                    {analysis.issues.map((issue: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-gray-600 mt-1">•</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No major issues found.</p>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="text-emerald-400 font-semibold flex items-center gap-2">
                  <CheckCircle2 size={16} /> Recommended Improvements
                </h4>
                {analysis.improvements?.length > 0 ? (
                  <ul className="space-y-2">
                    {analysis.improvements.map((imp: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                        <ArrowRight size={14} className="text-emerald-500/50 mt-1 flex-shrink-0" />
                        {imp}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">Content is well optimized.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
