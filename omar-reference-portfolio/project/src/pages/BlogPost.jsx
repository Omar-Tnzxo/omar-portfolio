import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, Tag, ArrowRight, Facebook, Twitter, Linkedin, Share2, ExternalLink } from 'lucide-react';

function BlogPost() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // محتوى مثال للمقال - في التطبيق الحقيقي سيتم جلب المحتوى من قاعدة البيانات
  useEffect(() => {
    // محاكاة طلب API للحصول على بيانات المقال
    setTimeout(() => {
      // هذا مجرد مثال، في التطبيق الحقيقي ستأتي البيانات من الخادم أو Supabase
      const articleData = {
        id: 1,
        title: 'كيف تحسب العائد الاستثماري للعقارات في مصر بدقة؟',
        excerpt: 'تعرف على الطريقة الصحيحة لحساب ROI للعقارات وتعظيم استثماراتك العقارية في السوق المصري',
        image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1073&auto=format&fit=crop',
        category: 'استثمار-عقاري',
        categoryTitle: 'الاستثمار العقاري',
        date: '15 مايو 2025',
        readTime: '7 دقائق',
        author: 'فريق CalcRealty',
        authorImage: 'https://i.pravatar.cc/150?img=68',
        content: `
          <h2>مقدمة عن العائد الاستثماري العقاري</h2>
          <p>يعتبر العائد الاستثماري (ROI) أحد أهم المؤشرات التي يعتمد عليها المستثمرون العقاريون في مصر لتقييم جدوى استثماراتهم. فهو يقيس مدى ربحية الاستثمار مقارنة بتكلفته، ويساعد في اتخاذ قرارات استثمارية مدروسة.</p>
          
          <p>في هذا المقال، سنستعرض الطرق الدقيقة لحساب العائد الاستثماري للعقارات في مصر، مع أمثلة واقعية وكيفية استخدام تطبيق CalcRealty لتسهيل هذه العملية.</p>
          
          <h2>ما هو العائد الاستثماري العقاري؟</h2>
          <p>العائد الاستثماري العقاري هو نسبة مئوية تمثل صافي الربح السنوي المتوقع من العقار مقسوماً على إجمالي تكلفة الاستثمار. كلما ارتفعت هذه النسبة، كلما كان الاستثمار أكثر ربحية.</p>
          
          <p>المعادلة الأساسية لحساب العائد الاستثماري هي:</p>
          <div class="code-block">
            العائد الاستثماري = (صافي الدخل السنوي ÷ إجمالي تكلفة الاستثمار) × 100
          </div>
          
          <h2>العوامل المؤثرة في حساب العائد الاستثماري</h2>
          <p>لحساب العائد الاستثماري بدقة، يجب أخذ العوامل التالية بعين الاعتبار:</p>
          
          <h3>1. تحديد إجمالي تكلفة الاستثمار</h3>
          <p>تشمل تكلفة الاستثمار ما يلي:</p>
          <ul>
            <li>ثمن شراء العقار</li>
            <li>رسوم التسجيل والضرائب</li>
            <li>تكاليف الترميم أو التجديد (إن وجدت)</li>
            <li>أتعاب الوساطة العقارية</li>
            <li>تكاليف التأثيث (للإيجارات المفروشة)</li>
          </ul>
          
          <h3>2. حساب الدخل السنوي</h3>
          <p>يشمل الدخل السنوي:</p>
          <ul>
            <li>إيرادات الإيجار الشهري × 12</li>
            <li>أي إيرادات إضافية مثل مواقف السيارات أو الخدمات المشتركة</li>
          </ul>
          
          <h3>3. خصم المصروفات</h3>
          <p>يجب خصم المصروفات التالية من الدخل السنوي:</p>
          <ul>
            <li>الضرائب العقارية السنوية</li>
            <li>تكاليف الصيانة الدورية</li>
            <li>رسوم إدارة العقار (إن وجدت)</li>
            <li>التأمين العقاري</li>
            <li>فترات الشغور المحتملة (عادة تقدر بشهر واحد سنوياً)</li>
          </ul>
          
          <h2>مثال تطبيقي لحساب العائد الاستثماري</h2>
          <p>لنفترض أن لدينا العقار التالي في مصر الجديدة:</p>
          <ul>
            <li>سعر الشراء: 2,000,000 جنيه مصري</li>
            <li>رسوم التسجيل والضرائب: 60,000 جنيه</li>
            <li>تكاليف التجديد: 140,000 جنيه</li>
            <li>إجمالي تكلفة الاستثمار: 2,200,000 جنيه</li>
          </ul>
          
          <p>الدخل والمصروفات:</p>
          <ul>
            <li>الإيجار الشهري: 15,000 جنيه</li>
            <li>الدخل السنوي الإجمالي: 180,000 جنيه</li>
            <li>الضرائب العقارية: 5,000 جنيه سنوياً</li>
            <li>تكاليف الصيانة: 10,000 جنيه سنوياً</li>
            <li>تقدير فترات الشغور: 15,000 جنيه (شهر واحد)</li>
            <li>صافي الدخل السنوي: 180,000 - 30,000 = 150,000 جنيه</li>
          </ul>
          
          <div class="code-block">
            العائد الاستثماري = (150,000 ÷ 2,200,000) × 100 = 6.82%
          </div>
          
          <h2>كيفية استخدام تطبيق CalcRealty لحساب العائد الاستثماري</h2>
          <p>يوفر تطبيق CalcRealty طريقة سهلة وسريعة لحساب العائد الاستثماري للعقارات:</p>
          <ol>
            <li>افتح تطبيق CalcRealty واختر "حاسبة العائد الاستثماري"</li>
            <li>أدخل سعر شراء العقار والتكاليف الإضافية</li>
            <li>أدخل قيمة الإيجار الشهري</li>
            <li>أدخل المصروفات السنوية المتوقعة</li>
            <li>اضغط على "حساب" للحصول على النتيجة</li>
          </ol>
          
          <p>سيقوم التطبيق تلقائياً بحساب العائد الاستثماري، وكذلك مؤشرات أخرى مهمة مثل فترة استرداد رأس المال وتوقعات القيمة المستقبلية للعقار.</p>
          
          <h2>معدلات العائد الاستثماري المقبولة في السوق المصري</h2>
          <p>تختلف معدلات العائد الاستثماري المقبولة حسب المنطقة والمدينة، ولكن بشكل عام:</p>
          <ul>
            <li>5-7%: معدل جيد في المناطق الراقية والمدن الجديدة</li>
            <li>8-10%: معدل ممتاز في المناطق المتوسطة</li>
            <li>أكثر من 10%: معدل مرتفع قد يرتبط بمخاطر أعلى</li>
          </ul>
          
          <h2>نصائح لتحسين العائد الاستثماري</h2>
          <ol>
            <li><strong>اختيار الموقع المناسب:</strong> المناطق ذات الطلب المرتفع تضمن نسبة إشغال أعلى</li>
            <li><strong>تحسين العقار:</strong> إجراء تجديدات تزيد من قيمة الإيجار مقابل تكلفة معقولة</li>
            <li><strong>الشراء بسعر تنافسي:</strong> البحث عن فرص شراء بأسعار أقل من السوق</li>
            <li><strong>تقليل فترات الشغور:</strong> الاستعانة بشركات إدارة عقارية محترفة</li>
            <li><strong>الاستفادة من المزايا الضريبية:</strong> معرفة الإعفاءات الضريبية المتاحة للاستثمار العقاري</li>
          </ol>
          
          <h2>الخلاصة</h2>
          <p>يعد حساب العائد الاستثماري خطوة أساسية قبل أي قرار استثماري عقاري في مصر. باستخدام المعادلات الصحيحة وتطبيق CalcRealty، يمكنك اتخاذ قرارات مدروسة تضمن أفضل عائد على استثماراتك العقارية.</p>
          
          <p>يجب مراعاة أن العائد الاستثماري ليس المؤشر الوحيد لتقييم الاستثمار، بل يجب النظر أيضاً في عوامل مثل نمو رأس المال على المدى الطويل، والموقع الاستراتيجي، والتوقعات المستقبلية للمنطقة.</p>
        `,
        tags: ['العائد الاستثماري', 'استثمار عقاري', 'العقارات في مصر', 'حاسبة العقارات']
      };

      setArticle(articleData);
      
      // مقالات ذات صلة - مثال
      setRelatedArticles([
        {
          id: 2,
          title: 'دليلك الشامل لحساب أقساط التمويل العقاري في 2025',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1111&auto=format&fit=crop',
          slug: 'complete-guide-mortgage-calculation'
        },
        {
          id: 4,
          title: '5 نصائح لتقييم العقارات بشكل احترافي في السوق المصري',
          image: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30?q=80&w=1170&auto=format&fit=crop',
          slug: 'professional-real-estate-valuation-tips'
        },
        {
          id: 3,
          title: 'مقارنة بين أفضل تطبيقات الحسابات العقارية في 2025',
          image: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=1101&auto=format&fit=crop',
          slug: 'best-real-estate-calculator-apps-comparison'
        }
      ]);

      setLoading(false);
    }, 1000); // محاكاة تأخير الطلب
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background py-20 px-4 font-cairo">
        <Helmet>
          <title>المقال غير موجود | مدونة CalcRealty</title>
          <meta name="description" content="عذراً، لم نتمكن من العثور على المقال المطلوب في مدونة CalcRealty للعقارات" />
        </Helmet>
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">المقال غير موجود</h1>
          <p className="text-gray-300 mb-8">عذراً، لم نتمكن من العثور على المقال المطلوب</p>
          <Link to="/blog" className="btn-primary bg-primary hover:bg-primary/80">
            العودة إلى المدونة
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4 font-cairo">
      <Helmet>
        <title>{article.title} | مدونة CalcRealty</title>
        <meta name="description" content={article.excerpt} />
        <meta name="author" content={article.author} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.image} />
        <meta property="og:url" content={`https://calcrealty.netlify.app/blog/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.dateISO || article.date} />
        <meta property="article:section" content={article.categoryTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.image} />
        <link rel="canonical" href={`https://calcrealty.netlify.app/blog/${slug}`} />
      </Helmet>
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* روابط التنقل */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/blog" className="flex items-center text-primary hover:underline">
              <ArrowLeft className="mr-2 w-5 h-5" />
              العودة إلى المدونة
            </Link>
            <span className="text-gray-400 text-sm">
              <Link to="/" className="hover:text-primary">الرئيسية</Link>
              {' '}/{' '}
              <Link to="/blog" className="hover:text-primary">المدونة</Link>
              {' '}/{' '}
              <span className="text-gray-300">{article.title.substring(0, 20)}...</span>
            </span>
          </div>

          {/* صورة المقال الرئيسية */}
          <div className="relative rounded-2xl overflow-hidden mb-8 h-96">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center mb-4">
                <Link 
                  to={`/blog/category/${article.category}`}
                  className="inline-block px-3 py-1 bg-primary/90 text-white text-sm rounded-full"
                >
                  {article.categoryTitle}
                </Link>
                
                <div className="flex items-center mr-auto text-gray-300 text-sm">
                  <Calendar className="w-4 h-4 ml-1" />
                  <span className="ml-4">{article.date}</span>
                  <Clock className="w-4 h-4 ml-1 mr-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-white">
                {article.title}
              </h1>
            </div>
          </div>

          {/* معلومات الكاتب */}
          <div className="flex items-center mb-8 glass-card p-4 rounded-xl">
            <img 
              src={article.authorImage}
              alt={article.author}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
            />
            <div className="mr-4">
              <span className="block text-white font-bold">{article.author}</span>
              <span className="text-gray-400 text-sm">كاتب في فريق CalcRealty</span>
            </div>
            
            {/* أزرار المشاركة */}
            <div className="flex items-center gap-2 mr-auto">
              <span className="text-gray-400 text-sm ml-2">مشاركة:</span>
              <button 
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                className="bg-white/10 p-2 rounded-full hover:bg-[#1877f2]/20 hover:text-[#1877f2] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button 
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.title}`, '_blank')}
                className="bg-white/10 p-2 rounded-full hover:bg-[#1da1f2]/20 hover:text-[#1da1f2] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button 
                onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${article.title}`, '_blank')}
                className="bg-white/10 p-2 rounded-full hover:bg-[#0a66c2]/20 hover:text-[#0a66c2] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* محتوى المقال */}
          <div className="article-content glass-card p-8 rounded-2xl mb-12">
            <div 
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }} 
            />
          </div>

          {/* الوسوم */}
          <div className="mb-12">
            <h3 className="text-lg font-bold mb-4">الوسوم:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <Link 
                  key={index}
                  to={`/blog/tag/${tag}`}
                  className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* مقالات ذات صلة */}
        {relatedArticles.length > 0 && (
          <div className="max-w-6xl mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-8 gradient-text">مقالات ذات صلة</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Link 
                  key={relatedArticle.id}
                  to={`/blog/${relatedArticle.slug}`}
                  className="glass-card overflow-hidden transition-all hover:translate-y-[-4px] group"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedArticle.image} 
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {relatedArticle.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/blog" className="btn-primary bg-primary hover:bg-primary/80">
                استكشاف المزيد من المقالات
                <ArrowRight className="mr-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPost; 