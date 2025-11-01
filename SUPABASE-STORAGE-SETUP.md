# دليل إعداد Supabase Storage لرفع الصور

## الخطوة 1: إنشاء Storage Bucket

1. **افتح Supabase Dashboard**
   - انتقل إلى: https://supabase.com/dashboard
   - اختر مشروعك

2. **انتقل إلى Storage**
   - من القائمة الجانبية، اضغط على **Storage**
   - اضغط على **New bucket**

3. **إنشاء Bucket جديد**
   ```
   Name: portfolio-images
   Public bucket: ✅ (تأكد من تفعيل هذا الخيار)
   ```
   - اضغط **Create bucket**

## الخطوة 2: إعداد السياسات (Policies)

يجب إعداد السياسات للسماح بالقراءة والكتابة:

### سياسة القراءة العامة (Public Read)

1. اذهب إلى **Storage** → **Policies**
2. اختر bucket: `portfolio-images`
3. اضغط **New Policy**
4. اختر **For full customization**
5. املأ كالتالي:

```sql
-- Policy Name
Public Read Access

-- Policy Definition
SELECT

-- Target roles
public

-- USING expression
true
```

### سياسة الكتابة للمستخدمين المصرّح لهم (Authenticated Write)

1. اضغط **New Policy** مرة أخرى
2. املأ كالتالي:

```sql
-- Policy Name
Authenticated Users Upload

-- Policy Definition
INSERT, UPDATE, DELETE

-- Target roles
authenticated

-- USING expression
true

-- WITH CHECK expression
true
```

## الخطوة 3: تنظيم المجلدات

سيتم إنشاء المجلدات تلقائياً عند رفع الملفات:

```
portfolio-images/
├── projects/              # صور المشاريع الرئيسية
│   ├── {timestamp}-{random}.webp
│   └── gallery/           # صور معارض المشاريع
│       └── {timestamp}-{random}.webp
├── categories/            # صور التصنيفات
└── temp/                  # ملفات مؤقتة
```

## الخطوة 4: اختبار الرفع

1. سجل الدخول إلى `/admin`
2. اذهب إلى **المشاريع** → **إضافة مشروع جديد**
3. جرب رفع صورة
4. تأكد من ظهورها في Storage Dashboard

## الأوامر SQL السريعة

إذا كنت تفضل SQL، يمكنك تنفيذ هذه الأوامر في **SQL Editor**:

```sql
-- إنشاء Bucket (اختياري إذا لم تنشئه من Dashboard)
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true);

-- سياسة القراءة العامة
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'portfolio-images');

-- سياسة الكتابة للمستخدمين المصرّح لهم
CREATE POLICY "Authenticated Users Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Authenticated Users Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-images');

CREATE POLICY "Authenticated Users Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-images');
```

## استكشاف الأخطاء

### خطأ: "The resource already exists"
- Bucket موجود بالفعل، لا تحتاج لإنشائه مرة أخرى

### خطأ: "new row violates row-level security policy"
- تأكد من إضافة السياسات الصحيحة للـ Storage

### خطأ: "Failed to upload"
- تحقق من أن Bucket عام (Public)
- تحقق من أنك مسجل دخول كـ admin
- تحقق من حجم الملف (أقل من 50MB)

## الحجم المسموح

- **صورة الغلاف**: حتى 10 MB
- **الفيديو**: حتى 50 MB
- **صور المعرض**: حتى 10 MB لكل صورة
- **إجمالي**: حتى 15 صورة في المعرض

## نصائح للأداء

1. **استخدم صيغة WebP** للصور الأفضل
2. **ضغط الصور** قبل الرفع
3. **تجنب الأحجام الكبيرة** غير الضرورية
4. **احذف الصور غير المستخدمة** من Storage

## التحقق من النجاح

بعد إعداد كل شيء:

✅ يمكنك رؤية `portfolio-images` في Storage Dashboard  
✅ يمكنك رفع صورة من لوحة Admin  
✅ يمكنك رؤية الصورة معروضة في المشروع  
✅ لا توجد أخطاء في Console المتصفح

## روابط مفيدة

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Storage Policies Guide](https://supabase.com/docs/guides/storage/security/access-control)
- [Image Optimization](https://supabase.com/docs/guides/storage/serving/image-transformations)

---

**تم! 🎉** الآن يمكنك رفع الصور مباشرة من لوحة التحكم بدون الحاجة لروابط خارجية.
