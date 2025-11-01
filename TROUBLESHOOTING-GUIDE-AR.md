# دليل استكشاف الأخطاء وحلها

## 🔴 المشاكل التي تم حلها

### 1. Build Error: "Folder" is not exported
**الخطأ**:
```
error during build:
src/components/PortfolioFolder.tsx (3:9): "Folder" is not exported by "src/components/Folder.tsx"
```

**السبب**: ترتيب تصدير المكون كان خاطئاً

**الحل**:
```typescript
// في ملف Folder.tsx
export { Folder };  // named export أولاً
export default Folder;  // default export ثانياً
```

---

### 2. Supabase 406 Error عند التحديث
**الخطأ**:
```
Failed to load resource: the server responded with a status of 406
```

**السبب**: استخدام `.single()` بدلاً من `.maybeSingle()` في عمليات التحديث

**الحل**:
```typescript
// قبل
const { data, error } = await supabase
  .from('portfolio_projects')
  .update(updates)
  .eq('id', id)
  .select()
  .single();  // ❌ خطأ

// بعد
const { data, error } = await supabase
  .from('portfolio_projects')
  .update(updates)
  .eq('id', id)
  .select('*')
  .maybeSingle();  // ✅ صحيح
```

---

### 3. Storage Upload Error: Row-level security policy
**الخطأ**:
```
Upload error: StorageApiError: new row violates row-level security policy
```

**السبب**: عدم تفعيل Storage Policies

**الحل**:
1. افتح Supabase Dashboard
2. اذهب إلى SQL Editor
3. نفذ محتوى ملف `supabase-storage-policies.sql`
4. تأكد من أن bucket `portfolio-images` هو Public

```sql
-- السياسات المطلوبة
CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'portfolio-images');

CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Allow authenticated updates"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-images');

CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-images');
```

---

### 4. Netlify Build Error: Secrets in code
**الخطأ**:
```
Secrets scanning detected secrets in files during build.
```

**السبب**: وجود قيم Supabase في ملفات التوثيق

**الحل**:
إضافة متغير بيئة في Netlify:
```
SECRETS_SCAN_OMIT_PATHS = .md,docs/**
```

أو حذف القيم الحقيقية من ملفات `.md` واستبدالها بـ placeholders

---

### 5. الموقع يفتح على صفحة سوداء
**الأسباب المحتملة**:
1. خطأ في JavaScript
2. متغيرات البيئة غير محددة
3. خطأ في Routing

**الحل**:
1. افتح Developer Console (`F12`)
2. تحقق من الأخطاء في Console
3. تحقق من متغيرات البيئة:
   ```javascript
   console.log(import.meta.env.VITE_SUPABASE_URL);
   console.log(import.meta.env.VITE_SUPABASE_ANON_KEY);
   ```
4. تأكد من وجود ملف `.env.local` في المشروع
5. أعد تشغيل الـ dev server:
   ```bash
   npm run dev
   ```

---

## 🟡 مشاكل محتملة وحلولها

### 1. فشل تسجيل الدخول للإدارة
**الأعراض**: "فشل في تسجيل الدخول" حتى مع بيانات صحيحة

**الأسباب المحتملة**:
- المستخدم غير موجود في Supabase
- كلمة المرور خاطئة
- Email Provider غير مفعّل

**الحل**:
1. تحقق من Supabase Dashboard > Authentication > Users
2. تأكد من وجود المستخدم
3. تأكد من تفعيل Email Provider:
   - Authentication > Providers > Email
   - تفعيل "Enable Email provider"
4. أنشئ مستخدم جديد:
   - Authentication > Users > Add User
   - أدخل Email وPassword
   - احفظ

---

### 2. فشل تحميل المشاريع
**الأعراض**: الصفحة فارغة، لا توجد مشاريع

**الأسباب المحتملة**:
- قاعدة البيانات فارغة
- خطأ في Schema
- خطأ في الـ API

**الحل**:
1. تحقق من وجود جداول في قاعدة البيانات
2. نفذ `supabase-schema.sql` إذا لم يكن منفذاً
3. نفذ `supabase-seed.sql` لإضافة بيانات تجريبية
4. تحقق من Console للأخطاء

---

### 3. فشل رفع الصور
**الأعراض**: "فشل في رفع الملف"

**الأسباب المحتملة**:
- Storage Policies غير محددة
- Bucket غير موجود
- حجم الملف كبير جداً
- نوع الملف غير مدعوم

**الحل**:
1. تحقق من وجود bucket `portfolio-images`
2. تأكد من أنه Public bucket
3. نفذ Storage Policies:
   ```bash
   # في Supabase SQL Editor
   # نفذ محتوى supabase-storage-policies.sql
   ```
4. تحقق من حجم الملف (الحد الأقصى 5 MB)
5. تحقق من نوع الملف (صور فقط: jpg, png, webp, gif)

---

### 4. الصور لا تظهر
**الأعراض**: المشاريع موجودة لكن الصور لا تظهر

**الأسباب المحتملة**:
- روابط الصور خاطئة
- Bucket غير Public
- CORS Issue

**الحل**:
1. تحقق من رابط الصورة في Console
2. افتح Supabase Dashboard > Storage
3. تحقق من إعدادات bucket `portfolio-images`
4. تأكد من تفعيل "Public bucket"
5. تحقق من Storage Policies (قراءة عامة)

---

### 5. خطأ 403 Forbidden
**الأعراض**: عدم القدرة على الوصول لموارد معينة

**السبب**: مشكلة في الصلاحيات (RLS Policies)

**الحل**:
1. تحقق من Row Level Security Policies
2. تأكد من أن المستخدم مسجل الدخول
3. تحقق من Session:
   ```javascript
   const { data: { session } } = await supabase.auth.getSession();
   console.log('Session:', session);
   ```

---

## 🔵 أدوات التشخيص

### 1. فحص اتصال Supabase
```javascript
// في Console
import { supabase } from './src/lib/supabase';

// اختبار الاتصال
const test = await supabase.from('portfolio_categories').select('count');
console.log('Connection test:', test);
```

### 2. فحص المصادقة
```javascript
// في Console
import { authService } from './src/services/auth-service';

// التحقق من الجلسة
const { user } = await authService.getSession();
console.log('Current user:', user);
```

### 3. فحص Storage
```javascript
// في Console
import { supabase } from './src/lib/supabase';

// قائمة الملفات
const { data, error } = await supabase
  .storage
  .from('portfolio-images')
  .list('projects');
  
console.log('Files:', data, error);
```

### 4. فحص المتغيرات البيئية
```javascript
// في Console
console.log('Environment Variables:');
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Not Set');
```

---

## 🟢 نصائح الصيانة

### 1. النسخ الاحتياطي المنتظم
```sql
-- في Supabase SQL Editor
-- تصدير جميع البيانات
SELECT * FROM portfolio_categories;
SELECT * FROM portfolio_projects;
SELECT * FROM project_skills;
-- ... إلخ
```

### 2. مراقبة الأداء
- استخدم Lighthouse لفحص الأداء
- راقب استخدام Supabase (Database Size, API Requests)
- راقب Storage Usage

### 3. التحديثات الدورية
```bash
# تحديث المكتبات
npm update

# فحص الثغرات الأمنية
npm audit

# إصلاح الثغرات
npm audit fix
```

### 4. تنظيف الملفات القديمة
```javascript
// حذف الصور غير المستخدمة من Storage
// يدوياً من Supabase Dashboard > Storage
```

---

## 📚 مراجع مفيدة

### Documentation
- [Supabase Docs](https://supabase.com/docs)
- [React Router Docs](https://reactrouter.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

### Community
- [Supabase Discord](https://discord.supabase.com)
- [React Discord](https://discord.gg/react)

### Tools
- [Supabase Dashboard](https://app.supabase.com)
- [Netlify Dashboard](https://app.netlify.com)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

---

## 🆘 الحصول على المساعدة

### إذا واجهت مشكلة لم تُذكر هنا:

1. **افتح Developer Console** (`F12`)
2. **سجّل الخطأ الكامل**
3. **تحقق من**:
   - Network Tab (للأخطاء في API requests)
   - Console Tab (للأخطاء في JavaScript)
   - Application Tab > Local Storage (للتحقق من Session)

4. **اجمع المعلومات**:
   - نص الخطأ الكامل
   - متى يحدث الخطأ (الخطوات للتكرار)
   - المتصفح المستخدم
   - هل يحدث في Dev أم Production؟

5. **ابحث عن الحل**:
   - Google: "supabase [error message]"
   - Stack Overflow
   - Supabase GitHub Issues
   - Discord Communities

---

تم آخر تحديث: 2025-10-31
