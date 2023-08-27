import { create } from "zustand";

const authStore = create((set) => ({
  accessToken: null,
  setAccessToken: (token) => set(() => ({ accessToken: token })),
}));

export default authStore;
