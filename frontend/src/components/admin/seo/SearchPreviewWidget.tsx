import React from 'react';
import { Card } from '@/components/ui';

interface SearchPreviewProps {
  title: string;
  description: string;
  path: string;
  domain?: string;
}

export function SearchPreviewWidget({ title, description, path, domain = 'saifulislam.vercel.app' }: SearchPreviewProps) {
  const url = `https://${domain}${path === '/' ? '' : path}`;
  const displayTitle = title || 'Your Page Title - Site Name';
  const displayDesc = description || 'Your meta description will appear here. It should be compelling and describe the content of the page.';

  return (
    <Card className="p-6 bg-gray-900 border-gray-800">
      <h3 className="text-lg font-bold text-white mb-6">SERP Previews</h3>
      
      <div className="space-y-8">
        {/* Google Desktop Preview */}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Google Desktop</h4>
          <div className="bg-white p-4 rounded-lg max-w-[600px] shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">S</div>
              <div>
                <div className="text-sm text-[#202124] leading-tight truncate">{domain}</div>
                <div className="text-xs text-[#4d5156] leading-tight truncate">{url}</div>
              </div>
            </div>
            <div className="text-xl text-[#1a0dab] hover:underline cursor-pointer truncate mb-1" style={{ fontFamily: 'arial, sans-serif' }}>
              {displayTitle}
            </div>
            <div className="text-sm text-[#4d5156] leading-snug break-words" style={{ fontFamily: 'arial, sans-serif' }}>
              {displayDesc}
            </div>
          </div>
        </div>

        {/* Google Mobile Preview */}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Google Mobile</h4>
          <div className="bg-white p-4 rounded-xl max-w-[375px] shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500">S</div>
              <div className="flex flex-col">
                <span className="text-xs text-[#202124]">{domain}</span>
                <span className="text-[11px] text-[#5f6368]">{url}</span>
              </div>
            </div>
            <div className="text-lg text-[#1a0dab] mb-1 leading-snug">
              {displayTitle}
            </div>
            <div className="text-sm text-[#4d5156] leading-snug">
              {displayDesc}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
