import { create } from "zustand";

export const useListingStore = create((set) => ({
  squerfoot: null,
  fullAddress: null,
  setSquarfoot: (squerfootInMeters) => {
    const squerfootInFeet = squerfootInMeters * 10.7639;
    set({ squerfoot: squerfootInFeet.toFixed(0) || "NA" });
  },

  setFullAddress: (address) => set({ fullAddress: address }),
}));


export const marketCompStore = create((set) => ({
  marketComp: null,
  setMarketComp: (marketComp) => set({ marketComp }),
}))