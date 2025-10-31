# 🔐 دليل إنشاء مستخدم Admin - خطوة بخطوة

## ✅ الطريقة الأولى: من Supabase Dashboard (الأسهل)

### الخطوات:

#### 1. افتح مشروعك في Supabase
```
1. اذهب إلى: https://supabase.com/dashboard
2. سجل دخول (أو أنشئ حساب إذا لم يكن لديك)
3. اختر مشروعك (أو أنشئ مشروع جديد)
```

#### 2. فعّل Email Authentication
```
في Dashboard:
1. اضغط على "Authentication" من القائمة الجانبية
2. اضغط على "Providers"
3. ابحث عن "Email"
4. اضغط على "Enable" إذا لم يكن مفعّل
5. الإعدادات:
   ✅ Enable Email provider: ON
   ⚠️ Confirm email: OFF (للتطوير المحلي)
   ℹ️ Confirm email: ON (للإنتاج - recommended)
6. اضغط "Save"
```

#### 3. أنشئ مستخدم Admin
```
في نفس قسم Authentication:

1. اضغط على "Users" من القائمة الفرعية
2. اضغط زر "Add user" (أعلى اليمين)
3. املأ النموذج:

   📧 Email*: 
   اكتب الإيميل الذي تريده، مثل:
   - admin@yourdomain.com
   - your-email@gmail.com
   - omar.admin@example.com

   🔒 Password*:
   اكتب كلمة مرور قوية، مثل:
   - Admin@2024!Secure
   - MyStr0ngP@ssw0rd
   (يُفضل: حروف كبيرة + صغيرة + أرقام + رموز)

   ✅ Auto Confirm User: 
   فعّل هذا الخيار ⬅️ مهم جداً!
   (حتى لا تحتاج تأكيد الإيميل)

4. اضغط "Create new user"
```

#### 4. تأكد من إنشاء المستخدم
```
✅ يجب أن تظهر رسالة نجاح
✅ سيظهر المستخدم في قائمة Users
✅ ستجد:
   - Email: الإيميل الذي أدخلته
   - Status: Confirmed ✅ (إذا فعلت Auto Confirm)
```

#### 5. جرب تسجيل الدخول
```
1. اذهب إلى: http://localhost:5173/admin/login
2. أدخل الإيميل والباسورد
3. اضغط "تسجيل الدخول"
4. يجب أن يتم توجيهك إلى /admin
```

---

## 🎯 الطريقة الثانية: من SQL Editor (للمحترفين)

إذا أردت إنشاء مستخدم عبر SQL:

### الخطوات:

#### 1. افتح SQL Editor
```
Dashboard → SQL Editor → New query
```

#### 2. استخدم هذا الكود
```sql
-- ملاحظة: هذا يتطلب Service Role Key
-- استخدم Dashboard بدلاً من هذه الطريقة

-- أو يمكنك استخدام Supabase CLI
-- supabase auth signup --email admin@example.com --password YourPassword
```

**⚠️ ملاحظة:** الطريقة الأولى (Dashboard) أسهل وأفضل!

---

## 📝 ملاحظات مهمة

### أمان كلمة المرور
```
✅ استخدم كلمة مرور قوية على الأقل 8 أحرف
✅ امزج حروف كبيرة وصغيرة
✅ أضف أرقام ورموز (@#$%^&*)
❌ لا تستخدم "123456" أو "password"
❌ لا تستخدم معلومات شخصية واضحة
```

### للتطوير المحلي
```
يمكنك استخدام:
📧 Email: admin@localhost.com
🔒 Password: Admin123!

⚠️ غيّرها في الإنتاج!
```

### للإنتاج
```
📧 استخدم إيميل حقيقي تملكه
🔒 كلمة مرور قوية جداً
✅ فعّل Email Confirmation
✅ فعّل 2FA إن أمكن
```

---

## 🔧 حل المشاكل الشائعة

