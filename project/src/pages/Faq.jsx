import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function Faq() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      question: 'ما هو تطبيق CalcRealty وكيف يمكن أن يساعدني؟',
      answer: 'CalcRealty هو تطبيق متخصص في الحسابات العقارية، صمم خصيصًا للمستثمرين والوسطاء العقاريين في مصر والوطن العربي. يوفر التطبيق مجموعة من الأدوات لحساب العائد الاستثماري، جدولة الأقساط، حساب التكلفة الإجمالية للوحدات، حساب تكلفة المتر المربع ومساحات البناء، وغيرها من الحسابات المهمة في مجال العقارات.'
    },
    {
      id: 2,
      question: 'كيف يمكنني حساب العائد على الاستثمار العقاري بدقة؟',
      answer: 'يمكنك حساب العائد الاستثماري العقاري بدقة باستخدام تطبيق CalcRealty من خلال الخطوات التالية: 1) أدخل قيمة شراء العقار، 2) أدخل الإيجار السنوي المتوقع، 3) أدخل التكاليف والمصاريف السنوية مثل الصيانة والضرائب، 4) سيقوم التطبيق تلقائيًا بحساب العائد الاستثماري السنوي بالنسبة المئوية، وكذلك فترة استرداد رأس المال.'
    },
    {
      id: 3,
      question: 'هل يمكنني حساب أقساط التمويل العقاري باستخدام التطبيق؟',
      answer: 'نعم، يوفر تطبيق CalcRealty ميزة حساب الأقساط الشهرية للتمويل العقاري. ما عليك سوى إدخال قيمة العقار، مبلغ المقدم، مدة السداد بالسنوات، ومعدل الفائدة. سيقوم التطبيق بحساب القسط الشهري والإجمالي المستحق وعرض جدول الأقساط التفصيلي..'
    },
    {
      id: 4,
      question: 'كيف يختلف CalcRealty عن تطبيقات العقارات الأخرى.؟',
      answer: 'يتميز CalcRealty بتركيزه على الحسابات العقارية بشكل متخصص، بينما تركز تطبيقات. على البحث والتسويق العقاري بشكل أساسي. يقدم CalcRealty مجموعة كاملة من أدوات الحساب المتخصصة للمستثمرين والوسطاء، مع واجهة مستخدم بسيطة مصممة خصيصًا للسوق العربية والمصرية. كما أن التطبيق مجاني تمامًا ويعمل بدون إنترنت.'
    },
    {
      id: 5,
      question: 'هل يعمل التطبيق على جميع أنظمة التشغيل؟',
      answer: 'نعم، تطبيق CalcRealty متاح حاليًا على نظام Android عبر متجر Google Play، وقريبًا سيكون متاحًا على أجهزة iOS ونظام Windows، مما يتيح للمستخدمين إمكانية الوصول إليه من أي جهاز.'
    },
    {
      id: 6,
      question: 'كيف يمكنني حساب مساحات الفلل والشقق في مشاريع مصر العقارية؟',
      answer: 'يوفر تطبيق CalcRealty أداة متخصصة لحساب المساحات، حيث يمكنك إدخال أبعاد العقار (الطول والعرض) ومعلومات إضافية مثل عدد الطوابق والمساحات الخارجية. يقوم التطبيق بحساب المساحة الإجمالية، صافي المساحة القابلة للاستخدام، والمساحة المبنية وتطبيق المعادلات المستخدمة في القطاع العقاري المصري.'
    },
    {
      id: 7,
      question: 'هل تطبيق CalcRealty مناسب للمطورين العقاريين وشركات التمويل العقاري؟',
      answer: 'نعم، يستخدم العديد من المطورين العقاريين وشركات التمويل العقاري في مصر تطبيق CalcRealty للحصول على حسابات دقيقة وسريعة. يوفر التطبيق أدوات متخصصة تساعد في تقدير التكاليف، توقع الإيرادات، وإنشاء خطط التمويل للمشاريع العقارية المختلفة.'
    },
    {
      id: 8,
      question: 'كيف يمكنني الحصول على مساعدة إذا واجهت مشكلة في استخدام التطبيق؟',
      answer: 'يمكنك الحصول على المساعدة من خلال قسم "تواصل معنا" في التطبيق والموقع. فريق الدعم الفني متاح على مدار الساعة للإجابة على استفساراتك وتقديم المساعدة اللازمة. يمكنك أيضًا زيارة قناة التطبيق على تلجرام للحصول على تحديثات وإرشادات استخدام مفصلة.'
    },
    {
      id: 9,
      question: 'هل تطبيق CalcRealty مجاني تمامًا؟',
      answer: 'نعم، تطبيق CalcRealty مجاني تمامًا وبدون أي رسوم خفية أو مدفوعات داخل التطبيق. نؤمن بتقديم أدوات احترافية للجميع لدعم قطاع العقارات في مصر والوطن العربي.'
    },
    {
      id: 10,
      question: 'هل يمكن استخدام التطبيق لحساب التمويل العقاري والرهن العقاري؟',
      answer: 'بالتأكيد، يحتوي CalcRealty على أدوات متخصصة لحساب التمويل العقاري والرهن العقاري وفقًا للقوانين المصرية. يمكنك حساب مبلغ التمويل المتاح، الفوائد، فترة السداد، وتكلفة التمويل الإجمالية، مما يساعدك على اتخاذ قرارات مالية أفضل عند شراء العقارات.'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-20 px-4 font-cairo">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12">
          <Link to="/" className="flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="mr-2 w-5 h-5" />
            العودة إلى الصفحة الرئيسية
          </Link>
          <h1 className="text-4xl font-bold mb-8 gradient-text text-center">الأسئلة الشائعة عن تطبيق CalcRealty</h1>
          <p className="text-gray-300 text-lg text-center mb-12 max-w-2xl mx-auto">
            إليك إجابات لأكثر الأسئلة شيوعًا حول تطبيق حاسبة العقارات والحسابات العقارية في مصر والوطن العربي
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div 
              key={faq.id}
              className="glass-card overflow-hidden transition-all duration-300"
            >
              <button 
                className="w-full text-right py-6 px-8 flex justify-between items-center focus:outline-none"
                onClick={() => toggleQuestion(faq.id)}
              >
                <h3 className="text-xl font-bold text-white">{faq.question}</h3>
                <div className="bg-primary/20 p-2 rounded-full">
                  {openQuestion === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary" />
                  )}
                </div>
              </button>
              
              <div 
                className={`px-8 transition-all duration-300 ${
                  openQuestion === faq.id ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center p-8 glass-card">
          <h2 className="text-2xl font-bold mb-4">هل لديك أسئلة أخرى؟</h2>
          <p className="text-gray-300 mb-6">
            لم تجد إجابة لسؤالك؟ لا تتردد في التواصل مع فريق الدعم الفني للحصول على المساعدة اللازمة
          </p>
          <Link 
            to="/#contact"
            className="btn-primary bg-primary hover:bg-primary/80 inline-block"
          >
            تواصل معنا
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Faq; 