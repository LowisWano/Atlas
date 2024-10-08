import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: null,
  setUser: (userToken) => set(userToken),
  resetUser: () => set(null),
}));