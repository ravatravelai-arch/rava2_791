کد های اجرا شده سوپابیس:

کد های اجرا شده در SQL Editor (به ترتیب اجرا):  
\[  
1:(

\-- EXTENSIONS  
CREATE EXTENSION IF NOT EXISTS postgis;  
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\-- \=====================================================================================  
\-- CRITICAL ARCHITECTURE WARNING (READ BEFORE QUERYING)  
\-- \=====================================================================================  
\-- ⚠️ POSTGIS COORDINATE ORDER IS (LONGITUDE, LATITUDE) \-\> (X, Y)  
\-- ⚠️ GOOGLE MAPS / LEAFLET ORDER IS (LATITUDE, LONGITUDE) \-\> (Y, X)  
\--  
\-- YOU MUST SWAP COORDINATES BEFORE INSERTING:  
\-- Correct: ST\_SetSRID(ST\_MakePoint(lng, lat), 4326\)  
\-- Incorrect: ST\_MakePoint(lat, lng) \-\> Will place user in Indian Ocean\!  
\-- \=====================================================================================

\-- 1\. PROFILES (User Identity & Time Economy)  
CREATE TABLE profiles (  
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,  
  username TEXT UNIQUE,  
   
  \-- CHANGED: wallet\_balance now represents "AI Hours" (Decimal)  
  \-- DISPLAY LOGIC: Frontend must multiply by 60 to show "Minutes".  
  \-- DATABASE LOGIC: Stored as Hours (e.g., 1.5 \= 90 mins).  
  \-- DEFAULT: 2.0 Hours (Welcome Gift).  
  wallet\_balance DECIMAL DEFAULT 2.0,  
   
  xp\_level INTEGER DEFAULT 1,  
  reputation\_score INTEGER DEFAULT 0,  
   
  \-- Context  
  current\_city TEXT CHECK (current\_city IN ('Istanbul', 'Dubai', 'Tehran')),  
  preferences JSONB DEFAULT '{}'::JSONB, \-- { "likes": \["history", "food"\], "budget": "medium" }  
   
  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()  
);

\-- CRITICAL INDEX: GIN Index for JSONB querying  
CREATE INDEX idx\_profiles\_preferences ON profiles USING GIN (preferences);

\-- 2\. PLACES\_CACHE (The Cost-Saving Layer)  
CREATE TABLE places\_cache (  
  place\_id TEXT PRIMARY KEY,  
  name TEXT NOT NULL,  
   
  \-- COORDINATE WARNING: Store as (Lng, Lat)  
  location GEOGRAPHY(POINT, 4326) NOT NULL,  
   
  category TEXT,  
  google\_types TEXT\[\],  
   
  \-- CACHED METADATA  
  address TEXT,  
  phone TEXT,  
  opening\_hours JSONB,  
   
  \-- PHOTO STRATEGY (Hybrid)  
  \-- We store references. Front-end prefers 'crowd\_photos' \-\> '3d\_icon' \-\> 'google\_photo'.  
  google\_photo\_refs JSONB\[\],  
  crowd\_photos JSONB\[\] DEFAULT '{}',  
   
  \-- AI ANALYTICS  
  vibe\_summary TEXT,  
  last\_ai\_analysis TIMESTAMP WITH TIME ZONE,  
   
  \-- REFRESH LOGIC (Lazy Refresh)  
  \-- Logic: If (Now \- updated\_at) \> 30 Days \-\> Fetch Essentials from Google \-\> Update DB  
  updated\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()  
);

CREATE INDEX places\_geo\_idx ON places\_cache USING GIST (location);

\-- 3\. TRIPS (Smart Wallet)  
CREATE TABLE trips (  
  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),  
  user\_id UUID REFERENCES profiles(id) ON DELETE CASCADE,  
   
  type TEXT CHECK (type IN ('flight', 'hotel', 'activity', 'food')),  
  title TEXT,  
   
  \-- Event Timing  
  start\_time TIMESTAMP WITH TIME ZONE,  
  end\_time TIMESTAMP WITH TIME ZONE,  
   
  \-- Event Location  
  location GEOGRAPHY(POINT, 4326),  
  destination\_address TEXT,  
   
  details JSONB,  
   
  status TEXT CHECK (status IN ('upcoming', 'completed', 'cancelled')) DEFAULT 'upcoming',  
  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()  
);

\-- CRITICAL INDEX: Composite index for the "Safe Haven" query (Find current hotel fast)  
CREATE INDEX idx\_trips\_safe\_haven ON trips (user\_id, type, start\_time);

\-- 4\. FOOTPRINTS (Social Waze)  
CREATE TABLE footprints (  
  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),  
  user\_id UUID REFERENCES profiles(id),  
  place\_id TEXT REFERENCES places\_cache(place\_id),  
  location GEOGRAPHY(POINT, 4326),  
  content TEXT,  
  mood TEXT,  
  upvotes INTEGER DEFAULT 0,  
  is\_verified BOOLEAN DEFAULT FALSE,  
  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()  
);

