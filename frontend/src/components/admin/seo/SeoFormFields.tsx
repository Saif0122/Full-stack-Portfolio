import React from 'react';

interface SeoFormFieldsProps {
  seoData: any;
  setSeoData: React.Dispatch<React.SetStateAction<any>>;
}

export const SeoFormFields = ({ seoData, setSeoData }: SeoFormFieldsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const type = target.type;
    const checked = (target as HTMLInputElement).checked;
    
    setSeoData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleArrayChange = (name: string, value: string) => {
    setSeoData((prev: any) => ({
      ...prev,
      [name]: value.split(',').map((item: string) => item.trim()),
    }));
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Blog SEO Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            SEO Title
          </label>
          <input
            type="text"
            name="metaTitle"
            value={seoData?.metaTitle || ''}
            onChange={handleChange}
            maxLength={60}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
            placeholder="e.g. Next.js SEO Best Practices"
          />
          <span className="text-xs text-gray-500">{seoData?.metaTitle?.length || 0} / 60 chars</span>
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Slug
          </label>
          <input
            type="text"
            name="slug"
            value={seoData?.slug || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
            placeholder="e.g. nextjs-seo-best-practices"
          />
        </div>

        {/* Focus Keyword */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Focus Keyword
          </label>
          <input
            type="text"
            name="focusKeyword"
            value={seoData?.focusKeyword || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
            placeholder="e.g. Next.js SEO"
          />
        </div>

        {/* Canonical URL */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Canonical URL (Optional)
          </label>
          <input
            type="url"
            name="canonicalUrl"
            value={seoData?.canonicalUrl || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
            placeholder="https://original-source.com/post"
          />
        </div>
      </div>

      {/* Meta Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Meta Description
        </label>
        <textarea
          name="metaDescription"
          value={seoData?.metaDescription || ''}
          onChange={handleChange}
          maxLength={160}
          rows={3}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
          placeholder="A brief summary of the blog post for search engines."
        />
        <span className="text-xs text-gray-500">{seoData?.metaDescription?.length || 0} / 160 chars</span>
      </div>

      {/* Array fields: Secondary & Long tail keywords */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Secondary Keywords (comma separated)
          </label>
          <input
            type="text"
            value={(seoData?.secondaryKeywords || []).join(', ')}
            onChange={(e) => handleArrayChange('secondaryKeywords', e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Long-Tail Keywords (comma separated)
          </label>
          <input
            type="text"
            value={(seoData?.longTailKeywords || []).join(', ')}
            onChange={(e) => handleArrayChange('longTailKeywords', e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
      
      {/* Index/Follow and reading level */}
      <div className="flex items-center space-x-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="robots.index"
            checked={seoData?.robots?.index ?? true}
            onChange={(e) => setSeoData((prev: any) => ({ ...prev, robots: { ...prev.robots, index: e.target.checked } }))}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Allow Indexing</span>
        </label>
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="robots.follow"
            checked={seoData?.robots?.follow ?? true}
            onChange={(e) => setSeoData((prev: any) => ({ ...prev, robots: { ...prev.robots, follow: e.target.checked } }))}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Follow Links</span>
        </label>
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="evergreenContent"
            checked={seoData?.evergreenContent || false}
            onChange={handleChange}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Evergreen Content</span>
        </label>
      </div>
      
      <div className="space-y-2 max-w-xs">
         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Reading Level
          </label>
          <select
            name="readingLevel"
            value={seoData?.readingLevel || 'intermediate'}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
      </div>

    </div>
  );
};
