import { create } from "zustand";
import { MessageAPI } from "../api/message.api";
import { useAuthStore } from "./auth.store";
import { AIAPI } from "../api/ai.api";
import { useChatStore } from "./chat.store";
import { ChatAPI } from "../api/chat.api";
import { supabase } from "../lib/supabase";

type Message = {
  id: string;
  chat_id: string;
  role: "user" | "assistant";
  content: string;
  image_url?: string | null;
};

type MessageState = {
  messages: Message[];
  loading: boolean;
  thinking: boolean;

  fetchMessages: (chatId: string) => Promise<void>;
  sendMessage: (chatId: string, content: string) => Promise<void>;
  clearMessages: () => void;
};

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  loading: false,
  thinking: false,

  fetchMessages: async (chatId) => {
    set({ loading: true });

    const { data } = await MessageAPI.getMessages(chatId);

    set({
      messages: data ?? [],
      loading: false,
    });
  },

  sendMessage: async (chatId, content) => {
    const user = useAuthStore.getState().user;
    const isImageRequest = /generate|create|draw|make|show.*image|picture|photo/i.test(content);
    if (!user) return;

    // Save user message
    const { data: userMessage } = await MessageAPI.sendUserMessage(
      chatId,
      user.id,
      content,
    );

    set((state) => ({
      messages: [userMessage, ...state.messages],
    }));

    set({ thinking: true });

    if (isImageRequest) {
      const imageUrl = await AIAPI.generateImage(content);

      const { data: aiMessage } = await supabase
        .from("messages")
        .insert({
          chat_id: chatId,
          user_id: user.id,
          role: "assistant",
          content: imageUrl ? "" : "Sorry, I couldn't generate an image.",
          image_url: imageUrl,
        })
        .select()
        .single();

      set((state) => ({ messages: [aiMessage, ...state.messages] }));
    } else {
      const aiText = await AIAPI.generateText(content);
      const { data: aiMessage } = await MessageAPI.saveAIResponse(
        chatId,
        user.id,
        aiText,
      );
      set((state) => ({ messages: [aiMessage, ...state.messages] }));
    }
    set({ thinking: false });

    const user2 = useAuthStore.getState().user;
    if (user2) {
      useChatStore.getState().fetchChats(user2.id);
    }
  },

  clearMessages: () => set({ messages: [] }),
}));