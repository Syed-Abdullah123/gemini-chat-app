import { supabase } from "../lib/supabase";

export const MessageAPI = {
  getMessages: async (chatId: string) => {
    return await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: false });
  },

  sendUserMessage: async (
    chatId: string,
    userId: string,
    content: string
  ) => {
    return await supabase
      .from("messages")
      .insert({
        chat_id: chatId,
        user_id: userId,
        role: "user",
        content,
      })
      .select()
      .single();
  },

  saveAIResponse: async (
    chatId: string,
    userId: string,
    content: string
  ) => {
    return await supabase
      .from("messages")
      .insert({
        chat_id: chatId,
        user_id: userId,
        role: "assistant",
        content,
      })
      .select()
      .single();
  },
};