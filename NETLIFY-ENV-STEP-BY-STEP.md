# 🎯 خطوات إضافة Environment Variables في Netlify - بالصور

## ⚠️ المشكلة الحالية
```
❌ POST https://placeholder.supabase.co/auth/v1/token
   ERR_NAME_NOT_RESOLVED
```

**السبب:** الموقع يستخدم قيم وهمية لأن المتغيرات **غير موجودة في Netlify**.

---

## ✅ الحل: أضف المتغيرات في Netlify Dashboard

### 📍 الخطوة 1: افتح Netlify Dashboard

```
1. اذهب إلى: https://app.netlify.com
2. سجل الدخول
3. ستجد قائمة المواقع (Sites)
```

### 📍 الخطوة 2: اختر موقعك

```
4. ابحث عن موقعك: omarhassan.site
5. اضغط عليه
```

### 📍 الخطوة 3: افتح Environment Variables

```
6. في القائمة الجانبية، اضغط:
   Site configuration ⚙️
   
7. ثم اضغط:
   Environment variables
   
8. أو مباشرة:
   https://app.netlify.com/sites/[YOUR-SITE-NAME]/configuration/env
```

### 📍 الخطوة 4: أضف المتغيرات (6 متغيرات)

اضغط **"Add a variable"** وأضف كل متغير على حدة:

---

#### 🔹 المتغير 1: Supabase URL

```
┌─────────────────────────────────────────────────────┐
│ Key                                                 │
│ ┌─────────────────────────────────────────────────┐ │
│ │ VITE_SUPABASE_URL                                │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│ Value                                               │
│ ┌─────────────────────────────────────────────────┐ │
│ │ https://fcwnhrizpnicclxkdqyq.supabase.co        │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│ Scopes                                              │
│ ☑️ All deploys                                     │
│ ☐ Deploy previews                                  │
│ ☐ Branch deploys                                   │
│                                                     │
│ [Create variable]                                   │
└─────────────────────────────────────────────────────┘
```

اضغط **"Create variable"**

---

#### 🔹 المتغير 2: Supabase Anon Key

```
Key: VITE_SUPABASE_ANON_KEY

Value: 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjd25ocml6cG5pY2NseGtkcXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MjI4NDEsImV4cCI6MjA3NzQ5ODg0MX0.-0pn6P6TLt8tsI1U67q-nGwD9Ve20wgyHPPEZ533S0A

Scopes: ☑️ All deploys
```

اضغط **"Create variable"**

---

#### 🔹 المتغير 3: EmailJS Key

```
Key: VITE_APP_EMAILJS_KEY
Value: H4YFvBxDUh6YpVn0a
Scopes: ☑️ All deploys
```

اضغط **"Create variable"**

---

#### 🔹 المتغير 4: EmailJS Service ID

```
Key: VITE_APP_SERVICE_ID
Value: service_mrbmgus
Scopes: ☑️ All deploys
```

اضغط **"Create variable"**

---

#### 🔹 المتغير 5: EmailJS Template ID

```
Key: VITE_APP_TEMPLATE_ID
Value: template_d16rk5m
Scopes: ☑️ All deploys
```

اضغط **"Create variable"**

---

#### 🔹 المتغير 6: EmailJS Receiver

```
Key: VITE_APP_EMAILJS_RECIEVER
Value: omar-agha@engineer.com
Scopes: ☑️ All deploys
```

اضغط **"Create variable"**

---

### 📍 الخطوة 5: تحقق من المتغيرات

بعد الإضافة، يجب أن ترى:

```
Environment variables (6)

┌────────────────────────────────────┬──────────────────┬──────────────┐
│ Key                                │ Scopes           │ Value        │
├────────────────────────────────────┼──────────────────┼──────────────┤
│ VITE_SUPABASE_URL                  │ All deploys      │ https://f... │
│ VITE_SUPABASE_ANON_KEY             │ All deploys      │ eyJhbGc...   │
│ VITE_APP_EMAILJS_KEY               │ All deploys      │ H4YFvB...    │
│ VITE_APP_SERVICE_ID                │ All deploys      │ service_...  │
│ VITE_APP_TEMPLATE_ID               │ All deploys      │ template_... │
│ VITE_APP_EMAILJS_RECIEVER          │ All deploys      │ omar-ag...   │
└────────────────────────────────────┴──────────────────┴──────────────┘
```

✅ **ممتاز!** المتغيرات موجودة الآن.

---

### 📍 الخطوة 6: أعد النشر (Deploy)

```
9. في القائمة العلوية، اضغط "Deploys"
10. اضغط "Trigger deploy" (زر أخضر)
11. اختر "Clear cache and deploy site"
```

**انتظر 2-3 دقائق** حتى ينتهي البناء.

---

