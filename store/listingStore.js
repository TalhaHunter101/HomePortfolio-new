import { create } from "zustand";

export const useListingStore = create((set) => ({
  squerfoot: null,
  fullAddress: null,
  walkScore: null,
  setWalkScore: (walkScore) => set({ walkScore: walkScore || "NA" }),
  setSquarfoot: (squerfootInMeters) => {
    const squerfootInFeet = squerfootInMeters * 10.7639;
    set({ squerfoot: squerfootInFeet.toFixed(0) || "NA" });
  },

  setFullAddress: (address) => set({ fullAddress: address }),
}));

export const marketCompStore = create((set) => ({
  marketComp: null,
  medianPrice: null,
  setMarketComp: (marketComp) => set({ marketComp }),
  setMedianPrice: (value) => set({ medianPrice: value }),
}));

export const marketInfoStore = create((set) => ({
  marketInfo: [],
  setMarketInfo: (marketInfo) => set({ marketInfo }),
  resetMarketInfo: () => set({ marketInfo: [] }),
}));
