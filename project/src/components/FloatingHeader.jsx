import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calculator, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Send, 
  Phone,
  Mail
} from 'lucide-react';

const FloatingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isRTL, setIsRTL] = useState(true);
  
  // التحقق من لغة الصفحة الحالية
  useEffect(() => {
    // إذا كانت الصفحة هي المدونة الإنجليزية، نستخدم اتجاه LTR
    if (location.pathname.includes('/blog-en')) {
      setIsRTL(false);
    } else {
      setIsRTL(true);
    }
  }, [location.pathname]);
  
  // التحقق من حركة المستخدم للصفحة
  useEffect(() => {
    const handleScroll = () => {
      // يظهر الهيدر عندما يتجاوز المستخدم 100 بيكسل من أعلى الصفحة
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // قائمة الروابط
  const navLinks = [
    { title: 'الرئيسية', titleEn: 'Home', path: '/' },
    { title: 'المدونة', titleEn: 'Blog', path: isRTL ? '/blog' : '/blog-en' },
    { title: 'الأسئلة الشائعة', titleEn: 'FAQ', path: '/faq' },
  ];

  // روابط التواصل الاجتماعي
  const socialLinks = {
    facebook: 'https://www.facebook.com/CalcRealty',
    twitter: 'https://x.com/CalcRealty',
    instagram: 'https://www.instagram.com/CalcRealty',
    linkedin: 'https://www.linkedin.com/in/CalcRealty',
    whatsapp: 'https://wa.me/201029752972',
    telegram: 'https://t.me/omar_tnzxo',
    email: 'mailto:omar-agha@engineer.com'
  };
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'py-3 bg-black/40 backdrop-blur-md shadow-lg translate-y-0' 
            : 'py-5 bg-transparent -translate-y-full'
        }`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* الشعار */}
            <Link to="/" className="flex items-center gap-2 z-20 group">
              <Calculator className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xl text-white">CalcRealty</span>
            </Link>
            
            {/* القائمة للشاشات الكبيرة */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={`transition-colors text-white/90 hover:text-primary relative after:absolute after:bottom-[-5px] after:right-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
                    location.pathname === link.path ? 'text-primary after:w-full' : ''
                  }`}
                >
                  {isRTL ? link.title : link.titleEn}
                </Link>
              ))}
            </nav>
            
            {/* أزرار التواصل للشاشات الكبيرة */}
            <div className="hidden md:flex items-center gap-3">
              <a 
                href={socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#1877F2] transition-colors"
                aria-label="فيسبوك"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#1DA1F2] transition-colors"
                aria-label="تويتر"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#E4405F] transition-colors"
                aria-label="انستجرام"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            
            {/* زر التنزيل */}
            <Link 
              to="https://play.google.com/store/apps/details?id=com.calcrealty"
              target="_blank"
              className="hidden md:flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary/90 to-primary/60 text-white rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(33,150,243,0.5)] hover:scale-105 group"
            >
              {isRTL ? (
                <>
                  <span>تنزيل الآن</span>
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                </>
              ) : (
                <>
                  <span>Download Now</span>
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                </>
              )}
            </Link>
            
            {/* زر القائمة للموبايل */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden z-50 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* قائمة الموبايل - منفصلة عن الهيدر لضمان العمل السليم */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br from-background/95 to-black/95 backdrop-blur-lg z-30 flex flex-col justify-center items-center transition-all duration-500 ${
          isMenuOpen 
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible translate-y-[-20px]'
        }`}
      >
        <nav className="flex flex-col items-center gap-8 w-full px-6">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-2xl font-bold transition-colors text-white hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {isRTL ? link.title : link.titleEn}
            </Link>
          ))}
          
          <Link 
            to="https://play.google.com/store/apps/details?id=com.calcrealty"
            target="_blank"
            className="mt-6 flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary/90 to-primary/60 text-white rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(33,150,243,0.5)] animate-pulse hover:animate-none"
            onClick={() => setIsMenuOpen(false)}
          >
            {isRTL ? (
              <>
                <span>تنزيل الآن</span>
                <Download className="w-5 h-5" />
              </>
            ) : (
              <>
                <span>Download Now</span>
                <Download className="w-5 h-5" />
              </>
            )}
          </Link>
          
          {/* وسائل التواصل الاجتماعي في القائمة المنسدلة - تم تحسينها */}
          <div className="mt-10 grid grid-cols-3 gap-4 w-full max-w-xs">
            <a 
              href={socialLinks.facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Facebook className="w-6 h-6 text-[#1877F2]" />
              <span className="text-xs text-white">فيسبوك</span>
            </a>
            
            <a 
              href={socialLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Twitter className="w-6 h-6 text-[#1DA1F2]" />
              <span className="text-xs text-white">تويتر</span>
            </a>
            
            <a 
              href={socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Instagram className="w-6 h-6 text-[#E4405F]" />
              <span className="text-xs text-white">انستجرام</span>
            </a>
            
            <a 
              href={socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Linkedin className="w-6 h-6 text-[#0A66C2]" />
              <span className="text-xs text-white">لينكد إن</span>
            </a>
            
            <a 
              href={socialLinks.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Phone className="w-6 h-6 text-[#25D366]" />
              <span className="text-xs text-white">واتساب</span>
            </a>
            
            <a 
              href={socialLinks.telegram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Send className="w-6 h-6 text-[#26A5E4]" />
              <span className="text-xs text-white">تلجرام</span>
            </a>
          </div>
          
          {/* رابط البريد الإلكتروني */}
          <a 
            href={socialLinks.email} 
            className="mt-6 flex items-center gap-3 text-white/80 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <Mail className="w-5 h-5" />
            <span>omar-agha@engineer.com</span>
          </a>
        </nav>
      </div>
    </>
  );
};

export default FloatingHeader; 