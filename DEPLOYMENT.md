# 🚀 دليل النشر السريع

## الطريقة الأسهل: Netlify

### 1. رفع الكود على GitHub
```bash
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/omar-tnzxo/omar-portfolio.git
git push -u origin main
```

### 2. النشر على Netlify
1. اذهب إلى [netlify.com](https://netlify.com)
2. اضغط "Sign up" أو "Log in"
3. اختر "New site from Git"
4. اختر GitHub واربط حسابك
5. اختر repository: `omar-portfolio`
6. Netlify سيكتشف تلقائياً:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. اضغط "Deploy site"

### 3. النتيجة
- ستحصل على رابط مثل: `https://omar-portfolio.netlify.app`
- يمكنك تغيير اسم النطاق من إعدادات الموقع

## خيارات أخرى سريعة

### Vercel (مماثل لـ Netlify)
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
npm install gh-pages --save-dev
npm run build
npx gh-pages -d dist
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🔧 استكشاف الأخطاء

### إذا فشل البناء:
1. تأكد من تثبيت التبعيات: `npm install`
2. تحقق من الأخطاء: `npm run type-check`
3. جرب البناء محلياً: `npm run build`

### إذا لم تظهر الصفحة:
1. تحقق من ملف `_redirects` في مجلد `public`
2. تأكد من أن `base: '/'` في `vite.config.ts`

## 📞 المساعدة
- **GitHub Issues:** [omar-tnzxo/omar-portfolio](https://github.com/omar-tnzxo/omar-portfolio/issues)
- **Email:** omar-agha@engineer.com
