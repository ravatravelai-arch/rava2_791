
/**
 * GeoPoint Utility Class
 * مرجع واحد برای مدیریت مختصات در کل اپلیکیشن
 */
export class GeoPoint {
  constructor(public readonly lat: number, public readonly lng: number) {
    // ولیدیشن سخت‌گیرانه برای جلوگیری از باگ‌های رندرینگ نقشه
    if (isNaN(lat) || isNaN(lng)) {
      throw new Error("Invalid coordinates: Coordinates must be numbers.");
    }
    
    // نرمال‌سازی و چک کردن محدوده‌های جغرافیایی
    // اگر مختصات دقیقا 0,0 باشد (Null Island) معمولاً نشان‌دهنده خطای داده است، اما فعلاً اجازه می‌دهیم.
    if (lat < -90 || lat > 90) {
      console.warn(`Warning: Latitude ${lat} is out of bounds (-90 to 90). Clamped.`);
    }

    if (lng < -180 || lng > 180) {
       console.warn(`Warning: Longitude ${lng} is out of bounds (-180 to 180).`);
    }
  }

  /** خروجی استاندارد برای گوگل مپ */
  toGoogle(): { lat: number; lng: number } {
    return { lat: this.lat, lng: this.lng };
  }

  /** خروجی استاندارد برای PostGIS (POINT(Lng Lat)) */
  toPostGIS(): string {
    return `POINT(${this.lng} ${this.lat})`;
  }

  /** خروجی آرایه برای استیت‌های داخلی [Lat, Lng] */
  toArray(): [number, number] {
    return [this.lat, this.lng];
  }

  /** ساخت شیء ایمن از آرایه */
  static fromArray(arr: [number, number] | number[] | null | undefined): GeoPoint | null {
    try {
      if (!arr || arr.length < 2) return null;
      return new GeoPoint(arr[0], arr[1]);
    } catch (e) {
      console.error("GeoPoint Construction Failed:", e);
      return null;
    }
  }

  /** 
   * ساخت شیء از خروجی دیتابیس
   * این متد هوشمند هم رشته‌های WKT و هم آبجکت‌های GeoJSON را هندل می‌کند 
   */
  static fromPostGIS(input: any): GeoPoint | null {
    if (!input) return null;

    try {
      // سناریو ۱: ورودی یک آبجکت GeoJSON است (رفتار پیش‌فرض Supabase JS Client)
      // فرمت: { type: "Point", coordinates: [Lng, Lat] }
      if (typeof input === 'object' && input.type === 'Point' && Array.isArray(input.coordinates)) {
        const [lng, lat] = input.coordinates;
        return new GeoPoint(lat, lng); // توجه: تبدیل ترتیب از Lng,Lat به Lat,Lng
      }

      // سناریو ۲: ورودی یک رشته WKT است (خروجی مستقیم SQL یا RPC)
      // فرمت: "POINT(Lng Lat)"
      if (typeof input === 'string') {
        // حذف فضای خالی اضافی و نرمال‌سازی
        const cleanInput = input.trim();
        const match = cleanInput.match(/POINT\s*\(\s*([-\d.]+)\s+([-\d.]+)\s*\)/i);
        
        if (match && match.length >= 3) {
          const lng = parseFloat(match[1]);
          const lat = parseFloat(match[2]);
          return new GeoPoint(lat, lng);
        }
      }

      console.warn("[GeoPoint] Unknown PostGIS format:", input);
      return null;

    } catch (e) {
      console.error("[GeoPoint] Parsing failed:", e);
      return null;
    }
  }
}
