# ⚡ دليل البداية السريع - 5 دقائق

## 🎯 الهدف
تشغيل المشروع محليًا وعلى الإنترنت في 5 دقائق.

---

## 📝 الخطوات

### 1️⃣ Setup Supabase (دقيقتان)

```bash
# 1. اذهب إلى https://supabase.com/dashboard
# 2. اضغط "New Project"
# 3. املأ البيانات:
Name: omar-portfolio
Database Password: [اختر كلمة مرور قوية]
Region: [اختر أقرب منطقة]

# 4. انتظر إنشاء المشروع (1-2 دقيقة)
```

### 2️⃣ Create Database (دقيقة واحدة)

```bash
# 1. افتح SQL Editor في Supabase
# 2. انسخ محتوى ملف supabase-schema.sql
# 3. الصقه في SQL Editor
# 4. اضغط Run (تنفيذ)
# ✅ Done! Database ready
```

### 3️⃣ Create Admin User (30 ثانية)

```bash
# في Supabase Dashboard:
Authentication → Users → Add user

Email: your-email@example.com
Password: YourPassword123!
[✓] Confirm user

# ✅ احفظ البريد وكلمة المرور!
```

### 4️⃣ Setup Local Environment (30 ثانية)

```bash
# 1. انسخ ملف البيئة
cp .env.example .env.local

# 2. احصل على Credentials من Supabase:
Settings → API

# 3. افتح .env.local وضع:
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5️⃣ Run Locally (دقيقة واحدة)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# ✅ افتح http://localhost:5173
```

### 6️⃣ Test Admin Panel (30 ثانية)

```bash
# 1. اذهب إلى http://localhost:5173/admin
# 2. سجل دخول بالبريد وكلمة المرور من الخطوة 3
# ✅ يجب أن تفتح لوحة التحكم!
```

---

## 🚀 Deploy to Netlify (دقيقتان)

### Method 1: من Dashboard

```bash
# 1. اذهب إلى https://app.netlify.com
# 2. اضغط "Add new site" → "Import from Git"
# 3. اختر GitHub repository
# 4. اضغط Deploy

# 5. أضف Environment Variables:
Site Settings → Environment variables → Add variable

VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# 6. Trigger new deploy
Deploys → Trigger deploy → Clear cache and deploy site

# ✅ Done! Site is live
```

### Method 2: من Terminal

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Deploy
netlify deploy --prod

# ✅ Follow prompts
```

---

## ✅ تحقق من النجاح

### محليًا:
- [ ] `npm run dev` يعمل بدون أخطاء
- [ ] الصفحة الرئيسية تفتح على http://localhost:5173
- [ ] `/admin` يفتح صفحة تسجيل الدخول
- [ ] تسجيل الدخول ينجح ويفتح `/admin/dashboard`

### على الإنترنت:
- [ ] الموقع يفتح على https://your-site.netlify.app
- [ ] `/admin` يعمل
- [ ] البيانات تُحمّل من Supabase
- [ ] يمكن إضافة مشاريع جديدة

---

## 🚨 حل سريع للمشاكل

### "supabaseUrl is required"
```bash
# تأكد من وجود .env.local
# تأكد من القيم الصحيحة فيه
# أعد تشغيل npm run dev
```

### "Invalid login credentials"
```bash
# تحقق من البريد وكلمة المرور
# تحقق من أن المستخدم Confirmed في Supabase
```

### Build يفشل على Netlify
```bash
# تأكد من إضافة Environment Variables في Netlify
# Trigger new deploy بعد الإضافة
```

---

## 📚 التوثيق الكامل

للتفاصيل، راجع:
- `PROJECT-COMPLETE-SUMMARY.md` - الملخص الشامل
- `SUPABASE-SETUP-GUIDE.md` - دليل قاعدة البيانات
- `ADMIN-SETUP-GUIDE.md` - دليل إنشاء Admin
- `NETLIFY-ENV-SETUP.md` - دليل Netlify

---

## 🎉 مبروك!

المشروع الآن يعمل محليًا وعلى الإنترنت! 🚀

**الخطوة التالية:** ابدأ بإضافة مشاريعك في `/admin/dashboard`
