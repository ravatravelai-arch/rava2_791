
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^2.48.1';
import { APP_CONFIG } from '../config';

/**
 * کلاینت سوپابیس رهنما
 * متصل به تنظیمات مرکزی (APP_CONFIG) که از متغیرهای محیطی Vite تغذیه می‌کند.
 * این روش امنیت و قابلیت اطمینان را در محیط پروداکشن افزایش می‌دهد.
 */

export const supabase = createClient(
  APP_CONFIG.SUPABASE.URL, 
  APP_CONFIG.SUPABASE.ANON_KEY, 
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage
    }
  }
);
