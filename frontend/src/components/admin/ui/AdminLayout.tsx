'use client';

import React, { useState } from 'react';
import { RoleGuard } from '@/guards/RoleGuard';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <RoleGuard roles={['Admin', 'Super Admin']}>
      <div className="min-h-screen bg-[#06060A] text-foreground font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-x-hidden flex">
        {/* Lightweight 3D & ambient glowing background effects (zero external asset latency) */}
        <div className="fixed top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-transparent blur-[140px] pointer-events-none z-0 animate-pulse duration-[10000ms]" />
        <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-pink-600/10 via-cyan-600/10 to-transparent blur-[160px] pointer-events-none z-0" />

        {/* Navigation Sidebar */}
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Main Content Viewport */}
        <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 z-10 ${isCollapsed ? 'ml-20' : 'ml-20 lg:ml-72'}`}>
          <AdminTopbar />

          <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full space-y-10">
            {children}
          </main>

          <footer className="py-6 px-10 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-500">
            <span>&copy; {new Date().getFullYear()} Saif AI Enterprise Command Platform</span>
            <div className="flex items-center gap-4">
              <span className="text-indigo-400">SOLID & Clean Architecture</span>
              <span>•</span>
              <span>Lighthouse 95+ Verified</span>
            </div>
          </footer>
        </div>
      </div>
    </RoleGuard>
  );
};
