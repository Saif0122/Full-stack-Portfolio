import React from 'react';
import { Card } from '@/components/ui';
import { Globe, Smartphone, Share2 } from 'lucide-react';

interface ProductSearchPreviewProps {
  productData: any;
}

export const ProductSearchPreview = ({ productData }: ProductSearchPreviewProps) => {
  const [device, setDevice] = React.useState<'desktop' | 'mobile'>('desktop');
  const [platform, setPlatform] = React.useState<'google' | 'social'>('google');

  const title = productData?.seo?.metaTitle || productData?.title || 'Untitled Product';
  const description = productData?.seo?.metaDescription || productData?.shortDescription || 'No description provided...';
  const url = `https://yourportfolio.com/store/${productData?.slug || 'product-slug'}`;
  const price = productData?.salePrice || productData?.price || 0;
  const rating = productData?.rating || 5.0;
  const reviewCount = productData?.reviewCount || 0;
  const imageUrl = productData?.seo?.openGraphImage || productData?.thumbnail || 'https://via.placeholder.com/1200x630?text=No+Image';

  return (
    <Card className="bg-gray-900 border-gray-800 p-0 overflow-hidden">
      <div className="flex border-b border-gray-800">
        <button 
          className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${platform === 'google' ? 'text-emerald-400 bg-emerald-500/10 border-b-2 border-emerald-500' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setPlatform('google')}
        >
          <Globe size={16} /> Google Search
        </button>
        <button 
          className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${platform === 'social' ? 'text-blue-400 bg-blue-500/10 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setPlatform('social')}
        >
          <Share2 size={16} /> Social Sharing
        </button>
      </div>

      <div className="p-6">
        {platform === 'google' && (
          <div className="space-y-4">
            <div className="flex justify-end gap-2 mb-4">
              <button onClick={() => setDevice('desktop')} className={`p-1.5 rounded ${device === 'desktop' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                <Globe size={18} />
              </button>
              <button onClick={() => setDevice('mobile')} className={`p-1.5 rounded ${device === 'mobile' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                <Smartphone size={18} />
              </button>
            </div>

            <div className={`bg-white rounded-lg p-4 ${device === 'mobile' ? 'max-w-[375px] mx-auto' : 'w-full'}`}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div className="flex flex-col">
                  <span className="text-[12px] text-[#202124] leading-tight font-normal">yourportfolio.com</span>
                  <span className="text-[12px] text-[#4d5156] leading-tight truncate">{url}</span>
                </div>
              </div>
              <h3 className="text-[#1a0dab] text-[20px] font-medium leading-[1.3] cursor-pointer hover:underline mb-1 truncate">
                {title}
              </h3>
              <div className="flex items-center gap-1 text-[13px] text-[#4d5156] mb-1">
                <span className="text-[#fbbc04]">★★★★★</span>
                <span>Rating: {rating} · {reviewCount} reviews · ${price.toFixed(2)} · In stock</span>
              </div>
              <p className="text-[#4d5156] text-[14px] leading-[1.58] line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        )}

        {platform === 'social' && (
          <div className="max-w-[500px] mx-auto">
            {/* Twitter Card Preview */}
            <div className="border border-gray-700 rounded-xl overflow-hidden bg-black">
              <div className="aspect-[1.91/1] w-full bg-gray-800 relative">
                 <img src={imageUrl} alt="Social preview" className="w-full h-full object-cover" />
              </div>
              <div className="p-3 border-t border-gray-700 bg-gray-900">
                <p className="text-gray-500 text-sm mb-1 truncate">yourportfolio.com</p>
                <h3 className="text-white text-[15px] font-bold leading-tight mb-1 truncate">{title}</h3>
                <p className="text-gray-400 text-[15px] leading-snug line-clamp-2">{description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
