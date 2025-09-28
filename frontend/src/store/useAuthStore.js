import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get(`/auth/check`);
      set({ authUser: res.data });
    } catch (error) {
      const errorMsg = error.response.data.message;
      console.error("Error in checkAuth: ", errorMsg);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post(`/auth/login`, data);
      const successMsg = res.data.message;
      const user = res.data.user;

      set({ authUser: user });
      toast.success(successMsg);
    } catch (error) {
      const errorMsg = error.response.data.message;
      toast.error(errorMsg);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post(`/auth/signup`, data);
      const successMsg = res.data.message;
      const user = res.data.savedUser;

      toast.success(successMsg);
      set({ authUser: user });
    } catch (error) {
      const errorMsg = error.response.data.message;
      toast.error(errorMsg);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post(`/auth/logout`);
      set({ authUser: null });
    } catch (error) {
      const errorMsg = error.response.data.message;
      console.error("Error in logout: ", errorMsg);
    }
  },
}));
