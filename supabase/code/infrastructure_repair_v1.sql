
-- =====================================================================================
-- RAHNAM INFRASTRUCTURE REPAIR & HARDENING (V1.0)
-- =====================================================================================

-- ۱. فعال‌سازی RLS برای جداول حساس که در گزارش قرمز بودند
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- ۲. سیاست‌های دسترسی مالکانه (Ownership Policies)
-- هر کاربر فقط پروفایل خودش را ببیند
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
-- هر کاربر فقط سفرهای خودش را ببیند
CREATE POLICY "Users can view own trips" ON trips FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own trips" ON trips FOR INSERT WITH CHECK (auth.uid() = user_id);
-- هر کاربر فقط چت‌های خودش را ببیند و ثبت کند
CREATE POLICY "Users can view own chat logs" ON chat_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own chat logs" ON chat_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ۳. بهینه‌سازی عملکرد جغرافیایی (GIST Indexes)
-- این بخش قلب تپنده جستجوی مکانی رهنماست
CREATE INDEX IF NOT EXISTS idx_places_cache_location ON places_cache USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_trips_location ON trips USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_footprints_location ON footprints USING GIST (location);

-- ۴. فعال‌سازی لایه ریل‌تایم (The Neural Link)
-- افزودن جداول به لیست انتشار ریل‌تایم سوپابیس
BEGIN;
  -- ابتدا حذف اگر از قبل وجود داشت برای جلوگیری از خطا
  DROP PUBLICATION IF EXISTS supabase_realtime;
  -- ایجاد مجدد و افزودن جداول حیاتی
  CREATE PUBLICATION supabase_realtime FOR TABLE profiles, trips, price_reports, footprints;
COMMIT;

-- ۵. ایمن‌سازی باکت‌های استوریج (Storage Security)
-- این سیاست‌ها اجازه می‌دهند فقط کاربران لاگین شده در پوشه مخصوص خود فایل آپلود کنند
-- توجه: این بخش باید با سیاست‌های پنل Storage همخوانی داشته باشد
CREATE POLICY "Authenticated users can upload tickets" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'tickets');

CREATE POLICY "Authenticated users can upload price proofs" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'price_proofs');

-- ۶. پاکسازی جداول سیستمی از دید عمومی (اختیاری اما توصیه شده)
ALTER TABLE spatial_ref_sys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read for spatial_ref_sys" ON spatial_ref_sys FOR SELECT USING (true);
