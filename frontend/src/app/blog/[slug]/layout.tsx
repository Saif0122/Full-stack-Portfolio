import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/constants/content';

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const post = BLOG_POSTS.find(p => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | The Nexus Logs',
    };
  }

  return {
    title: `${post.title} | The Nexus Logs`,
    description: post.excerpt,
    keywords: post.seo.focusKeyword ? [post.seo.focusKeyword] : [],
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
