import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get(`/auth/check`);
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in checkAuth: ", error.response.data.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
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
}));
