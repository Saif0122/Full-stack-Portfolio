'use client';

import React, { useState } from 'react';
import { adminService } from '@/services/admin.service';
import { Card } from '@/components/ui';

interface AiSeoAssistantProps {
  currentTitle: string;
  currentDescription: string;
  focusKeyword: string;
  onApply: (suggestions: { title?: string; description?: string }) => void;
}

export function AiSeoAssistant({ currentTitle, currentDescription, focusKeyword, onApply }: AiSeoAssistantProps) {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<{ title: string; description: string } | null>(null);

  const generateSuggestions = async () => {
    if (!focusKeyword) {
      alert("Please enter a focus keyword first.");
      return;
    }
    
    setLoading(true);
    try {
      const prompt = `
        Act as an expert SEO copywriter.
        I am a MERN stack software engineer. 
        Focus Keyword: "${focusKeyword}"
        Current Title: "${currentTitle}"
        Current Description: "${currentDescription}"

        Generate an optimized SEO Title (max 60 chars) and Meta Description (max 150 chars).
        Return ONLY valid JSON in this format:
        { "title": "...", "description": "..." }
      `;

      // using the generic AI backend endpoint from ai.controller.js
      const res = await adminService.create('/ai/generate', {
        module: 'seo',
        prompt,
        options: { temperature: 0.7, maxTokens: 150 }
      });

      // The AI response text should be JSON
      const jsonMatch = res?.data?.text?.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setSuggestion(parsed);
      } else {
        alert("Failed to parse AI response.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate AI suggestions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 border border-emerald-500/30 bg-emerald-900/10">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
            ✨ AI SEO Assistant
          </h3>
          <p className="text-sm text-emerald-200/60 mt-1">Generate optimized metadata based on your focus keyword.</p>
        </div>
        <button
          type="button"
          onClick={generateSuggestions}
          disabled={loading || !focusKeyword}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-sm font-bold transition-colors disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Suggestions'}
        </button>
      </div>

      {suggestion && (
        <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Suggested Title</label>
            <div className="text-white text-sm bg-gray-800 p-2 rounded border border-gray-700">
              {suggestion.title}
            </div>
            <div className={`text-xs mt-1 ${suggestion.title.length > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
              Length: {suggestion.title.length} / 60
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Suggested Description</label>
            <div className="text-white text-sm bg-gray-800 p-2 rounded border border-gray-700">
              {suggestion.description}
            </div>
            <div className={`text-xs mt-1 ${suggestion.description.length > 160 ? 'text-rose-400' : 'text-emerald-400'}`}>
              Length: {suggestion.description.length} / 160
            </div>
          </div>
          <button
            type="button"
            onClick={() => onApply(suggestion)}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm font-bold transition-colors"
          >
            Apply Suggestions
          </button>
        </div>
      )}
    </Card>
  );
}
