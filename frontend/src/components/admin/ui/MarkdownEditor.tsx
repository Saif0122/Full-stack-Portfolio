'use client';

import React from 'react';
import MDEditor from '@uiw/react-md-editor';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10" data-color-mode="dark">
      <MDEditor
        value={value}
        onChange={onChange}
        height={500}
        preview="live"
        hideToolbar={false}
      />
    </div>
  );
};
