'use client';
import { useState } from 'react';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-black mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <p className="text-sm text-gray-400">Checkout architecture placeholder.</p>
              <p className="text-sm text-gray-400 mt-2">Provider Pattern ready (Stripe/Paddle).</p>
            </div>
            
            <button 
              disabled={loading}
              className="w-full py-4 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Pay Now
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
              <span className="text-gray-300">Product Name</span>
              <span className="font-bold">$0.00</span>
            </div>
            <div className="flex justify-between items-center font-black text-xl">
              <span>Total</span>
              <span>$0.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
