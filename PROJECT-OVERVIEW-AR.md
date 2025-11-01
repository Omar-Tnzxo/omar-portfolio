# مشروع Omar Portfolio - نظرة شاملة

## 📋 ملخص المشروع

هذا مشروع بورتفوليو احترافي تم بناؤه باستخدام **React + TypeScript + Vite** مع نظام إدارة محتوى ديناميكي يتكامل مع **Supabase**.

---

## 🏗️ البنية التقنية

### التقنيات المستخدمة
- **Frontend**: React 18.3.1 + TypeScript
- **Build Tool**: Vite 5.4.21
- **Styling**: Tailwind CSS + Framer Motion
- **UI Components**: shadcn/ui + Lucide React Icons
- **Database & Auth**: Supabase
- **Storage**: Supabase Storage
- **Routing**: React Router DOM
- **Forms**: EmailJS (Contact Form)
- **Notifications**: Sonner

### المكونات الرئيسية

#### 1. الصفحات العامة (Public Pages)
- `/` - الصفحة الرئيسية
- `/portfolio` - صفحة Portfolio Hub (عرض التصنيفات كـ Folders)
- `/portfolio/:category` - صفحة التصنيف (عرض المشاريع حسب التصنيف)
- `/portfolio/:category/:project` - صفحة Case Study للمشروع
- `/software` - صفحة Software Arsenal

#### 2. لوحة الإدارة (Admin Panel)
- `/admin` - صفحة تسجيل الدخول
- `/admin/dashboard` - لوحة التحكم الرئيسية
- `/admin/projects` - إدارة المشاريع
- `/admin/projects/new` - إضافة مشروع جديد
- `/admin/projects/:id/edit` - تعديل مشروع موجود
- `/admin/categories` - إدارة التصنيفات

---

## 🗄️ قاعدة البيانات (Supabase Schema)

### الجداول الرئيسية

#### 1. `portfolio_categories`
```sql
- id (uuid, primary key)
- name (text) - اسم التصنيف
- slug (text, unique) - رابط التصنيف
- color (text) - لون التصنيف
- description (text) - وصف التصنيف
- display_order (int) - ترتيب العرض
- is_active (boolean) - نشط/غير نشط
- created_at, updated_at
```

#### 2. `project_sub_categories`
```sql
- id (uuid, primary key)
- category_id (uuid, foreign key)
- name (text) - اسم التصنيف الفرعي
- slug (text) - رابط التصنيف الفرعي
- display_order (int)
- is_active (boolean)
- created_at, updated_at
```

#### 3. `portfolio_projects`
```sql
- id (uuid, primary key)
- slug (text, unique) - رابط المشروع
- title (text) - عنوان المشروع
- client (text) - اسم العميل
- my_role (text) - دوري في المشروع
- category_id (uuid, foreign key)
- sub_category_id (uuid, foreign key, nullable)
- short_description (text) - وصف مختصر
- full_description (text) - وصف كامل
- challenge (text) - التحدي
- solution (text) - الحل
- cover_image_url (text) - رابط الصورة الرئيسية
- video_url (text, nullable) - رابط الفيديو
- project_date (date) - تاريخ المشروع
- project_link (text, nullable) - رابط المشروع
- github_link (text, nullable) - رابط GitHub
- live_link (text, nullable) - رابط Live Demo
- is_featured (boolean) - مشروع مميز؟
- is_published (boolean) - منشور؟
- display_order (int) - ترتيب العرض
- meta_title (text, nullable) - SEO Title
- meta_description (text, nullable) - SEO Description
- created_at, updated_at
```

#### 4. `project_skills`
```sql
- id (uuid, primary key)
- project_id (uuid, foreign key)
- skill_name (text) - اسم المهارة
- display_order (int)
- created_at
```

#### 5. `project_tech_stack`
```sql
- id (uuid, primary key)
- project_id (uuid, foreign key)
- category (text) - frontend/backend/tools
- tech_name (text) - اسم التقنية
- display_order (int)
- created_at
```

#### 6. `project_gallery`
```sql
- id (uuid, primary key)
- project_id (uuid, foreign key)
- image_url (text) - رابط الصورة
- display_order (int)
- created_at
```

