# 🔥 حل سريع: إضافة Environment Variables في Netlify

## ⚡ المشكلة
الموقع لا يجد متغيرات Supabase عند النشر على Netlify

## ✅ الحل السريع (3 خطوات)

### 1️⃣ افتح Netlify Dashboard
```
https://app.netlify.com
→ اختر موقعك (omarhassan.site)
→ Site configuration → Environment variables
```

### 2️⃣ أضف المتغيرات التالية

اضغط **"Add a variable"** لكل واحد:

```
المتغير 1:
Key: VITE_SUPABASE_URL
Value: https://fcwnhrizpnicclxkdqyq.supabase.co
Scopes: ✅ All deploys

المتغير 2:
Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjd25ocml6cG5pY2NseGtkcXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MjI4NDEsImV4cCI6MjA3NzQ5ODg0MX0.-0pn6P6TLt8tsI1U67q-nGwD9Ve20wgyHPPEZ533S0A
Scopes: ✅ All deploys

المتغير 3:
Key: VITE_APP_EMAILJS_KEY
Value: H4YFvBxDUh6YpVn0a
Scopes: ✅ All deploys

المتغير 4:
Key: VITE_APP_SERVICE_ID
Value: service_mrbmgus
Scopes: ✅ All deploys

المتغير 5:
Key: VITE_APP_TEMPLATE_ID
Value: template_d16rk5m
Scopes: ✅ All deploys

المتغير 6:
Key: VITE_APP_EMAILJS_RECIEVER
Value: omar-agha@engineer.com
Scopes: ✅ All deploys
```

### 3️⃣ أعد النشر

```
في Netlify Dashboard:
→ Deploys
→ Trigger deploy
→ Clear cache and deploy site

انتظر 2-3 دقائق
✅ تم!
```

---

## 🎯 أسرع طريقة: استيراد من ملف

في Netlify Dashboard → Environment variables:

1. اضغط **"Import from a .env file"**
2. انسخ والصق هذا:

```env
VITE_SUPABASE_URL=https://fcwnhrizpnicclxkdqyq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjd25ocml6cG5pY2NseGtkcXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MjI4NDEsImV4cCI6MjA3NzQ5ODg0MX0.-0pn6P6TLt8tsI1U67q-nGwD9Ve20wgyHPPEZ533S0A
VITE_APP_EMAILJS_KEY=H4YFvBxDUh6YpVn0a
VITE_APP_SERVICE_ID=service_mrbmgus
VITE_APP_TEMPLATE_ID=template_d16rk5m
VITE_APP_EMAILJS_RECIEVER=omar-agha@engineer.com
```

3. اضغط **"Import variables"**
4. Trigger deploy

---

## ✅ التحقق من النجاح

بعد Deploy:

1. افتح: https://omarhassan.site/admin/login
2. افتح Console (F12)
3. يجب أن **لا** ترى:
   ❌ "Supabase URL is not configured"
   ❌ "Supabase Anon Key is not configured"

4. جرب تسجيل الدخول
5. ✅ يجب أن يعمل!

---

## 📸 صور توضيحية

### الخطوة 1: Environment Variables
```
Netlify Dashboard
  → Site settings (⚙️)
    → Environment variables
      → [Add a variable] ← اضغط هنا
```

### الخطوة 2: إضافة المتغير
```
┌──────────────────────────────┐
│ Key                          │
│ VITE_SUPABASE_URL            │
│                              │
│ Value                        │
│ https://fcwnhrizpn...        │
│                              │
│ Scopes                       │
│ ☑️ All deploys              │
│ ☐ Deploy previews           │
│ ☐ Branch deploys            │
│                              │
│ [Create variable]            │
└──────────────────────────────┘
```

### الخطوة 3: Trigger Deploy
```
Deploys tab
  → [Trigger deploy ▼]
    → Clear cache and deploy site
```

---

## 🎉 تم!

الآن الموقع يعمل مع Supabase بالكامل:
- ✅ تسجيل الدخول يعمل
- ✅ Portfolio ديناميكي
- ✅ Admin Panel جاهز

**Admin URL:** https://omarhassan.site/admin/login
