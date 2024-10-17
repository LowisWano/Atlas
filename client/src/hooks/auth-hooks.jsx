import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: null,
  setUser: (userToken) => set({ user: userToken }),
  logoutUser: () => set({ user: null }),
}));