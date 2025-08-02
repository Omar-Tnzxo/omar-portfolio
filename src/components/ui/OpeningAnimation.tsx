import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OpeningAnimationProps {
  onComplete: () => void;
}

const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // بداية الانيميشن بعد 200ms بدلاً من 500ms
    const timer1 = setTimeout(() => setShowContent(true), 200);
    
    // تغيير الخطوات بشكل أسرع
    const timer2 = setTimeout(() => setCurrentStep(1), 800);
    const timer3 = setTimeout(() => setCurrentStep(2), 1600);
    const timer4 = setTimeout(() => setCurrentStep(3), 2400);
    
    // إنهاء الانيميشن بعد 3 ثوانٍ بدلاً من 8
    const timer5 = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  const steps = [
    {
      title: "Omar Hassan",
      subtitle: "Content & Social Media Specialist",
      color: "#915eff"
    },
    {
      title: "Real Estate Marketing Expert",
      subtitle: "Lead Generation • Sales Strategy • PropTech",
      color: "#00cea8"
    },
    {
      title: "Technical Developer",
      subtitle: "Flutter • React.js • Marketing Automation",
      color: "#bf61ff"
    },
    {
      title: "Ready to Connect",
      subtitle: "Let's create amazing marketing solutions",
      color: "#915eff"
    }
  ];

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* خلفية متحركة - مبسطة */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#915eff] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
              animate={{
                scale: [1, 1.1, 1],
                x: [0, 50, 0],
                y: [0, -25, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00cea8] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
              animate={{
                scale: [1.1, 1, 1.1],
                x: [0, -50, 0],
                y: [0, 25, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>

          {/* المحتوى الرئيسي */}
          <div className="relative z-10 text-center">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mb-6"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-3"
                style={{ color: steps[currentStep].color }}
                animate={{
                  textShadow: [
                    `0 0 15px ${steps[currentStep].color}`,
                    `0 0 30px ${steps[currentStep].color}`,
                    `0 0 15px ${steps[currentStep].color}`,
                  ]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {steps[currentStep].title}
              </motion.h1>
              
              <motion.p
                className="text-lg md:text-xl text-gray-300 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {steps[currentStep].subtitle}
              </motion.p>
            </motion.div>

            {/* شريط التقدم */}
            <motion.div
              className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ 
                  background: `linear-gradient(90deg, ${steps[currentStep].color}, ${steps[currentStep].color}80)`
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: (currentStep + 1) / steps.length }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </motion.div>

            {/* مؤشر التحميل المبسط */}
            <motion.div
              className="mt-6 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <motion.div
                className="w-2 h-2 bg-white rounded-full mx-1"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0
                }}
              />
              <motion.div
                className="w-2 h-2 bg-white rounded-full mx-1"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              />
              <motion.div
                className="w-2 h-2 bg-white rounded-full mx-1"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }}
              />
            </motion.div>
          </div>

          {/* تأثيرات إضافية - مبسطة */}
          <motion.div
            className="absolute top-8 left-8 text-white/20 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              ⚡
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute top-8 right-8 text-white/20 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              🚀
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpeningAnimation; 