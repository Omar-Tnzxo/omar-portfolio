# 🔐 دليل سريع: إنشاء مستخدم Admin

## 🎯 الطريقة الأسرع والأسهل

### ✅ الخطوة 1: افتح Supabase Dashboard

انتقل إلى: https://supabase.com/dashboard

### ✅ الخطوة 2: اختر مشروعك

اختر المشروع الخاص بـ Portfolio

### ✅ الخطوة 3: اذهب إلى Authentication

1. من القائمة الجانبية، اضغط على **Authentication**
2. ثم اضغط على **Users**

### ✅ الخطوة 4: أضف مستخدم جديد

1. اضغط على زر **Add User** (أو **Invite**)
2. املأ المعلومات:

```
Email: admin@yoursite.com
Password: اختر كلمة مرور قوية (مثلاً: Admin@2024#Strong)
```

3. **مهم جداً**: فعّل خيار **Auto Confirm User** ✅
4. اضغط **Create User** أو **Send Invitation**

### ✅ الخطوة 5: جرب الدخول

1. افتح موقعك: `https://yoursite.com/admin`
2. أدخل:
   - Email: `admin@yoursite.com`
   - Password: كلمة المرور التي اخترتها
3. اضغط Login

## 🎉 انتهى!

الآن يمكنك الدخول إلى لوحة التحكم وإدارة المشاريع بسهولة!

---

## 🔧 طريقة بديلة: عبر SQL

إذا أردت إنشاء المستخدم عبر SQL:

### الخطوة 1: افتح SQL Editor

من القائمة الجانبية في Supabase Dashboard، اختر **SQL Editor**

### الخطوة 2: انسخ والصق هذا الكود

```sql
-- إنشاء مستخدم admin
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@yoursite.com',               -- غيّر هذا البريد
    crypt('Admin@2024', gen_salt('bf')), -- غيّر كلمة المرور هنا
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"],"role":"admin"}',
    '{"role":"admin"}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
);
```

### الخطوة 3: عدّل البيانات

**قبل التشغيل، غيّر:**
- `admin@yoursite.com` → بريدك الإلكتروني
- `Admin@2024` → كلمة مرور قوية من اختيارك

### الخطوة 4: شغّل الكود

اضغط **Run** أو **F5**

---

## ⚠️ نصائح الأمان

### اختر كلمة مرور قوية:
- ✅ طولها أكثر من 8 أحرف
- ✅ تحتوي على أحرف كبيرة وصغيرة
- ✅ تحتوي على أرقام
- ✅ تحتوي على رموز خاصة

**مثال على كلمة مرور قوية:**
```
Admin@2024#PortFolio!
```

### لا تشارك:
- ❌ لا تشارك بريد Admin مع أحد
- ❌ لا تحفظ الباسورد في ملف نصي
- ❌ لا تستخدم كلمة مرور ضعيفة

---

## 🐛 حل المشاكل

### ❌ المشكلة: "Invalid login credentials"
**الحل:**
- تأكد من صحة البريد الإلكتروني
- تأكد من صحة كلمة المرور
- تأكد من أن المستخدم تم تأكيده (Auto Confirm)

### ❌ المشكلة: "User already exists"
**الحل:**
- استخدم بريد إلكتروني مختلف
- أو احذف المستخدم القديم من Authentication → Users

### ❌ المشكلة: لا يمكنني الوصول إلى /admin
**الحل:**
- تأكد من أن الموقع تم نشره بنجاح
- تأكد من أن متغيرات البيئة صحيحة في Netlify
- امسح الـ Cache في المتصفح

---

## 📞 هل تحتاج مساعدة؟

إذا واجهت أي مشكلة:
1. راجع ملف `ADMIN-DASHBOARD-GUIDE.md` للتفاصيل الكاملة
2. تحقق من Console في المتصفح (اضغط F12)
3. تحقق من Supabase Logs

---

## ✅ تأكد من الإعدادات

قبل البدء، تأكد من:
- [ ] Supabase URL موجود في `.env.local`
- [ ] Supabase ANON_KEY موجود في `.env.local`
- [ ] الموقع يعمل على `npm run dev`
- [ ] Database Schema تم تطبيقه بنجاح

**إذا كانت كل الإعدادات صحيحة، يجب أن يعمل كل شيء بسلاسة! 🚀**
