
/**
 * استخراج جی‌سان از متن خروجی جمینی
 * این تابع بلوک‌های مارک‌داون ```json را شناسایی و حذف می‌کند
 */
export function extractJSON<T>(text: string): T {
  try {
    // پاکسازی احتمالی تگ‌های مارک‌داون
    const cleanText = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();
    
    return JSON.parse(cleanText) as T;
  } catch (e) {
    console.error("JSON Extraction Error:", e, "Raw Text:", text);
    throw new Error("دیتای دریافتی معتبر نیست.");
  }
}
