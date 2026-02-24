
-- =====================================================================================
-- RAHNAM INFRASTRUCTURE REPAIR & HARDENING (V2.0)
-- =====================================================================================

-- ۱. فعال‌سازی RLS برای جداول حساس (بخش بحرانی گزارش)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- ۲. حذف سیاست‌های احتمالی قدیمی برای جلوگیری از تداخل
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own trips" ON trips;
DROP POLICY IF EXISTS "Users can insert own trips" ON trips;
DROP POLICY IF EXISTS "Users can view own chat logs" ON chat_logs;
DROP POLICY IF EXISTS "Users can insert own chat logs" ON chat_logs;

-- ۳. تعریف سیاست‌های دسترسی مالکانه (Ownership Policies)
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can view own trips" ON trips FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own trips" ON trips FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own chat logs" ON chat_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own chat logs" ON chat_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ۴. بهینه‌سازی عملکرد جغرافیایی (GIST Indexes)
-- این بخش سرعت جستجوهای مکانی رهنما را تضمین می‌کند
CREATE INDEX IF NOT EXISTS idx_places_cache_location ON places_cache USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_trips_location ON trips USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_footprints_location ON footprints USING GIST (location);

-- ۵. فعال‌سازی لایه ریل‌تایم (The Neural Link)
-- بازسازی لیست انتشار برای اطمینان از صحت عملکرد
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime FOR TABLE profiles, trips, price_reports, footprints;

-- ۶. سیاست‌های امنیتی لایه ذخیره‌سازی (Storage)
-- اجازه آپلود فقط به کاربران تایید هویت شده در باکت‌های مربوطه
-- توجه: اگر از قبل وجود داشته باشند، این دستورات خطا نمی‌دهند
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can upload tickets') THEN
        CREATE POLICY "Authenticated users can upload tickets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'tickets');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can upload price proofs') THEN
        CREATE POLICY "Authenticated users can upload price proofs" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'price_proofs');
    END IF;
END $$;
