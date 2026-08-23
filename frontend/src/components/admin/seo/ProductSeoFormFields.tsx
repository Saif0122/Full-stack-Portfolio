import React from 'react';

interface ProductSeoFormFieldsProps {
  productData: any;
  setProductData: React.Dispatch<React.SetStateAction<any>>;
}

export const ProductSeoFormFields = ({ productData, setProductData }: ProductSeoFormFieldsProps) => {
  
  const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const type = target.type;
    const checked = (target as HTMLInputElement).checked;
    
    setProductData((prev: any) => ({
      ...prev,
      seo: {
        ...(prev.seo || {}),
        [name]: type === 'checkbox' ? checked : value,
      }
    }));
  };

  const handleRootChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    
    setProductData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-8">
      {/* Product Readiness Fields */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product Readiness & Commercial Data</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SKU</label>
            <input type="text" name="sku" value={productData?.sku || ''} onChange={handleRootChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Brand</label>
            <input type="text" name="brand" value={productData?.brand || ''} onChange={handleRootChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">License Type</label>
            <select name="licenseType" value={productData?.licenseType || 'MIT'} onChange={handleRootChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white">
              <option value="MIT">MIT</option>
              <option value="GPL">GPL</option>
              <option value="Commercial">Commercial</option>
              <option value="Proprietary">Proprietary</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Version Number</label>
            <input type="text" name="version" value={productData?.version || '1.0.0'} onChange={handleRootChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Documentation URL</label>
            <input type="text" name="documentationUrl" value={productData?.documentationUrl || ''} onChange={handleRootChange} placeholder="https://" className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Live Demo URL</label>
            <input type="text" name="livePreviewUrl" value={productData?.livePreviewUrl || ''} onChange={handleRootChange} placeholder="https://" className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white" />
          </div>
        </div>
        
        <div className="mt-6">
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Installation Guide (Markdown)</label>
           <textarea name="installationGuide" value={productData?.installationGuide || ''} onChange={handleRootChange} rows={4} className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white"></textarea>
        </div>
      </div>

      {/* SEO Fields */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Search Engine Optimization</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Focus Keyword</label>
            <input type="text" name="focusKeyword" value={productData?.seo?.focusKeyword || ''} onChange={handleSeoChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white" />
          </div>
          
          <div>
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Title</label>
              <span className={`text-xs ${productData?.seo?.metaTitle?.length > 60 ? 'text-red-500' : 'text-gray-500'}`}>
                {productData?.seo?.metaTitle?.length || 0} / 60
              </span>
            </div>
            <input type="text" name="metaTitle" value={productData?.seo?.metaTitle || ''} onChange={handleSeoChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white" />
          </div>

          <div>
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Description</label>
              <span className={`text-xs ${productData?.seo?.metaDescription?.length > 160 ? 'text-red-500' : 'text-gray-500'}`}>
                {productData?.seo?.metaDescription?.length || 0} / 160
              </span>
            </div>
            <textarea name="metaDescription" value={productData?.seo?.metaDescription || ''} onChange={handleSeoChange} rows={3} className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white"></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};
