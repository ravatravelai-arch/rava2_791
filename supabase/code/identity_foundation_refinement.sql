
-- ۱. اصلاح ستون پروفایل معنایی: تضمین عدم وجود NULL برای جلوگیری از کرش پارسر AI
ALTER TABLE IF EXISTS public.profiles 
ALTER COLUMN semantic_profile SET DEFAULT '{}'::JSONB;

-- ۲. پاکسازی مقادیر NULL احتمالی از قبل
UPDATE public.profiles 
SET semantic_profile = '{}'::JSONB 
WHERE semantic_profile IS NULL;

-- ۳. سخت‌سازی RLS (Row Level Security)
-- اطمینان از اینکه فقط مالک پروفایل می‌تواند داده‌های خود را بخواند یا ویرایش کند
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- ۴. ایندکس‌گذاری پیشرفته برای کوئری‌های JSONB (حافظه معنایی)
CREATE INDEX IF NOT EXISTS idx_profiles_semantic_vibe ON profiles USING GIN (semantic_profile);