\-- 5\. PRICE\_REPORTS (Contribution)  
CREATE TABLE price\_reports (  
  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),  
  user\_id UUID REFERENCES profiles(id),  
  place\_id TEXT REFERENCES places\_cache(place\_id),  
  item\_name TEXT,  
  reported\_price DECIMAL,  
  currency TEXT,  
  proof\_image\_url TEXT,  
  ai\_verification\_status TEXT DEFAULT 'pending',  
  ai\_confidence\_score DECIMAL,  
  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()  
);

)  
///  
2:(

\-- \==========================================  
\-- PHASE 2: SPATIAL SEARCH ENGINE (RPC)  
\-- \==========================================

\-- این تابع مختصات کاربر را گرفته و مکان‌های اطراف را با فیلتر مود برمی‌گرداند.  
CREATE OR REPLACE FUNCTION search\_nearby\_places(  
  px\_lat float8,  
  px\_lng float8,  
  px\_radius float8 DEFAULT 5000,  
  px\_mood text DEFAULT NULL  
)  
RETURNS TABLE (  
  id text,  
  name text,  
  lat float8,  
  lng float8,  
  category text,  
  vibe\_summary text,  
  price\_level int,  
  image\_url text  
)  
LANGUAGE plpgsql  
SECURITY DEFINER  
AS $$  
BEGIN  
  RETURN QUERY  
  SELECT  
    pc.place\_id as id,  
    pc.name,  
    ST\_Y(pc.location::geometry) as lat,  
    ST\_X(pc.location::geometry) as lng,  
    pc.category,  
    pc.vibe\_summary,  
    (pc.opening\_hours\-\>\>'price\_level')::int as price\_level,  
    CASE  
      WHEN array\_length(pc.crowd\_photos, 1) \> 0 THEN (pc.crowd\_photos\[1\]\-\>\>'url')::text  
      ELSE NULL  
    END as image\_url  
  FROM places\_cache pc  
  WHERE  
    ST\_DWithin(  
      pc.location,  
      ST\_SetSRID(ST\_MakePoint(px\_lng, px\_lat), 4326), \-- PROTOCOL: Lng, Lat  
      px\_radius  
    )  
    AND (  
      px\_mood IS NULL OR  
      pc.category \= px\_mood OR  
      pc.google\_types @\> ARRAY\[px\_mood\]  
    )  
  ORDER BY pc.updated\_at DESC  
  LIMIT 20;  
END;  
$$;

)  
///  
3:(

\-- \==========================================  
\-- PHASE 2: SEED DATA (ISTANBUL & DUBAI)  
\-- \==========================================

\-- درج چند مکان نمونه برای اینکه فید اکسپلور خالی نباشد  
\-- مختصات بر اساس Lng, Lat ذخیره می‌شوند.

INSERT INTO places\_cache (place\_id, name, location, category, vibe\_summary, google\_types)  
VALUES  
\-- استانبول \- مخفیگاه (Galata Area)  
('test\_001', 'کافه مخفی گالاتا', ST\_SetSRID(ST\_MakePoint(28.9744, 41.0256), 4326), 'hidden\_gem', 'یه کافه دنج با ویوی ۳۶۰ درجه که فقط محلی‌ها میشناسنش.', ARRAY\['cafe', 'art\_gallery'\]),

\-- استانبول \- پولدار طور (Nisantasi)  
('test\_002', 'رستوران فوق لوکس نصرت', ST\_SetSRID(ST\_MakePoint(28.9922, 41.0511), 4326), 'luxury', 'تجربه استیک با روکش طلا در قلب نیشانتاشی.', ARRAY\['restaurant', 'fine\_dining'\]),

\-- دبی \- خوراک استوری (Palm Jumeirah)  
('test\_003', 'پالم ویو دبی', ST\_SetSRID(ST\_MakePoint(55.1389, 25.1124), 4326), 'instagrammable', 'بهترین نقطه برای عکاسی از کل نخل دبی در غروب.', ARRAY\['observation\_deck', 'tourist\_attraction'\]);

\-- فعال کردن دسترسی خواندن عمومی برای همه  
ALTER TABLE places\_cache ENABLE ROW LEVEL SECURITY;  
CREATE POLICY "Enable read access for everyone" ON places\_cache FOR SELECT USING (true);

)  
///  
4:(  
SELECT schemaname, tablename, rowsecurity FROM pg\_tables WHERE schemaname \= 'public' ORDER BY tablename;

)  
///  
5:(

\-- \==========================================  
\-- PHASE 4: FINAL REWARD & SECURITY ENGINE  
\-- \==========================================

\-- ۱. تابع اتمیک شارژ کیف پول و XP  
\-- این تابع توسط اپلیکیشن صدا زده می‌شود تا پاداش‌ها را به صورت امن و یکجا اعمال کند.  
CREATE OR REPLACE FUNCTION increment\_wallet(  
  px\_user\_id UUID,  
  px\_amount DECIMAL,  
  px\_xp\_amount INTEGER  
)  
RETURNS void  
LANGUAGE plpgsql  
SECURITY DEFINER \-- اجرای با دسترسی سیستمی برای امنیت بیشتر  
AS $$  
BEGIN  
  UPDATE profiles  
  SET  
    wallet\_balance \= wallet\_balance \+ px\_amount,  
    xp\_level \= xp\_level \+ px\_xp\_amount  
  WHERE id \= px\_user\_id;  
END;  
$$;

\-- ۲. اصلاح نهایی تابع رادار ردپا (Social Radar)  
\-- اضافه شدن فیلتر محتوای تایید شده برای جلوگیری از اسپم عمومی  
CREATE OR REPLACE FUNCTION get\_nearby\_footprints(  
  px\_lat float8,  
  px\_lng float8,  
  px\_radius float8 DEFAULT 2000  
)  
RETURNS TABLE (  
  id UUID,  
  content TEXT,  
  lat float8,  
  lng float8,  
  user\_name TEXT,  
  created\_at TIMESTAMP WITH TIME ZONE  
)  
LANGUAGE plpgsql  
SECURITY DEFINER  
AS $$  
BEGIN  
  RETURN QUERY  
  SELECT  
    f.id,  
    f.content,  
    ST\_Y(f.location::geometry) as lat,  
    ST\_X(f.location::geometry) as lng,  
    p.username as user\_name,  
    f.created\_at  
  FROM footprints f  
  JOIN profiles p ON f.user\_id \= p.id  
  WHERE  
    ST\_DWithin(  
      f.location,  
      ST\_SetSRID(ST\_MakePoint(px\_lng, px\_lat), 4326),  
      px\_radius  
    )  
    AND f.is\_verified \= TRUE \-- فقط موارد تایید شده نمایش داده شود  
  ORDER BY f.created\_at DESC  
  LIMIT 50;  
END;  
$$;

\-- ۳. ایجاد باکت در سطح دیتابیس (اطمینان از وجود متادیتا)  
\-- نکته: ساخت فیزیکی باکت باید در پنل استوریج انجام شود.

)  
///  
6:(

\-- \==========================================  
\-- PHASE 4: SOCIAL SECURITY POLICIES (RLS)  
\-- \==========================================

\-- ۱. فعال‌سازی RLS برای جداول جدید  
ALTER TABLE footprints ENABLE ROW LEVEL SECURITY;  
ALTER TABLE stamps ENABLE ROW LEVEL SECURITY;  
ALTER TABLE price\_reports ENABLE ROW LEVEL SECURITY;

\-- ۲. سیاست‌های جدول ردپاها (Footprints)  
\-- همه می‌توانند ردپاهای تایید شده را ببینند  
CREATE POLICY "Anyone can view verified footprints"  
ON footprints FOR SELECT  
USING (is\_verified \= TRUE);

\-- فقط خود کاربر می‌تواند ردپای خودش را ثبت کند  
CREATE POLICY "Users can insert their own footprints"  
ON footprints FOR INSERT  
WITH CHECK (auth.uid() \= user\_id);

\-- ۳. سیاست‌های جدول مهرها (Stamps)  
\-- فقط خود کاربر مهرهای پاسپورتش را می‌بیند  
CREATE POLICY "Users can view their own stamps"  
ON stamps FOR SELECT  
USING (auth.uid() \= user\_id);

\-- ۴. سیاست‌های گزارش قیمت (Price Reports)  
\-- کاربر فقط گزارش‌های خودش را می‌بیند  
CREATE POLICY "Users can view their own price reports"  
ON price\_reports FOR SELECT  
USING (auth.uid() \= user\_id);

\-- کاربر می‌تواند گزارش ثبت کند  
CREATE POLICY "Users can submit price reports"  
ON price\_reports FOR INSERT  
WITH CHECK (auth.uid() \= user\_id);

)  
///  
7:(

\-- ۱. ارتقای جدول پروفایل برای میزبانی از حافظه معنایی (Semantic Memory)  
ALTER TABLE profiles  
ADD COLUMN IF NOT EXISTS semantic\_profile JSONB DEFAULT '{  
  "travel\_style": "unknown",  
  "food\_preferences": \[\],  
  "energy\_level": "medium",  
  "budget\_sensitivity": "medium",  
  "last\_summary\_at": null  
}'::JSONB;

