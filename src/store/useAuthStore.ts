import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthService } from '@/services/auth.service';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  phone?: string | null;
  messId?: string | null;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string) => void;
  setAccessToken: (token: string) => void;
  updateUser: (user: Partial<User>) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setAuth: (user, accessToken) =>
        set({ user, accessToken, isAuthenticated: true }),
      setAccessToken: (accessToken) => set({ accessToken }),
      updateUser: (updatedFields) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedFields } : null,
        })),
      logout: async () => {
        set({ user: null, accessToken: null, isAuthenticated: false });
        try {
          await AuthService.logout();
        } catch (e) {
          console.error(e);
        }
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({ user: state.user, accessToken: state.accessToken, isAuthenticated: state.isAuthenticated }),
    }
  )
);
