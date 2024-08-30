import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchTerm: "",
  results: null,
  isDataLoading: false,

  setSearchTerm: (term) => set({ searchTerm: term }),
  setResults: (results) => set({ results }),
  setIsDataLoading: (isLoading) => set({ isDataLoading: isLoading }),

  searchPostcode: async () => {
    try {
      set({ isDataLoading: true });

      const response = await fetch(`/api/search/listing-search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchValue: get().searchTerm }),
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

export default useSearchStore;
