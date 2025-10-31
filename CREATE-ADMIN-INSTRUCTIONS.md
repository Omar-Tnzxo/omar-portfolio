# 🔐 إنشاء حساب الأدمن للوحة التحكم

## الطريقة الأولى: عبر Supabase Dashboard (الأسهل)

### الخطوات:

1. **افتح Supabase Dashboard**
   - اذهب إلى: https://supabase.com/dashboard
   - اختر مشروعك: `omar-portfolio`

2. **افتح Authentication**
   - من القائمة الجانبية → اضغط على **Authentication**
   - اضغط على تبويب **Users**

3. **أضف مستخدم جديد**
   - اضغط على زر **"Add user"** أو **"Invite"**
   - اختر **"Create new user"**

4. **أدخل بيانات الأدمن**
   ```
   Email: omar-agha@engineer.com
   Password: اختر كلمة مرور قوية (مثلاً: Omar@Admin2024!)
   ✅ Auto Confirm User: ضع علامة صح
   ```

5. **احفظ المستخدم**
   - اضغط على **"Create user"**
   - سيظهر المستخدم في القائمة

6. **سجل الدخول**
   - افتح موقعك: https://omarhassan.site/admin
   - استخدم الإيميل والباسورد اللي أنشأتهم
   - ستدخل مباشرة للوحة التحكم 🎉

---

## الطريقة الثانية: عبر SQL Editor

إذا أردت طريقة أسرع باستخدام SQL:

### الخطوات:

1. **افتح SQL Editor في Supabase**
   - من القائمة → **SQL Editor**

2. **نفذ هذا الكود**
```sql
-- إنشاء مستخدم Admin
-- استبدل البريد الإلكتروني والباسورد بما تريد

-- الطريقة الأولى (مباشرة)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  uuid_generate_v4(),
  'authenticated',
  'authenticated',
  'omar-agha@engineer.com',  -- استبدل بإيميلك
  crypt('YourPassword123!', gen_salt('bf')),  -- استبدل بكلمة المرور
  NOW(),
  NOW(),
  '',
  NOW(),
  '',
  NOW(),
  '',
  '',
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NULL,
  NOW(),
  NOW(),
  NULL,
  NULL,
  '',
  '',
  NOW(),
  '',
  0,
  NULL,
  '',
  NOW()
);
```

3. **اضغط Run**

---

## تسجيل الدخول

بعد إنشاء المستخدم:

1. **اذهب لصفحة تسجيل الدخول:**
   - Local: http://localhost:5173/admin
   - Live: https://omarhassan.site/admin

2. **أدخل البيانات:**
   - Email: الإيميل اللي أنشأته
   - Password: كلمة المرور اللي حددتها

3. **اضغط تسجيل الدخول**

---

## 🎯 صفحات لوحة التحكم المتاحة:

بعد تسجيل الدخول، يمكنك الوصول إلى:

| الصفحة | الرابط | الوظيفة |
|--------|--------|---------|
| **لوحة التحكم الرئيسية** | `/admin/dashboard` | عرض الإحصائيات |
| **إدارة المشاريع** | `/admin/projects` | عرض/تعديل/حذف المشاريع |
| **إضافة مشروع جديد** | `/admin/projects/new` | إضافة مشروع جديد |
| **تعديل مشروع** | `/admin/projects/edit/:id` | تعديل مشروع موجود |
| **إدارة الفئات** | `/admin/categories` | إدارة فئات البورتفوليو |

---

## ⚠️ ملاحظات مهمة:

1. **كلمة المرور:**
   - استخدم كلمة مرور قوية (8 أحرف على الأقل)
   - يجب أن تحتوي على: أحرف كبيرة وصغيرة وأرقام ورموز

2. **الأمان:**
   - لا تشارك بيانات تسجيل الدخول
   - غير كلمة المرور بانتظام
   - يمكنك إنشاء مستخدمين متعددين

3. **Environment Variables:**
   - تأكد من وجود `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` في `.env.local`
   - وفي متغيرات البيئة على Netlify

---

## 🐛 استكشاف الأخطاء:

### المشكلة: "Supabase URL is not configured"

**الحل:**
1. تأكد من ملف `.env.local` موجود
2. تأكد من وجود القيم الصحيحة:
```env
VITE_SUPABASE_URL=https://fcwnhrizpnicclxkdqyq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```
3. أعد تشغيل السيرفر: `npm run dev`

### المشكلة: "Invalid login credentials"

**الحل:**
1. تأكد أن المستخدم تم إنشاؤه في Supabase
2. تحقق من صحة الإيميل والباسورد
3. تأكد أن خانة "Auto Confirm User" مفعّلة

### المشكلة: الصفحة سوداء فارغة

**الحل:**
1. افتح Console في المتصفح (F12)
2. ابحث عن الأخطاء
3. غالباً المشكلة في متغيرات البيئة

---

## ✅ اختبار سريع:

بعد إنشاء المستخدم، اختبر:

```bash
# 1. تشغيل السيرفر المحلي
npm run dev

# 2. افتح المتصفح
# http://localhost:5173/admin

# 3. سجل الدخول
# Email: omar-agha@engineer.com
# Password: كلمتك

# 4. يجب أن تدخل للوحة التحكم مباشرة
```

---

## 📞 دعم إضافي:

إذا واجهت أي مشكلة:
1. تحقق من Console logs في المتصفح
2. تحقق من Supabase Dashboard → Logs
3. تأكد من صحة Environment Variables

---

**الآن لوحة التحكم جاهزة للاستخدام! 🎉**
