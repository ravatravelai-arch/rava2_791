
-- =====================================================================================
-- PHASE 4: ATOMIC REWARD & GAMIFICATION ENGINE
-- =====================================================================================

-- ۱. ایجاد جدول دفتر کل پاداش (Audit Trail)
-- این جدول مانع از واریز پاداش تکراری برای یک تراکنش واحد می‌شود
CREATE TABLE IF NOT EXISTS public.reward_ledger (
    transaction_id UUID PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount DECIMAL NOT NULL,
    xp_amount INTEGER NOT NULL,
    reward_type TEXT NOT NULL, -- 'stamp', 'price_report', 'footprint'
    reference_id TEXT, -- ID مکان یا گزارش مربوطه
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.reward_ledger ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only view their own rewards" ON public.reward_ledger FOR SELECT USING (auth.uid() = user_id);

-- ۲. تابع اتمیک ثبت مهر و واریز پاداش (The Secure Stamp)
-- این تابع تضمین می‌کند که مهر زدن و واریز سوخت، یا با هم انجام شوند یا هیچکدام
CREATE OR REPLACE FUNCTION process_poi_visit(
    px_transaction_id UUID,
    px_place_id TEXT,
    px_place_name TEXT,
    px_city TEXT
)
RETURNS VOID 
LANGUAGE plpgsql
SECURITY DEFINER -- اجرا با سطح دسترسی بالا برای تضمین امنیت مالی
AS $$
DECLARE
    v_reward_fuel DECIMAL := 0.1; -- ۶ دقیقه شارژ
    v_reward_xp INTEGER := 50;
    v_current_user UUID;
BEGIN
    v_current_user := auth.uid();
    
    IF v_current_user IS NULL THEN
        RAISE EXCEPTION 'Unauthorized: برای ثبت مهر باید لاگین باشی رفیق.';
    END IF;

    -- جلوگیری از پاداش تکراری (Idempotency)
    IF EXISTS (SELECT 1 FROM reward_ledger WHERE transaction_id = px_transaction_id) THEN
        RETURN;
    END IF;

    -- جلوگیری از ثبت مهر تکراری برای یک مکان خاص
    IF EXISTS (SELECT 1 FROM stamps WHERE user_id = v_current_user AND place_id = px_place_id) THEN
        RETURN;
      -- RAISE EXCEPTION 'Duplicate: این مهر رو قبلاً زدی عزیز.';
    END IF;

    -- ۱. ثبت مهر در پاسپورت
    INSERT INTO stamps (user_id, place_id, place_name, city)
    VALUES (v_current_user, px_place_id, px_place_name, px_city);

    -- ۲. ثبت در دفتر کل تراکنش‌ها
    INSERT INTO reward_ledger (transaction_id, user_id, amount, xp_amount, reward_type, reference_id)
    VALUES (px_transaction_id, v_current_user, v_reward_fuel, v_reward_xp, 'stamp', px_place_id);

    -- ۳. آپدیت پروفایل کاربر
    UPDATE profiles
    SET 
        wallet_balance = wallet_balance + v_reward_fuel,
        xp_level = xp_level + v_reward_xp
    WHERE id = v_current_user;
END;
$$;
