# ✅ Netlify Environment Variables - Quick Checklist

## 🎯 المهمة: إضافة 6 متغيرات في Netlify

### 🔗 الرابط المباشر
```
https://app.netlify.com → [Your Site] → Site configuration → Environment variables
```

---

## 📋 المتغيرات المطلوبة (Copy & Paste)

### 1️⃣ Supabase URL
```
Key:   VITE_SUPABASE_URL
Value: https://fcwnhrizpnicclxkdqyq.supabase.co
```

### 2️⃣ Supabase Anon Key
```
Key:   VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjd25ocml6cG5pY2NseGtkcXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MjI4NDEsImV4cCI6MjA3NzQ5ODg0MX0.-0pn6P6TLt8tsI1U67q-nGwD9Ve20wgyHPPEZ533S0A
```

### 3️⃣ EmailJS Key
```
Key:   VITE_APP_EMAILJS_KEY
Value: H4YFvBxDUh6YpVn0a
```

### 4️⃣ EmailJS Service ID
```
Key:   VITE_APP_SERVICE_ID
Value: service_mrbmgus
```

### 5️⃣ EmailJS Template ID
```
Key:   VITE_APP_TEMPLATE_ID
Value: template_d16rk5m
```

### 6️⃣ EmailJS Receiver
```
Key:   VITE_APP_EMAILJS_RECIEVER
Value: omar-agha@engineer.com
```

---

## 🚀 خطوات التنفيذ (3 خطوات فقط)

### ✅ الخطوة 1: أضف المتغيرات
1. افتح Netlify Dashboard
2. اذهب إلى Site configuration → Environment variables
3. اضغط "Add a variable" لكل متغير أعلاه
4. أو استخدم "Import from .env file" والصق كل القيم دفعة واحدة

### ✅ الخطوة 2: Trigger Deploy
1. اذهب إلى Deploys
2. اضغط "Trigger deploy"
3. اختر "Clear cache and deploy site"
4. ⏱️ انتظر 2-3 دقائق

### ✅ الخطوة 3: اختبر
1. افتح: https://omarhassan.site/admin/login
2. افتح Console (F12)
3. يجب ألا ترى "placeholder.supabase.co"
4. ✅ تم!

---

## 🔥 طريقة Import السريعة

في Netlify → Environment variables → "Import from a .env file":

```env
VITE_SUPABASE_URL=https://fcwnhrizpnicclxkdqyq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjd25ocml6cG5pY2NseGtkcXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MjI4NDEsImV4cCI6MjA3NzQ5ODg0MX0.-0pn6P6TLt8tsI1U67q-nGwD9Ve20wgyHPPEZ533S0A
VITE_APP_EMAILJS_KEY=H4YFvBxDUh6YpVn0a
VITE_APP_SERVICE_ID=service_mrbmgus
VITE_APP_TEMPLATE_ID=template_d16rk5m
VITE_APP_EMAILJS_RECIEVER=omar-agha@engineer.com
```

---

## 🎯 هل نجحت؟

### ✅ علامات النجاح:
- لا توجد أخطاء "placeholder.supabase.co"
- صفحة /admin/login تفتح بدون مشاكل
- يمكنك تسجيل الدخول (أو يقول "Invalid credentials" = Supabase يعمل!)

### ❌ علامات الفشل:
- ما زال يظهر "placeholder.supabase.co"
- أخطاء "ERR_NAME_NOT_RESOLVED"
- "Supabase URL is not configured"

**الحل:** تأكد من:
1. إضافة المتغيرات صحيحة
2. Trigger deploy بعد الإضافة
3. Clear cache عند Deploy
4. انتظر حتى ينتهي Build بنجاح

---

## 🎊 بعد النجاح

✅ Admin Panel جاهز: https://omarhassan.site/admin/login  
✅ Portfolio ديناميكي  
✅ Supabase متصل  
✅ يمكنك إدارة المحتوى بالكامل  

**🚀 الآن افتح Netlify وأضف المتغيرات!**
