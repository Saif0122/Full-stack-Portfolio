import React from 'react';
import { fetchAllPosts } from '@/services/blog.service';
import { BlogView } from './BlogView';

export const revalidate = 60; // Revalidate at most every 60 seconds

export default async function BlogPage() {
  const posts = await fetchAllPosts();

  return <BlogView posts={posts} />;
}
