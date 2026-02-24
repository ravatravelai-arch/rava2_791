
-- =====================================================================================
-- RAHNAM LEGACY & SOCIAL UPGRADE: STEP 3 (Favorites & Referral)
-- =====================================================================================

-- ۱. ایجاد جدول علاقه‌مندی‌ها
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    place_id TEXT NOT NULL,
    place_snapshot JSONB NOT NULL, -- ذخیره نام و تصویر برای لود سریع لیست
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, place_id)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own favorites" ON public.favorites 
    FOR ALL USING (auth.uid() = user_id);

-- ۲. ارتقای جدول پروفایل برای سیستم ارجاع
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE DEFAULT substring(md5(random()::text), 1, 6),
ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES public.profiles(id);

-- ۳. تابع اتمیک ثبت کد دعوت و واریز پاداش طرفین
CREATE OR REPLACE FUNCTION claim_referral(px_code TEXT)
RETURNS VOID 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_referrer_id UUID;
    v_reward_amount DECIMAL := 0.5; -- ۳۰ دقیقه سوخت برای هر دو طرف
BEGIN
    -- الف. پیدا کردن صاحب کد
    SELECT id INTO v_referrer_id FROM profiles WHERE referral_code = px_code;
    
    IF v_referrer_id IS NULL THEN
        RAISE EXCEPTION 'INVALID_CODE: رفیق این کد اشتباهه!';
    END IF;

    -- ب. جلوگیری از دعوت خود (Self-referral)
    IF v_referrer_id = auth.uid() THEN
        RAISE EXCEPTION 'SELF_REFERRAL: خودت رو نمیتونی دعوت کنی بامرام!';
    END IF;

    -- ج. بررسی اینکه کاربر قبلاً دعوت شده یا نه
    IF EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND referred_by IS NOT NULL) THEN
        RAISE EXCEPTION 'ALREADY_REFERRED: تو که قبلاً دعوت شدی عزیز!';
    END IF;

    -- د. ثبت معرف برای کاربر فعلی
    UPDATE profiles SET referred_by = v_referrer_id WHERE id = auth.uid();

    -- هـ. واریز پاداش به معرف
    PERFORM increment_wallet(uuid_generate_v4(), v_reward_amount, 100, 'referral_bonus');
    
    -- و. واریز پاداش به دعوت‌شونده (با سوییچ به هویت او)
    UPDATE profiles 
    SET wallet_balance = wallet_balance + v_reward_amount,
        xp_level = xp_level + 100
    WHERE id = v_referrer_id;

    -- ز. ثبت تراکنش در لجر برای معرف (به صورت سیستمی)
    INSERT INTO reward_ledger (transaction_id, user_id, amount, xp_amount, reward_type, reference_id)
    VALUES (uuid_generate_v4(), v_referrer_id, v_reward_amount, 100, 'referral_bonus', auth.uid()::text);

END;
$$;
