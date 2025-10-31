<a name="readme-top"></a>

# 🎨 Omar Hassan - Dynamic Portfolio Website

> **Professional Portfolio with Dynamic Content Management System**  
> متخصص التسويق الرقمي ومطور Flutter - موقع شخصي احترافي مع نظام إدارة محتوى ديناميكي

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://omarhassan.site)
[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site)

---

## ✨ المميزات الرئيسية

### 🎯 للزوار
- 🗂️ **نظام Portfolio هرمي** - تصفح المشاريع عبر 4 مستويات منظمة
- 🎨 **تصميم احترافي** - واجهة عصرية responsive
- 🖼️ **معارض صور** - عرض صور المشاريع بشكل جميل
- 🔍 **فلترة متقدمة** - ابحث وصنف المشاريع بسهولة
- ⚡ **أداء عالي** - سرعة تحميل ممتازة

### 👨‍💼 للمدير (Admin)
- 🔐 **لوحة تحكم آمنة** - `/admin` مع مصادقة Supabase
- ➕ **إدارة كاملة** - إضافة/تعديل/حذف المشاريع
- 📤 **رفع الصور** - تحميل ومعالجة الصور مباشرة
- 🏷️ **إدارة التصنيفات** - تنظيم المشاريع
- 🛠️ **إدارة المهارات** - ربط المشاريع بالمهارات

---

## 🚀 بداية سريعة (5 دقائق)

```bash
# 1. Clone المشروع
git clone https://github.com/Omar-Tnzxo/omar-portfolio.git
cd omar-portfolio

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env.local
# عدّل .env.local بقيمك من Supabase

# 4. Run locally
npm run dev

# ✅ افتح http://localhost:5173
```

**للدليل الكامل:** اقرأ [`QUICK-START-5MIN.md`](./QUICK-START-5MIN.md)

---

## 📚 التوثيق الشامل

### 🎓 البداية
- [`QUICK-START-5MIN.md`](./QUICK-START-5MIN.md) - دليل 5 دقائق ⚡
- [`PROJECT-COMPLETE-SUMMARY.md`](./PROJECT-COMPLETE-SUMMARY.md) - الملخص الشامل 📊

### 🗄️ قاعدة البيانات
- [`SUPABASE-SETUP-GUIDE.md`](./SUPABASE-SETUP-GUIDE.md) - إعداد Supabase كامل
- `supabase-schema.sql` - Schema الجداول
- `supabase-seed.sql` - بيانات تجريبية

### 🔐 Admin Panel
- [`ADMIN-SETUP-GUIDE.md`](./ADMIN-SETUP-GUIDE.md) - دليل لوحة التحكم (عربي)
- [`QUICK-ADMIN-SETUP.md`](./QUICK-ADMIN-SETUP.md) - دليل سريع (English)

### 🌐 النشر
- [`NETLIFY-ENV-SETUP.md`](./NETLIFY-ENV-SETUP.md) - متغيرات البيئة
- [`NETLIFY-DEPLOYMENT-GUIDE.md`](./NETLIFY-DEPLOYMENT-GUIDE.md) - دليل النشر

### 🏗️ البنية المعمارية
- [`PORTFOLIO-LIBRARY-DOCUMENTATION.md`](./PORTFOLIO-LIBRARY-DOCUMENTATION.md) - البنية الكاملة
- [`SOFTWARE-ARSENAL-DOCUMENTATION.md`](./SOFTWARE-ARSENAL-DOCUMENTATION.md) - Software Section

---

## 🏗️ البنية الهرمية للـ Portfolio

```
Level 0: Homepage Preview
   ↓
   └─ 3 Featured Projects Cards

Level 1: Portfolio Hub (/portfolio)
   ↓
   └─ Folders Grid (Web Dev, Mobile Apps, etc.)

Level 2: Category Page (/portfolio/:category)
   ↓
   └─ Projects Grid + Sub-filters

Level 3: Case Study (/portfolio/:category/:project)
   ↓
   └─ Full Project Details + Gallery
```

---

## 🛠️ التقنيات المستخدمة

### Frontend
- **React 18.3.1** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **shadcn/ui** - UI Components

### Backend & Database
- **Supabase** - PostgreSQL Database
- **Supabase Auth** - Authentication
- **Supabase Storage** - File Storage

### Deployment
- **Netlify** - Hosting & CI/CD
- **GitHub** - Version Control

---

## 📁 هيكل المشروع

