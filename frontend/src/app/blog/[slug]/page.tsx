import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchPostBySlug, fetchAllPosts } from '@/services/blog.service';
import { CLUSTERS } from '@/constants/blog';
import { BlogPostView } from './BlogPostView';
import { generatePageMetadata, generateJsonLdScript } from '@/lib/seo/helpers';
import { mergeSeoOptions } from '@/lib/seo/service';
import { buildArticleSchema } from '@/lib/seo/schemas/article.schema';
import { blogPostBreadcrumb } from '@/lib/seo/schemas/breadcrumb.schema';
import { CANONICAL_DOMAIN } from '@/lib/seo/config';

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await fetchPostBySlug(resolvedParams.slug);
  if (!post) return { title: 'Post Not Found | Saiful Islam' };

  const seoOpts = mergeSeoOptions(null, {
    title: post.seo?.metaTitle || `${post.title} | The Nexus Logs`,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.focusKeyword ? [post.seo.focusKeyword] : post.tags,
    og: {
      type: 'article',
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : undefined,
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: post.author ? [post.author.name] : undefined,
      tags: post.tags,
      section: post.category,
    },
  }, `/blog/${resolvedParams.slug}`);

  return generatePageMetadata(seoOpts);
}

export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await fetchPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const allPosts = await fetchAllPosts();
  const cluster = CLUSTERS.find(c => c.id === post.clusterId) || null;
  const clusterPosts = allPosts.filter(p => p.clusterId === post.clusterId);

  // JSON-LD schemas
  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.excerpt || '',
    slug: post.slug,
    coverImage: post.coverImage,
    authorName: post.author?.name,
    authorUrl: `${CANONICAL_DOMAIN}/about`,
    datePublished: post.date,
    dateModified: post.updatedAt,
    keywords: post.tags,
    readTimeMinutes: post.readTime ? parseInt(post.readTime, 10) : undefined,
    category: post.category,
    isTechnical: true,
  });

  const breadcrumbSchema = blogPostBreadcrumb(post.title, post.slug);

  return (
    <>
      <script {...generateJsonLdScript([articleSchema, breadcrumbSchema])} />
      <BlogPostView post={post} cluster={cluster} clusterPosts={clusterPosts} />
    </>
  );
}

