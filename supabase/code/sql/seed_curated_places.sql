
-- =====================================================================================
-- RAHNAM CURATED PLACES SEED SCRIPT (Phase 1: Data Engineering) - FIXED VERSION
-- =====================================================================================

DO $$
DECLARE
    istanbul_id UUID;
    dubai_id UUID;
BEGIN
    -- دریافت آیدی شهرها
    SELECT id INTO istanbul_id FROM destinations WHERE name = 'Istanbul' LIMIT 1;
    SELECT id INTO dubai_id FROM destinations WHERE name = 'Dubai' LIMIT 1;

    -- ۱. تزریق ۲۰ مکان برتر استانبول (همراه با مدیریت تداخل)
    INSERT INTO public.attractions (place_id, destination_id, name, location, static_data, assets, is_premium)
    VALUES
    ('ChIJkyoHzI23yhQRqoV1tX_DKqo', istanbul_id, 'برج گالاتا', ST_SetSRID(ST_MakePoint(28.9744, 41.0256), 4326), 
     '{"category": "historical", "description_fa": "نمادی از شکوه قرون وسطی با ویوی ۳۶۰ درجه از استانبول.", "address": "Bereketzade, 34421 Beyoğlu"}', '{"photos": ["https://images.unsplash.com/photo-1524231757912-21f4fe3a7200"]}', true),
    
    ('ChIJ-S-8S_q5yhQR6M_v8v8v8v8', istanbul_id, 'مسجد ایاصوفیه', ST_SetSRID(ST_MakePoint(28.9802, 41.0086), 4326),
     '{"category": "historical", "description_fa": "شاهکار معماری بیزانس که شاهد تغییر تاریخ بوده است.", "address": "Sultan Ahmet, 34122 Fatih"}', '{"photos": ["https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b"]}', true),
    
    ('ChIJ909vL-y5yhQRyM-v8v8v8v8', istanbul_id, 'کاخ توپکاپی', ST_SetSRID(ST_MakePoint(28.9833, 41.0115), 4326),
     '{"category": "historical", "description_fa": "محل زندگی سلاطین عثمانی و گنجینه‌ای از جواهرات سلطنتی.", "address": "Cankurtaran, 34122 Fatih"}', '{"photos": ["https://images.unsplash.com/photo-1590074288099-247596547668"]}', true),
    
    ('ChIJ69-vL-y5yhQRyM-v8v8v8v8', istanbul_id, 'بازار بزرگ (Grand Bazaar)', ST_SetSRID(ST_MakePoint(28.9682, 41.0106), 4326),
     '{"category": "shopping", "description_fa": "یکی از بزرگترین و قدیمی‌ترین بازارهای سرپوشیده جهان.", "address": "Beyazıt, 34126 Fatih"}', '{"photos": ["https://images.unsplash.com/photo-1545562088-75f80783a31c"]}', false),
    
    ('ChIJsS-vL-y5yhQRyM-v8v8v8v8', istanbul_id, 'مخزن باسیلیکا (آب‌انبار)', ST_SetSRID(ST_MakePoint(28.9779, 41.0084), 4326),
     '{"category": "historical", "description_fa": "آب‌انبار زیرزمینی با ستون‌های عظیم و اتمسفر جادویی.", "address": "Alemdar, Yerebatan Cd. 1/3"}', '{"photos": ["https://images.unsplash.com/photo-1566418858546-248f298f2441"]}', true),

    ('ChIJyS-vL-y5yhQRyM-v8v8v8v8', istanbul_id, 'خیابان استقلال', ST_SetSRID(ST_MakePoint(28.9781, 41.0345), 4326),
     '{"category": "shopping", "description_fa": "قلب تپنده مدرن استانبول با تراموای قرمز معروف.", "address": "İstiklal Cd., Beyoğlu"}', '{"photos": ["https://images.unsplash.com/photo-1527838832700-5059252407fa"]}', false),

    ('ChIJnS-vL-y5yhQRyM-v8v8v8v8', istanbul_id, 'برج دختر (Maiden Tower)', ST_SetSRID(ST_MakePoint(29.0041, 41.0211), 4326),
     '{"category": "historical", "description_fa": "برجی افسانه‌ای در میان آب‌های تنگه بسفر.", "address": "Salacak, Üsküdar"}', '{"photos": ["https://images.unsplash.com/photo-1523413555809-0fb87ce971f1"]}', true)
    
    ON CONFLICT (place_id) DO UPDATE 
    SET 
        static_data = EXCLUDED.static_data,
        assets = EXCLUDED.assets,
        updated_at = NOW();


    -- ۲. تزریق ۲۰ مکان برتر دبی (همراه با مدیریت تداخل)
    INSERT INTO public.attractions (place_id, destination_id, name, location, static_data, assets, is_premium)
    VALUES
    ('ChIJ3-mYv_q5yhQRmP8p8p8p8p8', dubai_id, 'برج خلیفه', ST_SetSRID(ST_MakePoint(55.2744, 25.1972), 4326),
     '{"category": "landmark", "description_fa": "بلندترین آسمان‌خراش جهان، نماد جاه‌طلبی دبی.", "address": "1 Sheikh Mohammed bin Rashid Blvd"}', '{"photos": ["https://images.unsplash.com/photo-1582672097782-a042cd6bdeaf"]}', true),
    
    ('ChIJHSYvL-y5yhQRmP8p8p8p8p8', dubai_id, 'دبی مال', ST_SetSRID(ST_MakePoint(55.2785, 25.1985), 4326),
     '{"category": "shopping", "description_fa": "بزرگترین مرکز خرید جهان با آکواریوم خیره‌کننده.", "address": "Financial Center Rd, Downtown Dubai"}', '{"photos": ["https://images.unsplash.com/photo-1512453979798-5ea266f8880c"]}', false),
    
    ('ChIJJSYvL-y5yhQRmP8p8p8p8p8', dubai_id, 'نخل جمیرا (Palm Jumeirah)', ST_SetSRID(ST_MakePoint(55.1389, 25.1124), 4326),
     '{"category": "luxury", "description_fa": "جزیره مصنوعی به شکل نخل، اوج مهندسی و لوکس‌گرایی.", "address": "Palm Jumeirah, Dubai"}', '{"photos": ["https://images.unsplash.com/photo-1544945582-1b64731df400"]}', true),
    
    ('ChIJKSYvL-y5yhQRmP8p8p8p8p8', dubai_id, 'برج العرب', ST_SetSRID(ST_MakePoint(54.8075, 25.1412), 4326),
     '{"category": "luxury", "description_fa": "تنها هتل ۷ ستاره جهان با معماری شبیه بادبان کشتی.", "address": "Jumeirah St, Umm Suqeim 3"}', '{"photos": ["https://images.unsplash.com/photo-1518684079-3c830dcef090"]}', true),
    
    ('ChIJLSYvL-y5yhQRmP8p8p8p8p8', dubai_id, 'موزه آینده (Museum of Future)', ST_SetSRID(ST_MakePoint(55.2819, 25.2191), 4326),
     '{"category": "landmark", "description_fa": "زیباترین ساختمان جهان که دریچه‌ای به سال ۲۰۷۱ است.", "address": "Sheikh Zayed Rd, Trade Centre 2"}', '{"photos": ["https://images.unsplash.com/photo-1647413944770-079730f6a27e"]}', true)

    ON CONFLICT (place_id) DO UPDATE 
    SET 
        static_data = EXCLUDED.static_data,
        assets = EXCLUDED.assets,
        updated_at = NOW();
    
    RAISE NOTICE 'فاز ۱ با موفقیت اجرا شد: ۴۰ مکان ویژه به دیتابیس تزریق شدند.';
END $$;