\-- ۲. ایجاد جدول آرشیو چت‌ها برای تحلیل‌های شبانه AI  
CREATE TABLE IF NOT EXISTS chat\_logs (  
  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),  
  user\_id UUID REFERENCES profiles(id) ON DELETE CASCADE,  
  role TEXT CHECK (role IN ('user', 'model')),  
  content TEXT,  
  metadata JSONB, \-- ذخیره لوکیشن و زمان در لحظه چت  
  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()  
);

\-- ۳. فعال‌سازی قابلیت Real-time برای جداول کلیدی  
\-- این کار باعث می‌شود فرانت‌اِند بلافاصله از تغییرات کیف پول یا تایید مدارک باخبر شود  
ALTER publication supabase\_realtime ADD TABLE profiles;  
ALTER publication supabase\_realtime ADD TABLE price\_reports;  
ALTER publication supabase\_realtime ADD TABLE trips;

)  
///  
8:(

\-- \=====================================================================================  
\-- RAHNAM INFRASTRUCTURE REPAIR & HARDENING (V2.0)  
\-- \=====================================================================================

\-- ۱. فعال‌سازی RLS برای جداول حساس (بخش بحرانی گزارش)  
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;  
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;  
ALTER TABLE chat\_logs ENABLE ROW LEVEL SECURITY;

\-- ۲. حذف سیاست‌های احتمالی قدیمی برای جلوگیری از تداخل  
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;  
DROP POLICY IF EXISTS "Users can view own trips" ON trips;  
DROP POLICY IF EXISTS "Users can insert own trips" ON trips;  
DROP POLICY IF EXISTS "Users can view own chat logs" ON chat\_logs;  
DROP POLICY IF EXISTS "Users can insert own chat logs" ON chat\_logs;

\-- ۳. تعریف سیاست‌های دسترسی مالکانه (Ownership Policies)  
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() \= id);  
CREATE POLICY "Users can view own trips" ON trips FOR SELECT USING (auth.uid() \= user\_id);  
CREATE POLICY "Users can insert own trips" ON trips FOR INSERT WITH CHECK (auth.uid() \= user\_id);  
CREATE POLICY "Users can view own chat logs" ON chat\_logs FOR SELECT USING (auth.uid() \= user\_id);  
CREATE POLICY "Users can insert own chat logs" ON chat\_logs FOR INSERT WITH CHECK (auth.uid() \= user\_id);

