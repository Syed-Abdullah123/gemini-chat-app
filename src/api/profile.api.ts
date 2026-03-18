import { supabase } from "../lib/supabase";

export const ProfileAPI = {
  getProfile: async (userId: string) => {
    return await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
  },

  updateProfile: async (userId: string, data: any) => {
    return await supabase
      .from("profiles")
      .update(data)
      .eq("id", userId);
  },

  createProfile: async (userId: string, email: string) => {
    return await supabase
      .from("profiles")
      .insert({
        id: userId,
        full_name: email.split("@")[0],
      });
  },
};