
/**
 * تبدیل اعداد انگلیسی به فارسی
 */
export const toPersianDigits = (value: string | number): string => {
  const str = String(value);
  return str.replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

/**
 * تبدیل مبالغ ارزی به تومان با فرمت استاندارد فارسی
 * @param amount مبلغ به واحد محلی (لیر یا درهم)
 * @param rate نرخ تبدیل لحظه‌ای به تومان
 */
export const formatAsToman = (amount: number, rate: number): string => {
  const inToman = Math.floor(amount * rate);
  // فرمت سه رقم سه رقم
  const formatted = new Intl.NumberFormat('en-US').format(inToman);
  return toPersianDigits(formatted) + ' تومان';
};

/**
 * بهینه‌سازی هوشمند تصاویر (Unsplash & Google Photos)
 * کاهش حجم با تغییر کیفیت و عرض تصویر
 */
export const getOptimizedImageUrl = (url: string | undefined | null, width: number = 800): string => {
  if (!url) return '';
  
  try {
    // 1. Unsplash Optimization
    if (url.includes('images.unsplash.com')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}auto=format&fit=crop&q=70&w=${width}`;
    }

    // 2. Google Photos / User Content Optimization
    // لینک‌های گوگل معمولاً پارامترهای سایز را در URL دارند یا می‌توان به آن‌ها اضافه کرد
    if (url.includes('googleusercontent.com') || url.includes('maps.googleapis.com')) {
       // اگر URL ساین شده است، دستکاری آن ممکن است باعث شکستن امضا شود.
       // اما برای لینک‌های عمومی، می‌توان پارامتر عرض را تنظیم کرد.
       // فعلاً برای ایمنی، اگر پارامتر سایز ندارد، اضافه می‌کنیم.
       if (!url.includes('=w') && !url.includes('=s')) {
          // برای برخی لینک‌های گوگل کانتنت، اضافه کردن =w{width} کار می‌کند
          return `${url}=w${width}-h${width}-c`; // -c برای کراپ کردن
       }
    }
    
    return url;
  } catch (e) {
    // در صورت بروز هرگونه خطا در پارس کردن، همان URL اصلی را برگردان
    return url;
  }
};

export function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function encodeBase64(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const audioData = new Int16Array(
    data.buffer,
    data.byteOffset,
    data.length / 2
  );
  
  const frameCount = audioData.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = audioData[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
