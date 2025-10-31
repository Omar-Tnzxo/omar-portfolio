# تعليمات تشغيل المشروع / Project Setup Instructions

## المشاكل التي تم إصلاحها / Fixed Issues

1. **مشكلة NODE_ENV**: كانت متغير البيئة NODE_ENV مضبوطة على "production" مما منع تثبيت devDependencies
2. **مشكلة .npmrc**: كان الملف يحتوي على إعدادات Linux وتم تحديثها لـ Windows
3. **مشكلة Vite**: تم إضافة Vite إلى devDependencies
4. **مشكلة tailwind.config.ts**: تم إصلاح مشكلة الأقواس المتداخلة في سطر 71
5. **مشكلة CSS**: تم استخدام style.min.css بدلاً من style.css لمكتبة react-vertical-timeline-component

## تشغيل المشروع / Running the Project

### الطريقة الأولى (استخدام npm مباشرة):
```bash
# تأكد من إلغاء NODE_ENV
set NODE_ENV=

# تشغيل السيرفر المحلي
npm run dev

# بناء المشروع للإنتاج
npm run build

# معاينة البناء
npm run preview
```

### الطريقة الثانية (استخدام السكريبت المساعد):
```bash
# تشغيل السيرفر المحلي
dev.cmd
```

## ملاحظات مهمة / Important Notes

- تأكد دائماً من عدم ضبط NODE_ENV على "production" عند التطوير
- المشروع يعمل على http://localhost:5173/
- جميع التبعيات تم تثبيتها بنجاح (235 حزمة)
- البناء يعمل بنجاح وينتج ملفات في مجلد dist/

## المتطلبات / Requirements

- Node.js (نسخة 18 أو أحدث)
- npm (يأتي مع Node.js)

## الملفات المعدلة / Modified Files

1. `.npmrc` - تحديث الإعدادات لـ Windows
2. `package.json` - إضافة Vite إلى devDependencies
3. `tailwind.config.ts` - إصلاح مشكلة الأقواس في backgroundImage
4. `src/main.tsx` - تغيير استيراد CSS إلى النسخة المصغرة
5. `vite.config.ts` - تبسيط إعدادات React plugin
6. `postcss.config.cjs` - تحسين الإعدادات
7. `dev.cmd` - ملف مساعد جديد للتشغيل السريع
