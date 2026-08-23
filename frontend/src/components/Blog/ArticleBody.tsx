"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DOMPurify from 'isomorphic-dompurify';
import { BlogPost } from '@/types/blog';

const MermaidDiagram = dynamic(() => import('./MermaidDiagram').then((mod) => mod.MermaidDiagram), {
  ssr: false,
});

interface ArticleBodyProps {
  post: BlogPost;
}

export const ArticleBody: React.FC<ArticleBodyProps> = ({ post }) => {
  return (
    <article className="prose prose-invert prose-p:text-gray-400 prose-headings:text-white prose-a:text-primary prose-code:text-primary max-w-none">
      {post.markdownContent ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.markdownContent}
        </ReactMarkdown>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
      )}

      {post.mermaidDiagram && (
        <div className="my-12 p-6 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6">System Architecture</h4>
          <MermaidDiagram chart={post.mermaidDiagram} />
        </div>
      )}
    </article>
  );
};
