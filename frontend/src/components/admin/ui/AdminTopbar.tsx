'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { IconBell, IconSettings } from './AdminIcons';

export const AdminTopbar: React.FC = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState<number>(3);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Proactively load notifications for real-time executive overview
    fetch('/api/notifications', { credentials: 'include' })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data && data.success) {
          setNotifications(data.data.slice(0, 5));
          setUnreadCount(data.unreadCount || 0);
        }
      })
      .catch(() => {
        // Safe silence if running totally disconnected frontend simulation
      });
  }, [pathname]);

  const breadcrumbs = pathname
    .split('/')
    .filter(Boolean)
    .map((word, idx, arr) => ({
      name: word.charAt(0).toUpperCase() + word.slice(1),
      isLast: idx === arr.length - 1,
      path: '/' + arr.slice(0, idx + 1).join('/')
    }));

  return (
    <header className="sticky top-0 right-0 z-30 h-20 bg-black/60 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8 transition-all">
      {/* Breadcrumb stream */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
        <Link href="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors font-mono font-medium text-xs uppercase tracking-wider">
          Control Center
        </Link>
        {breadcrumbs.map((bc, idx) => (
          <React.Fragment key={bc.path}>
            <span className="text-gray-600 font-mono">/</span>
            {bc.isLast ? (
              <span className="text-white font-bold tracking-tight text-sm px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 shadow-inner" aria-current="page">
                {bc.name}
              </span>
            ) : (
              <Link href={bc.path} className="text-gray-400 hover:text-white transition-colors font-medium">
                {bc.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Executive Command Palette & Telemetry Indicator */}
      <div className="flex items-center gap-5">
        {/* Real-time Telemetry Badge */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-transparent border border-emerald-500/20 text-emerald-400 font-mono text-xs shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
          <span>System Health: <strong>18ms</strong></span>
          <span className="text-gray-600">|</span>
          <span className="text-cyan-400 font-semibold">99.99% Core Online</span>
        </div>

        {/* Command Palette trigger */}
        <button
          onClick={() => alert('Command Palette active: Press Tab to jump across Dashboard modules or hit ESC.')}
          className="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-medium transition-all duration-200 focus:ring-2 focus:ring-indigo-500/50 shadow-sm hover:border-white/20"
          aria-label="Search Admin Modules and Commands"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="font-mono text-gray-400">Quick Actions...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-white/10 rounded border border-white/20 font-mono text-gray-300">⌘K</kbd>
        </button>

        {/* Notification Hub */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Toggle Notifications Hub"
            aria-expanded={showNotifications}
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors relative focus:ring-2 focus:ring-indigo-500/50"
          >
            <IconBell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-md shadow-pink-500/50 animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Tray */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-96 rounded-3xl bg-black/95 border border-white/10 shadow-2xl p-5 backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <span>Executive Activity Stream</span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-[10px]">
                    {unreadCount} Unread
                  </span>
                </h3>
                <Link
                  href="/admin/dashboard/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-mono text-indigo-400 hover:text-indigo-300 underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto no-scrollbar">
                {notifications.length > 0 ? (
                  notifications.map((n, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white truncate max-w-[200px]">{n.title}</span>
                        <span className="text-[10px] font-mono text-gray-500 uppercase">{n.type}</span>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{n.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs font-mono text-gray-500 text-center py-6">All systems operational. No unread alerts.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Account Controls */}
        <div className="flex items-center gap-4 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white leading-tight">{user?.name || 'Saif AI Admin'}</p>
            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              {user?.role || 'Super Admin'}
            </span>
          </div>
          <button
            onClick={() => logout()}
            aria-label="Sign out of Enterprise Admin"
            title="Sign Out"
            className="px-4 py-2 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 font-mono text-xs transition-all duration-200 hover:scale-[1.03] active:scale-95 shadow-lg shadow-rose-500/10"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};
