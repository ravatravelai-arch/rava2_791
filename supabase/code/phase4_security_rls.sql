
-- ==========================================
-- PHASE 4: SOCIAL SECURITY POLICIES (RLS)
-- ==========================================

-- ۱. فعال‌سازی RLS برای جداول جدید
ALTER TABLE footprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE stamps ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_reports ENABLE ROW LEVEL SECURITY;

-- ۲. سیاست‌های جدول ردپاها (Footprints)
-- همه می‌توانند ردپاهای تایید شده را ببینند
CREATE POLICY "Anyone can view verified footprints" 
ON footprints FOR SELECT 
USING (is_verified = TRUE);

-- فقط خود کاربر می‌تواند ردپای خودش را ثبت کند
CREATE POLICY "Users can insert their own footprints" 
ON footprints FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- ۳. سیاست‌های جدول مهرها (Stamps)
-- فقط خود کاربر مهرهای پاسپورتش را می‌بیند
CREATE POLICY "Users can view their own stamps" 
ON stamps FOR SELECT 
USING (auth.uid() = user_id);

-- ۴. سیاست‌های گزارش قیمت (Price Reports)
-- کاربر فقط گزارش‌های خودش را می‌بیند
CREATE POLICY "Users can view their own price reports" 
ON price_reports FOR SELECT 
USING (auth.uid() = user_id);

-- کاربر می‌تواند گزارش ثبت کند
CREATE POLICY "Users can submit price reports" 
ON price_reports FOR INSERT 
WITH CHECK (auth.uid() = user_id);
