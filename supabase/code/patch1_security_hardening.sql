-- ==========================================
-- PATCH 1: SECURITY & IDEMPOTENCY LEDGER
-- ==========================================

-- ۱. ایجاد جدول دفتر کل برای ثبت تراکنش‌های پاداش
-- این جدول تضمین می‌کند که هر رویداد (مثل یک مهر خاص) فقط یکبار جایزه می‌گیرد.
CREATE TABLE IF NOT EXISTS reward_ledger (
  transaction_id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL NOT NULL,
  xp_amount INTEGER NOT NULL,
  reward_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ۲. بازنویسی تابع واریز پاداش (نسخه امن و Harden شده)
-- تغییرات: حذف px_user_id ورودی و استفاده از auth.uid()
CREATE OR REPLACE FUNCTION increment_wallet(
  px_transaction_id UUID,
  px_amount DECIMAL,
  px_xp_amount INTEGER,
  px_reward_type TEXT DEFAULT 'general'
)
RETURNS void 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- بررسی اینکه آیا این تراکنش قبلاً پردازش شده است؟ (Idempotency)
  IF EXISTS (SELECT 1 FROM reward_ledger WHERE transaction_id = px_transaction_id) THEN
    RETURN;
  END IF;

  -- ثبت تراکنش در دفتر کل
  INSERT INTO reward_ledger (transaction_id, user_id, amount, xp_amount, reward_type)
  VALUES (px_transaction_id, auth.uid(), px_amount, px_xp_amount, px_reward_type);

  -- به‌روزرسانی موجودی کاربر واقعی (بر اساس سشن امن)
  UPDATE profiles
  SET 
    wallet_balance = wallet_balance + px_amount,
    xp_level = xp_level + px_xp_amount
  WHERE id = auth.uid();
END;
$$;

-- فعال‌سازی RLS برای جدول دفتر کل
ALTER TABLE reward_ledger ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only see their own rewards" ON reward_ledger FOR SELECT USING (auth.uid() = user_id);
