-- ==========================================
-- PATCH 1.1: SECURE ATOMIC REWARD ENGINE
-- ==========================================

-- حذف نسخه قبلی برای اعمال تغییرات امنیتی در امضای تابع
DROP FUNCTION IF EXISTS process_poi_visit(UUID, TEXT, TEXT, TEXT, DECIMAL, INTEGER);

-- تابع جدید: فقط اطلاعات مکان را می‌گیرد، مقدار پاداش توسط سرور تعیین می‌شود.
CREATE OR REPLACE FUNCTION process_poi_visit(
  px_transaction_id UUID,
  px_place_id TEXT,
  px_place_name TEXT,
  px_city TEXT
)
RETURNS VOID 
LANGUAGE plpgsql
SECURITY DEFINER -- امنیت بالا: اجرا با دسترسی سیستم
AS $$
DECLARE
  v_reward_amount DECIMAL := 0.1; -- ۱۰ درصد ساعت معادل ۶ دقیقه (ثابت و امن)
  v_reward_xp INTEGER := 50;     -- ۵۰ امتیاز تجربه (ثابت و امن)
BEGIN
  -- ۱. جلوگیری از پاداش تکراری (Idempotency)
  IF EXISTS (SELECT 1 FROM reward_ledger WHERE transaction_id = px_transaction_id) THEN
    RETURN;
  END IF;

  -- ۲. جلوگیری از مهر تکراری برای یک مکان خاص
  IF EXISTS (SELECT 1 FROM stamps WHERE user_id = auth.uid() AND place_id = px_place_id) THEN
    RAISE EXCEPTION 'DUPLICATE_STAMP: رفیق این مهر رو که قبلاً زدی!';
  END IF;

  -- ۳. ثبت مهر در پاسپورت دیجیتال
  INSERT INTO stamps (user_id, place_id, place_name, city)
  VALUES (auth.uid(), px_place_id, px_place_name, px_city);

  -- ۴. ثبت در دفتر کل پاداش‌ها (Audit Trail)
  INSERT INTO reward_ledger (transaction_id, user_id, amount, xp_amount, reward_type)
  VALUES (px_transaction_id, auth.uid(), v_reward_amount, v_reward_xp, 'stamp');

  -- ۵. به‌روزرسانی نهایی پروفایل کاربر
  UPDATE profiles
  SET 
    wallet_balance = wallet_balance + v_reward_amount,
    xp_level = xp_level + v_reward_xp
  WHERE id = auth.uid();

EXCEPTION
  WHEN OTHERS THEN
    RAISE; 
END;
$$;
