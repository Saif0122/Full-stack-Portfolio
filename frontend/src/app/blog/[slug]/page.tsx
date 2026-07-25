import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchPostBySlug, fetchAllPosts } from '@/services/blog.service';
import { CLUSTERS } from '@/constants/blog';
import { BlogPostView } from './BlogPostView';

export const revalidate = 60; // Revalidate at most every 60 seconds

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.seo?.metaTitle || `${post.title} | The Nexus Logs`,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author.name] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    }
  };
}

export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  // To support Series Navigation logic
  const allPosts = await fetchAllPosts();
  const cluster = CLUSTERS.find(c => c.id === post.clusterId) || null;
  const clusterPosts = allPosts.filter(p => p.clusterId === post.clusterId);

  return <BlogPostView post={post} cluster={cluster} clusterPosts={clusterPosts} />;
}
