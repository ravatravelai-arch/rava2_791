
-- ۱. افزودن فیلد وضعیت آنبوردینگ به پروفایل
ALTER TABLE IF EXISTS public.profiles 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

-- ۲. افزودن ستون شهر فعلی برای مدیریت هوشمند Survival vs Planning
ALTER TABLE IF EXISTS public.profiles 
ADD COLUMN IF NOT EXISTS current_city TEXT CHECK (current_city IN ('Istanbul', 'Dubai', 'Tehran'));

-- ۳. ارتقای ساختار پروفایل معنایی برای کانتکست AI
-- این ستون حافظه بلندمدت رهنما در مورد علایق مسافر است
COMMENT ON COLUMN profiles.semantic_profile IS 'Psychological and travel preferences for AI context injection';

-- ۴. ایجاد ایندکس برای جستجوی سریع وضعیت آنبوردینگ در روتینگ
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding ON profiles(onboarding_completed);

-- ۵. اطمینان از دسترسی امن: فقط مالک پروفایل می‌تواند وضعیت آنبوردینگ خود را تغییر دهد
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
