
import { supabase } from './supabaseClient';

export const storageService = {
  /**
   * آپلود آواتار در باکت avatars
   * @param file فایل تصویر
   * @param userId آیدی کاربر برای پوشه‌بندی
   * @param oldUrl آدرس آواتار قبلی برای پاکسازی
   */
  async uploadAvatar(file: File, userId: string, oldUrl?: string | null): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // ۱. آپلود فایل جدید
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // ۲. دریافت URL عمومی
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    // ۳. پاکسازی آواتار قدیمی (Async - بدون توقف جریان اصلی)
    if (oldUrl) {
      const oldPath = oldUrl.split('/').pop();
      if (oldPath) {
        supabase.storage.from('avatars').remove([`${userId}/${oldPath}`]).then();
      }
    }

    return publicUrl;
  }
};
