import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get(`/message/contacts`);
      const contacts = res.data.filteredUsers;
      set({ allContacts: contacts });
    } catch (error) {
      const errorMsg = error.response.data.message;
      toast.error(errorMsg);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: false });
    try {
      const res = await axiosInstance.get(`/message/chats`);
      const chatPartners = res.data.chatPartners;
      set({ chats: chatPartners });
    } catch (error) {
      const errorMsg = error.response.data.message;
      toast.error(errorMsg);
    } finally {
      set({ isUsersLoading: false });
    }
  },
}));
