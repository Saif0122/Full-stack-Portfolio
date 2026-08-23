import React, { useState } from 'react';

interface SearchPreviewProps {
  seoData: any;
  baseUrl?: string;
}

export const SearchPreview = ({ seoData, baseUrl = 'https://saifulislam.vercel.app' }: SearchPreviewProps) => {
  const [previewMode, setPreviewMode] = useState('google-desktop');

  const title = seoData?.metaTitle || 'Your SEO Title Will Appear Here';
  const description = seoData?.metaDescription || 'Your meta description will appear here. It should be compelling and accurately describe the content of the page to encourage users to click.';
  const slug = seoData?.slug ? `/blog/${seoData.slug}` : '/blog/your-post-url';
  const fullUrl = `${baseUrl}${slug}`;
  const ogImage = seoData?.openGraphImage || '/og-default.png';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 shadow-sm mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Search & Social Preview</h3>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button 
            onClick={() => setPreviewMode('google-desktop')}
            className={`px-3 py-1 text-sm rounded-full ${previewMode === 'google-desktop' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}
          >
            Google Desktop
          </button>
          <button 
            onClick={() => setPreviewMode('google-mobile')}
            className={`px-3 py-1 text-sm rounded-full ${previewMode === 'google-mobile' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}
          >
            Mobile
          </button>
          <button 
            onClick={() => setPreviewMode('social')}
            className={`px-3 py-1 text-sm rounded-full ${previewMode === 'social' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}
          >
            Social (OG)
          </button>
        </div>
      </div>

      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900/50">
        
        {previewMode === 'google-desktop' && (
          <div className="max-w-[600px] font-sans">
            <div className="flex items-center text-sm text-[#202124] dark:text-[#bdc1c6] mb-1">
              <span className="truncate">{fullUrl}</span>
              <span className="ml-1 text-xs">▼</span>
            </div>
            <h4 className="text-[20px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer truncate mb-1">
              {title}
            </h4>
            <p className="text-[14px] text-[#4d5156] dark:text-[#9aa0a6] line-clamp-2 leading-snug">
              {description}
            </p>
          </div>
        )}

        {previewMode === 'google-mobile' && (
          <div className="max-w-[375px] font-sans bg-white dark:bg-[#202124] p-3 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-7 h-7 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div className="flex flex-col">
                <span className="text-[14px] text-[#202124] dark:text-[#e8eaed] truncate max-w-[200px]">Saiful Islam</span>
                <span className="text-[12px] text-[#5f6368] dark:text-[#9aa0a6] truncate max-w-[200px]">{fullUrl}</span>
              </div>
            </div>
            <h4 className="text-[18px] text-[#1a0dab] dark:text-[#8ab4f8] leading-tight mb-2">
              {title}
            </h4>
            <p className="text-[14px] text-[#4d5156] dark:text-[#9aa0a6] line-clamp-3">
              {description}
            </p>
          </div>
        )}

        {previewMode === 'social' && (
          <div className="max-w-[500px] border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-[#15202b]">
            <div className="w-full h-[260px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative">
              {/* Mock Image */}
              <span className="text-gray-400">1200 x 630</span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="p-3 border-t border-gray-300 dark:border-gray-700">
              <div className="text-[12px] text-[#536471] dark:text-[#8b98a5] uppercase mb-1">
                saifulislam.vercel.app
              </div>
              <h4 className="text-[15px] font-bold text-[#0f1419] dark:text-[#e7e9ea] truncate mb-1">
                {title}
              </h4>
              <p className="text-[14px] text-[#536471] dark:text-[#8b98a5] truncate">
                {description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
