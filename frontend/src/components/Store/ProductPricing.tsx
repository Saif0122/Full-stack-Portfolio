'use client';

import { Product } from '@/types/store';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api.client';

interface ProductPricingProps {
  product: Product;
}

export default function ProductPricing({ product }: ProductPricingProps) {
  const [licenseType, setLicenseType] = useState<'standard' | 'extended'>('standard');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/checkout', {
        productId: product.id, // Assuming product object has 'id' or '_id'. If it's _id, we should use product._id
        licenseType
      });
      
      if (response.data.success && response.data.url) {
        // Redirect to Stripe Checkout Session
        window.location.href = response.data.url;
      } else {
        setError('Failed to initiate checkout. Please try again.');
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        // Redirect to login if user is not authenticated
        router.push('/login?redirect=/store/' + product.slug);
      } else {
        setError(err.response?.data?.message || 'Something went wrong during checkout.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-background/50 border border-border/50 backdrop-blur-xl sticky top-24">
      <h3 className="text-2xl font-bold mb-6">Choose License</h3>
      
      {/* License Options */}
      <div className="space-y-4 mb-8">
        <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${licenseType === 'standard' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
          <input 
            type="radio" 
            name="license" 
            className="mt-1 w-4 h-4 text-primary" 
            checked={licenseType === 'standard'}
            onChange={() => setLicenseType('standard')}
          />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">Standard License</span>
              <span className="font-bold">${product.salePrice || product.price}</span>
            </div>
            <p className="text-sm text-muted-foreground">For a single project or client.</p>
          </div>
        </label>
        
        <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${licenseType === 'extended' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
          <input 
            type="radio" 
            name="license" 
            className="mt-1 w-4 h-4 text-primary" 
            checked={licenseType === 'extended'}
            onChange={() => setLicenseType('extended')}
          />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">Extended License</span>
              <span className="font-bold">${(product.salePrice || product.price) * 3}</span>
            </div>
            <p className="text-sm text-muted-foreground">For multiple projects and SaaS.</p>
          </div>
        </label>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Version</span>
          <span className="font-medium">{product.version}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Last Updated</span>
          <span className="font-medium">{new Date(product.lastUpdated).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Rating</span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviewCount})</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {error}
        </div>
      )}

      <button 
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(var(--primary),0.3)] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
            Processing...
          </>
        ) : (
          'Buy Now'
        )}
      </button>
      
      <p className="text-center text-xs text-muted-foreground mt-4">
        Secure payment via Stripe. 14-day money-back guarantee.
      </p>
    </div>
  );
}
