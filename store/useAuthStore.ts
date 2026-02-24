
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '../services/supabaseClient';
import { CityMode, SemanticProfile } from '../types';
import { dbService } from '../services/dbService';

export type AuthErrorCode = 
  | 'INVALID_CREDENTIALS' 
  | 'EMAIL_NOT_CONFIRMED' 
  | 'USER_ALREADY_EXISTS' 
  | 'RATE_LIMIT' 
  | 'UNKNOWN';

export interface AuthResult {
  success: boolean;
  errorCode?: AuthErrorCode;
  message?: string;
}

interface AuthState {
  session: any | null;
  user: any | null;
  onboardingCompleted: boolean;
  isAuthInitialized: boolean;
  semanticProfile: SemanticProfile;
  _hasHydrated: boolean;
  
  setHasHydrated: (val: boolean) => void;
  initializeAuth: () => Promise<void>;
  checkEmailStatus: (email: string) => Promise<{ exists: boolean; needsConfirmation: boolean }>;
  login: (email: string, pass: string) => Promise<AuthResult>;
  signUp: (email: string, pass: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  finalizeOnboarding: (data: { city: CityMode, vibe: string, crew: string, isTravelingNow: boolean }) => Promise<void>;
  updatePreference: (key: string, value: any) => Promise<void>;
  updateProfile: (updates: { username?: string; avatar_url?: string }) => Promise<void>;
  removeSemanticTag: (category: keyof SemanticProfile, tag: string) => Promise<void>;
  // متد جدید برای به‌روزرسانی تنظیمات صدای خروجی هوش مصنوعی
  updateVoiceSettings: (voiceName: string, speechRate: number) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      user: null,
      onboardingCompleted: false,
      isAuthInitialized: false,
      semanticProfile: {},
      _hasHydrated: false,

      setHasHydrated: (val) => set({ _hasHydrated: val }),

      initializeAuth: async () => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          const user = session?.user ?? null;
          set({ 
            session, 
            user,
            onboardingCompleted: user?.user_metadata?.onboarding_completed ?? false,
            isAuthInitialized: true 
          });
          
          if (event === 'SIGNED_OUT') {
            set({ onboardingCompleted: false, semanticProfile: {} });
            supabase.removeAllChannels();
          }
        });

        try {
          const { data: { session } } = await supabase.getSession();
          const user = session?.user ?? null;
          set({ 
            session, 
            user, 
            onboardingCompleted: user?.user_metadata?.onboarding_completed ?? false,
            isAuthInitialized: true 
          });
        } catch (error) {
          set({ isAuthInitialized: true });
        }
      },

      checkEmailStatus: async (email: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password: 'DUMMY_PASSWORD_CHECK_123' });
        if (error) {
          if (error.message.includes("Email not confirmed")) return { exists: true, needsConfirmation: true };
          return { exists: true, needsConfirmation: false };
        }
        return { exists: true, needsConfirmation: false };
      },

      login: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          if (error.message.includes("Email not confirmed")) return { success: false, errorCode: 'EMAIL_NOT_CONFIRMED', message: "ایمیلت هنوز تایید نشده رفیق." };
          if (error.message.includes("Invalid login credentials")) return { success: false, errorCode: 'INVALID_CREDENTIALS', message: "ایمیل یا رمز عبورت درست نیست." };
          return { success: false, errorCode: 'UNKNOWN', message: "یه مشکل فنی پیش اومد." };
        }
        return { success: true };
      },

      signUp: async (email, password) => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          if (error.message.includes("already registered")) return { success: false, errorCode: 'USER_ALREADY_EXISTS', message: "این ایمیل قبلاً هست، وارد شو." };
          return { success: false, errorCode: 'UNKNOWN', message: error.message };
        }
        return { success: true };
      },

      finalizeOnboarding: async (data) => {
        const { user } = get();
        if (!user || !data.city) return;
        const semanticData = { travel_style: data.vibe, crew_type: data.crew, is_traveling_now: data.isTravelingNow, last_summary_at: new Date().toISOString() };
        await supabase.auth.updateUser({ data: { onboarding_completed: true } });
        try {
          await dbService.pushToOutbox({ 
            type: 'FINALIZE_ONBOARDING', 
            payload: { 
              profile: { current_city: data.city, semantic_profile: semanticData },
              trip: { id: crypto.randomUUID(), user_id: user.id, type: 'activity', title: `شروع ماجراجویی در ${data.city}`, start_time: data.isTravelingNow ? new Date().toISOString() : null, status: 'upcoming' }
            } 
          });
          set({ onboardingCompleted: true, semanticProfile: semanticData as any });
        } catch (e) {}
      },

      updatePreference: async (key, value) => {
        const { user, semanticProfile } = get();
        if (!user) return;
        const newProfile = { ...semanticProfile, [key]: value };
        set({ semanticProfile: newProfile });
        await supabase.from('profiles').update({ semantic_profile: newProfile }).eq('id', user.id);
      },

      updateProfile: async (updates) => {
        const { user } = get();
        if (!user) return;
        
        const { data, error } = await supabase.auth.updateUser({
          data: { ...user.user_metadata, ...updates }
        });
        
        if (error) throw error;

        const profileUpdates: any = {};
        if (updates.username) profileUpdates.username = updates.username;
        
        if (Object.keys(profileUpdates).length > 0) {
          await supabase.from('profiles').update(profileUpdates).eq('id', user.id);
        }

        set({ user: data.user });
      },

      removeSemanticTag: async (category, tag) => {
        const { user, semanticProfile } = get();
        if (!user) return;

        const currentVal = semanticProfile[category];
        if (Array.isArray(currentVal)) {
          const newVal = currentVal.filter(t => t !== tag);
          const newProfile = { ...semanticProfile, [category]: newVal };
          set({ semanticProfile: newProfile });
          await supabase.from('profiles').update({ semantic_profile: newProfile }).eq('id', user.id);
        }
      },

      // پیاده‌سازی متد به‌روزرسانی تنظیمات صوتی مسافر
      updateVoiceSettings: async (voiceName, speechRate) => {
        const { user, semanticProfile } = get();
        if (!user) return;
        
        const newProfile = { 
          ...semanticProfile, 
          voice_config: { voiceName, speechRate } 
        };
        
        set({ semanticProfile: newProfile });
        
        // همگام‌سازی با دیتابیس برای پایداری تنظیمات در تمام دستگاه‌ها
        await supabase
          .from('profiles')
          .update({ semantic_profile: newProfile })
          .eq('id', user.id);
      },

      signOut: async () => {
        await supabase.auth.signOut();
        localStorage.clear();
        window.location.reload();
      }
    }),
    {
      name: 'rahnam-auth-storage-v3',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        const { session, user, isAuthInitialized, _hasHydrated, ...rest } = state;
        return rest;
      },
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    }
  )
);
