'use client';
import { CustomerLayout } from '@/components/customer/CustomerLayout';

export default function OrdersPage() {
  return (
    <CustomerLayout title="My Orders">
      <div className="text-gray-400">
        <p className="mb-4">View your recent purchases.</p>
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-white/10 rounded-2xl">
          <p className="font-mono text-sm">Orders Interface - Pending Implementation</p>
        </div>
      </div>
    </CustomerLayout>
  );
}