\-- ۴. بهینه‌سازی عملکرد جغرافیایی (GIST Indexes)  
\-- این بخش سرعت جستجوهای مکانی رهنما را تضمین می‌کند  
CREATE INDEX IF NOT EXISTS idx\_places\_cache\_location ON places\_cache USING GIST (location);  
CREATE INDEX IF NOT EXISTS idx\_trips\_location ON trips USING GIST (location);  
CREATE INDEX IF NOT EXISTS idx\_footprints\_location ON footprints USING GIST (location);

\-- ۵. فعال‌سازی لایه ریل‌تایم (The Neural Link)  
\-- بازسازی لیست انتشار برای اطمینان از صحت عملکرد  
DROP PUBLICATION IF EXISTS supabase\_realtime;  
CREATE PUBLICATION supabase\_realtime FOR TABLE profiles, trips, price\_reports, footprints;

\-- ۶. سیاست‌های امنیتی لایه ذخیره‌سازی (Storage)  
\-- اجازه آپلود فقط به کاربران تایید هویت شده در باکت‌های مربوطه  
\-- توجه: اگر از قبل وجود داشته باشند، این دستورات خطا نمی‌دهند  
DO $$  
BEGIN  
    IF NOT EXISTS (SELECT 1 FROM pg\_policies WHERE policyname \= 'Authenticated users can upload tickets') THEN  
        CREATE POLICY "Authenticated users can upload tickets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket\_id \= 'tickets');  
    END IF;  
     
    IF NOT EXISTS (SELECT 1 FROM pg\_policies WHERE policyname \= 'Authenticated users can upload price proofs') THEN  
        CREATE POLICY "Authenticated users can upload price proofs" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket\_id \= 'price\_proofs');  
    END IF;  
END $$;

)  
///  
9:(

\-- \==========================================  
\-- PHASE 4: SOCIAL MODERATION & SECURITY UPDATE  
\-- \==========================================

\-- به‌روزرسانی تابع برای نمایش فقط ردپاهای تایید شده توسط AI یا ادمین  
CREATE OR REPLACE FUNCTION get\_nearby\_footprints(  
  px\_lat float8,  
  px\_lng float8,  
  px\_radius float8 DEFAULT 2000  
)  
RETURNS TABLE (  
  id UUID,  
  content TEXT,  
  lat float8,  
  lng float8,  
  user\_name TEXT,  
  created\_at TIMESTAMP WITH TIME ZONE  
)  
LANGUAGE plpgsql  
SECURITY DEFINER  
AS $$  
BEGIN  
  RETURN QUERY  
  SELECT  
    f.id,  
    f.content,  
    ST\_Y(f.location::geometry) as lat,  
    ST\_X(f.location::geometry) as lng,  
    p.username as user\_name,  
    f.created\_at  
  FROM footprints f  
  JOIN profiles p ON f.user\_id \= p.id  
  WHERE  
    ST\_DWithin(  
      f.location,  
      ST\_SetSRID(ST\_MakePoint(px\_lng, px\_lat), 4326),  
      px\_radius  
    )  
    AND f.is\_verified \= TRUE \-- قانون طلایی: فقط محتوای سالم نمایش داده شود  
  ORDER BY f.created\_at DESC  
  LIMIT 50;  
END;  
$$;

)  
///  
10:(  
\-- \==========================================  
\-- PHASE 4: SOCIAL SECURITY POLICIES (RLS) \- IDEMPOTENT VERSION  
\-- \==========================================

\-- ۱. فعال‌سازی RLS (این دستورات ذاتاً امن هستند)  
ALTER TABLE footprints ENABLE ROW LEVEL SECURITY;  
ALTER TABLE stamps ENABLE ROW LEVEL SECURITY;  
ALTER TABLE price\_reports ENABLE ROW LEVEL SECURITY;

\-- ۲. سیاست‌های جدول ردپاها (Footprints)

\-- الف) حذف پالیسی‌های احتمالی قدیمی (Clean State)  
DROP POLICY IF EXISTS "Anyone can view verified footprints" ON footprints;  
DROP POLICY IF EXISTS "Users can insert their own footprints" ON footprints;

