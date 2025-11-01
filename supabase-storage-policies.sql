-- =============================================================================
-- Supabase Storage Policies لحل مشكلة رفع الصور
-- =============================================================================
-- قم بتنفيذ هذا الملف في SQL Editor في Supabase Dashboard
-- =============================================================================

-- 1. حذف السياسات القديمة إن وجدت (لتجنب التعارض)
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Users Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Users Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Users Delete" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;

-- 2. التأكد من وجود الـ bucket (إذا لم يكن موجوداً، قم بإنشائه من Dashboard)
-- هذا السطر للتوضيح فقط، لا تقم بتنفيذه إذا كان الـ bucket موجوداً بالفعل
-- INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true)
-- ON CONFLICT (id) DO NOTHING;

-- 3. سياسة القراءة العامة - السماح لأي شخص بقراءة الصور
CREATE POLICY "Allow public read access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'portfolio-images');

-- 4. سياسة الرفع - السماح للمستخدمين المصرح لهم برفع الصور
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-images');

-- 5. سياسة التحديث - السماح للمستخدمين المصرح لهم بتحديث الصور
CREATE POLICY "Allow authenticated updates"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-images')
WITH CHECK (bucket_id = 'portfolio-images');

-- 6. سياسة الحذف - السماح للمستخدمين المصرح لهم بحذف الصور
CREATE POLICY "Allow authenticated deletes"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-images');

-- 7. التحقق من السياسات
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'objects'
  AND policyname LIKE '%Allow%';

-- =============================================================================
-- بعد تنفيذ هذا السكريبت:
-- =============================================================================
-- ✅ يمكن لأي شخص قراءة الصور (Public Read)
-- ✅ يمكن للمستخدمين المسجلين فقط رفع/تحديث/حذف الصور
-- ✅ تم حل مشكلة "row-level security policy"
-- =============================================================================

-- ملاحظة هامة:
-- تأكد من أن الـ bucket "portfolio-images" تم إنشاؤه من Dashboard
-- وأنه تم تفعيل خيار "Public bucket"
