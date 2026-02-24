
-- =====================================================================================
-- FINAL SECURITY PATCH (V2.0) - THE GOLDEN LEDGER
-- =====================================================================================

-- ۱. پاکسازی کامل تمامی نسخه‌های قبلی و ناامن برای جلوگیری از تداخل
DROP FUNCTION IF EXISTS increment_wallet(UUID, DECIMAL, INTEGER);
DROP FUNCTION IF EXISTS increment_wallet(UUID, DECIMAL, INTEGER, TEXT);
DROP FUNCTION IF EXISTS process_poi_visit(UUID, TEXT, TEXT, TEXT);

-- ۲. بازنویسی نسخه نهایی و غیرقابل نفوذ پاداش
-- قانون: هویت فقط و فقط از توکن JWT استخراج می‌شود
CREATE OR REPLACE FUNCTION increment_wallet(
  px_transaction_id UUID,
  px_amount DECIMAL,
  px_xp_amount INTEGER,
  px_reward_type TEXT DEFAULT 'general'
)
RETURNS void 
LANGUAGE plpgsql
SECURITY DEFINER -- اجرا با دسترسی سیستمی برای دور زدن محدودیت‌های مستقیم، اما مقید به لاجیک زیر
AS $$
BEGIN
  -- الف. جلوگیری از پاداش تکراری (Idempotency)
  IF EXISTS (SELECT 1 FROM reward_ledger WHERE transaction_id = px_transaction_id) THEN
    RETURN;
  END IF;

  -- ب. ثبت تراکنش در دفتر کل (حسابرسی امنیتی)
  INSERT INTO reward_ledger (transaction_id, user_id, amount, xp_amount, reward_type)
  VALUES (px_transaction_id, auth.uid(), px_amount, px_xp_amount, px_reward_type);

  -- ج. به‌روزرسانی موجودی کاربر (فقط صاحب سشن فعلی)
  UPDATE profiles
  SET 
    wallet_balance = wallet_balance + px_amount,
    xp_level = xp_level + px_xp_amount
  WHERE id = auth.uid();
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User profile not found or session invalid.';
  END IF;
END;
$$;

-- ۳. ارتقای تابع ثبت مهر (Stamping) به نسخه اتمیک
CREATE OR REPLACE FUNCTION process_poi_visit(
  px_transaction_id UUID,
  px_place_id TEXT,
  px_place_name TEXT,
  px_city TEXT
)
RETURNS VOID 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_reward_amount DECIMAL := 0.1; 
  v_reward_xp INTEGER := 50;
BEGIN
  -- چک کردن مالکیت سشن
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- جلوگیری از مهر تکراری
  IF EXISTS (SELECT 1 FROM stamps WHERE user_id = auth.uid() AND place_id = px_place_id) THEN
    RETURN;
  END IF;

  -- ثبت مهر
  INSERT INTO stamps (user_id, place_id, place_name, city)
  VALUES (auth.uid(), px_place_id, px_place_name, px_city);

  -- فراخوانی تابع امن داخلی
  PERFORM increment_wallet(px_transaction_id, v_reward_amount, v_reward_xp, 'stamp');
END;
$$;
