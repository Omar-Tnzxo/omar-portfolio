# 🚀 Deploy to Netlify - Configuration Guide

## ⚠️ IMPORTANT: Environment Variables Setup

عند نشر المشروع على Netlify، يجب إضافة متغيرات البيئة يدوياً في Dashboard.

---

## 📋 خطوات النشر الكاملة

### 1️⃣ تجهيز Supabase أولاً

```bash
# تأكد من:
✅ إنشاء مشروع Supabase
✅ تشغيل SQL Schema (supabase-schema.sql)
✅ تشغيل Seed Data (supabase-seed.sql)
✅ إنشاء Storage Bucket: portfolio-images (Public)
✅ تفعيل Email Authentication
✅ إنشاء مستخدم Admin
```

### 2️⃣ ربط المشروع بـ Netlify

**الطريقة 1: من GitHub (موصى بها)**
```
1. افتح: https://app.netlify.com
2. اضغط "Add new site" → "Import from Git"
3. اختر GitHub
4. اختر repository: omar-portfolio
5. Branch: main
6. Build command: npm run build
7. Publish directory: dist
8. اضغط "Deploy site"
```

**الطريقة 2: من CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### 3️⃣ إضافة Environment Variables (مهم جداً!)

```
في Netlify Dashboard:

1. اذهب إلى: Site settings → Environment variables
2. اضغط "Add a variable" لكل متغير:

📧 EmailJS Variables:
┌────────────────────────────────────────┐
│ Key: VITE_APP_EMAILJS_KEY             │
│ Value: H4YFvBxDUh6YpVn0a              │
│ Scopes: ✅ All                        │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Key: VITE_APP_SERVICE_ID              │
│ Value: service_mrbmgus                │
│ Scopes: ✅ All                        │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Key: VITE_APP_TEMPLATE_ID             │
│ Value: template_d16rk5m               │
│ Scopes: ✅ All                        │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Key: VITE_APP_EMAILJS_RECIEVER        │
│ Value: omar-agha@engineer.com         │
│ Scopes: ✅ All                        │
└────────────────────────────────────────┘

🗄️ Supabase Variables:
┌────────────────────────────────────────────────────┐
│ Key: VITE_SUPABASE_URL                            │
│ Value: https://fcwnhrizpnicclxkdqyq.supabase.co │
│ Scopes: ✅ All                                    │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ Key: VITE_SUPABASE_ANON_KEY                       │
│ Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...    │
│        (نسخ الـ Key الكامل من .env.local)         │
│ Scopes: ✅ All                                    │
└────────────────────────────────────────────────────┘

3. اضغط "Save" لكل متغير
```

### 4️⃣ إعادة Deploy

```
بعد إضافة المتغيرات:

1. في Netlify Dashboard → Deploys
2. اضغط "Trigger deploy" → "Clear cache and deploy site"
3. انتظر حتى ينتهي البناء (2-3 دقائق)
4. ✅ الموقع جاهز!
```

---

## 🔍 طريقة سريعة: نسخ المتغيرات

### من .env.local إلى Netlify

```bash
# 1. افتح ملف .env.local
# 2. انسخ كل متغير على حدة

# المتغيرات الموجودة:
VITE_APP_EMAILJS_KEY=H4YFvBxDUh6YpVn0a
VITE_APP_SERVICE_ID=service_mrbmgus
VITE_APP_TEMPLATE_ID=template_d16rk5m
VITE_APP_EMAILJS_RECIEVER=omar-agha@engineer.com
VITE_SUPABASE_URL=https://fcwnhrizpnicclxkdqyq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjd25ocml6cG5pY2NseGtkcXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MjI4NDEsImV4cCI6MjA3NzQ5ODg0MX0.-0pn6P6TLt8tsI1U67q-nGwD9Ve20wgyHPPEZ533S0A

# 3. ألصقها في Netlify Environment Variables
```

---

## 🧪 اختبار بعد النشر

### 1. اختبار الواجهة الأمامية
```
1. افتح الموقع: https://your-site.netlify.app
2. تحقق من:
   ✅ الصفحة الرئيسية تعمل
   ✅ قسم Portfolio يعرض المشاريع
   ✅ لا توجد أخطاء في Console
```

