'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [showDemoAlert, setShowDemoAlert] = useState(false);

  const handlePaymentClick = () => {
    setLoading(true);
    // Simulate network delay for realism
    setTimeout(() => {
      setLoading(false);
      setShowDemoAlert(true);
    }, 1000);
  };

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
              onClick={handlePaymentClick}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                'Pay Now'
              )}
            </button>

            <AnimatePresence>
              {showDemoAlert && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 text-sm flex gap-3 items-start"
                >
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <div>
                    <span className="font-bold block mb-1">Portfolio Demonstration Mode</span>
                    Real payment gateway integration (Stripe) is currently disabled to prevent accidental charges. This architecture is ready for live deployment.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
