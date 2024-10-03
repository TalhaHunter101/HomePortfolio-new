import { areAllArraysEmpty } from "@/utils/Helper";
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
  setMinPrice: (price) => set({ minPrice: parseInt(price) }),
  maxPrice: "any",
  setMaxPrice: (price) => set({ maxPrice: parseInt(price) }),
  homeType: [],
  setHomeType: (types) => set({ homeType: types }),

  clearAllFilter () {
    set({
      searchTerm: "",
      results: [],
      selectedBeds: "any",
      selectedBaths: "any",
      minPrice: "any",
      maxPrice: "any",
      homeType: [],
    });
  },

  searchPostcode: async (searchTerm) => {
    try {
      set({ isDataLoading: true });

      const response = await fetch(`/api/search/listing-search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchValue: searchTerm }),
      });

      const postcodeResult = await response.json();

      if (postcodeResult && !areAllArraysEmpty(postcodeResult)) {
        set({ results: postcodeResult });
      } else {
        set({ results: null });
      }
    } catch (error) {
      console.error(error);
    } finally {
      set({ isDataLoading: false });
    }
  },
}));

export default useStore;
