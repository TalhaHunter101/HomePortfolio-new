import { create } from "zustand";


const useAuthStore = create((set) => ({
  isVisible: false,
  isConfirmVisible: false,
  setIsVisible: (isVisible) => set({ isVisible }),
  setIsConfirmVisible: (isConfirmVisible) => set({ isConfirmVisible }),
  error: "",
  success: "",
  setError: (error) => set({ error }),
  setSuccess: (success) => set({ success }),
  user: {
    collectionId: "",
    collectionName: "",
    created: "",
    email: "",
    emailVisibility: false,
    id: "",
    name: "",
    updated: "",
    username: "",
    verified: false,
  },
  setUser: (user) => set({ user }),
}));

export default useAuthStore;