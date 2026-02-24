
export interface VoiceConfig {
  voiceName: string;
  speechRate: number;
}

export interface SemanticProfile {
  travel_style?: string;
  food_preferences?: string[];
  energy_level?: 'low' | 'medium' | 'high';
  budget_sensitivity?: 'low' | 'medium' | 'high';
  crew_type?: 'solo' | 'couple' | 'family' | 'friends';
  dislikes?: string[];
  last_summary_at?: string;
  is_traveling_now?: boolean;
  // Added voice_config to fix property access errors in UI components
  voice_config?: VoiceConfig;
}

export type CityMode = 'Istanbul' | 'Dubai' | 'Tehran' | null;
export type AppTab = 'home' | 'explore' | 'wallet' | 'tools' | 'profile';
export type CurrencyType = 'IRT' | 'TRY' | 'AED';

export interface Narrative {
  id: string;
  place_id: string;
  audio_url: string;
  transcript?: string;
  voice_profile?: string;
  duration_seconds?: number;
}

export interface POI {
  id: string;
  name: string;
  description?: string;
  lat: number;
  lng: number;
  image?: string;
  category: string;
  priceLevel?: number;
  rating?: number;
  userRatingCount?: number;
  moodTags?: string[];
  localPriceHint?: string;
  openingHours?: string[];
  reviews?: any[];
  footprints?: Footprint[];
  isGooglePOI?: boolean;
  // فیلدهای اختصاصی فاز ۲ و ۳
  is_curated?: boolean;
  narrative?: Narrative;
  icon_3d?: string;
  address?: string;
}

export interface Footprint {
  id: string;
  user: string;
  text: string;
  date: string;
  lat?: number;
  lng?: number;
  avatar?: string;
  is_verified?: boolean; 
}

export type TripEventType = 'flight' | 'hotel' | 'activity' | 'food';

export interface TripEvent {
  id: string;
  type: TripEventType;
  title: string;
  time: string;
  date: string; 
  status: 'upcoming' | 'completed' | 'now';
  coordinates?: [number, number];
  start_time?: string;
  end_time?: string;
  details: {
    flightNo?: string;
    gate?: string;
    seat?: string;
    address?: string;
    reservationId?: string;
    notes?: string;
    price?: number;
  };
}

export interface Stamp {
  id: string;
  placeId: string;
  placeName: string;
  date: string;
}

export interface FuelTransaction {
  id: string;
  amount: number;
  type: string;
  reference_id?: string;
  created_at: string;
}

export interface Favorite {
  id: string;
  placeId: string;
  snapshot: {
    name: string;
    image?: string;
    category: string;
  };
}

export interface Flashcard {
  id: string;
  category: 'health' | 'transport' | 'emergency' | 'food' | 'general';
  icon: string;
  farsi: string;
  local: string;
  pronunciation: string;
}

export interface UserState {
  session: any | null;
  user: any | null;
  onboardingCompleted: boolean;
  cityMode: CityMode;
  wallet: {
    balance: number;
    xp: number;
    stamps: Stamp[];
    referralCode?: string;
    isReferred?: boolean;
  };
  tripEvents: TripEvent[];
  favorites: Favorite[];
  isSyncing: boolean;
  semanticProfile: SemanticProfile;
  setSession: (session: any) => void;
  completeOnboarding: () => void;
  signOut: () => void;
  setCityMode: (mode: CityMode) => void;
  updateWallet: (balance: number, xp: number) => void;
  syncWithCloud: () => Promise<void>;
  subscribeToUpdates: () => Promise<void>;
  addTripEvent: (event: TripEvent) => Promise<void>;
  removeTripEvent: (id: string) => Promise<void>;
  toggleFavorite: (poi: POI) => Promise<void>;
  claimReferral: (code: string) => Promise<void>;
  addStamp: (stamp: Stamp) => Promise<void>;
}

export interface UIState {
  activeTab: AppTab;
  isRecording: boolean;
  isThinking: boolean;
  isSpeaking: boolean;
  isConnecting: boolean;
  showTranscript: boolean;
  showVision: boolean;
  captions: { user: string; ai: string };
  rewardNotify: { show: boolean; amount: string } | null;
  isPlayingNarrative: boolean;
  
  setActiveTab: (tab: AppTab) => void;
  setRecording: (val: boolean) => void;
  setThinking: (val: boolean) => void;
  setSpeaking: (val: boolean) => void;
  setConnecting: (val: boolean) => void;
  setShowTranscript: (val: boolean) => void;
  setShowVision: (val: boolean) => void;
  setCaptions: (captions: { user: string; ai: string }) => void;
  setRewardNotify: (val: { show: boolean; amount: string } | null) => void;
  setPlayingNarrative: (val: boolean) => void;
}

export interface MapState {
  userLocation: [number, number] | null;
  activePOI: POI | null;
  fullDetailPOI: POI | null;
  nearbyFootprints: Footprint[];
  // Added pendingFootprints to prevent build errors during Phase 1 refactor
  pendingFootprints: Footprint[];
  isLoadingDetails: boolean;
  isCelebratingStamp: boolean;
  isNarrativePlaying: boolean;
  
  setUserLocation: (loc: [number, number]) => void;
  setActivePOI: (poi: POI | null) => void;
  setFullDetailPOI: (poi: POI | null) => void;
  setNearbyFootprints: (footprints: Footprint[]) => void;
  setLoadingDetails: (val: boolean) => void;
  setCelebratingStamp: (val: boolean) => void;
  setNarrativePlaying: (val: boolean) => void;
  addFootprintToActive: (poiId: string, footprint: Footprint) => void;
}

export interface SurvivalState {
  rates: { TRY: number; AED: number };
  activeFlashcard: Flashcard | null;
  setRate: (currency: 'TRY' | 'AED', val: number) => void;
  setActiveFlashcard: (card: Flashcard | null) => void;
}
