import { create } from 'zustand'
import { setToken } from "@/services/quests.service"

export const useUserStore = create((set) => ({
  user: null,
  setUser: (userToken) => set({ user: userToken }),
  logoutUser: () => set({ user: null }),
}));

export const storeToken = (cachedUser) => {
  window.localStorage.setItem("token", JSON.stringify(cachedUser));
  setToken(cachedUser.token);
};