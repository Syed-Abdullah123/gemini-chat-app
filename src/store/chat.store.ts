import { create } from "zustand";
import { ChatAPI } from "../api/chat.api";

type ChatState = {
  chats: any[];
  loading: boolean;

  fetchChats: (userId: string) => Promise<void>;
  createChat: (userId: string) => Promise<any>;
};

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  loading: false,

  fetchChats: async (userId) => {
    set({ loading: true });

    const { data } = await ChatAPI.getChats(userId);

    set({
      chats: data ?? [],
      loading: false,
    });
  },

  createChat: async (userId) => {
    const { data } = await ChatAPI.createChat(userId);

    set((state) => ({
      chats: [data, ...state.chats],
    }));

    return data;
  },
}));