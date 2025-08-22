<a name="readme-top"></a>

# Omar Hassan - Portfolio Website

موقع شخصي لعمر حسن - متخصص التسويق الرقمي ومطور Flutter

## 🚀 النشر على Netlify (الأسهل)

### الطريقة الأولى: النشر التلقائي من GitHub

1. **ارفع الكود على GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/omar-tnzxo/omar-portfolio.git
   git push -u origin main
   ```

2. **انشر على Netlify:**
   - اذهب إلى [netlify.com](https://netlify.com)
   - اضغط "New site from Git"
   - اختر GitHub واربط حسابك
   - اختر repository: `omar-portfolio`
   - Netlify سيكتشف تلقائياً الإعدادات من `netlify.toml`

### الطريقة الثانية: النشر اليدوي

1. **ابن المشروع:**
   ```bash
   npm install
   npm run build
   ```

2. **ارفع مجلد `dist` على Netlify:**
   - اذهب إلى [netlify.com](https://netlify.com)
   - اسحب مجلد `dist` إلى منطقة النشر
   - احصل على رابط الموقع

## 🛠️ التطوير المحلي

```bash
# تثبيت التبعيات
npm install

# تشغيل خادم التطوير
npm run dev

# بناء المشروع
npm run build

# معاينة البناء
npm run preview

# فحص الأنواع
npm run type-check
```

## 📁 هيكل المشروع

```
omar-website/
├── src/
│   ├── components/     # مكونات React
│   ├── assets/        # الصور والملفات الثابتة
│   ├── constants/     # الثوابت
│   ├── utils/         # الأدوات المساعدة
│   └── styles/        # ملفات CSS
├── public/            # الملفات العامة
├── dist/              # مجلد البناء (يتم إنشاؤه)
└── netlify.toml       # إعدادات Netlify
```

## 🌐 خيارات النشر الأخرى

### Vercel
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

## 🔧 المتغيرات البيئية

أنشئ ملف `.env.local`:
```env
VITE_APP_EMAILJS_KEY=your_emailjs_key
```

## 📱 المميزات

- ✅ تصميم متجاوب
- ✅ رسوم متحركة سلسة
- ✅ نماذج تواصل
- ✅ تحسين SEO
- ✅ أداء عالي
- ✅ دعم متصفحات حديثة

## 🎨 التقنيات المستخدمة

- **React 18** - مكتبة واجهة المستخدم
- **Vite** - أداة البناء
- **TypeScript** - لغة البرمجة
- **Tailwind CSS** - إطار العمل CSS
- **Framer Motion** - الرسوم المتحركة
- **Three.js** - الرسوم ثلاثية الأبعاد
- **EmailJS** - خدمة البريد الإلكتروني

## 📞 التواصل

- **Email:** omar-agha@engineer.com
- **GitHub:** [omar-tnzxo](https://github.com/omar-tnzxo)
- **LinkedIn:** [Omar Hassan](https://linkedin.com/in/omar-hassan)

## 📄 الترخيص

MIT License - انظر ملف [LICENSE](LICENSE) للتفاصيل.
