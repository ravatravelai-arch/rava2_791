
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { POI, CityMode } from '../types';
import { discoveryService } from '../services/discoveryService';
import { PlaceService } from '../services/placeService';

interface DiscoveryState {
  discoveredPlaces: POI[];
  curatedPlaces: POI[];
  isSearching: boolean;
  activeMood: string | null;
  showCurated: boolean;
  lastFetchTime: number | null; // جدید: برای مدیریت انقضای کش و جلوگیری از ترافیک اضافی
  
  setActiveMood: (mood: string | null) => void;
  toggleShowCurated: () => void;
  refreshFeed: (lat: number, lng: number) => Promise<void>;
  fetchCurated: (city: CityMode, force?: boolean) => Promise<void>;
  setDiscoveredPlaces: (places: POI[]) => void;
}

export const useDiscoveryStore = create<DiscoveryState>()(
  persist(
    (set, get) => ({
      discoveredPlaces: [],
      curatedPlaces: [],
      isSearching: false,
      activeMood: null,
      showCurated: true,
      lastFetchTime: null,

      setActiveMood: (mood) => set({ activeMood: mood }),
      
      toggleShowCurated: () => set((state) => ({ showCurated: !state.showCurated })),

      fetchCurated: async (city, force = false) => {
        if (!city) return;

        const { curatedPlaces, lastFetchTime } = get();
        const CACHE_TTL = 24 * 60 * 60 * 1000; // ۲۴ ساعت اعتبار کش
        const isExpired = !lastFetchTime || (Date.now() - lastFetchTime > CACHE_TTL);

        // گارد پرفورمنس: اگر دیتا داریم و منقضی نشده، ریکوئست نزن (مگر اینکه Force باشد)
        if (curatedPlaces.length > 0 && !isExpired && !force) {
          console.log("[Discovery] Using valid cached curated places.");
          return;
        }

        try {
          const places = await discoveryService.getCuratedPlaces(city);
          
          // گارد پایداری: فقط اگر دیتای معتبر آمد، استیت را آپدیت کن
          if (places && places.length > 0) {
            set({ 
              curatedPlaces: places, 
              lastFetchTime: Date.now() 
            });
          }
        } catch (e) {
          // استراتژی Fail-Safe: در صورت خطای شبکه، دیتای قبلی را حفظ کن
          console.warn("[Discovery] Network failed. Preserving last known curated markers.");
        }
      },

      refreshFeed: async (lat, lng) => {
        set({ isSearching: true });
        const mood = get().activeMood || undefined;
        
        try {
          let places = await discoveryService.searchNearby(lat, lng, 10000, mood);
          if (places.length === 0) {
            places = await PlaceService.fetchNearbyFallback(lat, lng, mood);
          }
          set({ discoveredPlaces: places });
        } catch (e) {
          console.error("[Discovery] Feed refresh failed:", e);
        } finally {
          set({ isSearching: false });
        }
      },

      setDiscoveredPlaces: (places) => set({ discoveredPlaces: places })
    }),
    {
      name: 'rahnam-discovery-storage-v4',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        curatedPlaces: state.curatedPlaces,
        showCurated: state.showCurated,
        lastFetchTime: state.lastFetchTime
      })
    }
  )
);
