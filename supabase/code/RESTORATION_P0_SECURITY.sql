-- =====================================================================================
-- RESTORATION PATCH: P0 SECURITY HARDENING
-- =====================================================================================

-- ۱. حذف تمامی نسخه‌های قبلی تابع برای اطمینان از پاکسازی کامل
DROP FUNCTION IF EXISTS increment_wallet(UUID, DECIMAL, INTEGER);
DROP FUNCTION IF EXISTS increment_wallet(UUID, DECIMAL, INTEGER, TEXT);

-- ۲. بازنویسی نسخه نهایی و امن (فقط از سشن داخلی استفاده می‌کند)
-- این نسخه هیچ ورودی برای User ID نمی‌گیرد تا امکان Spoofing وجود نداشته باشد
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
  -- الف. جلوگیری از پاداش تکراری (Idempotency)
  IF EXISTS (SELECT 1 FROM reward_ledger WHERE transaction_id = px_transaction_id) THEN
    RETURN;
  END IF;

  -- ب. ثبت تراکنش با استفاده از هویت تایید شده در سشن (auth.uid)
  INSERT INTO reward_ledger (transaction_id, user_id, amount, xp_amount, reward_type)
  VALUES (px_transaction_id, auth.uid(), px_amount, px_xp_amount, px_reward_type);

  -- ج. به‌روزرسانی موجودی کاربر واقعی
  UPDATE profiles
  SET 
    wallet_balance = wallet_balance + px_amount,
    xp_level = xp_level + px_xp_amount
  WHERE id = auth.uid();
END;
$$;

-- تذکر: حتماً این اسکریپت را بعد از پچ‌های فاز ۴ اجرا کنید تا نسخه ایمن جایگزین شود.