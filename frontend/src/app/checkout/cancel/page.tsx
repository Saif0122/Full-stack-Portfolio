import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#050505] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mb-8 border border-rose-500/30">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">Checkout Cancelled</h1>
      <p className="text-xl text-gray-400 max-w-2xl mb-12">
        Your payment was cancelled and you haven't been charged.
        If you experienced any issues during checkout, please feel free to contact support.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/store" 
          className="px-8 py-4 bg-primary text-black font-black uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(var(--primary),0.3)]"
        >
          Return to Store
        </Link>
        <Link 
          href="/contact" 
          className="px-8 py-4 bg-white/5 text-white font-bold uppercase tracking-widest rounded-xl border border-white/10 hover:bg-white/10 transition-all"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
