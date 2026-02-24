
-- =====================================================================================
-- RAHNAM STORAGE SECURITY PROTOCOL: STEP 1 (Identity Foundation)
-- =====================================================================================

-- ۱. اجازه آپلود آواتار فقط برای صاحب اکانت
-- قانون: فایل باید در پوشه‌ای هم‌نام با UID کاربر قرار گیرد.
CREATE POLICY "Avatar Upload Policy" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (
    bucket_id = 'avatars' 
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ۲. اجازه حذف آواتار قدیمی فقط برای صاحب اکانت
CREATE POLICY "Avatar Delete Policy" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (
    bucket_id = 'avatars' 
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ۳. اجازه آپدیت آواتار
CREATE POLICY "Avatar Update Policy" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (
    bucket_id = 'avatars' 
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ۴. اجازه مشاهده عمومی آواتارها
CREATE POLICY "Avatar Public View" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'avatars');