\-- ب) ایجاد مجدد پالیسی‌ها  
CREATE POLICY "Anyone can view verified footprints"  
ON footprints FOR SELECT  
USING (is\_verified \= TRUE);

CREATE POLICY "Users can insert their own footprints"  
ON footprints FOR INSERT  
WITH CHECK (auth.uid() \= user\_id);

\-- ۳. سیاست‌های جدول مهرها (Stamps)  
DROP POLICY IF EXISTS "Users can view their own stamps" ON stamps;

CREATE POLICY "Users can view their own stamps"  
ON stamps FOR SELECT  
USING (auth.uid() \= user\_id);

\-- ۴. سیاست‌های گزارش قیمت (Price Reports)  
DROP POLICY IF EXISTS "Users can view their own price reports" ON price\_reports;  
DROP POLICY IF EXISTS "Users can submit price reports" ON price\_reports;

CREATE POLICY "Users can view their own price reports"  
ON price\_reports FOR SELECT  
USING (auth.uid() \= user\_id);

CREATE POLICY "Users can submit price reports"  
ON price\_reports FOR INSERT  
WITH CHECK (auth.uid() \= user\_id);

)  
///  
11:(  
\-- \==========================================  
\-- PATCH 1: SECURITY & IDEMPOTENCY LEDGER  
\-- \==========================================

\-- ۱. ایجاد جدول دفتر کل برای ثبت تراکنش‌های پاداش  
\-- این جدول تضمین می‌کند که هر رویداد (مثل یک مهر خاص) فقط یکبار جایزه می‌گیرد.  
CREATE TABLE IF NOT EXISTS reward\_ledger (  
  transaction\_id UUID PRIMARY KEY,  
  user\_id UUID REFERENCES profiles(id) ON DELETE CASCADE,  
  amount DECIMAL NOT NULL,  
  xp\_amount INTEGER NOT NULL,  
  reward\_type TEXT NOT NULL,  
  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()  
);

\-- ۲. بازنویسی تابع واریز پاداش (نسخه امن و Harden شده)  
\-- تغییرات: حذف px\_user\_id ورودی و استفاده از auth.uid()  
CREATE OR REPLACE FUNCTION increment\_wallet(  
  px\_transaction\_id UUID,  
  px\_amount DECIMAL,  
  px\_xp\_amount INTEGER,  
  px\_reward\_type TEXT DEFAULT 'general'  
)  
RETURNS void  
LANGUAGE plpgsql  
SECURITY DEFINER  
AS $$  
BEGIN  
  \-- بررسی اینکه آیا این تراکنش قبلاً پردازش شده است؟ (Idempotency)  
  IF EXISTS (SELECT 1 FROM reward\_ledger WHERE transaction\_id \= px\_transaction\_id) THEN  
    RETURN;  
  END IF;

  \-- ثبت تراکنش در دفتر کل  
  INSERT INTO reward\_ledger (transaction\_id, user\_id, amount, xp\_amount, reward\_type)  
  VALUES (px\_transaction\_id, auth.uid(), px\_amount, px\_xp\_amount, px\_reward\_type);

  \-- به‌روزرسانی موجودی کاربر واقعی (بر اساس سشن امن)  
  UPDATE profiles  
  SET  
    wallet\_balance \= wallet\_balance \+ px\_amount,  
    xp\_level \= xp\_level \+ px\_xp\_amount  
  WHERE id \= auth.uid();  
END;  
$$;

\-- فعال‌سازی RLS برای جدول دفتر کل  
ALTER TABLE reward\_ledger ENABLE ROW LEVEL SECURITY;  
CREATE POLICY "Users can only see their own rewards" ON reward\_ledger FOR SELECT USING (auth.uid() \= user\_id);

)  
///  
12:(  
\-- \==========================================  
\-- PATCH 1.1: SECURE ATOMIC REWARD ENGINE  
\-- \==========================================

\-- حذف نسخه قبلی برای اعمال تغییرات امنیتی در امضای تابع  
DROP FUNCTION IF EXISTS process\_poi\_visit(UUID, TEXT, TEXT, TEXT, DECIMAL, INTEGER);

\-- تابع جدید: فقط اطلاعات مکان را می‌گیرد، مقدار پاداش توسط سرور تعیین می‌شود.  
CREATE OR REPLACE FUNCTION process\_poi\_visit(  
  px\_transaction\_id UUID,  
  px\_place\_id TEXT,  
  px\_place\_name TEXT,  
  px\_city TEXT  
)  
RETURNS VOID  
LANGUAGE plpgsql  
SECURITY DEFINER \-- امنیت بالا: اجرا با دسترسی سیستم  
AS $$  
DECLARE  
  v\_reward\_amount DECIMAL :\= 0.1; \-- ۱۰ درصد ساعت معادل ۶ دقیقه (ثابت و امن)  
  v\_reward\_xp INTEGER :\= 50;     \-- ۵۰ امتیاز تجربه (ثابت و امن)  
BEGIN  
  \-- ۱. جلوگیری از پاداش تکراری (Idempotency)  
  IF EXISTS (SELECT 1 FROM reward\_ledger WHERE transaction\_id \= px\_transaction\_id) THEN  
    RETURN;  
  END IF;

  \-- ۲. جلوگیری از مهر تکراری برای یک مکان خاص  
  IF EXISTS (SELECT 1 FROM stamps WHERE user\_id \= auth.uid() AND place\_id \= px\_place\_id) THEN  
    RAISE EXCEPTION 'DUPLICATE\_STAMP: رفیق این مهر رو که قبلاً زدی\!';  
  END IF;

  \-- ۳. ثبت مهر در پاسپورت دیجیتال  
  INSERT INTO stamps (user\_id, place\_id, place\_name, city)  
  VALUES (auth.uid(), px\_place\_id, px\_place\_name, px\_city);

  \-- ۴. ثبت در دفتر کل پاداش‌ها (Audit Trail)  
  INSERT INTO reward\_ledger (transaction\_id, user\_id, amount, xp\_amount, reward\_type)  
  VALUES (px\_transaction\_id, auth.uid(), v\_reward\_amount, v\_reward\_xp, 'stamp');

  \-- ۵. به‌روزرسانی نهایی پروفایل کاربر  
  UPDATE profiles  
  SET  
    wallet\_balance \= wallet\_balance \+ v\_reward\_amount,  
    xp\_level \= xp\_level \+ v\_reward\_xp  
  WHERE id \= auth.uid();

EXCEPTION  
  WHEN OTHERS THEN  
    RAISE;  
END;  
$$;

)  
///  
13:(  
\-- \=====================================================================================  
\-- RESTORATION PATCH: P0 SECURITY HARDENING  
\-- \=====================================================================================

\-- ۱. حذف تمامی نسخه‌های قبلی تابع برای اطمینان از پاکسازی کامل  
DROP FUNCTION IF EXISTS increment\_wallet(UUID, DECIMAL, INTEGER);  
DROP FUNCTION IF EXISTS increment\_wallet(UUID, DECIMAL, INTEGER, TEXT);

\-- ۲. بازنویسی نسخه نهایی و امن (فقط از سشن داخلی استفاده می‌کند)  
\-- این نسخه هیچ ورودی برای User ID نمی‌گیرد تا امکان Spoofing وجود نداشته باشد  
CREATE OR REPLACE FUNCTION increment\_wallet(  
  px\_transaction\_id UUID,  
  px\_amount DECIMAL,  
  px\_xp\_amount INTEGER,  
  px\_reward\_type TEXT DEFAULT 'general'  
)  
RETURNS void  
LANGUAGE plpgsql  
SECURITY DEFINER  
AS $$  
BEGIN  
  \-- الف. جلوگیری از پاداش تکراری (Idempotency)  
  IF EXISTS (SELECT 1 FROM reward\_ledger WHERE transaction\_id \= px\_transaction\_id) THEN  
    RETURN;  
  END IF;

  \-- ب. ثبت تراکنش با استفاده از هویت تایید شده در سشن (auth.uid)  
  INSERT INTO reward\_ledger (transaction\_id, user\_id, amount, xp\_amount, reward\_type)  
  VALUES (px\_transaction\_id, auth.uid(), px\_amount, px\_xp\_amount, px\_reward\_type);

  \-- ج. به‌روزرسانی موجودی کاربر واقعی  
  UPDATE profiles  
  SET  
    wallet\_balance \= wallet\_balance \+ px\_amount,  
    xp\_level \= xp\_level \+ px\_xp\_amount  
  WHERE id \= auth.uid();  
END;  
$$;

\-- تذکر: حتماً این اسکریپت را بعد از پچ‌های فاز ۴ اجرا کنید تا نسخه ایمن جایگزین شود.

)  
///  
14:(

\-- \==========================================  
\-- PHASE 6: FUEL DEDUCTION ENGINE  
\-- \==========================================

\-- تابع کسر سوخت: ثانیه‌های مصرف شده را به ساعت تبدیل و از موجودی کسر می‌کند  
CREATE OR REPLACE FUNCTION deduct\_fuel(px\_seconds float8)  
RETURNS void  
LANGUAGE plpgsql  
SECURITY DEFINER  
AS $$  
DECLARE  
  v\_hours\_to\_deduct DECIMAL;  
BEGIN  
  \-- تبدیل ثانیه به ساعت (واحد ذخیره‌سازی دیتابیس)  
  v\_hours\_to\_deduct :\= px\_seconds / 3600.0;

  UPDATE profiles  
  SET  
    wallet\_balance \= GREATEST(0, wallet\_balance \- v\_hours\_to\_deduct)  
  WHERE id \= auth.uid();  
END;  
$$;

)  
///  
15:(

\-- \=====================================================================================  
\-- FINAL SECURITY PATCH (V2.0) \- THE GOLDEN LEDGER  
\-- \=====================================================================================

\-- ۱. پاکسازی کامل تمامی نسخه‌های قبلی و ناامن برای جلوگیری از تداخل  
DROP FUNCTION IF EXISTS increment\_wallet(UUID, DECIMAL, INTEGER);  
DROP FUNCTION IF EXISTS increment\_wallet(UUID, DECIMAL, INTEGER, TEXT);  
DROP FUNCTION IF EXISTS process\_poi\_visit(UUID, TEXT, TEXT, TEXT);

\-- ۲. بازنویسی نسخه نهایی و غیرقابل نفوذ پاداش  
\-- قانون: هویت فقط و فقط از توکن JWT استخراج می‌شود  
CREATE OR REPLACE FUNCTION increment\_wallet(  
  px\_transaction\_id UUID,  
  px\_amount DECIMAL,  
  px\_xp\_amount INTEGER,  
  px\_reward\_type TEXT DEFAULT 'general'  
)  
RETURNS void  
LANGUAGE plpgsql  
SECURITY DEFINER \-- اجرا با دسترسی سیستمی برای دور زدن محدودیت‌های مستقیم، اما مقید به لاجیک زیر  
AS $$  
BEGIN  
  \-- الف. جلوگیری از پاداش تکراری (Idempotency)  
  IF EXISTS (SELECT 1 FROM reward\_ledger WHERE transaction\_id \= px\_transaction\_id) THEN  
    RETURN;  
  END IF;

  \-- ب. ثبت تراکنش در دفتر کل (حسابرسی امنیتی)  
  INSERT INTO reward\_ledger (transaction\_id, user\_id, amount, xp\_amount, reward\_type)  
  VALUES (px\_transaction\_id, auth.uid(), px\_amount, px\_xp\_amount, px\_reward\_type);

  \-- ج. به‌روزرسانی موجودی کاربر (فقط صاحب سشن فعلی)  
  UPDATE profiles  
  SET  
    wallet\_balance \= wallet\_balance \+ px\_amount,  
    xp\_level \= xp\_level \+ px\_xp\_amount  
  WHERE id \= auth.uid();  
   
  IF NOT FOUND THEN  
    RAISE EXCEPTION 'User profile not found or session invalid.';  
  END IF;  
END;  
$$;

\-- ۳. ارتقای تابع ثبت مهر (Stamping) به نسخه اتمیک  
CREATE OR REPLACE FUNCTION process\_poi\_visit(  
  px\_transaction\_id UUID,  
  px\_place\_id TEXT,  
  px\_place\_name TEXT,  
  px\_city TEXT  
)  
RETURNS VOID  
LANGUAGE plpgsql  
SECURITY DEFINER  
AS $$  
DECLARE  
  v\_reward\_amount DECIMAL :\= 0.1;  
  v\_reward\_xp INTEGER :\= 50;  
BEGIN  
  \-- چک کردن مالکیت سشن  
  IF auth.uid() IS NULL THEN  
    RAISE EXCEPTION 'Not authenticated';  
  END IF;

  \-- جلوگیری از مهر تکراری  
  IF EXISTS (SELECT 1 FROM stamps WHERE user\_id \= auth.uid() AND place\_id \= px\_place\_id) THEN  
    RETURN;  
  END IF;

  \-- ثبت مهر  
  INSERT INTO stamps (user\_id, place\_id, place\_name, city)  
  VALUES (auth.uid(), px\_place\_id, px\_place\_name, px\_city);

  \-- فراخوانی تابع امن داخلی  
  PERFORM increment\_wallet(px\_transaction\_id, v\_reward\_amount, v\_reward\_xp, 'stamp');  
END;  
$$;

)

