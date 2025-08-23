import ReactGA from 'react-ga4';

// معرف القياس الحقيقي المستخدم في التطبيق
const MEASUREMENT_ID = 'G-QMCMPY8SV7';

// تهيئة تحليلات جوجل
export const initializeGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
  console.log('تم تهيئة تحليلات جوجل!');
};

// تسجيل مشاهدة الصفحة
export const logPageView = (path) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.send({ hitType: 'pageview', page: path });
    console.log(`تم تسجيل مشاهدة الصفحة: ${path}`);
  }
};

// تسجيل حدث
export const logEvent = (category, action, label = null, value = null) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.event({
      category,
      action,
      label,
      value
    });
    console.log(`تم تسجيل الحدث: ${category} - ${action} - ${label}`);
  }
};

// تسجيل نقر على الروابط الخارجية
export const logOutboundLink = (url, category = 'روابط خارجية') => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.event({
      category,
      action: 'نقر',
      label: url,
    });
    console.log(`تم تسجيل نقرة على رابط خارجي: ${url}`);
  }
};

// تسجيل عمليات التحميل
export const logDownload = (platform, version) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.event({
      category: 'تحميل',
      action: `تحميل للمنصة: ${platform}`,
      label: `الإصدار: ${version}`
    });
    console.log(`تم تسجيل تحميل: ${platform} - ${version}`);
  }
};

// تسجيل عمليات البحث
export const logSearch = (searchQuery) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.event({
      category: 'بحث',
      action: 'إجراء بحث',
      label: searchQuery
    });
    console.log(`تم تسجيل عملية بحث: ${searchQuery}`);
  }
};

// كود البكسل لتتبع تحويلات فيسبوك (إختياري)
export const initializeFBPixel = () => {
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    // ضع هنا كود بكسل فيسبوك الخاص بك
  }
}; 