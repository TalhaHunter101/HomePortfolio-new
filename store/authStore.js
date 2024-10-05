import { create } from "zustand";


export const useAuthStore = create((set) => ({
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


export const storeUsersData = create((set) => {
  const authData = localStorage.getItem("pocketbase_auth");
  let initialUsersData = [];

  if (authData) {
    try {
      const parsedAuthData = JSON.parse(authData);
      if (parsedAuthData && parsedAuthData.model) {
        initialUsersData = parsedAuthData.model;
      }
    } catch (error) {
      console.error("Failed to parse localStorage data", error);
    }
  }

  return {
    usersData: initialUsersData, 
    setUsersData: (usersData) => set({ usersData }), 
  };
});
