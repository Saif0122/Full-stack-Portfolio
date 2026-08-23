import React, { useEffect, useState } from 'react';

interface RealTimeAnalyzerProps {
  seoData: any;
  content: string;
}

export const RealTimeAnalyzer = ({ seoData, content }: RealTimeAnalyzerProps) => {
  const [score, setScore] = useState(0);
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    const analyze = () => {
      let currentScore = 100;
      const newIssues = [];

      // Focus Keyword check
      if (!seoData?.focusKeyword) {
        currentScore -= 20;
        newIssues.push({ type: 'error', text: 'Missing Focus Keyword' });
      } else {
        const keyword = seoData.focusKeyword.toLowerCase();
        
        // Keyword in Title
        if (!seoData.metaTitle?.toLowerCase().includes(keyword)) {
          currentScore -= 10;
          newIssues.push({ type: 'warning', text: 'Focus keyword not found in SEO Title' });
        }
        
        // Keyword in Meta Description
        if (!seoData.metaDescription?.toLowerCase().includes(keyword)) {
          currentScore -= 10;
          newIssues.push({ type: 'warning', text: 'Focus keyword not found in Meta Description' });
        }

        // Keyword in content
        if (content && !content.toLowerCase().includes(keyword)) {
          currentScore -= 15;
          newIssues.push({ type: 'error', text: 'Focus keyword not found in content' });
        }
      }

      // Title length check
      const titleLength = seoData?.metaTitle?.length || 0;
      if (titleLength === 0) {
        currentScore -= 15;
        newIssues.push({ type: 'error', text: 'Missing SEO Title' });
      } else if (titleLength < 30 || titleLength > 60) {
        currentScore -= 5;
        newIssues.push({ type: 'warning', text: 'SEO Title length should be between 30 and 60 characters' });
      }

      // Meta Description length check
      const descLength = seoData?.metaDescription?.length || 0;
      if (descLength === 0) {
        currentScore -= 15;
        newIssues.push({ type: 'error', text: 'Missing Meta Description' });
      } else if (descLength < 120 || descLength > 160) {
        currentScore -= 5;
        newIssues.push({ type: 'warning', text: 'Meta Description length should be between 120 and 160 characters' });
      }

      // Basic Content Checks
      if (!content || content.length < 300) {
        currentScore -= 20;
        newIssues.push({ type: 'error', text: 'Thin content: Article is too short (minimum 300 characters recommended)' });
      }
      
      // Basic Image Alt Text Check (Naively looks for <img > without alt=)
      if (content && /<img(?!.*?alt=(['"]).*?\1)[^>]*>/i.test(content)) {
        currentScore -= 10;
        newIssues.push({ type: 'warning', text: 'Missing alt text on one or more images' });
      }

      setScore(Math.max(0, currentScore));
      setIssues(newIssues);
    };

    analyze();
  }, [seoData, content]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 mt-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Real-Time SEO Analysis</h3>
        <div className={`text-2xl font-bold ${score >= 80 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
          {score} / 100
        </div>
      </div>

      <div className="space-y-3">
        {issues.length === 0 ? (
          <div className="text-green-600 dark:text-green-400 flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            <span>Great job! No major SEO issues found.</span>
          </div>
        ) : (
          <ul className="space-y-2">
            {issues.map((issue: any, idx: number) => (
              <li key={idx} className="flex items-start space-x-2">
                {issue.type === 'error' ? (
                  <span className="text-red-500 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                  </span>
                ) : (
                  <span className="text-yellow-500 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                  </span>
                )}
                <span className="text-sm text-gray-700 dark:text-gray-300">{issue.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
