
import { create } from 'zustand';
import { MapState, POI, Footprint } from '../types';

export const useMapStore = create<MapState>((set) => ({
  userLocation: null,
  activePOI: null,
  fullDetailPOI: null,
  nearbyFootprints: [],
  isLoadingDetails: false,
  isCelebratingStamp: false,
  isNarrativePlaying: false,

  setUserLocation: (loc: [number, number]) => set({ userLocation: loc }),
  setActivePOI: (poi: POI | null) => set({ activePOI: poi }),
  setFullDetailPOI: (poi: POI | null) => set({ fullDetailPOI: poi }),
  setNearbyFootprints: (footprints: Footprint[]) => set({ nearbyFootprints: footprints }),
  setLoadingDetails: (val: boolean) => set({ isLoadingDetails: val }),
  setCelebratingStamp: (val: boolean) => set({ isCelebratingStamp: val }),
  setNarrativePlaying: (val: boolean) => set({ isNarrativePlaying: val }),
  
  addFootprintToActive: (poiId: string, footprint: Footprint) => set((state) => {
    const pendingFootprint: Footprint = { ...footprint, is_verified: false };
    const updatedFullDetailPOI = (state.fullDetailPOI && state.fullDetailPOI.id === poiId)
      ? {
          ...state.fullDetailPOI,
          footprints: [pendingFootprint, ...(state.fullDetailPOI.footprints || [])]
        }
      : state.fullDetailPOI;

    return {
      fullDetailPOI: updatedFullDetailPOI,
      nearbyFootprints: [pendingFootprint, ...state.nearbyFootprints]
    };
  }),
}));
