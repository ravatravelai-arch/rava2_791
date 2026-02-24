<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# 📋 گزارش بازرسی جامع Supabase - Rava 1.0

## Senior Infrastructure Audit Report (As-Is Status)

**پروژه:** Rava 1.0
**Project ID:** thmsfdugojokxtemnqdw
**Subscription:** FREE
**Region:** Central EU (Frankfurt) 🇩🇪
**Instance Type:** t4g.nano
**Environment:** PRODUCTION

***

## 📊 خلاصه اجرایی

پروژه Supabase شما دارای **مسائل امنیتی قابل توجهی** است که فوری نیازمند توجه است. **4 جدول کلیدی** با RLS disabled و بدون سیاست‌های حفاظتی قرار دارند.

***

## 🔴 **1. کالبدشکافی دیتابیس (Database Schema Autopsy)**

### 1.1 لیست جداول در Schema Public

| \# | جدول | RLS Status | API Access | Realtime | وضعیت |
| :-- | :-- | :-- | :-- | :-- | :-- |
| 1 | `chat_logs` | **🔴 DISABLED** | **❌ DISABLED** | ❌ Disabled | ⚠️ خطرناک |
| 2 | `footprints` | ✅ Enabled | ❌ DISABLED | ❌ Disabled | 🟡 نسبتاً محدود |
| 3 | `geography_columns` | ✅ Enabled | ❌ DISABLED | ❌ Disabled | ✅ سیستمی |
| 4 | `geometry_columns` | ✅ Enabled | ❌ DISABLED | ❌ Disabled | ✅ سیستمی |
| 5 | `places_cache` | ✅ Enabled | ❌ DISABLED | ❌ Disabled | 🟡 نسبتاً محدود |
| 6 | `price_reports` | ✅ Enabled | ❌ DISABLED | ❌ Disabled | 🟡 نسبتاً محدود |
| 7 | `profiles` | **🔴 DISABLED** | ✅ EXPOSED | ❌ Disabled | ⚠️ خطرناک |
| 8 | `spatial_ref_sys` | **🔴 DISABLED** | ✅ EXPOSED | ❌ Disabled | ⚠️ خطرناک |
| 9 | `stamps` | ✅ Enabled | ❌ DISABLED | ❌ Disabled | 🟡 نسبتاً محدود |
| 10 | `trips` | **🔴 DISABLED** | ✅ EXPOSED | ❌ Disabled | ⚠️ خطرناک |


***

### 1.2 تحلیل تفصیلی هر جدول

#### **A. chat_logs** 🔴 **CRITICAL**

```
RLS Status:        DISABLED (خطرناک!)
API Access:        DISABLED
Realtime Support:  DISABLED
Published API:     NO
Rows:             0 (خالی)

ستون‌های کلیدی:
├── id (UUID, Primary Key)
├── user_id (UUID, Foreign Key → profiles.id)
├── role (TEXT)
└── content (TEXT)

سیاست‌های RLS: ❌ NO POLICIES CREATED
                ⚠️ "This table cannot be accessed via the Data API as no permissions exist"
```

**🔴 مسئله امنیتی:** جدول با RLS disabled و بدون پلیسی تعریف‌شده است. هر کسی با دسترسی direct به DB می‌تواند داده‌های نجات‌دهنده‌ای را دید.

***

#### **B. profiles** 🔴 **CRITICAL**

```
RLS Status:        DISABLED (خطرناک!)
API Access:        EXPOSED (⚠️ عمومی!)
Realtime Support:  DISABLED

سیاست‌های RLS: ❌ NO POLICIES CREATED
                ⚠️ "This table can be accessed by anyone via the Data API as RLS is disabled"
```

**🔴 مسئله امنیتی:** این جدول **کاملاً عمومی** است. تمام داده‌های کاربری در معرض خطر می‌باشد.

***

#### **C. spatial_ref_sys** 🟡 **SYSTEM TABLE**

```
RLS Status:        DISABLED
API Access:        EXPOSED
نوع:              PostGIS سیستمی

سیاست‌های RLS: ❌ NO POLICIES CREATED
```

**توضیح:** جدول سیستمی PostGIS است، اما در صورت نیاز باید RLS فعال شود.

