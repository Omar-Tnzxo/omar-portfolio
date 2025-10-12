# 📧 دليل إعداد EmailJS

## المشكلة التي تم حلها

كانت المشكلة أن الكود يحاول استخدام المتغيرات البيئية من `import.meta.env` بدون قيم احتياطية (fallback values). إذا لم تكن هذه المتغيرات موجودة، سيكون القيمة `undefined` ولن يعمل EmailJS.

## الحل

تم إضافة قيم احتياطية (fallback values) في ملف `contact.tsx`:

```typescript
import.meta.env.VITE_APP_SERVICE_ID || 'service_mrbmgus'
import.meta.env.VITE_APP_TEMPLATE_ID || 'template_d16rk5m'
import.meta.env.VITE_APP_EMAILJS_KEY || 'H4YFvBxDUh6YpVn0a'
```

## التحقق من إعدادات EmailJS الحالية

### 1. تسجيل الدخول إلى EmailJS
اذهب إلى: [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)

### 2. تحقق من Service ID
- اذهب إلى **Email Services**
- تأكد من أن Service ID هو: `service_mrbmgus`
- إذا كان مختلفًا، قم بتحديثه في ملف `.env.local`

### 3. تحقق من Template ID
- اذهب إلى **Email Templates**
- تأكد من أن Template ID هو: `template_d16rk5m`
- **مهم جداً**: تأكد من أن Template يحتوي على المتغيرات التالية:
  ```
  {{from_name}}
  {{from_email}}
  {{message}}
  {{date}}
  {{time}}
  {{ip_address}}
  {{location}}
  {{country}}
  {{city}}
  {{browser}}
  {{device}}
  {{platform}}
  {{referrer}}
  ```

### 4. تحقق من Public Key (User ID)
- اذهب إلى **Account** > **General**
- تأكد من أن Public Key هو: `H4YFvBxDUh6YpVn0a`
- إذا كان مختلفًا، قم بتحديثه في ملف `.env.local`

### 5. تحقق من Email Template الصحيح

يجب أن يبدو Email Template هكذا:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(to right, #667eea, #764ba2); color: white; padding: 20px; border-radius: 8px; }
        .content { background: #f9f9f9; padding: 20px; margin-top: 20px; border-radius: 8px; }
        .info { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea; }
        .footer { margin-top: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🔔 رسالة جديدة من موقعك الشخصي</h2>
        </div>
        
        <div class="content">
            <div class="info">
                <h3>📝 معلومات المرسل:</h3>
                <p><strong>الاسم:</strong> {{from_name}}</p>
                <p><strong>البريد الإلكتروني:</strong> {{from_email}}</p>
                <p><strong>التاريخ:</strong> {{date}}</p>
                <p><strong>الوقت:</strong> {{time}}</p>
            </div>
            
            <div class="info">
                <h3>💬 الرسالة:</h3>
                <p>{{message}}</p>
            </div>
            
            <div class="info">
                <h3>🌍 معلومات إضافية:</h3>
                <p><strong>IP Address:</strong> {{ip_address}}</p>
                <p><strong>Location:</strong> {{location}}</p>
                <p><strong>Country:</strong> {{country}}</p>
                <p><strong>City:</strong> {{city}}</p>
                <p><strong>Browser:</strong> {{browser}}</p>
                <p><strong>Device:</strong> {{device}}</p>
                <p><strong>Platform:</strong> {{platform}}</p>
                <p><strong>Referrer:</strong> {{referrer}}</p>
            </div>
        </div>
        
        <div class="footer">
            <p>هذه الرسالة تم إرسالها من نموذج الاتصال في موقعك الشخصي.</p>
        </div>
    </div>
</body>
</html>
```

### 6. تحقق من إعدادات Service

في صفحة Email Service، تأكد من:
- ✅ Service متصل بحساب البريد الإلكتروني الصحيح
- ✅ Service في حالة "Active"
- ✅ تم التحقق من البريد الإلكتروني

## اختبار EmailJS

### من لوحة EmailJS
1. اذهب إلى Template الخاص بك
2. اضغط على "Test It"
3. املأ البيانات وأرسل
4. تحقق من بريدك الإلكتروني

### من الموقع المحلي
1. شغل الموقع محلياً:
   ```bash
   npm run dev
   ```
2. اذهب إلى قسم Contact
3. املأ النموذج وأرسل
4. افتح Console في المتصفح (F12) وتحقق من الأخطاء
5. تحقق من بريدك الإلكتروني

## استكشاف الأخطاء الشائعة

### 1. خطأ "Invalid Public Key"
- **الحل**: تأكد من أن Public Key صحيح في `.env.local` وفي `main.tsx`

### 2. خطأ "Service Not Found"
- **الحل**: تأكد من أن Service ID صحيح وأن Service في حالة Active

### 3. خطأ "Template Not Found"
- **الحل**: تأكد من أن Template ID صحيح

### 4. لا تصل الرسائل
- **الأسباب المحتملة**:
  1. البريد في مجلد Spam
  2. Email Service غير متصل
  3. تم تجاوز حد الإرسال اليومي (200 رسالة مجاناً)
  4. Template Variables غير صحيحة

### 5. خطأ في Console: "CORS Error"
- **الحل**: هذا نادر الحدوث، لكن تأكد من أن Domain الخاص بك مسموح في إعدادات EmailJS

## الإعدادات الحالية

```
Public Key: H4YFvBxDUh6YpVn0a
Service ID: service_mrbmgus
Template ID: template_d16rk5m
Receiver Email: omar-agha@engineer.com
```

## التحديث للإنتاج (Production)

عند النشر على Netlify أو Vercel:

1. اذهب إلى إعدادات الموقع
2. أضف Environment Variables:
   ```
   VITE_APP_EMAILJS_KEY=H4YFvBxDUh6YpVn0a
   VITE_APP_SERVICE_ID=service_mrbmgus
   VITE_APP_TEMPLATE_ID=template_d16rk5m
   VITE_APP_EMAILJS_RECIEVER=omar-agha@engineer.com
   ```
3. أعد بناء الموقع

## ملاحظات مهمة

1. **الحد المجاني**: 200 رسالة شهرياً
2. **معدل الإرسال**: 1 رسالة كل ثانيتين
3. **أمان**: لا تشارك Public Key مع أحد (رغم أنه public، يمكن استخدامه للإرسال)
4. **Spam Protection**: استخدم reCAPTCHA إذا كنت تواجه مشاكل spam

## روابط مفيدة

- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Pricing](https://www.emailjs.com/pricing/)

## الدعم

إذا استمرت المشكلة:
1. تحقق من Console في المتصفح
2. تحقق من EmailJS Dashboard > History
3. راسل دعم EmailJS: support@emailjs.com
