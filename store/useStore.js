import { create } from "zustand";

const useStore = create((set) => ({
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
  results: [],
  setResults: (data) => set({ results: data }),
  isDataLoading: false,
  setIsDataLoading: (loading) => set({ isDataLoading: loading }),
  selectedBeds: "any",
  setSelectedBeds: (beds) => set({ selectedBeds: beds }),
  selectedBaths: "any",
  setSelectedBaths: (baths) => set({ selectedBaths: baths }),
  minPrice: "any",
  setMinPrice: (price) => set({ minPrice: price }),
  maxPrice: "any",
  setMaxPrice: (price) => set({ maxPrice: price }),
}));

export default useStore;