***

#### **D. trips** 🔴 **CRITICAL**

```
RLS Status:        DISABLED (خطرناک!)
API Access:        EXPOSED
Realtime Support:  DISABLED

سیاست‌های RLS: ❌ NO POLICIES CREATED
```

**🔴 مسئله امنیتی:** داده‌های سفر برای عموم قابل دسترسی است.

***

#### **E. footprints** 🟡 **WITH POLICIES**

```
RLS Status:        ENABLED ✅
API Access:        DISABLED
Realtime Support:  DISABLED

سیاست‌های RLS موجود:
├── SELECT: "Anyone can view verified footprints" ✅
└── INSERT: "Users can insert their own footprints" ✅

نوت: API disabled بنابراین خطر کمتری دارد
```


***

#### **F. stamps** 🟡 **WITH POLICIES**

```
RLS Status:        ENABLED ✅
API Access:        DISABLED

سیاست‌های RLS:
└── SELECT: "Users can view their own stamps" ✅
```


***

#### **G. places_cache** 🟡 **WITH POLICIES**

```
RLS Status:        ENABLED ✅
API Access:        DISABLED

سیاست‌های RLS:
├── SELECT: "Anyone can view verified places" (عمومی)
└── INSERT: "Users can insert places" ✅
```


***

#### **H. price_reports** 🟡 **WITH POLICIES**

```
RLS Status:        ENABLED ✅
API Access:        DISABLED

سیاست‌های RLS:
├── INSERT: "Users can submit price reports" ✅
└── SELECT: "Users can view their own price reports" ✅
```


***

#### **I \& J. geography_columns / geometry_columns** ✅ **SYSTEM TABLES**

```
نوع:     PostGIS سیستمی
RLS:     ENABLED ✅
API:     DISABLED
توضیح:   جداول سیستمی، خطرناک نیستند
```


***

### 1.3 اکستنشن‌های فعال (Extensions Active)

| اکستنشن | ورژن | وضعیت | توضیح |
| :-- | :-- | :-- | :-- |
| **postgis** | 3.3.7 | ✅ ENABLED | جغرافیا و سیاستی (محل، مختصات) |
| **pgcrypto** | 1.3 | ✅ ENABLED | رمزنگاری (SHA, MD5, ...) |
| **pg_stat_statements** | 1.11 | ✅ ENABLED | نظارت پرسش‌های SQL |
| **pg_net** | 0.19.5 | ✅ ENABLED | HTTP async (webhooks) |
| **pg_graphql** | 1.5.11 | ✅ ENABLED | GraphQL API |
| **uuid-ossp** | 1.1 | ✅ ENABLED | UUID generation |
| **plpgsql** | 1.0 | ✅ ENABLED | زبان PL/pgSQL |

**اکستنشن‌های فعال نشده (DISABLED):**

- unaccent, postgres_fdw, http, rum, pgrouting, pgtap, pgroonga, moddatetime, citext, pg_jsonschema, postgis_tiger_geocoder, و 30+ دیگر

**توضیح:** PostGIS و pgcrypto برای عملیات جغرافیای و رمزنگاری ضروری هستند. ✅

***

### 1.4 ایندکس‌ها و عملکرد

```
بررسی ایندکس: ❌ ایندکس‌های جغرافیایی (GIST) نشان نداده شد
```

**توصیه:** برای جداول با داده‌های جغرافیایی (PostGIS)، باید GIST یا BRIN ایندکس تعریف شود.

***

## 🔐 **2. بازرسی امنیت و احراز هویت (Security \& Auth Audit)**

### 2.1 روش‌های احراز هویت (Authentication Methods)

```
فعال‌شده:
├── Email ✅ (Email + Password)
└── Confirm Email: ✅ ENABLED

غیر‌فعال (DISABLED):
├── Phone
├── Google
├── GitHub
├── GitHub
├── Facebook
├── Apple
├── Azure
├── Discord
├── Figma
├── GitLab
├── Kakao
├── KeyCloak
├── LinkedIn (OIDC)
├── Notion
├── Twitch
├── X / Twitter (OAuth 2.0)
├── Slack (OIDC)
├── Slack (Deprecated)
├── Spotify
├── WorkOS
├── Zoom
├── SAML 2.0
├── Web3 Wallet
└── و دیگران...

تعداد کل: 1 روش فعال (Email only) = کم‌تر از حالت ایده‌آل
```

