
-- =====================================================================================
-- RAHNAM FUEL ECONOMY UPGRADE: STEP 2 (Unified Ledger)
-- =====================================================================================

-- ۱. ایجاد یا ارتقای تابع کسر سوخت با قابلیت ثبت در لجر
-- این تابع تضمین می‌کند که هر مصرف سوخت یک ردپا در تاریخچه داشته باشد.
CREATE OR REPLACE FUNCTION deduct_fuel(px_seconds float8, px_reason text DEFAULT 'مکالمه صوتی')
RETURNS void 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_hours_to_deduct DECIMAL;
  v_transaction_id UUID := uuid_generate_v4();
BEGIN
  v_hours_to_deduct := px_seconds / 3600.0;

  -- الف. کسر از موجودی (با گارد عدم منفی شدن)
  UPDATE profiles
  SET wallet_balance = GREATEST(0, wallet_balance - v_hours_to_deduct)
  WHERE id = auth.uid();

  -- ب. ثبت در دفتر کل (Ledger) برای شفافیت کاربر
  -- ما از همان جدول reward_ledger استفاده می‌کنیم اما با مقدار منفی
  INSERT INTO reward_ledger (transaction_id, user_id, amount, xp_amount, reward_type, reference_id)
  VALUES (v_transaction_id, auth.uid(), -v_hours_to_deduct, 0, 'usage', px_reason);
END;
$$;

-- ۲. اضافه کردن دسترسی به لجر برای کاربر
-- اطمینان از اینکه کاربر می‌تواند تاریخچه تراکنش‌های خودش را ببیند.
DROP POLICY IF EXISTS "Users can view own transactions" ON reward_ledger;
CREATE POLICY "Users can view own transactions" 
ON reward_ledger FOR SELECT 
USING (auth.uid() = user_id);

-- ۳. ایجاد ایندکس زمانی برای سرعت لود تاریخچه
CREATE INDEX IF NOT EXISTS idx_reward_ledger_created_at ON reward_ledger(created_at DESC);
