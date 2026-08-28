import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#050505] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">Payment Successful!</h1>
      <p className="text-xl text-gray-400 max-w-2xl mb-12">
        Thank you for your purchase. Your payment was processed successfully. 
        We have emailed your receipt and license details.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/dashboard" 
          className="px-8 py-4 bg-primary text-black font-black uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
        >
          Go to Dashboard
        </Link>
        <Link 
          href="/store" 
          className="px-8 py-4 bg-white/5 text-white font-bold uppercase tracking-widest rounded-xl border border-white/10 hover:bg-white/10 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
