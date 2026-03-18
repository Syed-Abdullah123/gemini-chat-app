import { create } from "zustand";
import { AuthAPI } from "../api/auth.api";
import { ProfileAPI } from "../api/profile.api";

type AuthState = {
  user: any | null;
  session: any | null;
  /** Only true during initial session load - used by App.tsx. Login/register must NOT touch this. */
  sessionLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loadSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  sessionLoading: true,
  error: null,

  loadSession: async () => {
    const { data } = await AuthAPI.getSession();

    set({
      session: data.session,
      user: data.session?.user ?? null,
      sessionLoading: false,
    });
  },

  login: async (email, password): Promise<boolean> => {
    set({ error: null });

    const { data, error } = await AuthAPI.login(email, password);

    if (error) {
      set({ error: error.message });
      return false;
    }

    set({
      user: data.user,
      session: data.session,
    });

    return true;
  },

  register: async (email, password): Promise<boolean> => {
    set({ error: null });

    const { data, error } = await AuthAPI.register(email, password);

    if (error) {
      set({ error: error.message });
      return false;
    }

    if (data.user) {
      await ProfileAPI.createProfile(data.user.id, email);
    }

    // Set user/session so navigator switches to AppTabs (Supabase may return session even before email verification)
    if (data.user && data.session) {
      set({ user: data.user, session: data.session });
    }

    return true;
  },

  logout: async () => {
    await AuthAPI.logout();

    set({
      user: null,
      session: null,
    });
  },
}));