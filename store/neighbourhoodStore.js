import { create } from "zustand";

export const usePostcodeStore = create((set) => ({
  currentPostcode: null,
  setCurrentPostcode: (postcode) => set({ currentPostcode: postcode }),
}));