'use client';
import { CustomerLayout } from '@/components/customer/CustomerLayout';

export default function InvoicesPage() {
  return (
    <CustomerLayout title="Invoices">
      <div className="text-gray-400">
        <p className="mb-4">Download your tax invoices.</p>
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-white/10 rounded-2xl">
          <p className="font-mono text-sm">Invoices Interface - Pending Implementation</p>
        </div>
      </div>
    </CustomerLayout>
  );
}