### 📍 الخطوة 7: تحقق من النجاح

#### ✅ اختبار 1: افتح الموقع

```
افتح: https://omarhassan.site/admin/login
```

#### ✅ اختبار 2: افتح Console

```
اضغط F12 → Console

✅ يجب ألا ترى:
   ❌ "placeholder.supabase.co"
   ❌ "Supabase URL is not configured"

✅ يجب أن ترى:
   ✔️ POST https://fcwnhrizpnicclxkdqyq.supabase.co/auth/v1/token
```

#### ✅ اختبار 3: جرب تسجيل الدخول

```
1. أدخل Email وPassword
2. اضغط "Sign In"
3. يجب أن يعمل! (أو يعطي "Invalid credentials" إذا كانت بيانات خاطئة)
```

---

## 🎯 طريقة سريعة: Import from .env file

### بدلاً من إضافة كل متغير يدوياً:

```
1. في صفحة Environment variables
2. اضغط "Import from a .env file"
3. انسخ والصق هذا:

VITE_SUPABASE_URL=https://fcwnhrizpnicclxkdqyq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjd25ocml6cG5pY2NseGtkcXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MjI4NDEsImV4cCI6MjA3NzQ5ODg0MX0.-0pn6P6TLt8tsI1U67q-nGwD9Ve20wgyHPPEZ533S0A
VITE_APP_EMAILJS_KEY=H4YFvBxDUh6YpVn0a
VITE_APP_SERVICE_ID=service_mrbmgus
VITE_APP_TEMPLATE_ID=template_d16rk5m
VITE_APP_EMAILJS_RECIEVER=omar-agha@engineer.com

4. اضغط "Import variables"
5. Trigger deploy
```

---

## 🔍 استكشاف الأخطاء

### ❌ المشكلة: "placeholder.supabase.co"

**السبب:** المتغيرات **غير** موجودة في Netlify.

**الحل:**
1. تأكد من إضافة المتغيرات في Netlify
2. تأكد من Trigger deploy بعد الإضافة
3. تأكد من اختيار "Clear cache"

---

### ❌ المشكلة: "Invalid credentials"

**السبب:** لم تنشئ مستخدم Admin في Supabase بعد.

**الحل:**
```
راجع: كيفية-انشاء-مستخدم-admin.md
أو: SUPABASE-SETUP-GUIDE.md
```

---

### ❌ المشكلة: "401 Unauthorized"

**السبب:** Supabase Anon Key خاطئ أو انتهى.

**الحل:**
1. افتح Supabase Dashboard
2. Settings → API
3. انسخ "anon public" key الجديد
4. حدّث المتغير في Netlify
5. Trigger deploy

---

## 🎉 بعد النجاح

الآن يمكنك:

1. ✅ تسجيل الدخول للـ Admin Panel:
   ```
   https://omarhassan.site/admin/login
   ```

2. ✅ إدارة Portfolio بالكامل:
   - إضافة مشاريع جديدة
   - تعديل المشاريع الموجودة
   - حذف المشاريع
   - رفع الصور

3. ✅ Portfolio ديناميكي:
   ```
   https://omarhassan.site/portfolio
   ```

---

## 📞 روابط مفيدة

```
Netlify Dashboard:
https://app.netlify.com

Netlify Environment Variables (موقعك):
https://app.netlify.com/sites/[YOUR-SITE]/configuration/env

Supabase Dashboard:
https://supabase.com/dashboard

موقعك:
https://omarhassan.site

Admin Panel:
https://omarhassan.site/admin/login
```

---

## 📋 Checklist سريع

قبل Deploy:
- [ ] ✅ Supabase project created
- [ ] ✅ SQL schema executed
- [ ] ✅ Seed data added
- [ ] ✅ Admin user created

في Netlify:
- [ ] ⏳ أضف VITE_SUPABASE_URL
- [ ] ⏳ أضف VITE_SUPABASE_ANON_KEY
- [ ] ⏳ أضف VITE_APP_EMAILJS_KEY
- [ ] ⏳ أضف VITE_APP_SERVICE_ID
- [ ] ⏳ أضف VITE_APP_TEMPLATE_ID
- [ ] ⏳ أضف VITE_APP_EMAILJS_RECIEVER
- [ ] ⏳ Trigger deploy
- [ ] ⏳ انتظر 2-3 دقائق

بعد Deploy:
- [ ] ⏳ افتح /admin/login
- [ ] ⏳ تحقق من Console (لا أخطاء)
- [ ] ⏳ جرب تسجيل الدخول
- [ ] ⏳ ✅ يعمل!

---

## 🎊 النهاية

**الآن افتح Netlify Dashboard وأضف المتغيرات!**

الموقع ينتظرها فقط ليعمل بالكامل. 🚀
