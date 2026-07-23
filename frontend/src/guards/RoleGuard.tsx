'use client';

import { useAuth } from '../providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface RoleGuardProps {
  children: ReactNode;
  roles: string[];
}

export function RoleGuard({ children, roles }: RoleGuardProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (!roles.includes(user.role)) {
        // Redirect to a default dashboard if they don't have access
        router.push('/dashboard');
      }
    }
  }, [isLoading, isAuthenticated, user, roles, router]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div></div>;
  }

  if (!isAuthenticated || !user || !roles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
