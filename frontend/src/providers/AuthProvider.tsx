import React, { createContext, useContext } from 'react';

/**
 * AuthProvider — scaffold only. Full implementation in Phase 5.
 * Currently grants no special access. All protected routes
 * will redirect to /login once auth is wired.
 */

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  user: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // TODO Phase 5: Wire up JWT verification, session refresh, user role detection
  return (
    <AuthContext.Provider value={{ isAuthenticated: false, isAdmin: false, user: null }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
