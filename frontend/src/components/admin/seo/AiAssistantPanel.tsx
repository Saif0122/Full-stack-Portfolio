import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface AiAssistantPanelProps {
  title: string;
  content: string;
  seoData: any;
  onApplySuggestion: (field: string, value: any) => void;
}

export const AiAssistantPanel = ({ title, content, seoData, onApplySuggestion }: AiAssistantPanelProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<any>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // In a real implementation, this would point to NEXT_PUBLIC_API_URL + '/api/ai-seo/generate'
      const response = await fetch('https://full-stack-portfolio-1-m5b1.onrender.com/api/ai-seo/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          existingFocusKeyword: seoData?.focusKeyword
        })
      });

      const json = await response.json();
      if (json.success) {
        setSuggestions(json.data);
      }
    } catch (error) {
      console.error("Failed to generate AI suggestions", error);
      toast.error("Failed to connect to AI SEO service.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!suggestions && !isGenerating) {
    return (
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-indigo-100 dark:border-indigo-800 shadow-sm mt-6 text-center">
        <h3 className="text-xl font-semibold text-indigo-900 dark:text-indigo-200 mb-2">AI SEO Assistant</h3>
        <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-4">
          Generate optimized titles, meta descriptions, focus keywords, and FAQs based on your article content.
        </p>
        <button
          onClick={handleGenerate}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow transition-colors"
        >
          Generate Recommendations
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-indigo-200 dark:border-indigo-700 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-indigo-900 dark:text-indigo-300 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path></svg>
          AI SEO Suggestions
        </h3>
        {isGenerating && <span className="text-sm text-indigo-500 animate-pulse">Generating...</span>}
      </div>

      {suggestions && (
        <div className="space-y-6">
          {/* Title Suggestion */}
          <div className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md">
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase">Suggested Title</span>
              <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">{suggestions.metaTitle}</p>
            </div>
            <button 
              onClick={() => onApplySuggestion('metaTitle', suggestions.metaTitle)}
              className="text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-2 py-1 rounded"
            >
              Apply
            </button>
          </div>

          {/* Description Suggestion */}
          <div className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md">
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase">Suggested Meta Description</span>
              <p className="text-sm text-gray-900 dark:text-gray-100">{suggestions.metaDescription}</p>
            </div>
            <button 
              onClick={() => onApplySuggestion('metaDescription', suggestions.metaDescription)}
              className="text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-2 py-1 rounded"
            >
              Apply
            </button>
          </div>

          {/* Keywords */}
          <div className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md">
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase">Focus & Secondary Keywords</span>
              <p className="text-sm text-gray-900 dark:text-gray-100">
                <span className="font-semibold text-indigo-600">{suggestions.focusKeyword}</span>
                {suggestions.secondaryKeywords?.length > 0 && `, ${suggestions.secondaryKeywords.join(', ')}`}
              </p>
            </div>
            <button 
              onClick={() => {
                onApplySuggestion('focusKeyword', suggestions.focusKeyword);
                onApplySuggestion('secondaryKeywords', suggestions.secondaryKeywords);
              }}
              className="text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-2 py-1 rounded"
            >
              Apply All
            </button>
          </div>
          
          {/* FAQs */}
          {suggestions.faq && suggestions.faq.length > 0 && (
            <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="block text-xs font-semibold text-gray-500 uppercase">Suggested FAQs (for JSON-LD Schema)</span>
                <button 
                  onClick={() => {
                    const currentAi = seoData?.aiSuggestions || {};
                    onApplySuggestion('aiSuggestions', { ...currentAi, faq: suggestions.faq });
                  }}
                  className="text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-2 py-1 rounded"
                >
                  Save to SEO Data
                </button>
              </div>
              <ul className="space-y-2">
                {suggestions.faq.map((q: any, i: number) => (
                  <li key={i} className="text-sm">
                    <strong>Q:</strong> {q.question} <br/>
                    <span className="text-gray-600 dark:text-gray-400"><strong>A:</strong> {q.answer}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