```
omar-portfolio/
├── src/
│   ├── components/
│   │   ├── PortfolioHub.tsx          # Level 1: Folders
│   │   ├── PortfolioCategoryPage.tsx # Level 2: Projects
│   │   ├── ProjectCaseStudy.tsx      # Level 3: Case Study
│   │   ├── FeaturedProjects.tsx      # Level 0: Homepage
│   │   ├── AdminLogin.tsx            # Admin Login
│   │   ├── AdminDashboard.tsx        # Admin Panel
│   │   └── ...
│   ├── services/
│   │   ├── portfolio-service.ts      # Supabase API
│   │   └── auth-service.ts           # Authentication
│   ├── types/
│   │   └── portfolio.ts              # TypeScript Types
│   └── App.tsx                        # Main Router
│
├── public/
│   ├── _redirects                     # Netlify Redirects
│   ├── _headers                       # Security Headers
│   └── portfolio/                     # Static Images
│
├── supabase-schema.sql                # Database Schema
├── supabase-seed.sql                  # Sample Data
│
├── .env.example                       # Environment Template
├── .env.local                         # Local Config (gitignored)
├── .netlifyignore                     # Netlify Ignore
├── netlify.toml                       # Netlify Config
└── package.json                       # Dependencies
```

---

## 🔧 متغيرات البيئة

### إنشاء `.env.local`
```bash
cp .env.example .env.local
```

### المتغيرات المطلوبة
```bash
# Supabase (مطلوبة)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# EmailJS (اختيارية)
VITE_APP_EMAILJS_KEY=your-emailjs-key
VITE_APP_SERVICE_ID=service_xxxxx
VITE_APP_TEMPLATE_ID=template_xxxxx
VITE_APP_EMAILJS_RECIEVER=your-email@example.com
```

**احصل على القيم من:**
- Supabase: `Dashboard → Settings → API`
- EmailJS: `Dashboard → Integration`

---

## 🎯 الأوامر المتاحة

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Type checking
npm run type-check       # Check TypeScript types

# Image optimization
node convert-to-webp.cjs # Convert images to WebP
```

---

## 🚀 النشر على Netlify

### طريقة 1: من GitHub (موصى بها)

1. **Push إلى GitHub**
   ```bash
   git add .
   git commit -m "Deploy to Netlify"
   git push
   ```

2. **ربط Netlify**
   - اذهب إلى [app.netlify.com](https://app.netlify.com)
   - New site from Git → GitHub
   - اختر repository
   - Deploy site

3. **إضافة Environment Variables**
   ```
   Site Settings → Environment variables → Add variable
   ```
   أضف `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY`

4. **Redeploy**
   ```
   Deploys → Trigger deploy → Clear cache and deploy
   ```

### طريقة 2: CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**للدليل الكامل:** اقرأ [`NETLIFY-ENV-SETUP.md`](./NETLIFY-ENV-SETUP.md)

---

## 🔐 لوحة التحكم Admin

### الوصول
```
http://localhost:5173/admin      # محليًا
https://your-site.com/admin      # على الإنترنت
```

### إنشاء حساب Admin

**في Supabase Dashboard:**
```
Authentication → Users → Add user

Email: your-admin@example.com
Password: YourSecurePassword123!
[✓] Confirm user
```

**ثم سجل الدخول في `/admin`**

**للدليل الكامل:** اقرأ [`ADMIN-SETUP-GUIDE.md`](./ADMIN-SETUP-GUIDE.md)

---

## 🎨 الميزات التفصيلية

### Portfolio System
- ✅ 4 مستويات هرمية
- ✅ فلترة متقدمة
- ✅ معارض صور
- ✅ Case studies تفصيلية
- ✅ SEO محسّن

### Admin Panel
- ✅ CRUD كامل للمشاريع
- ✅ رفع الصور
- ✅ إدارة التصنيفات
- ✅ إدارة المهارات
- ✅ واجهة سهلة

### Performance
- ✅ Lazy loading
- ✅ Image optimization
- ✅ Code splitting
- ✅ Fast page loads

---

## 🐛 حل المشاكل

### "supabaseUrl is required"
```bash
# تأكد من وجود .env.local
# تأكد من القيم الصحيحة
npm run dev  # أعد التشغيل
```

### "Invalid login credentials"
```bash
# تحقق من Supabase Dashboard
# Authentication → Users → تأكد المستخدم Confirmed
```

### Build يفشل على Netlify
```bash
# أضف Environment Variables في Netlify
# Trigger new deploy
```

**للمزيد:** راجع [`NETLIFY-ENV-SETUP.md`](./NETLIFY-ENV-SETUP.md)

---

## 📊 الحالة والإحصائيات

- ✅ **Build:** Passing
- ✅ **Tests:** N/A
- ✅ **Deploy:** Netlify
- ✅ **Database:** Supabase
- ✅ **Status:** Production Ready

---

## 🤝 المساهمة

هذا مشروع شخصي لـ Omar Hassan. للاستفسارات أو الاقتراحات:

- 📧 Email: omar-agha@engineer.com
- 🌐 Website: [omarhassan.site](https://omarhassan.site)
- 💼 LinkedIn: [Omar Hassan](https://linkedin.com/in/omar-hassan)

---

## 📄 الترخيص

© 2025 Omar Hassan. All rights reserved.

---

## 🙏 شكر خاص

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com)
- [Netlify](https://netlify.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://framer.com/motion)

---

<div align="center">

**مبني بـ ❤️ باستخدام React & TypeScript**

[⬆ Back to Top](#readme-top)

</div>
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
