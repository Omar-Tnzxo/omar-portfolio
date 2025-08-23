import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Search, Calendar, Clock, Tag, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { logEvent, logSearch } from '../utils/analytics';

function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // بيانات المقالات - يمكن استبدالها لاحقاً بطلب من قاعدة البيانات
  const articles = [
    {
      id: 1,
      title: 'كيف تحسب العائد الاستثماري للعقارات في مصر بدقة؟',
      excerpt: 'تعرف على الطريقة الصحيحة لحساب ROI للعقارات وتعظيم استثماراتك العقارية في السوق المصري',
      image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1073&auto=format&fit=crop',
      category: 'استثمار-عقاري',
      categoryTitle: 'الاستثمار العقاري',
      date: '15 مايو 2025',
      readTime: '7 دقائق',
      slug: 'how-to-calculate-real-estate-roi'
    },
    {
      id: 2,
      title: 'دليلك الشامل لحساب أقساط التمويل العقاري في 2025',
      excerpt: 'احسب أقساط التمويل العقاري بدقة واختر أفضل خطة تمويل تناسب دخلك والتزاماتك المالية',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1111&auto=format&fit=crop',
      category: 'تمويل-عقاري',
      categoryTitle: 'التمويل العقاري',
      date: '10 مايو 2025',
      readTime: '9 دقائق',
      slug: 'complete-guide-mortgage-calculation'
    },
    {
      id: 3,
      title: 'مقارنة بين أفضل تطبيقات الحسابات العقارية في 2025',
      excerpt: 'تعرف على مزايا وعيوب تطبيقات الحسابات العقارية وكيف يتفوق CalcRealty على منافسيه',
      image: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=1101&auto=format&fit=crop',
      category: 'مقارنات',
      categoryTitle: 'مقارنات',
      date: '5 مايو 2025',
      readTime: '6 دقائق',
      slug: 'best-real-estate-calculator-apps-comparison'
    },
    {
      id: 4,
      title: '5 نصائح لتقييم العقارات بشكل احترافي في السوق المصري',
      excerpt: 'تعلم كيفية تقييم العقارات بدقة واحترافية باستخدام حاسبة العقارات المتخصصة',
      image: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30?q=80&w=1170&auto=format&fit=crop',
      category: 'تقييم-عقاري',
      categoryTitle: 'التقييم العقاري',
      date: '1 مايو 2025',
      readTime: '8 دقائق',
      slug: 'professional-real-estate-valuation-tips'
    },
    {
      id: 5,
      title: 'كيفية استخدام تطبيق CalcRealty لحساب تكلفة البناء والتشطيبات',
      excerpt: 'دليل خطوة بخطوة لاستخدام CalcRealty في حساب تكاليف البناء والتشطيب بدقة',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1031&auto=format&fit=crop',
      category: 'دليل-استخدام',
      categoryTitle: 'دليل الاستخدام',
      date: '25 أبريل 2025',
      readTime: '5 دقائق',
      slug: 'using-calcrealty-for-construction-cost'
    },
    {
      id: 6,
      title: 'الفرق بين حساب القروض العقارية التقليدية والإسلامية',
      excerpt: 'مقارنة شاملة بين طرق حساب التمويل العقاري التقليدي والإسلامي وكيفية استخدام CalcRealty لكليهما',
      image: 'https://images.unsplash.com/photo-1638913662252-70efce1e60a7?q=80&w=1170&auto=format&fit=crop',
      category: 'تمويل-عقاري',
      categoryTitle: 'التمويل العقاري',
      date: '20 أبريل 2025',
      readTime: '10 دقائق',
      slug: 'difference-traditional-islamic-mortgage'
    }
  ];

  // تحديث وظيفة البحث لتسجيل الأحداث
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // تسجيل عمليات البحث إذا كانت أكثر من 3 أحرف
    if (value.length > 2) {
      logSearch(value);
    }
  };

  // تحديث وظيفة تغيير الفئة لتسجيل الأحداث
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    
    // تسجيل حدث تغيير الفئة
    logEvent('تصفية', 'تغيير_الفئة', categoryId);
  };

  // تحديث وظيفة تغيير الصفحة لتسجيل الأحداث
  const handlePageChange = (page) => {
    setCurrentPage(page);
    
    // تسجيل حدث تغيير الصفحة
    logEvent('تصفح', 'تغيير_الصفحة', `صفحة_${page}`);
    
    // تمرير للأعلى بسلاسة
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // تصفية المقالات حسب البحث والتصنيف
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.includes(searchTerm) || article.excerpt.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // استخراج فئات المقالات الفريدة
  const categories = [
    { id: 'all', title: 'جميع المقالات' },
    ...Array.from(new Set(articles.map(article => article.category)))
      .map(category => {
        const articleWithCategory = articles.find(a => a.category === category);
        return {
          id: category,
          title: articleWithCategory?.categoryTitle || category
        };
      })
  ];

  // حساب صفحات التنقل
  const articlesPerPage = 4;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <div className="min-h-screen bg-background py-20 px-4 font-cairo">
      <Helmet>
        <title>مدونة CalcRealty | مقالات وإرشادات حول العقارات والاستثمار العقاري في مصر</title>
        <meta name="description" content="مدونة CalcRealty توفر مقالات متخصصة ونصائح في الاستثمار العقاري وحساب العوائد والتمويل العقاري في مصر والوطن العربي" />
        <meta property="og:title" content="مدونة CalcRealty | مقالات وإرشادات حول العقارات في مصر" />
        <meta property="og:description" content="مقالات ونصائح متخصصة في الاستثمار العقاري والحسابات العقارية في مصر والوطن العربي" />
        <meta property="og:image" content="https://calcrealty.netlify.app/app-logo.png" />
        <meta property="og:url" content="https://calcrealty.netlify.app/blog" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="مدونة CalcRealty | مقالات وإرشادات حول العقارات في مصر" />
        <meta name="twitter:description" content="مقالات ونصائح متخصصة في الاستثمار العقاري والحسابات العقارية في مصر والوطن العربي" />
        <meta name="twitter:image" content="https://calcrealty.netlify.app/app-logo.png" />
        <link rel="canonical" href="https://calcrealty.netlify.app/blog" />
      </Helmet>
      <div className="container mx-auto max-w-6xl">
        {/* رأس الصفحة والعنوان */}
        <div className="mb-12">
          <Link to="/" className="flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="mr-2 w-5 h-5" />
            العودة إلى الصفحة الرئيسية
          </Link>
          <h1 className="text-4xl font-bold mb-4 gradient-text text-center">مدونة CalcRealty</h1>
          <p className="text-gray-300 text-lg text-center mb-8 max-w-3xl mx-auto">
            مقالات ونصائح متخصصة في الاستثمار العقاري والحسابات العقارية في مصر والوطن العربي
          </p>
          
          {/* البحث في المدونة */}
          <div className="max-w-md mx-auto relative mb-12">
            <input
              type="text"
              placeholder="ابحث في المدونة..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary text-white"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* تصنيفات المقالات */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* عرض المقالات */}
        {currentArticles.length > 0 ? (
          <>
            {/* المقال الرئيسي */}
            <div className="mb-12">
              <Link 
                to={`/blog/${currentArticles[0].slug}`} 
                className="group block glass-card overflow-hidden transition-all hover:translate-y-[-4px]"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={currentArticles[0].image} 
                    alt={currentArticles[0].title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-block px-3 py-1 bg-primary/90 text-white text-sm rounded-full mb-4">
                      {currentArticles[0].categoryTitle}
                    </span>
                    <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {currentArticles[0].title}
                    </h2>
                    <p className="text-gray-300 text-lg line-clamp-2 mb-4">
                      {currentArticles[0].excerpt}
                    </p>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="ml-3">{currentArticles[0].date}</span>
                      <Clock className="w-4 h-4 mr-1 ml-4" />
                      <span>{currentArticles[0].readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* باقي المقالات في شبكة */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArticles.slice(1).map((article) => (
                <Link 
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="glass-card overflow-hidden transition-all hover:translate-y-[-4px] group flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <span className="absolute top-4 right-4 px-2 py-1 bg-primary/90 text-white text-xs rounded-full">
                      {article.categoryTitle}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-2 text-sm flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-gray-400 text-xs">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* تنقل الصفحات */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10 gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg ${
                    currentPage === 1
                      ? 'text-gray-500 cursor-not-allowed'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  aria-label="الصفحة السابقة"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg ${
                    currentPage === totalPages
                      ? 'text-gray-500 cursor-not-allowed'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  aria-label="الصفحة التالية"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 glass-card">
            <h3 className="text-2xl font-bold mb-4">لا توجد مقالات متطابقة</h3>
            <p className="text-gray-300 mb-6">
              لم نتمكن من العثور على مقالات تطابق معايير البحث الخاصة بك
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn-primary bg-primary hover:bg-primary/80"
            >
              عرض جميع المقالات
            </button>
          </div>
        )}

        {/* قسم الاشتراك في النشرة البريدية */}
        <div className="mt-20 glass-card p-10 text-center">
          <h3 className="text-2xl font-bold mb-4">اشترك في نشرة CalcRealty البريدية</h3>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            احصل على أحدث المقالات والنصائح العقارية والتحديثات حول تطبيق حاسبة العقارات مباشرة إلى بريدك الإلكتروني
          </p>
          
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-r-lg focus:outline-none focus:border-primary text-white"
            />
            <button className="btn-primary bg-primary hover:bg-primary/80 rounded-l-lg rounded-r-none">
              اشتراك
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog; 