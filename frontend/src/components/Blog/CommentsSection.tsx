'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/providers/AuthProvider';
import { useToast } from '@/providers/ToastProvider';
import { adminService } from '@/services/admin.service';

interface Comment {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  likes: string[];
  replies?: Comment[];
  createdAt: string;
}

export const CommentsSection: React.FC<{ postId: string }> = ({ postId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/comments/post/${postId}`);
        if (!res.ok) throw new Error('Failed to fetch comments');
        const data = await res.json();
        return data.data;
      } catch (err) {
        return [];
      }
    }
  });

  const postCommentMutation = useMutation({
    mutationFn: async ({ content, parentComment }: { content: string, parentComment?: string }) => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/comments/post/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content, parentComment })
      });
      if (!res.ok) throw new Error('Failed to post comment');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setNewComment('');
      setReplyTo(null);
      setReplyContent('');
      toast('Comment posted successfully', 'success');
    },
    onError: () => toast('You must be logged in to comment.', 'error')
  });

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    postCommentMutation.mutate({ content: newComment });
  };

  const handlePostReply = (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    postCommentMutation.mutate({ content: replyContent, parentComment: parentId });
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => (
    <div className={`flex gap-4 ${isReply ? 'ml-12 mt-4' : 'mt-8'} border-b border-white/5 pb-4 last:border-0`}>
      <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0">
        {comment.user.avatar ? (
          <img src={comment.user.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
        ) : (
          comment.user.name.charAt(0).toUpperCase()
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="font-bold text-white text-sm">{comment.user.name}</span>
          <span className="text-[10px] text-gray-500 font-mono">{new Date(comment.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-sm text-gray-300 font-light mb-3">{comment.content}</p>
        <div className="flex gap-4 items-center text-xs text-gray-400 font-mono">
          <button className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
            <span>↑</span> {comment.likes?.length || 0}
          </button>
          {!isReply && (
            <button onClick={() => setReplyTo(replyTo === comment._id ? null : comment._id)} className="hover:text-primary transition-colors">
              Reply
            </button>
          )}
          <button className="hover:text-rose-400 transition-colors ml-auto">Report</button>
        </div>

        {replyTo === comment._id && (
          <form onSubmit={(e) => handlePostReply(e, comment._id)} className="mt-4 flex gap-3">
            <input 
              type="text" 
              value={replyContent}
              onChange={e => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary/50"
            />
            <button type="submit" disabled={postCommentMutation.isPending} className="px-4 py-2 bg-primary/20 text-primary text-[10px] font-black uppercase rounded-xl hover:bg-primary hover:text-black transition-colors disabled:opacity-50">
              Reply
            </button>
          </form>
        )}

        {/* Nested Replies */}
        {comment.replies && comment.replies.map(reply => (
          <CommentItem key={reply._id} comment={reply} isReply={true} />
        ))}
      </div>
    </div>
  );

  return (
    <section className="mt-24 pt-16 border-t border-white/10">
      <h3 className="text-2xl font-black text-white mb-8">Engineering Discussion ({comments.length})</h3>
      
      {/* Post Comment Form */}
      <form onSubmit={handlePostComment} className="mb-12">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
            {user ? (
              <span className="text-white font-bold">{user.name?.charAt(0)}</span>
            ) : (
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={user ? "Share your architectural thoughts..." : "Please sign in to join the discussion..."}
              disabled={!user}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-primary/50 min-h-[100px] resize-none"
            />
            <div className="flex justify-end">
              <button 
                type="submit" 
                disabled={!user || postCommentMutation.isPending || !newComment.trim()}
                className="px-6 py-2 bg-primary text-black font-black uppercase text-xs tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all disabled:opacity-50"
              >
                {postCommentMutation.isPending ? 'Posting...' : 'Post Insight'}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comment Thread */}
      {isLoading ? (
        <div className="flex justify-center py-10"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>
      ) : comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment: Comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 font-light italic border border-white/5 rounded-3xl bg-white/[0.02]">
          Be the first to contribute to this technical review.
        </div>
      )}
    </section>
  );
};