#### 7. `project_results`
```sql
- id (uuid, primary key)
- project_id (uuid, foreign key)
- result_text (text) - نص النتيجة
- display_order (int)
- created_at
```

#### 8. `project_analytics`
```sql
- id (uuid, primary key)
- project_id (uuid, foreign key)
- view_count (int) - عدد المشاهدات
- last_viewed_at (timestamp)
- created_at, updated_at
```

### Views (Database Views)

#### 1. `vw_category_summary`
عرض يجمع التصنيفات مع عدد المشاريع في كل تصنيف

#### 2. `vw_complete_projects`
عرض يجمع كل بيانات المشروع من كل الجداول المرتبطة

---

## 📁 Supabase Storage

### Buckets

#### `portfolio-images`
- تخزين جميع صور المشاريع
- **Public bucket**: نعم
- **Structure**:
  - `/projects/` - صور المشاريع الرئيسية
  - `/gallery/` - صور المعرض

### Storage Policies
```sql
-- قراءة عامة
CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'portfolio-images');

-- رفع للمستخدمين المصادق عليهم
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-images');

-- تحديث للمستخدمين المصادق عليهم
CREATE POLICY "Allow authenticated updates"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-images');

-- حذف للمستخدمين المصادق عليهم
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-images');
```

---

## 🔐 نظام المصادقة (Authentication)

### Supabase Auth
- **Provider**: Email/Password
- **Session Persistence**: localStorage
- **Auto Refresh**: مفعّل
- **Protected Routes**: استخدام `ProtectedRoute` component

### إنشاء مستخدم Admin
```sql
-- في SQL Editor في Supabase
-- قم بإنشاء مستخدم عبر Authentication > Users > Add User
-- ثم قم بتسجيل الدخول من /admin
```

---

## 🎨 الميزات الرئيسية

### 1. Portfolio System (4 مستويات)

#### المستوى 0: Homepage Preview
- عرض 3 مشاريع مميزة في الصفحة الرئيسية
- زر "Browse All Portfolio" للانتقال إلى Portfolio Hub

#### المستوى 1: Portfolio Hub (`/portfolio`)
- عرض التصنيفات على شكل Folders (باستخدام Folder component)
- كل Folder يعرض:
  - اسم التصنيف
  - وصف مختصر
  - عدد المشاريع
  - لون مميز للتصنيف

#### المستوى 2: Category Page (`/portfolio/:category`)
- عرض جميع المشاريع في التصنيف
- نظام فلترة فرعي (Sub-categories)
- Project Cards تعرض:
  - صورة/فيديو الغلاف
  - العنوان
  - العميل
  - دوري في المشروع
  - وصف مختصر
  - المهارات (Tags)
  - روابط (GitHub, Live Demo, etc.)

#### المستوى 3: Case Study Page (`/portfolio/:category/:project`)
- صفحة تفصيلية كاملة للمشروع
- الأقسام:
  - Hero Section (صورة كبيرة + عنوان)
  - Project Summary Box (العميل، الدور، التاريخ، الروابط)
  - Full Description
  - Challenge & Solution
  - Gallery (صور + فيديوهات)
  - Tech Stack
  - Results (إن وجدت)
  - SEO Optimized

### 2. Admin Dashboard

#### إدارة المشاريع
- **عرض جميع المشاريع**: جدول يعرض كل المشاريع
- **بحث وفلترة**: البحث بالاسم أو العميل، فلترة حسب الحالة
- **إضافة مشروع جديد**:
  - معلومات أساسية (العنوان، العميل، الدور)
  - اختيار التصنيف والتصنيف الفرعي
  - رفع صورة الغلاف (من الجهاز)
  - إضافة فيديو (URL)
  - الوصف الكامل
  - التحدي والحل
  - إضافة مهارات (Tags)
  - إضافة Tech Stack (Frontend, Backend, Tools)
  - رفع صور المعرض (متعدد)
  - إضافة النتائج
  - إعدادات SEO
  - حالة النشر (منشور/مسودة، مميز/غير مميز)
- **تعديل مشروع**:
  - تحميل جميع البيانات الموجودة
  - تعديل أي حقل
  - رفع صور جديدة أو الاحتفاظ بالموجودة
- **حذف مشروع**
- **نشر/إلغاء نشر** مشروع
- **تمييز/إلغاء تمييز** مشروع

