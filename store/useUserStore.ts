
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserState, CityMode, TripEvent, Stamp, FuelTransaction, Favorite, POI } from '../types';
import { supabase } from '../services/supabaseClient';
import { useUIStore } from './useUIStore';
import { AudioGraph } from '../services/audioGraph';
import { dbService } from '../services/dbService';

interface CleanUserState extends Omit<UserState, 'session' | 'user' | 'onboardingCompleted' | 'setSession' | 'completeOnboarding' | 'signOut'> {
  isStamping: boolean;
  isOnline: boolean;
  fuelTransactions: FuelTransaction[];
  setIsOnline: (val: boolean) => void;
  deductFuel: (seconds: number) => Promise<void>;
  hasActiveTrip: () => boolean;
  fetchFuelHistory: () => Promise<void>;
}

export const useUserStore = create<CleanUserState>()(
  persist(
    (set, get) => ({
      cityMode: null,
      wallet: { balance: 2.0, xp: 0, stamps: [] },
      tripEvents: [],
      fuelTransactions: [],
      favorites: [],
      isSyncing: false,
      isStamping: false,
      isOnline: navigator.onLine,
      semanticProfile: {},

      setIsOnline: (val) => set({ isOnline: val }),
      setCityMode: (mode: CityMode) => set({ cityMode: mode }),

      hasActiveTrip: () => {
        const { tripEvents } = get();
        if (tripEvents.length === 0) return false;
        const now = new Date();
        return tripEvents.some(e => {
          const isUpcoming = e.status === 'upcoming';
          const isOngoing = e.status === 'now';
          const endDate = e.start_time ? new Date(new Date(e.start_time).getTime() + 7 * 24 * 60 * 60 * 1000) : null;
          return (isUpcoming || isOngoing) && (!endDate || endDate > now);
        });
      },

      updateWallet: (balance: number, xp: number) => set((state) => ({ 
        wallet: { ...state.wallet, balance, xp } 
      })),

      subscribeToUpdates: async () => {
        const { isOnline } = get();
        if (!isOnline) return;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        supabase.removeAllChannels();

        supabase
          .channel('schema-db-changes')
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'profiles',
              filter: `id=eq.${user.id}`,
            },
            (payload) => {
              const newBalance = payload.new.wallet_balance;
              const newXP = payload.new.xp_level;
              const oldBalance = get().wallet.balance;

              set((state) => ({
                wallet: { ...state.wallet, balance: newBalance, xp: newXP }
              }));

              if (newBalance > oldBalance) {
                const diffMins = Math.floor((newBalance - oldBalance) * 60);
                useUIStore.getState().setRewardNotify({ 
                  show: true, 
                  amount: `${diffMins} دقیقه شارژ` 
                });
                AudioGraph.getInstance().playCoinSound();
                setTimeout(() => useUIStore.getState().setRewardNotify(null), 5000);
              }
              get().fetchFuelHistory();
            }
          )
          .subscribe();
      },

      fetchFuelHistory: async () => {
        const { data } = await supabase
          .from('reward_ledger')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);
        
        if (data) {
          set({ fuelTransactions: data.map(t => ({
            id: t.transaction_id,
            amount: t.amount,
            type: t.reward_type,
            reference_id: t.reference_id,
            created_at: t.created_at
          })) });
        }
      },

      deductFuel: async (seconds: number) => {
        const hours = seconds / 3600.0;
        const currentBalance = get().wallet.balance;
        set(state => ({ 
          wallet: { ...state.wallet, balance: Math.max(0, currentBalance - hours) } 
        }));
        await dbService.pushToOutbox({ type: 'DEDUCT_FUEL', payload: { seconds } });
      },

      toggleFavorite: async (poi: POI) => {
        const { favorites } = get();
        const isFav = favorites.some(f => f.placeId === poi.id);
        
        if (isFav) {
          set({ favorites: favorites.filter(f => f.placeId !== poi.id) });
          await supabase.from('favorites').delete().eq('place_id', poi.id);
        } else {
          const newFav: Favorite = {
            id: crypto.randomUUID(),
            placeId: poi.id,
            snapshot: { name: poi.name, image: poi.image, category: poi.category }
          };
          set({ favorites: [newFav, ...favorites] });
          await supabase.from('favorites').insert({
            place_id: poi.id,
            place_snapshot: newFav.snapshot
          });
        }
        AudioGraph.haptic(10);
      },

      claimReferral: async (code: string) => {
        const { error } = await supabase.rpc('claim_referral', { px_code: code });
        if (error) throw error;
        await get().syncWithCloud();
        AudioGraph.getInstance().playCoinSound();
      },

      addStamp: async (stamp: Stamp) => {
        const { wallet, isStamping, cityMode } = get();
        if (isStamping || wallet.stamps.some(s => s.placeId === stamp.placeId)) return;
        
        set({ isStamping: true });
        
        set(state => ({ 
          wallet: { 
            ...state.wallet, 
            stamps: [stamp, ...state.wallet.stamps],
            balance: state.wallet.balance + 0.1,
            xp: state.wallet.xp + 50
          }
        }));

        const transactionId = crypto.randomUUID();
        await dbService.pushToOutbox({ 
          type: 'PROCESS_STAMP', 
          payload: { 
            px_transaction_id: transactionId,
            px_place_id: stamp.placeId, 
            px_place_name: stamp.placeName,
            px_city: cityMode || 'Unknown'
          } 
        });

        set({ isStamping: false });
      },

      syncWithCloud: async () => {
        const { isOnline } = get();
        if (!isOnline) return;

        set({ isSyncing: true });
        try {
          const { data: profile } = await supabase.from('profiles').select('*').single();
          const { data: trips } = await supabase.from('trips').select('*').order('start_time', { ascending: false });
          const { data: stamps } = await supabase.from('stamps').select('*').order('created_at', { ascending: false });
          const { data: favs } = await supabase.from('favorites').select('*').order('created_at', { ascending: false });

          if (profile) {
            set({ 
              wallet: { 
                balance: profile.wallet_balance, 
                xp: profile.xp_level,
                referralCode: profile.referral_code,
                isReferred: !!profile.referred_by,
                stamps: stamps?.map(s => ({
                  id: s.id,
                  placeId: s.place_id,
                  placeName: s.place_name,
                  date: new Date(s.created_at).toLocaleDateString('fa-IR')
                })) || []
              },
              favorites: favs?.map(f => ({
                id: f.id,
                placeId: f.place_id,
                snapshot: f.place_snapshot
              })) || [],
              semanticProfile: profile.semantic_profile || {}
            });
          }
          if (trips) set({ tripEvents: trips as any });
          
          await get().fetchFuelHistory();
        } catch (e) {
          console.error("Cloud Sync Failed:", e);
        } finally {
          set({ isSyncing: false });
        }
      },

      addTripEvent: async (event: TripEvent) => {
        set(state => ({ tripEvents: [...state.tripEvents, event].sort((a, b) => a.date.localeCompare(b.date)) }));
        await dbService.pushToOutbox({ type: 'ADD_TRIP_EVENT', payload: event });
      },

      removeTripEvent: async (id: string) => {
        set(state => ({ tripEvents: state.tripEvents.filter(e => e.id !== id) }));
      }
    }),
    {
      name: 'rahnam-data-storage-v3',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        const { isSyncing, isStamping, isOnline, ...rest } = state;
        return rest;
      }
    }
  )
);
