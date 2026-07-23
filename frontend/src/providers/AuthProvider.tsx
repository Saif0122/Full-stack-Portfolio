'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthState } from '../types/auth';
import { authService } from '../services/auth.service';

interface AuthContextType extends AuthState {
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Attempt silent refresh on initial load
    const initializeAuth = async () => {
      try {
        await authService.refresh();
        const { user } = await authService.getMe();
        setState({ user, isAuthenticated: true, isLoading: false, error: null });
      } catch (error) {
        setState({ user: null, isAuthenticated: false, isLoading: false, error: null });
      }
    };

    initializeAuth();
  }, []);

  const login = async (data: any) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { user } = await authService.login(data);
      setState({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch (error: any) {
      setState(prev => ({ ...prev, isLoading: false, error: error.message }));
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { user } = await authService.register(data);
      setState({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch (error: any) {
      setState(prev => ({ ...prev, isLoading: false, error: error.message }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setState({ user: null, isAuthenticated: false, isLoading: false, error: null });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
