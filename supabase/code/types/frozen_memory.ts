
/**
 * Types for Project Frozen Memory (Hybrid Static/Live)
 */

export interface Destination {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  manifest_version: number;
}

export interface CuratedAttraction {
  place_id: string; // The Golden Key (Google Place ID)
  destination_id: string;
  name: string;
  location: { lat: number; lng: number };
  static_data: {
    address?: string;
    opening_hours?: string;
    category?: string;
    description_fa?: string;
  };
  assets: {
    photos: string[];
    icon_3d?: string;
  };
  is_premium: boolean;
  updated_at: string;
}

export interface Narrative {
  id: string;
  place_id: string;
  audio_url: string;
  transcript: string;
  trigger_type: 'geofence' | 'manual' | 'entry';
  voice_profile: string;
  duration_seconds: number;
}

export interface HybridPOI extends Partial<CuratedAttraction> {
  id: string; // Map to place_id
  is_curated: boolean; // Flag to distinguish from raw Google POIs
  narrative?: Narrative;
}