### 2. اختبار Admin Panel
```
1. افتح: https://your-site.netlify.app/admin/login
2. أدخل:
   📧 Email: [admin email from Supabase]
   🔒 Password: [admin password]
3. يجب أن تسجل الدخول بنجاح
4. ✅ تم!
```

### 3. التحقق من Console
```
افتح F12 → Console:

✅ يجب أن ترى:
   "Supabase configured successfully" أو شيء مشابه

❌ لا يجب أن ترى:
   "Supabase URL is not configured"
   "Supabase Anon Key is not configured"
```

---

## 🚨 حل المشاكل

### Problem 1: "Supabase URL is not configured"

**السبب:** المتغيرات غير موجودة في Netlify

**الحل:**
```
1. Netlify Dashboard → Site settings → Environment variables
2. تأكد من إضافة:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
3. Trigger deploy → Clear cache and deploy
```

### Problem 2: "Invalid credentials" عند تسجيل الدخول

**السبب:** المستخدم غير موجود في Supabase

**الحل:**
```
1. Supabase Dashboard → Authentication → Users
2. تأكد من وجود المستخدم
3. Status = Confirmed
4. جرب reset password
```

### Problem 3: Build failed

**الحل:**
```
1. تحقق من Build log في Netlify
2. تأكد من:
   - Node version = 20.x
   - npm install works
   - npm run build works locally
3. جرب: Clear cache and deploy
```

### Problem 4: Portfolio لا يعرض البيانات

**السبب:** إما Supabase غير مضبوط أو الجداول فارغة

**الحل:**
```
1. تحقق من Console:
   - هل يوجد أخطاء Supabase؟
2. تحقق من Supabase:
   - هل الجداول موجودة؟
   - هل يوجد بيانات في portfolio_projects؟
3. جرب تشغيل seed.sql مرة أخرى
```

---

## 📱 إعداد Domain مخصص (اختياري)

```
1. Netlify Dashboard → Domain settings
2. Add custom domain
3. أدخل: omarhassan.site
4. اتبع التعليمات لضبط DNS
5. Netlify سيوفر HTTPS تلقائياً
```

---

## 🔐 الأمان

### في الإنتاج (Production):

```
✅ استخدم HTTPS دائماً (Netlify يوفره تلقائياً)
✅ فعّل Email Confirmation في Supabase Auth
✅ غيّر كلمة مرور Admin إلى كلمة قوية
✅ لا تشارك .env.local على Git
✅ استخدم Netlify Environment Variables فقط
```

### في Supabase:

```
1. Authentication → URL Configuration:
   - Site URL: https://omarhassan.site
   - Redirect URLs:
     https://omarhassan.site/admin
     https://omarhassan.site/*

2. Authentication → Email Templates:
   - راجع وخصص قوالب الإيميلات
```

---

## 📊 Netlify Build Settings

في `netlify.toml` (موجود مسبقاً):

```toml
[build]
  command = "npm install --include=optional && npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20.19.0"
  NPM_FLAGS = "--include=optional"
```

---

## ✅ Checklist النشر الكامل

قبل النشر:
- [ ] Supabase project created
- [ ] SQL schema executed
- [ ] Seed data added
- [ ] Storage bucket created
- [ ] Auth enabled
- [ ] Admin user created
- [ ] .env.local tested locally

أثناء النشر:
- [ ] Repository pushed to GitHub
- [ ] Netlify site created
- [ ] Build settings configured
- [ ] Environment variables added
- [ ] Deploy triggered

بعد النشر:
- [ ] Site loads successfully
- [ ] No console errors
- [ ] Portfolio shows projects
- [ ] Admin login works
- [ ] Can add/edit projects

---

## 🎉 تم بنجاح!

الآن الموقع منشور ويعمل بالكامل مع:
- ✅ Supabase Database
- ✅ Admin Panel
- ✅ Dynamic Portfolio
- ✅ Production Ready

**الموقع:** https://omarhassan.site  
**Admin:** https://omarhassan.site/admin/login

---

## 📞 للمساعدة

- **Netlify Docs:** https://docs.netlify.com
- **Supabase Docs:** https://supabase.com/docs
- **Build Errors:** Check Netlify Deploy log
- **Runtime Errors:** Check Browser Console (F12)
