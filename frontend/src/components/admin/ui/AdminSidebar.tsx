'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconDashboard, IconPortfolio, IconProjects, IconBlog, IconStore,
  IconCustomers, IconOrders, IconMedia, IconSeo, IconAnalytics, IconAI, IconSettings, IconBell
} from './AdminIcons';

interface NavGroup {
  groupName: string;
  items: {
    title: string;
    path: string;
    icon: React.FC<{ size?: number; className?: string }>;
    badge?: string | number;
    badgeColor?: string;
  }[];
}

const navGroups: NavGroup[] = [
  {
    groupName: 'Executive Core',
    items: [
      { title: 'Dashboard Home', path: '/admin/dashboard', icon: IconDashboard },
      { title: 'System Health', path: '/admin/dashboard/health', icon: IconAnalytics, badge: '99.9%', badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' },
      { title: 'Notifications', path: '/admin/dashboard/notifications', icon: IconBell, badge: 'Live', badgeColor: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' },
    ]
  },
  {
    groupName: 'Content Engine (CMS)',
    items: [
      { title: 'Portfolio Management', path: '/admin/dashboard/portfolio', icon: IconPortfolio },
      { title: 'Projects Showcase', path: '/admin/dashboard/projects', icon: IconProjects },
      { title: 'Blog CMS Studio', path: '/admin/dashboard/blog', icon: IconBlog },
      { title: 'Media Library', path: '/admin/dashboard/media', icon: IconMedia, badge: 'CDN', badgeColor: 'bg-purple-500/20 text-purple-400 border border-purple-500/30' },
    ]
  },
  {
    groupName: 'Commerce Suite',
    items: [
      { title: 'Store Products', path: '/admin/dashboard/store', icon: IconStore },
      { title: 'Categories & Tags', path: '/admin/dashboard/categories', icon: IconStore },
      { title: 'Orders & Fulfillment', path: '/admin/dashboard/orders', icon: IconOrders },
      { title: 'Customer Profiles', path: '/admin/dashboard/customers', icon: IconCustomers },
      { title: 'Reviews & Ratings', path: '/admin/dashboard/reviews', icon: IconOrders },
      { title: 'Coupons & Promos', path: '/admin/dashboard/coupons', icon: IconStore },
      { title: 'Licenses & Keys', path: '/admin/dashboard/licenses', icon: IconProjects },
      { title: 'Digital Downloads', path: '/admin/dashboard/downloads', icon: IconMedia },
      { title: 'Invoices', path: '/admin/dashboard/invoices', icon: IconOrders },
      { title: 'Payments & Refunds', path: '/admin/dashboard/payments', icon: IconStore },
    ]
  },
  {
    groupName: 'Intelligence & Growth',
    items: [
      { title: 'SEO Command Center', path: '/admin/dashboard/seo', icon: IconSeo, badge: '100%', badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' },
      { title: 'Analytics Center', path: '/admin/dashboard/analytics', icon: IconAnalytics },
      { title: 'Recruiter Dashboard', path: '/admin/dashboard/recruiter', icon: IconAnalytics },
      { title: 'AI Assistant Core', path: '/admin/dashboard/ai', icon: IconAI, badge: 'Pro 3.1', badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/30' },
      { title: 'Data Export', path: '/admin/dashboard/export', icon: IconAnalytics },
      { title: 'Global Settings', path: '/admin/dashboard/settings', icon: IconSettings },
    ]
  }
];

export const AdminSidebar: React.FC<{ isCollapsed: boolean; setIsCollapsed: (v: boolean) => void }> = ({ isCollapsed, setIsCollapsed }) => {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Enterprise Admin Navigation"
      className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col transition-all duration-300 ease-in-out bg-black/80 backdrop-blur-2xl border-r border-white/10 ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 overflow-hidden"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 font-black text-white text-lg">
                S
              </div>
              <div>
                <span className="text-white font-black text-base tracking-tight block leading-tight">SAIF PRO</span>
                <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-mono font-semibold">Command Center</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isCollapsed ? <polyline points="13 17 18 12 13 7" /> : <polyline points="11 17 6 12 11 7" />}
          </svg>
        </button>
      </div>

      {/* Navigation Streams */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 no-scrollbar scroll-smooth">
        {navGroups.map((group) => (
          <div key={group.groupName}>
            {!isCollapsed ? (
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-500 px-3 mb-3 block">
                {group.groupName}
              </span>
            ) : (
              <div className="h-px bg-white/10 mx-2 my-2" />
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/admin/dashboard');

                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      title={isCollapsed ? item.title : undefined}
                      aria-current={isActive ? 'page' : undefined}
                      className={`group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-transparent text-white border border-indigo-500/40 shadow-lg shadow-indigo-500/10 font-semibold'
                          : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-indigo-400' : 'text-gray-400 group-hover:text-white'}`}>
                        <Icon size={20} />
                      </span>
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 truncate">{item.title}</span>
                          {item.badge && (
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-tight ${item.badgeColor || 'bg-white/10 text-gray-300'}`}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active-pill"
                          className="absolute left-0 w-1.5 h-6 bg-indigo-500 rounded-r-full shadow-lg shadow-indigo-500/50"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Executive Footer */}
      <div className="p-4 border-t border-white/10 bg-black/40">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center font-bold text-black text-xs shadow-md">
              AI
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">Enterprise Engine</p>
              <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Phase 11 Online
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center" title="Enterprise Engine Online">
            <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-black animate-pulse shadow-lg shadow-emerald-400/50" />
          </div>
        )}
      </div>
    </aside>
  );
};
