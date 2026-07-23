export type Role = 'Visitor' | 'Customer' | 'Author' | 'Editor' | 'Admin' | 'Super Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