\]  
///////////////////////////////////////  
کد های ساخته شده Function:  
\[  
process-ticket:(

// SUPABASE EDGE FUNCTION: process-ticket  
// مسیر: supabase/functions/process-ticket/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"  
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"  
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@1.38.0"

serve(async (req) \=\> {  
  try {  
    const { imagePath, userId } \= await req.json();  
     
    const supabase \= createClient(  
      Deno.env.get('SUPABASE\_URL')\!,  
      Deno.env.get('SUPABASE\_SERVICE\_ROLE\_KEY')\!  
    );

    // ۱. دریافت فایل از استوریج  
    const { data: fileData } \= await supabase.storage.from('tickets').download(imagePath);  
    const base64Image \= btoa(new Uint8Array(await fileData.arrayBuffer()).reduce((data, byte) \=\> data \+ String.fromCharCode(byte), ''));

    // ۲. پردازش توسط Gemini Vision  
    const ai \= new GoogleGenAI({ apiKey: Deno.env.get('GEMINI\_API\_KEY')\! });  
    const response \= await ai.models.generateContent({  
      model: 'gemini-2.0-flash-001',  
      contents: \[  
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },  
        { text: "Extract ticket details: type (flight/hotel/activity), title, time (HH:MM), date (YYYY-MM-DD), and address. Output JSON." }  
      \],  
      config: {  
        responseMimeType: "application/json",  
        responseSchema: {  
          type: Type.OBJECT,  
          properties: {  
            type: { type: Type.STRING },  
            title: { type: Type.STRING },  
            time: { type: Type.STRING },  
            date: { type: Type.STRING },  
            address: { type: Type.STRING }  
          }  
        }  
      }  
    });

    const ticketData \= JSON.parse(response.text);

    // ۳. ثبت در دیتابیس  
    const { data: trip, error } \= await supabase.from('trips').insert({  
      user\_id: userId,  
      type: ticketData.type,  
      title: ticketData.title,  
      start\_time: \`${ticketData.date}T${ticketData.time}:00\`,  
      details: { address: ticketData.address },  
      status: 'upcoming'  
    }).select().single();

    return new Response(JSON.stringify({ success: true, data: trip }), { headers: { "Content-Type": "application/json" } });  
  } catch (err) {  
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });  
  }  
})

)  
///  
verify-price:(

// SUPABASE EDGE FUNCTION: verify-price  
// مسیر: supabase/functions/verify-price/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"  
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"  
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@1.38.0"

serve(async (req) \=\> {  
  try {  
    // ۱. دریافت دیتای ردیف جدید از وب‌هوک سوپابیس  
    const payload \= await req.json();  
    const { record } \= payload; // دیتای جدول price\_reports  
     
    const supabase \= createClient(  
      Deno.env.get('SUPABASE\_URL')\!,  
      Deno.env.get('SUPABASE\_SERVICE\_ROLE\_KEY')\!  
    );

    // ۲. دانلود تصویر مدرک از استوریج  
    const { data: fileData, error: downloadError } \= await supabase.storage  
      .from('price\_proofs')  
      .download(record.proof\_image\_url);

    if (downloadError) throw new Error("Image download failed");

    const base64Image \= btoa(new Uint8Array(await fileData.arrayBuffer())  
      .reduce((data, byte) \=\> data \+ String.fromCharCode(byte), ''));

    // ۳. تحلیل توسط Gemini Vision (مدل فلش برای سرعت بالا)  
    const ai \= new GoogleGenAI({ apiKey: Deno.env.get('GEMINI\_API\_KEY')\! });  
    const response \= await ai.models.generateContent({  
      model: 'gemini-3-flash-preview',  
      contents: \[  
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },  
        { text: \`You are a Price Auditor for 'Rahnam' app. The user claims the price for '${record.item\_name}' is exactly '${record.reported\_price}'.  
                 Check the image. Is this price or a very close value visible?  
                 Return JSON ONLY.\`  
        }  
      \],  
      config: {  
        responseMimeType: "application/json",  
        responseSchema: {  
          type: Type.OBJECT,  
          properties: {  
            verified: { type: Type.BOOLEAN },  
            confidence: { type: Type.NUMBER },  
            reasoning: { type: Type.STRING }  
          },  
          required: \["verified", "confidence", "reasoning"\]  
        }  
      }  
    });

    const aiResult \= JSON.parse(response.text);

    // ۴. اگر تایید شد: شارژ کیف پول \+ آپدیت وضعیت گزارش  
    if (aiResult.verified && aiResult.confidence \> 0.7) {  
      // اجرای تابع RPC شارژ (۰.۵ ساعت شارژ معادل ۳۰ دقیقه)  
      await supabase.rpc('increment\_wallet', {  
        px\_user\_id: record.user\_id,  
        px\_amount: 0.5,  
        px\_xp\_amount: 100  
      });

      await supabase.from('price\_reports').update({  
        ai\_verification\_status: 'verified',  
        ai\_confidence\_score: aiResult.confidence  
      }).eq('id', record.id);  
    } else {  
      await supabase.from('price\_reports').update({  
        ai\_verification\_status: 'rejected'  
      }).eq('id', record.id);  
    }

    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });  
  } catch (err) {  
    console.error("Verification Agent Error:", err);  
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });  
  }  
})

)  
\]