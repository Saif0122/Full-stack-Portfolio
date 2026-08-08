import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import Category from '../models/category.model.js';
import Tag from '../models/tag.model.js';

dotenv.config({ path: '.env' });

const dummyPostContent = `
# Building a Scalable Developer Platform in 2026

Modern developers expect platforms that are not only highly functional but also a joy to use. When building a developer-focused blog or CMS, it's crucial to architect it with scalability and user experience in mind.

## Key Architectural Decisions

We decided to use a modern tech stack to ensure performance and developer velocity:
- **Next.js App Router** for Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR).
- **MongoDB Atlas** for flexible, schema-less document storage, perfect for CMS features.
- **Tailwind CSS** for rapid UI development and consistent design language.

### Code Example

Here is a quick look at how we fetch our blog posts using Next.js Server Components:

\`\`\`typescript
export default async function BlogFeed() {
  const posts = await getPosts();
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map(post => (
        <BlogCard key={post._id} post={post} />
      ))}
    </div>
  );
}
\`\`\`

## The Importance of MDX and Rich Text

Developers love Markdown. It's the standard for documentation and technical writing. We implemented a robust markdown editor that supports:

1. Syntax Highlighting
2. Mermaid Diagrams
3. KaTeX for Math Equations
4. GFM (GitHub Flavored Markdown)

| Feature | Support | Priority |
| :--- | :---: | :---: |
| Syntax Highlighting | ✅ | High |
| Mermaid | ✅ | Medium |
| KaTeX | ✅ | Low |

> "The best platforms disappear, letting the developer's content shine." - Unknown

## Conclusion

Building a scalable platform is an ongoing journey. By focusing on core developer needs like performance, markdown support, and seamless deployment, we've laid a strong foundation for the future.
`;

const seedBlogPost = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('MONGODB_URI is not defined in .env');
      process.exit(1);
    }
    
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB.');

    // 1. Ensure Admin User exists
    let admin = await User.findOne({ email: 'admin@example.com' });
    if (!admin) {
       console.log('Admin user not found. Please run the main seeder first.');
       process.exit(1);
    }

    // 2. Ensure Category exists
    let category = await Category.findOne({ slug: 'architecture' });
    if (!category) {
      category = await Category.create({
        name: 'Architecture',
        slug: 'architecture',
        description: 'System design and software architecture topics.'
      });
    }

    // 3. Ensure Tags exist
    const tagNames = ['Next.js', 'MongoDB', 'System Design'];
    const tags = [];
    for (const name of tagNames) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      let tag = await Tag.findOne({ slug });
      if (!tag) {
        tag = await Tag.create({ name, slug });
      }
      tags.push(tag._id);
    }

    // 4. Create Dummy Post
    const slug = 'building-a-scalable-developer-platform-2026';
    const existingPost = await Post.findOne({ slug });

    if (existingPost) {
      console.log('Dummy post already exists!');
      process.exit(0);
    }

    await Post.create({
      title: 'Building a Scalable Developer Platform in 2026',
      slug,
      excerpt: 'Learn how to architect a modern, scalable developer platform using Next.js, MongoDB Atlas, and Tailwind CSS.',
      content: dummyPostContent,
      markdownContent: dummyPostContent,
      author: admin._id,
      category: category._id,
      tags,
      status: 'published',
      publishedAt: new Date(),
      isFeatured: true,
      readTime: '4 min read',
      seo: {
        metaTitle: 'Building a Scalable Developer Platform in 2026',
        metaDescription: 'Learn how to architect a modern, scalable developer platform.',
        focusKeyword: 'scalable developer platform'
      },
      views: 1250,
      likes: [],
      bookmarks: [],
      isPinned: true
    });

    console.log('✅ Dummy blog post successfully seeded to MongoDB Atlas!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed blog post:', error);
    process.exit(1);
  }
};

seedBlogPost();
