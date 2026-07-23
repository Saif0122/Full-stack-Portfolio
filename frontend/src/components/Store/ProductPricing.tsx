'use client';

import { Product } from '@/types/store';
import { motion } from 'framer-motion';

interface ProductPricingProps {
  product: Product;
}

export default function ProductPricing({ product }: ProductPricingProps) {
  return (
    <div className="p-8 rounded-3xl bg-background/50 border border-border/50 backdrop-blur-xl sticky top-24">
      <h3 className="text-2xl font-bold mb-6">Choose License</h3>
      
      {/* License Options */}
      <div className="space-y-4 mb-8">
        <label className="flex items-start gap-4 p-4 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer">
          <input type="radio" name="license" className="mt-1 w-4 h-4 text-primary" defaultChecked />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">Standard License</span>
              <span className="font-bold">${product.salePrice || product.price}</span>
            </div>
            <p className="text-sm text-muted-foreground">For a single project or client.</p>
          </div>
        </label>
        
        <label className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer">
          <input type="radio" name="license" className="mt-1 w-4 h-4 text-primary" />
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

      <button className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(var(--primary),0.3)]">
        Add to Cart
      </button>
      
      <p className="text-center text-xs text-muted-foreground mt-4">
        Secure payment via Stripe. 14-day money-back guarantee.
      </p>
    </div>
  );
}