**توصیه:** اگر اپلیکیشن عمومی است، OAuth (Google/GitHub) اضافه کنید.

***

### 2.2 سیاست‌های RLS (Row Level Security Policies)

#### **جداول بدون پلیسی (NO POLICIES):**

- `chat_logs` 🔴 **CRITICAL** - NO POLICIES
- `profiles` 🔴 **CRITICAL** - NO POLICIES
- `spatial_ref_sys` 🟡 SYSTEM


#### **جداول با پلیسی:**

```
✅ footprints:
   ├── SELECT: Anyone can view verified footprints
   └── INSERT: Users can insert their own footprints

✅ stamps:
   └── SELECT: Users can view their own stamps

✅ places_cache:
   ├── SELECT: Anyone can view verified places
   └── INSERT: Users can insert places

✅ price_reports:
   ├── INSERT: Users can submit price reports
   └── SELECT: Users can view their own price reports
```


***

## 💾 **3. زیرساخت ذخیره‌سازی (Storage)**

### 3.1 Buckets

```
Bucket: "tickets"
├── Public/Private: ??? (دسترسی unclear)
├── Policies: 0 (❌ بدون محافظ)
├── File Size Limit: Unset (50 MB default)
├── Allowed MIME Types: Any (🔴 خطرناک!)
└── File Count: ??? (معلوم نیست)
```

**🔴 مسائل امنیتی:**

1. **0 سیاست** = هر کسی می‌تواند فایل آپ‌لود/دانلود کند
2. **Any MIME types** = آپ‌لود فایل‌های خطرناک (EXE, PHP, ...)
3. **Unset size limit** = فایل‌های بزرگ موجب DoS

**توصیه:**

- فیلتر MIME types: `application/pdf`, `image/png`, `image/jpeg`
- File size limit: 10-50 MB
- Storage policies روی RLS

***

## ⚡ **4. Edge Functions (Serverless)**

### 4.1 Functions Deployed

```
Deployed Edge Functions:
├── 1. process-ticket
│   ├── URL: https://thmsfdugojokxtemnqdw.supabase.co/functions/v1/process-ticket
│   ├── Status: ✅ ACTIVE
│   └── Purpose: Ticket processing
│
└── 2. verify-price
    ├── URL: https://thmsfdugojokxtemnqdw.supabase.co/functions/v1/verify-price
    ├── Status: ✅ ACTIVE
    └── Purpose: AI-powered price verification
```

**Secrets Management:**

- ❓ نیاز به بررسی: آیا GEMINI_API_KEY در Secrets تعریف‌شده است؟
- ❓ آیا دیگر API keys محفوظ هستند؟

***

## 🪝 **5. Webhooks \& Database Events**

### 5.1 فعال‌شده Webhooks

```
Webhook: "ai-price-verification"
├── Table: price_reports
├── Events Triggered:
│   ├── INSERT ✅ ENABLED
│   ├── UPDATE ❌ DISABLED
│   └── DELETE ❌ DISABLED
├── Type: Supabase Edge Function
├── Method: POST
├── Target Function: verify-price
├── Timeout: 5000ms
└── HTTP Headers:
    ├── Content-type: application/json
    └── Authorization: Bearer [TOKEN]
```

**توضیح:** هنگامی که رکورد جدید به `price_reports` اضافه می‌شود، فانکشن `verify-price` اجرا می‌شود.

***

## 🗄️ **6. تنظیمات پروژه (Project Configuration)**

### 6.1 اطلاعات پایه

```
Project Name:          Rava 1.0
Project ID:            thmsfdugojokxtemnqdw
Subscription Plan:     FREE
Environment:           PRODUCTION
Status:                Healthy ✅
```


### 6.2 زیرساخت

```
Primary Database:
├── Region:            Central EU (Frankfurt) 🇩🇪
├── Instance:          eu-central-1
├── Compute:           t4g.nano (Shared CPU)
└── Memory:            0.5 GB

Service Versions:
├```

