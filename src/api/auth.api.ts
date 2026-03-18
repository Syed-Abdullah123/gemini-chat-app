import { supabase } from "../lib/supabase";

export const AuthAPI = {
  register: async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password });
  },

  login: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  logout: async () => {
    return await supabase.auth.signOut();
  },

  getSession: async () => {
    return await supabase.auth.getSession();
  },
};