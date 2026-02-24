
import { supabase } from './supabaseClient';
import { POI } from '../types';
import { GeoPoint } from '../utils/geoPoint';

export const discoveryService = {
  /**
   * جستجوی مکان‌های نزدیک کاربر بر اساس مختصات و مود (مکان‌های عمومی کش شده)
   */
  async searchNearby(lat: number, lng: number, radius: number = 5000, mood?: string): Promise<POI[]> {
    // نکته مهم: ورودی RPC ما Lng, Lat است، اما GeoPoint برای ما این تبدیل را مدیریت می‌کند اگر نیاز باشد
    // اما اینجا ما مقادیر خام را به RPC می‌فرستیم که انتظار دارد مختصات سواپ شده باشند.
    // در فایل SQL فاز ۲، تابع search_nearby_places با ST_MakePoint(px_lng, px_lat) کار می‌کند.
    
    const { data, error } = await supabase.rpc('search_nearby_places', {
      px_lat: lat,
      px_lng: lng,
      px_radius: radius,
      px_mood: mood || null
    });

    if (error) {
      console.error('RPC Error:', error);
      return [];
    }

    return (data || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      lat: item.lat, // خروجی RPC به صورت ST_Y (Lat) است، پس مستقیم استفاده می‌کنیم
      lng: item.lng, // خروجی RPC به صورت ST_X (Lng) است
      category: item.category,
      description: item.vibe_summary,
      image: item.image_url,
      priceLevel: item.price_level,
      moodTags: [item.category]
    }));
  },

  /**
   * دریافت مکان‌های منتخب رهنما (Curated POIs) بر اساس نام شهر
   * استراتژی: استفاده از Join برای استقلال از آیدی‌های هاردکد شده
   */
  async getCuratedPlaces(cityName: string): Promise<POI[]> {
    try {
      const { data, error } = await supabase
        .from('attractions')
        .select(`
          place_id,
          name,
          location,
          static_data,
          assets,
          is_premium,
          destinations!inner(name)
        `)
        .eq('destinations.name', cityName);

      if (error) throw error;

      return (data || []).map((item: any) => {
        // تبدیل فرمت PostGIS/GeoJSON به کلاس GeoPoint با استفاده از متد هوشمند جدید
        const geo = GeoPoint.fromPostGIS(item.location);
        
        // اگر مختصات نامعتبر باشد، این مکان را فیلتر می‌کنیم (در عمل با map شاید آیتم نال برگردد، اما اینجا دیفالت صفر می‌گذاریم)
        // در یک پیاده‌سازی سخت‌گیرانه‌تر، باید filter(Boolean) انجام دهیم.
        
        return {
          id: item.place_id,
          name: item.name,
          lat: geo?.lat || 0,
          lng: geo?.lng || 0,
          category: item.static_data?.category || 'historical',
          description: item.static_data?.description_fa || '',
          address: item.static_data?.address || '',
          image: item.assets?.photos?.[0] || '',
          is_curated: true,
          moodTags: item.is_premium ? ['Premium', 'Verified'] : []
        };
      }).filter(poi => poi.lat !== 0 && poi.lng !== 0); // حذف مکان‌های نامعتبر
      
    } catch (e) {
      console.error("[DiscoveryService] Failed to fetch curated places:", e);
      return [];
    }
  }
};
