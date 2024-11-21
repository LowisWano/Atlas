import { create } from 'zustand'

/*
  maybe have a token state and isAuthenticated state?

*/
export const useUserStore = create((set) => ({
  user: null,
  setUser: (userToken) => set({ user: userToken }),
  logoutUser: () => set({ user: null }),
}));

export const storeToken = (cachedUser) => {
  window.localStorage.setItem("token", JSON.stringify(cachedUser));
};