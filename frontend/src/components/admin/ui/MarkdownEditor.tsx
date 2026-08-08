'use client';

import React from 'react';
import MDEditor from '@uiw/react-md-editor';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <div className="text-sm font-mono leading-relaxed">
          <strong className="text-white block mb-1">Image Linking Guide</strong>
          To add an inline image, first upload it using the "Cover Image" field below (or media manager). Once uploaded, you will get an image URL. Use this Markdown syntax to embed it: <br/>
          <code className="text-pink-400 bg-black/40 px-1.5 py-0.5 rounded mt-2 inline-block">![Alt text for accessibility](http://your-url.com/image.png)</code>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden border border-white/10" data-color-mode="dark">
        <MDEditor
          value={value}
          onChange={onChange}
          height={500}
          preview="live"
          hideToolbar={false}
        />
      </div>
    </div>
  );
};
