
-- =====================================================================================
-- PHASE 6: SECURITY ARCHITECTURE OVERHAUL (SPLIT AUTHORITY PROTOCOL)
-- =====================================================================================
-- معمار: Senior Architect
-- هدف: جداسازی توابع "کلاینت" (امن با auth.uid) از توابع "ادمین" (قدرتمند برای Edge Function)
-- وضعیت: Critical Security Patch
-- =====================================================================================

-- 1. پاکسازی توابع قدیمی و ناامن
-- ما نسخه قدیمی که user_id را از ورودی می‌گرفت حذف می‌کنیم تا حفره امنیتی بسته شود.
DROP FUNCTION IF EXISTS increment_wallet(UUID, DECIMAL, INTEGER);
DROP FUNCTION IF EXISTS increment_wallet(UUID, DECIMAL, INTEGER, TEXT);

-- =====================================================================================
-- LEVEL 1: THE IDEMPOTENCY LEDGER (دفتر کل تراکنش‌ها)
-- =====================================================================================
-- اطمینان از وجود جدول برای جلوگیری از پرداخت تکراری
CREATE TABLE IF NOT EXISTS reward_ledger (
  transaction_id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL NOT NULL,
  xp_amount INTEGER NOT NULL,
  reward_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- امنیت جدول دفتر کل: فقط کاربر خودش را می‌بیند، اما سرویس رول همه را
ALTER TABLE reward_ledger ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users view own rewards" ON reward_ledger;
CREATE POLICY "Users view own rewards" ON reward_ledger FOR SELECT USING (auth.uid() = user_id);

-- =====================================================================================
-- LEVEL 2: ADMIN RPC (Service Role Only)
-- =====================================================================================
-- این تابع خطرناک است! چون اجازه می‌دهد موجودی هر کسی تغییر کند.
-- بنابراین ما دسترسی EXECUTE عمومی را از آن می‌گیریم.

CREATE OR REPLACE FUNCTION admin_increment_wallet(
  target_user_id UUID,
  px_amount DECIMAL,
  px_xp_amount INTEGER,
  px_transaction_id UUID DEFAULT uuid_generate_v4(),
  px_reward_type TEXT DEFAULT 'system_admin'
)
RETURNS void 
LANGUAGE plpgsql
SECURITY DEFINER -- اجرا با دسترسی سوپرایوزر
AS $$
BEGIN
  -- 1. Idempotency Check
  IF EXISTS (SELECT 1 FROM reward_ledger WHERE transaction_id = px_transaction_id) THEN
    RETURN;
  END IF;

  -- 2. Audit Log
  INSERT INTO reward_ledger (transaction_id, user_id, amount, xp_amount, reward_type)
  VALUES (px_transaction_id, target_user_id, px_amount, px_xp_amount, px_reward_type);

  -- 3. Update Target Wallet
  UPDATE profiles
  SET 
    wallet_balance = wallet_balance + px_amount,
    xp_level = xp_level + px_xp_amount
  WHERE id = target_user_id;
END;
$$;

-- *** امن‌سازی حیاتی ***
-- حذف دسترسی از همه (حتی کاربران لاگین شده)
REVOKE EXECUTE ON FUNCTION admin_increment_wallet FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION admin_increment_wallet FROM anon;
REVOKE EXECUTE ON FUNCTION admin_increment_wallet FROM authenticated;
-- اعطای دسترسی فقط به سرویس رول (Edge Functions)
GRANT EXECUTE ON FUNCTION admin_increment_wallet TO service_role;


-- =====================================================================================
-- LEVEL 3: CLIENT RPC (User Safe)
-- =====================================================================================
-- این تابع برای استفاده در اپلیکیشن React است.
-- ورودی user_id ندارد! هویت را خودش کشف می‌کند.

CREATE OR REPLACE FUNCTION increment_my_wallet(
  px_transaction_id UUID,
  px_amount DECIMAL,
  px_xp_amount INTEGER,
  px_reward_type TEXT DEFAULT 'client_action'
)
RETURNS void 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_user_id UUID;
BEGIN
  -- استخراج هویت امن
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Not Authenticated';
  END IF;

  -- 1. Idempotency Check
  IF EXISTS (SELECT 1 FROM reward_ledger WHERE transaction_id = px_transaction_id) THEN
    RETURN;
  END IF;

  -- 2. Audit Log
  INSERT INTO reward_ledger (transaction_id, user_id, amount, xp_amount, reward_type)
  VALUES (px_transaction_id, current_user_id, px_amount, px_xp_amount, px_reward_type);

  -- 3. Update My Wallet
  UPDATE profiles
  SET 
    wallet_balance = wallet_balance + px_amount,
    xp_level = xp_level + px_xp_amount
  WHERE id = current_user_id;
END;
$$;

-- اعطای دسترسی به کاربران لاگین شده
GRANT EXECUTE ON FUNCTION increment_my_wallet TO authenticated;


-- =====================================================================================
-- LEVEL 4: UPDATE DEPENDENT FUNCTIONS
-- =====================================================================================
-- تابع process_poi_visit باید از نسخه امن (increment_my_wallet) استفاده کند

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
  current_user_id UUID;
BEGIN
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Not Authenticated';
  END IF;

  -- جلوگیری از مهر تکراری
  IF EXISTS (SELECT 1 FROM stamps WHERE user_id = current_user_id AND place_id = px_place_id) THEN
    RETURN; 
  END IF;

  -- ثبت مهر
  INSERT INTO stamps (user_id, place_id, place_name, city)
  VALUES (current_user_id, px_place_id, px_place_name, px_city);

  -- فراخوانی تابع امن داخلی
  -- نکته: چون داخل Security Definer هستیم، می‌توانیم مستقیم آپدیت کنیم یا تابع امن را صدا بزنیم.
  -- برای تمیزی کد، مستقیم در Ledger ثبت می‌کنیم و آپدیت می‌کنیم (شبیه increment_my_wallet)
  
  INSERT INTO reward_ledger (transaction_id, user_id, amount, xp_amount, reward_type)
  VALUES (px_transaction_id, current_user_id, v_reward_amount, v_reward_xp, 'stamp');

  UPDATE profiles
  SET 
    wallet_balance = wallet_balance + v_reward_amount,
    xp_level = xp_level + v_reward_xp
  WHERE id = current_user_id;
END;
$$;
