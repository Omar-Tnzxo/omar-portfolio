import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { logEvent, logDownload, logOutboundLink } from '../utils/analytics';
import {
  AlertCircle,
  Apple,
  ArrowUp,
  Calculator,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  ExternalLink,
  Facebook,
  HelpCircle,
  Home,
  Instagram,
  Linkedin,
  Mail,
  Maximize2,
  MessageCircle,
  Monitor,
  Percent,
  Phone,
  Send,
  Shield,
  Smartphone,
  Twitter,
  Users
} from 'lucide-react';

function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [version] = useState('v1.0.1');
  const [showHelp, setShowHelp] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [reviewFeedback, setReviewFeedback] = useState({});

  const googlePlayUrl = "https://play.google.com/store/apps/details?id=com.calcrealty";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(googlePlayUrl)}&format=svg`;

  const platformAvailability = {
    android: true,
    ios: false,
    windows: false
  };

  const platformMessages = {
    ios: 'نسخة الآيفون قيد التطوير وستكون متاحة قريباً',
    windows: 'نسخة الويندوز قيد التطوير وستكون متاحة قريباً'
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Load saved feedback from localStorage
    const savedFeedback = localStorage.getItem('reviewFeedback');
    if (savedFeedback) {
      setReviewFeedback(JSON.parse(savedFeedback));
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = (platform) => {
    if (!platformAvailability[platform]) {
      showPlatformMessage(platform);
      return;
    }

    const downloadLinks = {
      android: googlePlayUrl,
      ios: '/temp-downloads/CalcRealty.ipa',
      windows: '/temp-downloads/CalcRealty.exe'
    };

    // تسجيل حدث التنزيل في تحليلات جوجل
    logDownload(platform, version);
    
    // فتح رابط التنزيل
    window.open(downloadLinks[platform], '_blank');
  };

  const showPlatformMessage = (platform) => {
    setToastMessage(platformMessages[platform]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const communityLinks = {
    telegram: {
      channel: 'https://t.me/RebixRise',
      community: 'https://t.me/EgyptBrokersSociety'
    }
  };

  const socialLinks = {
    facebook: 'https://www.facebook.com/CalcRealty',
    twitter: 'https://x.com/CalcRealty',
    instagram: 'https://www.instagram.com/CalcRealty',
    linkedin: 'https://www.linkedin.com/in/CalcRealty',
    whatsapp: 'https://wa.me/201029752972',
    telegram: 'https://t.me/omar_tnzxo'
  };

  // Handle review feedback
  const handleReviewFeedback = (reviewId, isHelpful) => {
    const newFeedback = { 
      ...reviewFeedback,
      [reviewId]: isHelpful 
    };
    
    setReviewFeedback(newFeedback);
    localStorage.setItem('reviewFeedback', JSON.stringify(newFeedback));
    
    // تسجيل تفاعل المستخدم مع التقييم في تحليلات جوجل
    logEvent(
      'تفاعل_التقييمات',
      isHelpful ? 'تقييم_مفيد' : 'تقييم_غير_مفيد',
      `تقييم_رقم_${reviewId}`
    );
    
    // Show feedback toast
    setToastMessage(isHelpful ? 'شكراً لتقييمك!' : 'شكراً لملاحظتك!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background font-cairo">
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(33,150,243,0.1)_0%,transparent_100%)]" />
        </div>

        <div className="container mx-auto text-center z-10">
          <div className="inline-block mb-8 relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl" />
            <Calculator className="w-24 h-24 text-primary relative z-10 floating" />
          </div>

          <h1 className="text-5xl font-bold mb-4 gradient-text">أهلاً بك في CalcRealty - حاسبة العقارات</h1>
          <p className="text-2xl text-gray-300 mb-8">الحل الأمثل للحسابات العقارية في مصر والوطن العربي</p>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">احسب العائد الاستثماري، الأقساط، التكلفة الإجمالية والمساحات بدقة وسهولة.</p>

          <div className="relative my-12">
            <div className="flex justify-center items-center max-w-4xl mx-auto">
              {/* الصورة اليسرى */}
              <div className="relative mx-auto transform -rotate-6 scale-85 z-10 -mr-16">
                <div className="absolute inset-0 rounded-3xl border-[6px] border-gray-900 bg-black shadow-xl"></div>
                <div className="absolute top-0 inset-x-0 h-5 rounded-t-2xl bg-gray-900 flex items-center justify-center">
                  <div className="w-12 h-1 bg-gray-800 rounded-full"></div>
                </div>
                <img 
                  src="http://i.ibb.co/jPp9fWGj/app-screenshot-2.webp" 
                  alt="شاشة تطبيق كالك ريلتي" 
                  className="rounded-2xl relative z-10 border border-gray-800 w-56"
                />
              </div>
              
              {/* الصورة الوسطى - الشاشة الرئيسية */}
              <div className="relative mx-auto transform scale-110 z-20">
                <div className="absolute inset-0 rounded-3xl border-[8px] border-gray-900 bg-black shadow-2xl"></div>
                <div className="absolute top-0 inset-x-0 h-6 rounded-t-2xl bg-gray-900 flex items-center justify-center">
                  <div className="w-16 h-1 bg-gray-800 rounded-full"></div>
                </div>
                <img 
                  src="https://i.ibb.co/zWcgtD4x/app-screenshot-1.webp" 
                  alt="الشاشة الرئيسية للتطبيق" 
                  className="rounded-2xl relative z-10 border border-gray-800 w-64"
                />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 w-12 h-1 bg-gray-800 rounded-full"></div>
              </div>
              
              {/* الصورة اليمنى */}
              <div className="relative mx-auto transform rotate-6 scale-85 z-10 -ml-16">
                <div className="absolute inset-0 rounded-3xl border-[6px] border-gray-900 bg-black shadow-xl"></div>
                <div className="absolute top-0 inset-x-0 h-5 rounded-t-2xl bg-gray-900 flex items-center justify-center">
                  <div className="w-12 h-1 bg-gray-800 rounded-full"></div>
                </div>
                <img 
                  src="https://i.ibb.co/hFqhPFbN/app-screenshot-3.webp" 
                  alt="شاشة تطبيق كالك ريلتي" 
                  className="rounded-2xl relative z-10 border border-gray-800 w-56"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button onClick={() => handleDownload('android')} className="btn-primary bg-green-600 hover:bg-green-700 w-full sm:w-auto">
              <Smartphone className="w-6 h-6" />
              تحميل للأندرويد
            </button>

            <button onClick={() => handleDownload('ios')} className="btn-primary bg-gray-800 hover:bg-gray-900 w-full sm:w-auto opacity-50 cursor-not-allowed relative group">
              <Apple className="w-6 h-6" />
              <span>تحميل للآيفون</span>
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">قريباً</span>
            </button>

            <button onClick={() => handleDownload('windows')} className="btn-primary bg-blue-600 hover:bg-blue-700 w-full sm:w-auto opacity-50 cursor-not-allowed relative group">
              <Monitor className="w-6 h-6" />
              <span>تحميل للويندوز</span>
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">قريباً</span>
            </button>
          </div>

          {showToast && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-2 backdrop-blur-lg border border-white/10">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <span>{toastMessage}</span>
            </div>
          )}

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="stats-card">
              <div className="text-2xl font-bold text-primary">+1k</div>
              <div className="text-sm text-gray-400">تحميل</div>
            </div>
            <div className="stats-card">
              <div className="text-2xl font-bold text-primary">4.9/5</div>
              <div className="text-sm text-gray-400">تقييم</div>
            </div>
            <div className="stats-card">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-gray-400">دعم فني</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4" id="features">
        <div className="container mx-auto">
          <h2 className="section-title">المميزات الرئيسية لحاسبة CalcRealty</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="feature-icon-container">
                <DollarSign />
              </div>
              <h3 className="text-xl font-bold mb-4">حساب العائد الاستثماري العقاري</h3>
              <p className="text-gray-400">حساب دقيق للعائد على الاستثمار العقاري كما في التطبيقات العقارية المعروفة</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-container">
                <Calendar />
              </div>
              <h3 className="text-xl font-bold mb-4">جدولة المقدم والأقساط</h3>
              <p className="text-gray-400">جدولة الدفعات وحساب الأقساط الشهرية للوحدات السكنية والتجارية</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-container">
                <AlertCircle />
              </div>
              <h3 className="text-xl font-bold mb-4">إجمالي الوحدة (قسط)</h3>
              <p className="text-gray-400">حساب التكلفة الإجمالية مع الأقساط للشقق والفلل والعقارات التجارية</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-container">
                <Maximize2 />
              </div>
              <h3 className="text-xl font-bold mb-4">تكلفة المتر المربع</h3>
              <p className="text-gray-400">حساب التكلفة حسب المساحة مثل تطبيقات عقار ماب واكويتي</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-container">
                <Home />
              </div>
              <h3 className="text-xl font-bold mb-4">حساب مساحات الفيلا والشقق</h3>
              <p className="text-gray-400">حساب مساحات الفلل والشقق والمباني في كمبوندات مصر المختلفة</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-container">
                <Percent />
              </div>
              <h3 className="text-xl font-bold mb-4">حساب النسبة المئوية للتمويل</h3>
              <p className="text-gray-400">حساب النسب المئوية بسهولة للتمويل العقاري والقروض السكنية</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-background-dark" id="benefits">
        <div className="container mx-auto">
          <h2 className="section-title">لماذا تختار CalcRealty عن باقي تطبيقات العقارات؟</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-8 text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">توفير الوقت</h3>
              <p className="text-gray-400">حسابات سريعة ودقيقة في ثواني</p>
            </div>

            <div className="glass-card p-8 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">نتائج موثوقة</h3>
              <p className="text-gray-400">دقة عالية في جميع الحسابات</p>
            </div>

            <div className="glass-card p-8 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">سهولة الاستخدام</h3>
              <p className="text-gray-400">واجهة بسيطة وسهلة الاستخدام</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4" id="reviews">
        <div className="container mx-auto">
          <h2 className="section-title">آراء المستخدمين</h2>

          <ReviewCarousel />
          
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4">شارك تطبيق حاسبة العقارات مع أصدقائك</h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">ساعدنا في نشر تطبيق CalcRealty ليستفيد المزيد من المستثمرين والوسطاء العقاريين في مصر والوطن العربي</p>
            <div className="flex items-center justify-center space-x-4 space-x-reverse">
              <SocialShareButton 
                network="facebook" 
                url="https://calcrealty.netlify.app"
                title="حاسبة العقارات الأفضل في مصر | CalcRealty"
              />
              <SocialShareButton 
                network="twitter" 
                url="https://calcrealty.netlify.app"
                title="جرب تطبيق CalcRealty - أفضل حاسبة للعقارات والاستثمار العقاري في مصر والوطن العربي"
              />
              <SocialShareButton 
                network="whatsapp" 
                url="https://calcrealty.netlify.app"
                title="تطبيق CalcRealty لحساب العقارات والاستثمار العقاري"
              />
              <SocialShareButton 
                network="telegram" 
                url="https://calcrealty.netlify.app"
                title="حاسبة العقارات الأكثر دقة وسهولة - CalcRealty"
              />
              <SocialShareButton 
                network="linkedin" 
                url="https://calcrealty.netlify.app"
                title="CalcRealty - تطبيق متخصص في حسابات الاستثمار العقاري"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4" id="download">
        <div className="container mx-auto text-center">
          <h2 className="section-title">حمل تطبيق حاسبة العقارات الآن</h2>

          <div className="max-w-4xl mx-auto glass-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">النسخة الحالية {version} - متوفرة في مصر والوطن العربي</h3>
                <p className="text-gray-400 mb-6">امسح رمز QR للتحميل المباشر لأفضل تطبيق حاسبة عقارات</p>
                <div className="relative w-48 h-48 mx-auto">
                  <img src={qrCodeUrl} alt="QR Code لتحميل تطبيق حاسبة العقارات" className="w-full h-full rounded-xl shadow-lg" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-xl pointer-events-none" />
                </div>
              </div>

              <div className="text-right">
                <h4 className="text-xl font-bold mb-4">خطوات التثبيت البسيطة</h4>
                <ol className="space-y-4 list-decimal list-inside">
                  <li>امسح رمز QR أو اضغط على زر التحميل</li>
                  <li>افتح ملف التثبيت</li>
                  <li>اتبع خطوات التثبيت</li>
                  <li>ابدأ في استخدام أفضل حاسبة للعقارات في مصر والعالم العربي</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-background-dark" id="contact">
        <div className="container mx-auto">
          <h2 className="section-title">تواصل معنا</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="glass-card p-6 space-y-6">
              <h3 className="text-2xl font-bold mb-6 gradient-text">مجتمع التطبيق</h3>

              <a
                href={communityLinks.telegram.channel}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors p-3 rounded-lg hover:bg-white/5"
              >
                <Send className="w-6 h-6" />
                <span>قناة التطبيق على تلجرام</span>
                <ExternalLink className="w-4 h-4 mr-auto" />
              </a>

              <a
                href={communityLinks.telegram.community}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors p-3 rounded-lg hover:bg-white/5"
              >
                <Users className="w-6 h-6" />
                <span>مجتمع البروكرز</span>
                <ExternalLink className="w-4 h-4 mr-auto" />
              </a>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-2xl font-bold mb-6 gradient-text">تابع RebixRise</h3>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#1877F2] transition-colors p-3 rounded-lg hover:bg-white/5"
                >
                  <Facebook className="w-5 h-5" />
                  <span>فيسبوك</span>
                </a>

                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#1DA1F2] transition-colors p-3 rounded-lg hover:bg-white/5"
                >
                  <Twitter className="w-5 h-5" />
                  <span>تويتر</span>
                </a>

                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#E4405F] transition-colors p-3 rounded-lg hover:bg-white/5"
                >
                  <Instagram className="w-5 h-5" />
                  <span>انستجرام</span>
                </a>

                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#0A66C2] transition-colors p-3 rounded-lg hover:bg-white/5"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>لينكد إن</span>
                </a>

                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#25D366] transition-colors p-3 rounded-lg hover:bg-white/5"
                >
                  <Phone className="w-5 h-5" />
                  <span>واتساب</span>
                </a>

                <a
                  href={socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#26A5E4] transition-colors p-3 rounded-lg hover:bg-white/5"
                >
                  <Send className="w-5 h-5" />
                  <span>تلجرام</span>
                </a>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-2xl font-bold mb-6 gradient-text">معلومات التواصل</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5">
                  <Mail className="text-primary w-6 h-6" />
                  <span className="text-gray-300">omar-agha@engineer.com</span>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5">
                  <Phone className="text-primary w-6 h-6" />
                  <span className="text-gray-300" dir="ltr">+201029752972</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-white/10 bg-background-dark relative overflow-hidden">
        {/* أنماط زخرفية */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(33,150,243,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(33,150,243,0.05)_0%,transparent_60%)]" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
            {/* العمود الأول: الشعار والوصف */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <Calculator className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-bold text-white">CalcRealty</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                حاسبة العقارات الأكثر تطورًا للمستثمرين والوسطاء العقاريين، صُممت لتبسيط الحسابات العقارية المعقدة وتوفير الوقت.
              </p>
              <p className="text-gray-500 text-xs">
                الإصدار الحالي: {version}
              </p>
            </div>

            {/* العمود الثاني: التحميل والشعارات */}
            <div>
              <h4 className="text-white font-bold mb-5">تحميل التطبيق</h4>
              <div className="flex flex-col space-y-4">
                <a href={googlePlayUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors">
                  <img alt='Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/ar_badge_web_generic.png' className="h-14" />
                </a>
                <div className="flex items-center gap-2 opacity-50 cursor-not-allowed relative group">
                  <Apple className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">App Store</span>
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">قريبًا</span>
                </div>
              </div>
            </div>

            {/* العمود الثالث: روابط مفيدة */}
            <div>
              <h4 className="text-white font-bold mb-5">روابط مفيدة</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>المدونة</span>
                  </Link>
                </li>
                <li>
                  <Link to="/blog-en" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>Blog (English)</span>
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>الأسئلة الشائعة</span>
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>سياسة الخصوصية</span>
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>الشروط والأحكام</span>
                  </Link>
                </li>
                <li>
                  <Link to="/delete-account" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>حذف الحساب</span>
                  </Link>
                </li>
                <li>
                  <a href="#features" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>المميزات</span>
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>التقييمات</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* العمود الرابع: تواصل معنا */}
            <div>
              <h4 className="text-white font-bold mb-5">تواصل معنا</h4>
              <ul className="space-y-3">
                <li>
                  <a href={`mailto:omar-agha@engineer.com`} className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>omar-agha@engineer.com</span>
                  </a>
                </li>
                <li>
                  <a href={`tel:+201029752972`} className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span dir="ltr">+201029752972</span>
                  </a>
                </li>
                <li className="pt-4">
                  <div className="flex items-center gap-4">
                    {/* الروابط الاجتماعية */}
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* الشريط السفلي مع حقوق الملكية */}
          <div className="border-t border-white/10 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© {new Date().getFullYear()} RebixRise. جميع الحقوق محفوظة</p>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 ml-2">مصمم بـ ❤️ في مصر</span>
              <span className="mx-2 text-gray-600">•</span>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.clear();
                  window.location.reload(true);
                }} 
                className="text-xs text-gray-500 hover:text-primary"
              >
                تحديث الصفحة
              </a>
            </div>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed bottom-24 left-6 p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 z-50 group"
          aria-label="العودة للأعلى"
        >
          <ArrowUp className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}

      <button
        onClick={() => setShowHelp(!showHelp)}
        className="fixed bottom-6 left-6 p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 z-50 group"
        aria-label="المساعدة"
      >
        <HelpCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
      </button>

      {showHelp && (
        <div className="fixed bottom-24 left-6 w-72 bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl shadow-xl z-50">
          <h4 className="text-lg font-bold mb-2">بحاجة للمساعدة؟</h4>
          <div className="space-y-2">
            <a href="#" className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg group">
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>المحادثة المباشرة</span>
            </a>
            <a href="tel:+201029752972" className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg group">
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>اتصل بنا</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// مكون شريط التقييمات المتحرك
const ReviewCarousel = () => {
  // قائمة التقييمات
  const reviews = [
    {
      id: 'review1',
      image: "https://play-lh.googleusercontent.com/a/ACg8ocLj4srxsPTusRwiliC7U3KQP4eMI789He0nGzALJRnB4SoamA=s64-rw-mo",
      name: "Mahmoud Rashad",
      date: "20/05/2025",
      rating: 5,
      review: "برنامج حلو جدا وبيسهل كتير علي اي حد جديد في المجال",
      helpful: null
    },
    {
      id: 'review2',
      image: "https://play-lh.googleusercontent.com/a-/ALV-UjWBMyQwtzE_IxMRnawLdQ3JRI88LJbM_W9y81z5cRF59g-jFA8=s64-rw",
      name: "Fady Safwat",
      date: "21/05/2025",
      rating: 5,
      review: "good app and helpful",
      helpful: 2
    },
    {
      id: 'review3',
      image: "https://play-lh.googleusercontent.com/a-/ALV-UjWCdmPbNwHcm_kqg1WteHqepQLWr52MEKXYXPUDtGBDK0jWlXWc=s64-rw",
      name: "Mahmoud Soliman",
      date: "18/05/2025",
      rating: 5,
      review: "Best Real Estate Calculator App",
      helpful: 4
    },
    {
      id: 'review4',
      image: "https://play-lh.googleusercontent.com/a/ACg8ocJhc_e7xZcExFDytAMTDfvltH3WUCgSUqO5I83f9vUM9uIXPA=s64-rw-mo",
      name: "Sameh Elgazzar",
      date: "20/05/2025",
      rating: 5,
      review: "So Easy to use",
      helpful: 3
    },
    {
      id: 'review5',
      image: "https://play-lh.googleusercontent.com/a/ACg8ocIMSL1AQ-MU08vSAFrfPi31NntUzWJUOrc_KsFJ-5-Y-A3EEg=s64-rw-mo",
      name: "Seif Baghdad",
      date: "20/05/2025",
      rating: 5,
      review: "Great Idea",
      helpful: 1
    },
    {
      id: 'review6',
      image: "https://play-lh.googleusercontent.com/a-/ALV-UjXPTZZSLpGVxFkbXft8XilLOtc0jZKrZs7JhkoUkhQ3dJ4apjwVcg=s64-rw",
      name: "Ali Hussein",
      date: "20/05/2025",
      rating: 5,
      review: "Very Helpful",
      helpful: 1
    },
    {
      id: 'review7',
      image: "https://play-lh.googleusercontent.com/a-/ALV-UjXP9JrneCsTZCHlOyt7Ot9Ozug3RjXGa-oIxv96qmZBzBn1RCEy=s64-rw",
      name: "Mohammed Mahmoud",
      date: "20/05/2025",
      rating: 5,
      review: "ممتاز واستخدامه سهل جدا",
      helpful: 1
    },
    {
      id: 'review8',
      image: "https://play-lh.googleusercontent.com/a-/ALV-UjWWXgeB2RyK5-zakN9y8hRQM7YSFDXTuAIkry6IRvgysZUj0sQ=s64-rw",
      name: "Mustafaa Gad",
      date: "20/05/2025",
      rating: 5,
      review: "افضل تطبيق حاسبة عقارات",
      helpful: 1
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reviewFeedback, setReviewFeedback] = useState({});
  const timeoutRef = useRef(null);
  const animationDuration = 700; // مدة الانيميشن بالمللي ثانية
  const slideDuration = 7000; // مدة عرض كل تقييم قبل الانتقال التلقائي (7 ثوانٍ)

  // تحميل بيانات التفاعل من التخزين المحلي
  useEffect(() => {
    const savedFeedback = localStorage.getItem('reviewFeedback');
    if (savedFeedback) {
      setReviewFeedback(JSON.parse(savedFeedback));
    }
  }, []);

  // وظيفة تسجيل تفاعل المستخدم
  const handleReviewFeedback = (reviewId, isHelpful) => {
    const newFeedback = { 
      ...reviewFeedback,
      [reviewId]: isHelpful 
    };
    
    setReviewFeedback(newFeedback);
    localStorage.setItem('reviewFeedback', JSON.stringify(newFeedback));
    
    // تسجيل تفاعل المستخدم مع التقييم في تحليلات جوجل
    logEvent(
      'تفاعل_التقييمات',
      isHelpful ? 'تقييم_مفيد' : 'تقييم_غير_مفيد',
      `تقييم_رقم_${reviewId}`
    );
    
    // Show feedback toast
    setToastMessage(isHelpful ? 'شكراً لتقييمك!' : 'شكراً لملاحظتك!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // وظيفة التنقل إلى التقييم التالي
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  }, [isAnimating, reviews.length]);

  // وظيفة التنقل إلى التقييم السابق
  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  }, [isAnimating, reviews.length]);

  // تنفيذ التنقل التلقائي
  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, slideDuration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isPaused, nextSlide]);

  // التقييم الحالي
  const currentReview = reviews[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto mt-10">
      {/* خلفية مزخرفة */}
      <div className="absolute inset-0 blur-3xl bg-primary/5 rounded-3xl transform -rotate-1" />
      
      {/* حاوية التقييم */}
      <div 
        className="relative glass-card p-12 min-h-[350px] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* صورة المستخدم */}
        <div className={`mb-4 transform transition-all duration-${animationDuration} ease-out ${isAnimating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
          <img 
            src={currentReview.image} 
            alt={`صورة ${currentReview.name}`} 
            className="w-20 h-20 rounded-full object-cover border-4 border-primary/20 shadow-lg"
          />
        </div>
        
        {/* تقييم النجوم */}
        <div className={`flex justify-center my-3 transition-all duration-${animationDuration} ease-out ${isAnimating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
          {[...Array(currentReview.rating)].map((_, i) => (
            <svg key={i} className="w-6 h-6 text-yellow-500 fill-current mx-0.5" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        
        {/* اسم المستخدم والتاريخ */}
        <h3 className={`text-2xl font-bold text-white mb-1 transition-all duration-${animationDuration} ease-out ${isAnimating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
          {currentReview.name}
        </h3>
        <p className={`text-sm text-gray-400 mb-6 transition-all duration-${animationDuration} ease-out ${isAnimating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
          {currentReview.date}
        </p>
        
        {/* نص التقييم */}
        <p className={`text-xl text-gray-200 text-center max-w-2xl leading-relaxed mb-8 transition-all duration-${animationDuration} ease-out ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          "{currentReview.review}"
        </p>
        
        {/* عدد المستخدمين الذين وجدوا هذا التقييم مفيدًا */}
        {currentReview.helpful && (
          <p className={`text-sm text-gray-400 mb-4 transition-all duration-${animationDuration} ease-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {currentReview.helpful} {currentReview.helpful === 1 ? 'شخص وجد' : 'أشخاص وجدوا'} هذا التقييم مفيدًا
          </p>
        )}
        
        {/* أزرار هل كان هذا مفيدًا */}
        <div className={`flex space-x-3 space-x-reverse transition-all duration-${animationDuration} ease-out ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <span className="text-sm text-gray-400 ml-3">هل كان هذا التقييم مفيدًا؟</span>
          <button 
            className={`text-sm px-4 py-1 rounded-full ${reviewFeedback[currentReview.id] === true ? 'bg-primary/30 text-white' : 'bg-white/10 hover:bg-white/20 text-gray-200'} transition-colors`}
            onClick={() => handleReviewFeedback(currentReview.id, true)}
          >
            نعم
          </button>
          <button 
            className={`text-sm px-4 py-1 rounded-full ${reviewFeedback[currentReview.id] === false ? 'bg-primary/30 text-white' : 'bg-white/10 hover:bg-white/20 text-gray-200'} transition-colors`}
            onClick={() => handleReviewFeedback(currentReview.id, false)}
          >
            لا
          </button>
        </div>
        
        {/* أزرار التنقل */}
        <button 
          onClick={prevSlide} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all"
          aria-label="التقييم السابق"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all"
          aria-label="التقييم التالي"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </div>
      
      {/* مؤشر التقدم */}
      <div className="flex justify-center mt-8 gap-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'w-8 bg-primary' 
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), animationDuration);
              }
            }}
            aria-label={`الانتقال إلى التقييم ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// مكون زر مشاركة التواصل الاجتماعي
const SocialShareButton = ({ network, url, title }) => {
  // تحضير روابط المشاركة
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };

  // اختيار الأيقونة المناسبة
  const getIcon = () => {
    switch (network) {
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'whatsapp':
        return <Phone className="w-5 h-5" />;
      case 'telegram':
        return <Send className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  const handleShare = (e) => {
    e.preventDefault();
    
    // تسجيل حدث المشاركة في تحليلات جوجل
    logEvent('مشاركة', `مشاركة عبر ${network}`, url);
    
    window.open(shareUrls[network], 'share-dialog', 'width=800,height=600');
    return false;
  };

  return (
    <button 
      onClick={handleShare}
      className="bg-white/10 p-3 rounded-lg hover:bg-primary/20 hover:text-primary transition-all"
      aria-label={`مشاركة على ${network}`}
    >
      {getIcon()}
    </button>
  );
};

export default HomePage;