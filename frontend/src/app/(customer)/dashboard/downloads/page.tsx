'use client';
import { CustomerLayout } from '@/components/customer/CustomerLayout';

export default function DownloadsPage() {
  return (
    <CustomerLayout title="My Downloads">
      <div className="text-gray-400">
        <p className="mb-4">Access your purchased digital products.</p>
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-white/10 rounded-2xl">
          <p className="font-mono text-sm">Downloads Interface - Pending Implementation</p>
        </div>
      </div>
    </CustomerLayout>
  );
}
