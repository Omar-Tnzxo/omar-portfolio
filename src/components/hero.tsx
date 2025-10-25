import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

import { styles } from "../styles";
import { cn } from "../utils/lib";
import { resume } from "../assets";

// Hook للعد من 0 إلى الرقم المطلوب
const useCountAnimation = (target: number, duration: number = 1500) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Start immediately when component mounts
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, 500); // small delay for better UX

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const steps = 60; // عدد الخطوات للأنيميشن
    const increment = target / steps;
    const stepDuration = duration / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.floor(increment * step), target);
      setCount(current);
      
      if (current >= target) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return count;
};

// Descriptions array outside component to avoid re-creation
const descriptions = [
  "I am a Content & Social Media Specialist who bridges the gap between marketing, sales, and technology to deliver measurable results.",
  "I combine strategic marketing with frontline sales experience to create content-driven lead generation systems that work.",
  "I develop PropTech solutions using Flutter and automation tools to solve real-world business challenges.",
  "I build comprehensive brand identities and e-commerce platforms that drive growth and customer engagement."
];

// Hero
export const Hero = () => {

  const [currentDescription, setCurrentDescription] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // استخدام Hook للأرقام
  const yearsCount = useCountAnimation(2, 1500);
  const projectsCount = useCountAnimation(20, 1800);
  const satisfactionCount = useCountAnimation(100, 2000);

  useEffect(() => {
    const text = descriptions[currentDescription];
    if (!text) return;
    
    setDisplayText("");
    setIsTyping(true);
    
    let index = 0;
    let currentText = "";
    let timeoutId: NodeJS.Timeout;
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        setDisplayText(currentText);
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
        
        // تأخير 2 ثانية قبل الانتقال للنص التالي
        timeoutId = setTimeout(() => {
          setCurrentDescription((prev) => (prev + 1) % descriptions.length);
        }, 2000);
      }
    }, 30);
    
    return () => {
      clearInterval(typeInterval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentDescription]);

  const handleDownloadCV = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);

    try {
      const response = await fetch(resume);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "Omar_Hassan_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CV:", error);
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
    }
  };

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // دالة الانتقال السلس للأقسام
  const smoothScrollTo = (elementId: string) => {
    setTimeout(() => {
      const element = document.getElementById(elementId);

      if (element) {
        const rect = element.getBoundingClientRect();
        const elementPosition = rect.top + window.pageYOffset - 100; // 100px offset for navbar

        const startPosition = window.pageYOffset;
        const distance = elementPosition - startPosition;
        const duration = 1500; // 1.5 seconds
        let start: number | null = null;

        const animation = (currentTime: number) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
      }
    }, 0);
  };

  // دالة الانتقال السلس (Easing function)
  const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  };

  return (
    <section id="home" className="relative w-full min-h-screen mx-auto overflow-hidden flex items-center">
      {/* خلفية متحركة - تقليل الأحجام */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-20 sm:w-24 md:w-32 lg:w-40 h-20 sm:h-24 md:h-32 lg:h-40 bg-[#915EFF] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-20 sm:w-24 md:w-32 lg:w-40 h-20 sm:h-24 md:h-32 lg:h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-20 sm:w-24 md:w-32 lg:w-40 h-20 sm:h-24 md:h-32 lg:h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div
        className={cn(
          styles.paddingX,
          "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32",
        )}
      >
        {/* تخطيط خاص للموبايل */}
        <div className="flex flex-col sm:hidden space-y-6">
          {/* Title Bar + العنوان الرئيسي في نفس السطر */}
          <div className="flex items-start gap-3">
            {/* Title Bar */}
            <div className="flex flex-col justify-start items-center flex-shrink-0 mt-1.5">
              <div className="w-3 h-3 rounded-full bg-[#915EFF]" />
              <div className="w-1 h-16 violet-gradient" />
            </div>

            {/* العنوان الرئيسي - محاذي بدقة مع Title Bar */}
            <motion.h1
              className="font-black text-white text-[28px] xs:text-[32px] leading-[32px] xs:leading-[36px] text-left flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#915EFF]">Hi, I'm Omar Hassan</span>
              <span className="block text-[#915EFF] text-[20px] xs:text-[22px]">(Tnzxo)</span>
              <span className="text-white text-[14px] xs:text-[16px] block mt-2 font-medium">Digital Marketing & Growth Specialist</span>
            </motion.h1>
          </div>

          {/* النص المتحرك أسفل العنوان */}
          <motion.div 
            className="text-[#dfd9ff] font-normal text-[13px] xs:text-[14px] leading-[20px] xs:leading-[22px] min-h-[60px] flex items-start justify-start text-left pl-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="relative max-w-full">
              {displayText}
              <span className={`ml-1 ${isTyping ? 'animate-pulse' : ''}`}>|</span>
            </span>
          </motion.div>

          {/* أزرار Call-to-Action */}
          <motion.div 
            className="flex flex-col gap-3 w-full px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              onClick={scrollToWork}
              className="w-full bg-[#915EFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7c4dff] transition-colors shadow-lg hover:shadow-xl text-sm"
            >
              View My Work
            </button>
            <motion.button
              onClick={handleDownloadCV}
              disabled={isDownloading}
              className={`w-full relative overflow-hidden border border-[#915EFF] px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg text-sm ${
                isDownloading 
                  ? 'bg-[#915EFF] text-white cursor-not-allowed' 
                  : 'text-[#915EFF] hover:bg-[#915EFF] hover:text-white hover:shadow-xl'
              }`}
              whileHover={!isDownloading ? { scale: 1.02 } : {}}
              whileTap={!isDownloading ? { scale: 0.98 } : {}}
            >
              {isDownloading ? (
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Downloading...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download CV</span>
                </div>
              )}
              
              {isDownloading && (
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.button>
          </motion.div>

          {/* إحصائيات سريعة */}
          <motion.div 
            className="flex flex-row justify-around gap-3 px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center flex-1">
              <div className="text-xl xs:text-2xl font-bold text-[#915EFF]">{yearsCount}+</div>
              <div className="text-[10px] xs:text-xs text-gray-400 mt-1">Years Exp</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-xl xs:text-2xl font-bold text-[#915EFF]">{projectsCount}+</div>
              <div className="text-[10px] xs:text-xs text-gray-400 mt-1">Projects</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-xl xs:text-2xl font-bold text-[#915EFF]">{satisfactionCount}%</div>
              <div className="text-[10px] xs:text-xs text-gray-400 mt-1">Satisfaction</div>
            </div>
          </motion.div>

          {/* شريط التقدم */}
          <motion.div 
            className="px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-400">Available for work</span>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-[#915EFF] to-[#7c4dff] h-1.5 rounded-full" style={{width: '85%'}}></div>
            </div>
          </motion.div>
        </div>

        {/* تخطيط الحاسوب والتابلت */}
        <div className="hidden sm:flex flex-row items-start gap-3 md:gap-5">
          {/* Title Bar */}
          <div className="flex flex-col justify-center items-center mt-2 md:mt-5">
            <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-[#915EFF]" />
            <div className="w-1 h-32 sm:h-40 md:h-52 lg:h-60 violet-gradient" />
          </div>

          {/* About Me */}
          <div className="flex-1 w-full flex flex-col justify-center min-h-0">
            {/* العنوان الرئيسي */}
            <motion.h1
              className="font-black text-white text-[28px] sm:text-[32px] md:text-[38px] lg:text-[44px] xl:text-[50px] leading-[32px] sm:leading-[36px] md:leading-[42px] lg:leading-[48px] xl:leading-[54px] text-left mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#915EFF]">Hi, I'm Omar Hassan (Tnzxo)</span>
              <span className="text-white text-[15px] sm:text-[16px] md:text-[18px] lg:text-[19px] xl:text-[20px] block mt-2 font-medium">Digital Marketing & Growth Specialist in Egypt</span>
            </motion.h1>

            {/* النص المتحرك */}
            <motion.div 
              className="text-[#dfd9ff] font-normal text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] leading-[18px] sm:leading-[20px] md:leading-[22px] lg:leading-[24px] xl:leading-[25px] mt-4 md:mt-5 min-h-[50px] sm:min-h-[55px] md:min-h-[60px] flex items-center justify-start text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="relative max-w-full">
                {displayText}
                <span className={`ml-1 ${isTyping ? 'animate-pulse' : ''}`}>|</span>
              </span>
            </motion.div>

            {/* أزرار Call-to-Action */}
            <motion.div 
              className="flex flex-row gap-3 md:gap-4 mt-5 md:mt-6 justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button 
                onClick={scrollToWork}
                className="bg-[#915EFF] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#7c4dff] transition-colors shadow-lg hover:shadow-xl text-sm"
              >
                View My Work
              </button>
              <motion.button 
                onClick={handleDownloadCV}
                disabled={isDownloading}
                className={`relative overflow-hidden border border-[#915EFF] px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg text-sm ${
                  isDownloading 
                    ? 'bg-[#915EFF] text-white cursor-not-allowed' 
                    : 'text-[#915EFF] hover:bg-[#915EFF] hover:text-white hover:shadow-xl'
                }`}
                whileHover={!isDownloading ? { scale: 1.02 } : {}}
                whileTap={!isDownloading ? { scale: 0.98 } : {}}
              >
                {isDownloading ? (
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Downloading...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download CV</span>
                  </div>
                )}
                
                {isDownloading && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.button>
            </motion.div>

            {/* إحصائيات سريعة */}
            <motion.div 
              className="flex flex-row justify-start gap-6 sm:gap-8 md:gap-10 mt-5 md:mt-6 lg:mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-[#915EFF]">{yearsCount}+</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Years Exp</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-[#915EFF]">{projectsCount}+</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-[#915EFF]">{satisfactionCount}%</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Satisfaction</div>
              </div>
            </motion.div>

            {/* شريط التقدم */}
            <motion.div 
              className="mt-5 md:mt-6 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs sm:text-sm text-gray-400">Available for work</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-[#915EFF] to-[#7c4dff] h-1.5 rounded-full" style={{width: '85%'}}></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to about section */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-16 lg:bottom-20 xl:bottom-24 w-full flex justify-center items-center z-10">
        <button 
          onClick={() => smoothScrollTo('about')}
          aria-label="Scroll to about section"
          className="cursor-pointer focus:outline-none"
        >
          <div className="w-[20px] sm:w-[24px] md:w-[26px] h-[40px] sm:h-[48px] md:h-[52px] rounded-3xl border-3 sm:border-4 border-secondary flex justify-center items-start p-1.5 sm:p-2 hover:border-[#915EFF] transition-colors duration-300">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-secondary mb-1"
            />
          </div>
        </button>
      </div>
    </section>
  );
};
