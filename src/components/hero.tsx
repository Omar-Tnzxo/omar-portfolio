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

  return (
    <section id="home" className="relative w-full h-screen mx-auto overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-24 sm:w-32 md:w-72 h-24 sm:h-32 md:h-72 bg-[#915EFF] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-24 sm:w-32 md:w-72 h-24 sm:h-32 md:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-24 sm:w-32 md:w-72 h-24 sm:h-32 md:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div
        className={cn(
          styles.paddingX,
          "absolute inset-0 top-[80px] sm:top-[100px] md:top-[120px] max-w-7xl mx-auto px-4 sm:px-6 md:px-0",
        )}
      >
        {/* تخطيط خاص للموبايل */}
        <div className="flex flex-col sm:hidden">
          {/* Title Bar + العنوان الرئيسي في نفس السطر */}
          <div className="flex items-start gap-3 mt-1">
        {/* Title Bar */}
            <div className="flex flex-col justify-start items-center flex-shrink-0 mt-1.5">
              <div className="w-3 h-3 rounded-full bg-[#915EFF]" />
              <div className="w-1 h-16 violet-gradient" />
        </div>

            {/* العنوان الرئيسي - محاذي بدقة مع Title Bar */}
          <motion.h1
              className="font-black text-white text-[36px] leading-[40px] text-left flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
              <span className="text-[#915EFF]">Hi, I'm Omar Hassan (Tnzxo)</span>
              <span className="text-white text-[18px] block mt-1">Digital Marketing & Growth Specialist in Egypt</span>
          </motion.h1>
          </div>

          {/* النص المتحرك أسفل العنوان - محاذي بدقة */}
          <motion.div 
            className="text-[#dfd9ff] font-medium text-[15px] leading-[22px] mt-2 min-h-[60px] flex items-start justify-start text-left ml-6"
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
            className="flex flex-col gap-3 mt-6 justify-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              onClick={scrollToWork}
              className="bg-[#915EFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7c4dff] transition-colors shadow-lg hover:shadow-xl text-sm"
            >
              View My Work
            </button>
            <motion.button
              onClick={handleDownloadCV}
              disabled={isDownloading}
              className={`relative overflow-hidden border border-[#915EFF] px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg text-sm ${
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
                  <motion.svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </motion.svg>
                  <span>Download CV</span>
                </div>
              )}
              
              {/* تأثير الموجة */}
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

          {/* شريط المهارات المتحرك */}
          <motion.div 
            className="mt-6 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex flex-wrap justify-center gap-2 animate-pulse">
              <span className="text-[#915EFF] font-semibold text-xs">Digital Marketing</span>
              <span className="text-[#915EFF] font-semibold text-xs">Flutter Development</span>
              <span className="text-[#915EFF] font-semibold text-xs">React.js</span>
              <span className="text-[#915EFF] font-semibold text-xs">Content Strategy</span>
              <span className="text-[#915EFF] font-semibold text-xs">UI/UX Design</span>
            </div>
          </motion.div>

          {/* إحصائيات سريعة */}
          <motion.div 
            className="flex flex-row justify-center gap-4 mt-6 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center">
              <div className="text-lg font-bold text-[#915EFF]">{yearsCount}+</div>
              <div className="text-xs text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#915EFF]">{projectsCount}+</div>
              <div className="text-xs text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#915EFF]">{satisfactionCount}%</div>
              <div className="text-xs text-gray-400">Client Satisfaction</div>
            </div>
          </motion.div>

          {/* شريط التقدم */}
          <motion.div 
            className="mt-4 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-400">Available for work</span>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div className="bg-[#915EFF] h-1 rounded-full animate-pulse" style={{width: '85%'}}></div>
            </div>
          </motion.div>
        </div>

        {/* تخطيط الحاسوب - محسن */}
        <div className="hidden sm:flex flex-row items-center justify-center w-full h-full px-4 sm:px-6 lg:px-8">
          {/* حاوية المحتوى */}
          <div className="flex flex-row items-start gap-5 w-full">
            {/* Title Bar */}
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
              <div className="w-1 h-80 violet-gradient" />
            </div>

            {/* About Me */}
            <div className="flex-1 w-full flex flex-col justify-center min-h-0">
              {/* العنوان الرئيسي */}
              <motion.h1
                className="font-black text-white text-left mt-2"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 6rem)', // Responsive font size
                  lineHeight: '1.1',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-[#915EFF]">Hi, I'm Omar Hassan (Tnzxo)</span>
                <span 
                  className="text-white block mt-2"
                  style={{
                    fontSize: 'clamp(1.25rem, 3vw, 2rem)', // Responsive font size
                  }}
                >
                  Digital Marketing & Growth Specialist in Egypt
                </span>
              </motion.h1>

              {/* النص المتحرك */}
              <motion.div 
                className="text-[#dfd9ff] font-medium text-left mt-6 min-h-[80px] flex items-center"
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.75rem)', // Responsive font size
                  lineHeight: '1.4',
                }}
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
                className="flex flex-row gap-4 mt-8 justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <button 
                  onClick={scrollToWork}
                  className="bg-[#915EFF] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#7c4dff] transition-colors shadow-lg hover:shadow-xl text-base"
                >
                  View My Work
                </button>
                <motion.button 
                  onClick={handleDownloadCV}
                  disabled={isDownloading}
                  className={`relative overflow-hidden border border-[#915EFF] px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg text-base ${
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
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </motion.svg>
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

            {/* شريط المهارات المتحرك */}
            <motion.div 
                className="mt-8 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex flex-wrap justify-start gap-4 animate-pulse">
                  <span className="text-[#915EFF] font-semibold text-base">Digital Marketing</span>
                  <span className="text-[#915EFF] font-semibold text-base">Flutter Development</span>
                  <span className="text-[#915EFF] font-semibold text-base">React.js</span>
                  <span className="text-[#915EFF] font-semibold text-base">Content Strategy</span>
                  <span className="text-[#915EFF] font-semibold text-base">UI/UX Design</span>
              </div>
            </motion.div>

            {/* إحصائيات سريعة */}
            <motion.div 
                className="flex flex-row justify-start gap-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center">
                  <div className="text-3xl font-bold text-[#915EFF]">{yearsCount}+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                  <div className="text-3xl font-bold text-[#915EFF]">{projectsCount}+</div>
                  <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                  <div className="text-3xl font-bold text-[#915EFF]">{satisfactionCount}%</div>
                  <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
            </motion.div>

            {/* شريط التقدم */}
            <motion.div 
                className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm text-gray-400">Available for work</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-[#915EFF] h-1 rounded-full animate-pulse" style={{width: '85%'}}></div>
              </div>
            </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to about section - محسن للموبايل */}
      <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 w-full flex justify-center items-center z-10">
        <a href="#about">
          <div className="w-[24px] sm:w-[28px] md:w-[30px] lg:w-[35px] h-[48px] sm:h-[56px] md:h-[60px] lg:h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-1.5 sm:p-2">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-1 sm:w-1.5 md:w-2 lg:w-3 h-1 sm:h-1.5 md:h-2 lg:h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};
