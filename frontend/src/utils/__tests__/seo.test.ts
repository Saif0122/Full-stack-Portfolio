import { describe, it, expect } from 'vitest';
import { 
  generateArticleSchema, 
  generateOrganizationSchema, 
  generateFAQSchema, 
  generateBreadcrumbSchema, 
  generateWebSiteSchema 
} from '../seo';
import { BlogPost } from '../../types';

describe('seo utility', () => {
  it('should generate valid article schema', () => {
    const post = {
      slug: 'test-post',
      title: 'Test Title',
      excerpt: 'Test Excerpt',
      date: '2023-01-01',
      content: 'Test Content',
      seo: { focusKeyword: 'testing' }
    } as BlogPost;
    
    const schemaStr = generateArticleSchema(post);
    const schema = JSON.parse(schemaStr);
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BlogPosting');
    expect(schema.headline).toBe('Test Title');
    expect(schema.keywords).toContain('testing');
    expect(schema.articleBody).toBe('Test Content');
  });

  it('should generate organization schema', () => {
    const schemaStr = generateOrganizationSchema();
    const schema = JSON.parse(schemaStr);
    
    expect(schema['@type']).toBe('Person');
    expect(schema.name).toBe('Saiful Islam');
    expect(schema.knowsAbout).toContain('MERN Stack');
  });

  it('should generate FAQ schema', () => {
    const faqs = [{ q: 'Question?', a: 'Answer!' }];
    const schemaStr = generateFAQSchema(faqs);
    const schema = JSON.parse(schemaStr);
    
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(1);
    expect(schema.mainEntity[0]['@type']).toBe('Question');
    expect(schema.mainEntity[0].name).toBe('Question?');
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe('Answer!');
  });

  it('should generate breadcrumb schema', () => {
    const items = [
      { name: 'Home', item: 'https://saiful.code' },
      { name: 'Blog', item: 'https://saiful.code/blog' }
    ];
    const schemaStr = generateBreadcrumbSchema(items);
    const schema = JSON.parse(schemaStr);
    
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[1].position).toBe(2);
    expect(schema.itemListElement[1].name).toBe('Blog');
    expect(schema.itemListElement[1].item).toBe('https://saiful.code/blog');
  });

  it('should generate website schema', () => {
    const schemaStr = generateWebSiteSchema();
    const schema = JSON.parse(schemaStr);
    
    expect(schema['@type']).toBe('WebSite');
    expect(schema.name).toContain('Saiful Islam Portfolio');
    expect(schema.potentialAction['@type']).toBe('SearchAction');
  });
});
