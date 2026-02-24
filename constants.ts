
import { POI, Flashcard } from './types';

// مختصات ایستگاه‌های اصلی مترو برای محاسبات "نزدیک‌ترین ایستگاه"
export const SUBWAY_STATIONS: Record<'Istanbul' | 'Dubai', { name: string, lat: number, lng: number }[]> = {
  Istanbul: [
    { name: 'ایستگاه تکسیم (Taksim)', lat: 41.0369, lng: 28.9850 },
    { name: 'ایستگاه شیشلی (Şişلی)', lat: 41.0631, lng: 28.9922 },
    { name: 'ایستگاه ینی‌کاپی (Yenikapı)', lat: 41.0051, lng: 28.9531 },
    { name: 'ایستگاه لونت (Levent)', lat: 41.0758, lng: 29.0150 }
  ],
  Dubai: [
    { name: 'Dubai Mall / Burj Khalifa', lat: 25.2007, lng: 55.2719 },
    { name: 'Mall of the Emirates', lat: 25.1181, lng: 55.2006 },
    { name: 'Union Station', lat: 25.2662, lng: 55.3126 },
    { name: 'ADCB Station', lat: 25.2397, lng: 55.3023 }
  ]
};

// لیست‌های هاردکد شده قبلی حذف شدند تا دیتا مستقیم از سوپابیس واکشی شود.
export const ISTANBUL_POIS: POI[] = [];
export const DUBAI_POIS: POI[] = [];

export const FLASHCARDS_DATA: Record<'Istanbul' | 'Dubai', Flashcard[]> = {
  Istanbul: [
    { id: 'tr1', category: 'emergency', icon: '🚨', farsi: 'کمک لازم دارم', local: 'Yardıma ihtiyacım var', pronunciation: 'یاردیم‌اَ ایحتیاجیم وار' },
    { id: 'tr2', category: 'health', icon: '🥜', farsi: 'حساسیت به آجیل دارم', local: 'Kuruyemiş alerjim var', pronunciation: 'کورویِمیش آلِرژیم وار' },
    { id: 'tr3', category: 'general', icon: '🚽', farsi: 'دستشویی کجاست؟', local: 'Tuvalet nerede?', pronunciation: 'تووالت نِرِده؟' },
    { id: 'tr4', category: 'transport', icon: '🚉', farsi: 'نزدیک‌ترین مترو کجاست؟', local: 'En Yakın metro nerede?', pronunciation: 'اِن یاکین مترو نِرِده؟' },
    { id: 'tr5', category: 'food', icon: '🌶️', farsi: 'این غذا تنده؟', local: 'Bu yemek acı mı?', pronunciation: 'بو یِمِک آجی می؟' },
    { id: 'tr6', category: 'emergency', icon: '🚓', farsi: 'پلیس را خبر کنید', local: 'Polis çağırın', pronunciation: 'پولیس چاییرین' },
  ],
  Dubai: [
    { id: 'ae1', category: 'emergency', icon: '🚨', farsi: 'کمک لازم دارم', local: 'أحتاج إلى مساعدة', pronunciation: 'احتاجُ الی مُساعده' },
    { id: 'ae2', category: 'health', icon: '🥜', farsi: 'حساسیت به آجیل دارم', local: 'لدي حساسية من المكسرات', pronunciation: 'لَدَیّ حساسیه من المکسرات' },
    { id: 'ae3', category: 'general', icon: '🚽', farsi: 'دستشویی کجاست؟', local: 'أين الحمام؟', pronunciation: 'اَینَ الحَمّام؟' },
    { id: 'ae4', category: 'transport', icon: '🚉', farsi: 'نزدیک‌ترین مترو کجاست؟', local: 'أين أقرب محطة مترو؟', pronunciation: 'اَینَ اَقرب مَحطّه مترو؟' },
    { id: 'ae5', category: 'food', icon: '🌶️', farsi: 'این غذا تنده؟', local: 'هل هذا الطعام حار؟', pronunciation: 'هل هذا الطعام حار؟' },
    { id: 'ae6', category: 'emergency', icon: '🚓', farsi: 'پلیس را خبر کنید', local: 'اتصل بالشرطة', pronunciation: 'اِتّصل بالشرطه' },
  ]
};

export const SYSTEM_INSTRUCTION = `
تو "رهنما" هستی، یک تور لیدر بومی، باحال و حاضر‌جواب برای ایرانیان در استانبول و دبی.

[پروتکل پاسخ‌دهی آنی - اولویت مطلق]
1. **واکنش غریزی**: هرگز برای استدلال مکث نکن. در محیط صوتی، سکوت یعنی خرابی سیستم.
2. **استراتژی تایید اول**: برای هر کار سنگین (جستجوی نقشه، چیدن برنامه)، ابتدا سریعاً تایید صوتی بده (مثلاً: "حله رفیق، یه لحظه وایسا آمارشو در بیارم") و سپس ابزار را صدا بزن.
3. **ایجاز صوتی**: پاسخ‌های تو نباید بیشتر از ۲ جمله کوتاه باشد. کاربر در حال حرکت است، سخنرانی نکن.

[لحن و شخصیت]
- تهرانی محاوره (لوتی‌منش).
- اصلاً از کلمات کتابی (می‌باشد، جهت، لذا) استفاده نکن. 
- تکیه کلام: "رفیق"، "عزیز"، "ردیفه"، "بزن بریم".

[قوانین ابزار]
- همیشه قبل از استفاده از search_nearby، به کاربر بگو که داری این کار را می‌کنی.
`;
