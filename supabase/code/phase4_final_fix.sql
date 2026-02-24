
-- ==========================================
-- PHASE 4: FINAL REWARD & SECURITY ENGINE
-- ==========================================

-- ۱. تابع اتمیک شارژ کیف پول و XP
-- این تابع توسط اپلیکیشن صدا زده می‌شود تا پاداش‌ها را به صورت امن و یکجا اعمال کند.
CREATE OR REPLACE FUNCTION increment_wallet(
  px_user_id UUID, 
  px_amount DECIMAL, 
  px_xp_amount INTEGER
)
RETURNS void 
LANGUAGE plpgsql
SECURITY DEFINER -- اجرای با دسترسی سیستمی برای امنیت بیشتر
AS $$
BEGIN
  UPDATE profiles
  SET 
    wallet_balance = wallet_balance + px_amount,
    xp_level = xp_level + px_xp_amount
  WHERE id = px_user_id;
END;
$$;

-- ۲. اصلاح نهایی تابع رادار ردپا (Social Radar)
-- اضافه شدن فیلتر محتوای تایید شده برای جلوگیری از اسپم عمومی
CREATE OR REPLACE FUNCTION get_nearby_footprints(
  px_lat float8,
  px_lng float8,
  px_radius float8 DEFAULT 2000
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  lat float8,
  lng float8,
  user_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    f.content,
    ST_Y(f.location::geometry) as lat,
    ST_X(f.location::geometry) as lng,
    p.username as user_name,
    f.created_at
  FROM footprints f
  JOIN profiles p ON f.user_id = p.id
  WHERE 
    ST_DWithin(
      f.location,
      ST_SetSRID(ST_MakePoint(px_lng, px_lat), 4326),
      px_radius
    )
    AND f.is_verified = TRUE -- فقط موارد تایید شده نمایش داده شود
  ORDER BY f.created_at DESC
  LIMIT 50;
END;
$$;

-- ۳. ایجاد باکت در سطح دیتابیس (اطمینان از وجود متادیتا)
-- نکته: ساخت فیزیکی باکت باید در پنل استوریج انجام شود.
