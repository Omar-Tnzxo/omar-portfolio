# 🎛️ دليل لوحة التحكم - Portfolio Admin Panel

## 📋 نظرة عامة

تم إنشاء لوحة تحكم كاملة لإدارة محتوى البورتفوليو الديناميكي. يمكنك من خلالها التحكم في كل شيء: المشاريع، الفئات، الصور، المحتوى، والـ SEO.

## 🔐 الوصول إلى لوحة التحكم

### 1. رابط الدخول
```
https://yoursite.com/admin
```

### 2. تسجيل الدخول

للدخول، ستحتاج إلى:
- **البريد الإلكتروني**: البريد المسجل في Supabase
- **كلمة المرور**: كلمة المرور المسجلة في Supabase

## 🎯 كيفية إنشاء حساب Admin

### الطريقة الأولى: عبر Supabase Dashboard

1. افتح Supabase Dashboard
2. اذهب إلى **Authentication** → **Users**
3. اضغط على **Add User**
4. أدخل:
   - Email: `admin@yoursite.com`
   - Password: `كلمة مرور قوية`
   - ✅ Auto Confirm User
5. اضغط **Create User**

### الطريقة الثانية: عبر SQL Query

افتح SQL Editor في Supabase وقم بتشغيل:

```sql
-- إنشاء مستخدم admin جديد
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
    'admin@yoursite.com',
    crypt('YOUR_PASSWORD_HERE', gen_salt('bf')),
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

**مهم جداً:**
- استبدل `YOUR_PASSWORD_HERE` بكلمة مرور قوية
- استبدل `admin@yoursite.com` ببريدك الإلكتروني

## 🖥️ أقسام لوحة التحكم

### 1. لوحة القيادة (Dashboard)
`/admin/dashboard`

**المميزات:**
- إحصائيات شاملة:
  - إجمالي المشاريع
  - عدد الفئات
  - المشاريع المميزة
  - المشاريع المنشورة
- روابط سريعة للإدارة
- نظرة عامة على النظام

### 2. إدارة المشاريع (Projects Management)
`/admin/projects`

**المميزات:**
- عرض جميع المشاريع
- البحث في المشاريع
- الفلترة حسب:
  - All (الكل)
  - Published (المنشورة)
  - Draft (المسودات)
  - Featured (المميزة)
- إجراءات سريعة:
  - ✏️ Edit (تعديل)
  - 👁️ Publish/Unpublish (نشر/إلغاء النشر)
  - ⭐ Feature/Unfeature (تمييز/إلغاء التمييز)
  - 🗑️ Delete (حذف)

### 3. إضافة/تعديل مشروع
`/admin/projects/new` أو `/admin/projects/edit/:id`

**المعلومات المطلوبة:**

#### أ. المعلومات الأساسية
- ✅ Project Title (عنوان المشروع) *مطلوب*
- ✅ Slug (الرابط الفريد) *مطلوب*
- ✅ Client (العميل) *مطلوب*
- ✅ My Role (دوري) *مطلوب*
- ✅ Category (الفئة) *مطلوب*
- ✅ Project Date (تاريخ المشروع) *مطلوب*
- ✅ Short Description (وصف قصير) *مطلوب*
- ✅ Full Description (وصف كامل) *مطلوب*
- ✅ Challenge (التحدي) *مطلوب*
- ✅ Solution (الحل) *مطلوب*

#### ب. الوسائط (Media)
- ✅ Cover Image URL (رابط صورة الغلاف) *مطلوب*
- Video URL (رابط الفيديو) *اختياري*
- Gallery Images (معرض الصور) *اختياري*

#### ج. المهارات والتقنيات
- Skills (المهارات): React, Node.js, MongoDB...
- Frontend Technologies: React, Vite, Tailwind...
- Backend Technologies: Node.js, Express, MongoDB...
- Tools & Others: Git, Figma, VS Code...

#### د. الروابط
- Project Link (رابط المشروع)
- GitHub Link (رابط GitHub)
- Live Link (رابط الموقع المباشر)

#### هـ. النتائج والإنجازات
- Results: قائمة بالنتائج المحققة

#### و. الإعدادات والـ SEO
- ☑️ Published (منشور)
- ☑️ Featured (مميز)
- Display Order (ترتيب العرض)
- Meta Title (عنوان SEO)
- Meta Description (وصف SEO)

### 4. إدارة الفئات (Categories Management)
`/admin/categories`

**المميزات:**
- عرض جميع الفئات
- إضافة فئة جديدة
- تعديل فئة موجودة
- حذف فئة
- اختيار لون مخصص لكل فئة

**المعلومات المطلوبة للفئة:**
- ✅ Category Name (اسم الفئة) *مطلوب*
- ✅ Slug (الرابط الفريد) *مطلوب*
- ✅ Color (اللون) *مطلوب*
- Description (الوصف) *اختياري*

## 📊 حالات المشاريع

### 1. Published (منشور)
- ✅ يظهر في الموقع الرئيسي
- ✅ يظهر في صفحة الفئة
- ✅ يمكن الوصول إليه عبر الرابط المباشر

### 2. Draft (مسودة)
- ❌ لا يظهر في الموقع
- ✅ يظهر فقط في لوحة التحكم
- مفيد للمشاريع قيد الإعداد

### 3. Featured (مميز)
- ⭐ يظهر في الصفحة الرئيسية
- ⭐ يظهر في قسم "Featured Projects"
- يجب أن يكون منشوراً ليظهر

## 🎨 كيفية رفع الصور

### الطريقة الموصى بها: Supabase Storage

1. **إنشاء Bucket في Supabase:**
   - افتح Supabase Dashboard
   - اذهب إلى **Storage**
   - اضغط **New Bucket**
   - اسم الـ Bucket: `portfolio-images`
   - اجعله **Public**

2. **رفع الصور:**
   - افتح الـ Bucket
   - اضغط **Upload Files**
   - اختر الصور
   - انسخ الـ URL العام للصورة

3. **استخدام الرابط:**
   ```
   https://your-project.supabase.co/storage/v1/object/public/portfolio-images/image-name.jpg
   ```

### طرق بديلة:
- **Cloudinary**: رفع الصور على Cloudinary واستخدام الروابط
- **ImgBB**: رفع مجاني للصور
- **GitHub**: رفع الصور في مجلد assets ثم استخدام raw.githubusercontent.com

## 🔒 الأمان

### Row Level Security (RLS)

تم تفعيل RLS على جميع الجداول:
- **القراءة**: متاحة للجميع (المحتوى المنشور فقط)
- **الكتابة/التعديل/الحذف**: متاحة للمستخدمين المصادق عليهم فقط

### حماية Routes

جميع صفحات الـ Admin محمية بـ `ProtectedRoute`:
- يتحقق من حالة تسجيل الدخول
- يعيد توجيه غير المصرح لهم إلى `/admin`

## 🚀 نصائح للاستخدام الأمثل

### 1. تنظيم المشاريع
- استخدم Display Order لترتيب المشاريع
- اجعل أفضل 3 مشاريع "Featured"
- استخدم وصف قصير جذاب (1-2 جمل)

### 2. الصور
- استخدم صور عالية الجودة
- حجم الصورة المثالي: 1200x800 px
- استخدم WebP للحجم الأصغر

### 3. SEO
- املأ Meta Title و Meta Description لكل مشروع
- استخدم كلمات مفتاحية مناسبة
- اجعل الـ Slug واضح ومفهوم

### 4. المحتوى
- اكتب Challenge و Solution بشكل واضح
- أضف نتائج قابلة للقياس
- استخدم معرض الصور لعرض التطور

## 🐛 حل المشاكل الشائعة

### 1. لا يمكنني تسجيل الدخول
- ✅ تحقق من أن Supabase URL و ANON_KEY صحيحان
- ✅ تحقق من أن المستخدم موجود في Authentication
- ✅ تحقق من أن البريد والباسورد صحيحان

### 2. المشاريع لا تظهر
- ✅ تحقق من أن المشروع Published
- ✅ تحقق من RLS Policies في Supabase
- ✅ تحقق من Console للأخطاء

### 3. لا يمكنني رفع الصور
- ✅ استخدم روابط خارجية (Cloudinary, ImgBB)
- ✅ أو أنشئ Supabase Storage Bucket

### 4. خطأ في Build
- ✅ تحقق من أن جميع الحقول المطلوبة مملوءة
- ✅ تحقق من صحة الروابط
- ✅ تحقق من Console للأخطاء

## 📞 الدعم

إذا واجهت أي مشكلة:
1. تحقق من Console في المتصفح (F12)
2. تحقق من Supabase Logs
3. تحقق من Network Tab للأخطاء
4. راجع التوثيق أعلاه

## ✅ قائمة التحقق السريعة

قبل نشر مشروع جديد:
- [ ] املأ جميع الحقول المطلوبة (*)
- [ ] أضف صورة غلاف عالية الجودة
- [ ] أضف على الأقل 3 skills
- [ ] املأ Challenge و Solution
- [ ] أضف روابط المشروع (إن وجدت)
- [ ] املأ Meta Title و Meta Description
- [ ] حدد الفئة المناسبة
- [ ] اجعله Published إذا كان جاهزاً
- [ ] اجعله Featured إذا كان من أفضل أعمالك

## 🎉 ملاحظات نهائية

لوحة التحكم مصممة لتكون:
- ✨ سهلة الاستخدام
- ⚡ سريعة وفعالة
- 🎨 جميلة المظهر
- 🔒 آمنة تماماً
- 📱 متجاوبة مع جميع الأجهزة

**استمتع بإدارة محتواك بسهولة! 🚀**
