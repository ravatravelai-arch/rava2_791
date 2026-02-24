
-- =====================================================================================
-- PROJECT FROZEN MEMORY: DATABASE SCHEMA V1.0
-- =====================================================================================

-- ۱. فعال‌سازی اکستنشن‌های مورد نیاز (اگر از قبل فعال نباشند)
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ۲. جدول شهرها (Destinations)
-- کاربرد: مدیریت پکیج‌های دانلود آفلاین و نسخه‌بندی محتوا
CREATE TABLE IF NOT EXISTS public.destinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE, -- مثلا: 'Istanbul', 'Dubai'
    center GEOGRAPHY(POINT, 4326) NOT NULL, -- مرکز شهر برای زوم اولیه
    manifest_version INTEGER DEFAULT 1, -- برای چک کردن آپدیت آفلاین (OTA Updates)
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ۳. جدول جاذبه‌های ویژه ما (Attractions)
-- استراتژی: استفاده از google_place_id به عنوان کلید اصلی جهت تطبیق با گوگل مپ
CREATE TABLE IF NOT EXISTS public.attractions (
    place_id TEXT PRIMARY KEY, -- کلید طلایی: Google Place ID (e.g., ChIJ...)
    destination_id UUID REFERENCES public.destinations(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- نام فارسی اختصاصی ما
    location GEOGRAPHY(POINT, 4326) NOT NULL, -- مختصات دقیق (Lng, Lat)
    
    -- دیتای فریز شده (برای حذف هزینه Google API)
    static_data JSONB DEFAULT '{}'::JSONB, -- { "address": "...", "opening_hours": "...", "category": "..." }
    
    -- دارایی‌های اختصاصی رهنما
    assets JSONB DEFAULT '{ "photos": [], "3d_icon": null }'::JSONB,
    
    is_premium BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ۴. جدول روایت‌ها (Narratives)
-- کاربرد: ذخیره فایل‌های صوتی ضبط شده توسط گوینده انسانی
CREATE TABLE IF NOT EXISTS public.narratives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    place_id TEXT REFERENCES public.attractions(place_id) ON DELETE CASCADE,
    audio_url TEXT NOT NULL, -- لینک فایل در Supabase Storage
    transcript TEXT, -- متن روایت (برای زیرنویس یا جستجو)
    
    -- تنظیمات پخش
    trigger_type TEXT DEFAULT 'geofence' CHECK (trigger_type IN ('geofence', 'manual', 'entry')),
    voice_profile TEXT DEFAULT 'Kore', -- برای تطبیق با صدای AI
    duration_seconds INTEGER, -- طول فایل صوتی
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ۵. ایندکس‌های جغرافیایی و عملکردی
CREATE INDEX IF NOT EXISTS idx_destinations_center ON public.destinations USING GIST (center);
CREATE INDEX IF NOT EXISTS idx_attractions_location ON public.attractions USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_attractions_destination ON public.attractions (destination_id);
CREATE INDEX IF NOT EXISTS idx_narratives_place ON public.narratives (place_id);

-- ۶. سیاست‌های امنیتی (RLS)
-- تمامی جداول برای عموم قابل خواندن هستند (SELECT) اما فقط ادمین اجازه نوشتن دارد.

ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.narratives ENABLE ROW LEVEL SECURITY;

-- سیاست خواندن عمومی
DROP POLICY IF EXISTS "Public Read Destinations" ON public.destinations;
CREATE POLICY "Public Read Destinations" ON public.destinations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Attractions" ON public.attractions;
CREATE POLICY "Public Read Attractions" ON public.attractions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Narratives" ON public.narratives;
CREATE POLICY "Public Read Narratives" ON public.narratives FOR SELECT USING (true);