#### إدارة التصنيفات
- عرض جميع التصنيفات
- إضافة تصنيف جديد
- تعديل تصنيف
- حذف تصنيف
- تغيير ترتيب العرض
- تفعيل/تعطيل تصنيف

---

## 🔧 إعدادات البيئة (Environment Variables)

### ملف `.env.local`
```env
# Supabase Configuration
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# EmailJS Configuration (for contact form)
VITE_APP_EMAILJS_KEY=your-emailjs-key
VITE_APP_SERVICE_ID=your-service-id
VITE_APP_TEMPLATE_ID=your-template-id
VITE_APP_EMAILJS_RECIEVER=your-email@example.com
```

### Netlify Environment Variables
نفس المتغيرات أعلاه، يجب إضافتها في:
`Netlify Dashboard > Site Settings > Environment Variables`

---

## 🚀 النشر (Deployment)

### Netlify Configuration (`netlify.toml`)
```toml
[build]
  command = "npm install --include=optional && npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### خطوات النشر
1. **Push إلى GitHub**:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```

2. **Netlify Auto Deploy**: يتم النشر تلقائياً عند Push

3. **Manual Deploy**:
   - افتح Netlify Dashboard
   - اضغط "Trigger Deploy"

---

## 📝 الحالة الحالية للمشروع

### ✅ مكتمل
- ✅ نظام Portfolio الديناميكي (4 مستويات)
- ✅ تكامل Supabase كامل
- ✅ نظام المصادقة (Admin Authentication)
- ✅ لوحة الإدارة (Dashboard)
- ✅ إدارة المشاريع (CRUD)
- ✅ إدارة التصنيفات (CRUD)
- ✅ رفع الصور من الجهاز (Image Upload)
- ✅ رفع صور متعددة (Gallery)
- ✅ نظام SEO
- ✅ Responsive Design
- ✅ Dark Theme

### 🔧 تم حل المشاكل
- ✅ مشكلة Build (Folder export)
- ✅ مشكلة 406 Error (Single vs maybeSingle)
- ✅ مشكلة Storage Policies (Row Level Security)

### 📋 معلومات إضافية

#### إعدادات Supabase المطلوبة
1. **Authentication**:
   - تفعيل Email Provider
   - إنشاء مستخدم Admin

2. **Database**:
   - تشغيل `supabase-schema.sql`
   - تشغيل `supabase-seed.sql` (اختياري)

3. **Storage**:
   - إنشاء bucket `portfolio-images` (Public)
   - تشغيل `supabase-storage-policies.sql`

---

## 📞 الدعم والمساعدة

### الملفات المرجعية
- `SUPABASE-SETUP-GUIDE.md` - دليل إعداد Supabase
- `ADMIN-SETUP-GUIDE.md` - دليل إعداد لوحة الإدارة
- `NETLIFY-DEPLOYMENT-GUIDE.md` - دليل النشر على Netlify

### مشاكل شائعة وحلولها

#### 1. "Supabase URL is not configured"
**الحل**: تأكد من إضافة متغيرات البيئة في Netlify

#### 2. "Row-level security policy violated"
**الحل**: قم بتشغيل `supabase-storage-policies.sql`

#### 3. "Failed to load project data"
**الحل**: تأكد من وجود الجداول في قاعدة البيانات

#### 4. صفحة سوداء عند الفتح
**الحل**: افتح Console وتحقق من أخطاء JavaScript

---

## 🎯 الخطوات القادمة المقترحة

1. **إضافة Analytics Dashboard**: عرض إحصائيات المشاهدات
2. **نظام Comments**: إضافة تعليقات على المشاريع
3. **Search Functionality**: بحث متقدم في المشاريع
4. **Export/Import**: تصدير واستيراد البيانات
5. **Bulk Operations**: عمليات جماعية على المشاريع
6. **Version History**: سجل التعديلات
7. **Media Library**: مكتبة وسائط منظمة
8. **Role-Based Access**: صلاحيات متعددة

---

## 📄 الترخيص
MIT License

---

## 👨‍💻 المطور
Omar Hassan
- Email: omar-agha@engineer.com
- GitHub: https://github.com/omar-tnzxo

---

تم آخر تحديث: 2025-10-31
