import { supabase } from "../lib/supabase";

export const ChatAPI = {
  getChats: async (userId: string) => {
    return await supabase
      .from("chats")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
  },

  createChat: async (userId: string, title: string = "New Chat") => {
    return await supabase
      .from("chats")
      .insert({
        user_id: userId,
        title,
      })
      .select()
      .single();
  },

  renameChat: async (chatId: string, title: string) => {
    return await supabase
      .from("chats")
      .update({ title })
      .eq("id", chatId);
  },

  deleteChat: async (chatId: string) => {
    return await supabase
      .from("chats")
      .delete()
      .eq("id", chatId);
  },
};