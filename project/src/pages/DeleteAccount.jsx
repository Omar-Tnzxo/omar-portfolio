import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Mail, Smartphone, Clock, Trash2, ArrowLeft } from 'lucide-react';

function DeleteAccount() {
  return (
    <div className="min-h-screen bg-background font-cairo py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-gray-200">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>العودة للرئيسية</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-8 text-white">حذف حساب CalcRealty</h1>

          <div className="space-y-8">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-bold text-red-500">تنبيه هام</h2>
              </div>
              <p className="text-gray-300">
                عملية حذف الحساب نهائية ولا يمكن التراجع عنها. سيتم حذف جميع بياناتك الشخصية وسجل نشاطك في التطبيق بشكل دائم.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-white">طرق حذف الحساب</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-4 text-primary">1. من داخل التطبيق</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-400">(الطريقة المفضلة والأسرع)</p>
                    <ol className="space-y-3 list-decimal list-inside">
                      <li>تسجيل الدخول إلى تطبيق حاسبة العقارات</li>
                      <li>الانتقال إلى صفحة الملف الشخصي</li>
                      <li>التمرير لأسفل والنقر على زر "حذف الحساب"</li>
                      <li>اختيار سبب الحذف وإدخال ملاحظات (اختياري)</li>
                      <li>تأكيد الحذف بإدخال كلمة المرور</li>
                    </ol>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-4 text-primary">2. عبر البريد الإلكتروني</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-400">(يستغرق حتى 5 أيام عمل)</p>
                    <div className="space-y-3">
                      <p>أرسل طلب الحذف إلى:</p>
                      <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                        <Mail className="w-5 h-5 text-primary" />
                        <span>omar-agha@engineer.com</span>
                      </div>
                      <p className="text-gray-400">يجب أن يتضمن الطلب:</p>
                      <ul className="list-disc list-inside space-y-2 text-gray-300">
                        <li>رقم الهاتف المسجل</li>
                        <li>الاسم الكامل المسجل</li>
                        <li>سبب طلب الحذف</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-white">البيانات التي سيتم حذفها</h2>
              <div className="glass-card p-6">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <span>معلومات الحساب الأساسية (الاسم، رقم الهاتف، البريد الإلكتروني)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Trash2 className="w-5 h-5 text-primary" />
                    <span>بيانات الملف الشخصي والصورة الشخصية</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>سجل الحسابات والعمليات وإعدادات التطبيق</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-white">الأسئلة الشائعة</h2>
              <div className="space-y-4">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold mb-2 text-white">هل يمكنني استعادة حسابي بعد حذفه؟</h3>
                  <p className="text-gray-400">لا، عملية الحذف نهائية ولا يمكن التراجع عنها أو استعادة البيانات المحذوفة.</p>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold mb-2 text-white">كم من الوقت تستغرق عملية حذف الحساب؟</h3>
                  <p className="text-gray-400">يتم تنفيذ الحذف فورياً عند التأكيد من داخل التطبيق. أما الطلبات عبر البريد الإلكتروني فتستغرق حتى 5 أيام عمل.</p>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold mb-2 text-white">هل يمكنني إنشاء حساب جديد بعد حذف حسابي القديم؟</h3>
                  <p className="text-gray-400">نعم، يمكنك إنشاء حساب جديد في أي وقت بعد حذف حسابك القديم.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccount;