
-- ۱. ایجاد جدول آرشیو چت‌ها برای تحلیل‌های هوش مصنوعی
CREATE TABLE IF NOT EXISTS public.chat_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('user', 'model')),
    content TEXT,
    metadata JSONB DEFAULT '{}'::JSONB, -- شامل لوکیشن، زمان و وضعیت سوخت
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ۲. افزودن فیلد آخرین خلاصه‌سازی به پروفایل
ALTER TABLE IF EXISTS public.profiles 
ADD COLUMN IF NOT EXISTS last_summary_at TIMESTAMP WITH TIME ZONE;

-- ۳. فعال‌سازی RLS برای امنیت چت‌ها
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own chat logs" 
ON public.chat_logs FOR ALL 
USING (auth.uid() = user_id);

-- ۴. ایندکس‌گذاری برای سرعت پردازش در Edge Function
CREATE INDEX IF NOT EXISTS idx_chat_logs_user_date ON chat_logs(user_id, created_at DESC);
