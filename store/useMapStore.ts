
import { create } from 'zustand';
import { MapState, POI, Footprint } from '../types';

export const useMapStore = create<MapState>((set) => ({
  userLocation: null,
  activePOI: null,
  fullDetailPOI: null,
  nearbyFootprints: [],
  pendingFootprints: [], // اضافه شد طبق برنامه فاز ۲
  isLoadingDetails: false,
  isCelebratingStamp: false,
  isNarrativePlaying: false,

  setUserLocation: (loc: [number, number]) => set({ userLocation: loc }),
  
  // اتمیک کردن تغییر مکان: همزمان با تغییر POI، وضعیت‌های وابسته را ریست می‌کند
  setActivePOI: (poi: POI | null) => set((state) => ({
    activePOI: poi,
    fullDetailPOI: poi !== null ? null : state.fullDetailPOI,
    isNarrativePlaying: false,
    isLoadingDetails: false,
    // ردپاهای موقت (Pending) با تغییر مکان پاک می‌شوند
    pendingFootprints: poi !== null ? [] : state.pendingFootprints,
  })),

  // اکشن جدید برای پاکسازی کامل
  clearActivePOI: () => set({
    activePOI: null,
    fullDetailPOI: null,
    isNarrativePlaying: false,
    isLoadingDetails: false,
    pendingFootprints: [],
  }),

  setFullDetailPOI: (poi: POI | null) => set({ fullDetailPOI: poi }),
  setNearbyFootprints: (footprints: Footprint[]) => set({ nearbyFootprints: footprints }),
  setLoadingDetails: (val: boolean) => set({ isLoadingDetails: val }),
  setCelebratingStamp: (val: boolean) => set({ isCelebratingStamp: val }),
  setNarrativePlaying: (val: boolean) => set({ isNarrativePlaying: val }),
  
  // تغییر نام متد (منطق اصلاح شده: استفاده از pendingFootprints)
  addFootprintOptimistic: (poiId: string, footprint: Footprint) => set((state) => {
    if (!state.activePOI || state.activePOI.id !== poiId) return {};

    const pendingFootprint: Footprint = { ...footprint, is_verified: false };

    const updatedFullDetailPOI = (state.fullDetailPOI && state.fullDetailPOI.id === poiId)
      ? {
          ...state.fullDetailPOI,
          footprints: [pendingFootprint, ...(state.fullDetailPOI.footprints || [])]
        }
      : state.fullDetailPOI;

    return {
      fullDetailPOI: updatedFullDetailPOI,
      // اینجا به جای nearbyFootprints، به pendingFootprints اضافه می‌شود
      pendingFootprints: [pendingFootprint, ...state.pendingFootprints]
    };
  }),
}));