### المشكلة 1: "Invalid login credentials"
```
✅ الحل:
1. تأكد أن المستخدم موجود في Users
2. تأكد أن Status = Confirmed
3. تأكد من الإيميل والباسورد صحيحين
4. جرب reset password من Dashboard
```

### المشكلة 2: "Email not confirmed"
```
✅ الحل:
1. في Dashboard → Authentication → Users
2. اضغط على المستخدم
3. اضغط "Send confirmation email"
أو
4. فعّل "Auto Confirm User" عند الإنشاء
```

### المشكلة 3: لا يمكن إنشاء مستخدم
```
✅ الحل:
1. تأكد أن Email Provider مفعّل
2. تأكد من اتصال الإنترنت
3. جرب Refresh الصفحة
4. تحقق من Console للأخطاء
```

### المشكلة 4: "User already exists"
```
✅ الحل:
1. استخدم إيميل مختلف
أو
2. احذف المستخدم القديم:
   Users → اضغط على المستخدم → Delete User
```

---

## 🎓 خطوات سريعة (TL;DR)

```bash
# الطريقة الأسهل في 3 خطوات:

1️⃣ افتح: https://supabase.com/dashboard
   → Authentication → Providers → Email → Enable

2️⃣ اضغط: Authentication → Users → Add user
   📧 Email: admin@example.com
   🔒 Password: YourStrongPassword123!
   ✅ Auto Confirm: ON
   → Create

3️⃣ جرب: http://localhost:5173/admin/login
   → أدخل الإيميل والباسورد
   → تم! 🎉
```

---

## 📸 صور توضيحية (الخطوات)

### الخطوة 1: فتح Authentication
```
Dashboard
  └─ 🔐 Authentication (القائمة الجانبية)
      ├─ Providers
      └─ Users ⬅️ اضغط هنا
```

### الخطوة 2: Add User
```
Users Page
  └─ [+ Add user] ⬅️ زر أعلى اليمين
```

### الخطوة 3: ملء النموذج
```
┌─────────────────────────────────┐
│ Add new user                     │
├─────────────────────────────────┤
│ Email*                           │
│ ┌─────────────────────────────┐ │
│ │ admin@example.com           │ │
│ └─────────────────────────────┘ │
│                                  │
│ Password*                        │
│ ┌─────────────────────────────┐ │
│ │ YourPassword123!            │ │
│ └─────────────────────────────┘ │
│                                  │
│ ☑️ Auto Confirm User           │
│                                  │
│ [Create new user]                │
└─────────────────────────────────┘
```

---

## ✅ التأكد من النجاح

بعد الإنشاء، يجب أن ترى:

```
Users List:
┌────────────────────────────────────────┐
│ Email              Status    Created   │
├────────────────────────────────────────┤
│ admin@example.com  ✅ Confirmed  Now   │
└────────────────────────────────────────┘
```

---

## 🔄 إعادة تعيين كلمة المرور

إذا نسيت كلمة المرور:

```
1. Dashboard → Authentication → Users
2. اضغط على المستخدم
3. اختر "Reset Password"
4. أدخل كلمة المرور الجديدة
5. Save
```

---

## 🎯 معلومات إضافية

### متغيرات البيئة المطلوبة
```env
# في ملف .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### للحصول على المفاتيح
```
Dashboard → Settings → API
  ├─ Project URL → نسخ
  └─ anon public → نسخ
```

---

## 📞 المساعدة

### إذا واجهت مشكلة:

1. **راجع Documentation:**
   - SUPABASE-SETUP-GUIDE.md
   - استكشاف-المشاكل.md

2. **تحقق من Console:**
   - افتح F12
   - تبويب Console
   - ابحث عن أخطاء

3. **Supabase Docs:**
   - https://supabase.com/docs/guides/auth

---

## 🎉 جاهز!

الآن لديك مستخدم admin يمكنك استخدامه لتسجيل الدخول إلى `/admin/login`

**بيانات الدخول:**
- 📧 Email: [الإيميل الذي أنشأته]
- 🔒 Password: [كلمة المرور]

**احفظها في مكان آمن!** 🔐
