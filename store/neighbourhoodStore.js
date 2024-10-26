import { create } from "zustand";

export const usePostcodeStore = create((set) => ({
  currentPostcode: null,
  setCurrentPostcode: (postcode) => set({ currentPostcode: postcode }),
}));


export const useNeighbourhoodDemographicStore = create((set) => ({
 economicData:[],
 eucationData:[],
 occupationData:[],
 tenureData:[],
 compositionData:[],
 paetnerShipData:[],
 populationData:[],
 populationAgeData:[],
 ethnicGroupData:[],
 accomadationData: [],
 crimeData:[],
 rentData: [],
 walkScore: null,
 walkScoreDescription: null,
 isLoading: true,

 setEconomicData: (data) => set({ economicData: data }),
 setEucationData: (data) => set({ eucationData: data }),
 setOccupationData: (data) => set({ occupationData: data }),
 setTenureData: (data) => set({ tenureData: data }),
 setCompositionData: (data) => set({ compositionData: data }),
 setPaetnerShipData: (data) => set({ paetnerShipData: data }),
 setPopulationData: (data) => set({ populationData: data }),
 setPopulationAgeData: (data) => set({ populationAgeData: data }),
 setEthnicGroupData: (data) => set({ ethnicGroupData: data }),
 setAccomadationData: (data) => set({ accomadationData: data }),
 setCrimeData: (data) => set({ crimeData: data }),
 setRentData: (data) => set({ rentData: data }),
 setWalkScore: (data) => set({ walkScore: data }),
 setWalkScoreDescription: (data) => set({ walkScoreDescription: data }),
 setIsLoading: (isLoading) => set({ isLoading: isLoading }),
}));