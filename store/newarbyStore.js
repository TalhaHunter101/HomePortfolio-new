import { create } from "zustand";

const useNearByStore = create((set) => ({
  selecteNearbyLocation: null,
  setSelectedNearbyLocation: (location) => set({ selecteNearbyLocation: location }),
}));

export default useNearByStore;
