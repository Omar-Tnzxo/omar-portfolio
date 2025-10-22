import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppButton: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleWhatsAppClick = () => {
    setShowMenu(true);
  };

  const openWhatsApp = (type: 'business' | 'personal') => {
    const url = type === 'business' 
      ? "https://wa.me/201029752972" 
      : "https://wa.me/201029752972"; // ضع رقم الواتساب الشخصي هنا
    window.open(url, "_blank");
    setShowMenu(false);
  };

  return (
    <>
      {/* قائمة الاختيار */}
      <AnimatePresence>
        {showMenu && (
          <>
            {/* خلفية شفافة */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
            />
            
            {/* قائمة الخيارات */}
            <motion.div
              className="fixed bottom-24 right-6 z-[70] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              <div className="p-4 space-y-2 min-w-[200px]">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 px-2">
                  اختر نوع الواتساب
                </h3>
                
                {/* واتساب بيزنس */}
                <motion.button
                  onClick={() => openWhatsApp('business')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors duration-200"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="bg-green-500 p-2 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0,0,256,256"
                      width="20px"
                      height="20px"
                      className="fill-white"
                    >
                      <path d="M128,0C57.307,0,0,57.307,0,128c0,22.508,5.812,44.299,16.823,63.147L0,256l66.711-17.5C85.309,249.198,106.275,256,128,256c70.693,0,128-57.307,128-128S198.693,0,128,0z M128,234c-19.988,0-39.37-5.688-56.232-16.462l-4.035-2.578l-41.892,10.988l11.013-40.293l-2.827-4.188C22.365,164.605,16,146.735,16,128C16,65.869,65.869,16,128,16s112,49.869,112,112S190.131,234,128,234z M187.5,155.5c-3.25-1.625-19.25-9.5-22.25-10.625s-5.125-1.625-7.25,1.625s-8.375,10.625-10.25,12.75s-3.75,2.438-7,0.813s-13.625-5.031-25.938-16c-9.594-8.563-16.063-19.125-17.938-22.375s-0.188-5,1.438-6.625c1.469-1.469,3.25-3.813,4.875-5.688s2.188-3.25,3.25-5.375s0.563-4.063-0.188-5.688s-7.25-17.5-9.938-23.938c-2.625-6.281-5.281-5.438-7.25-5.531c-1.875-0.094-4.063-0.094-6.188-0.094s-5.625,0.813-8.563,4.063s-11.313,11.063-11.313,26.938s11.563,31.25,13.188,33.375s22.688,34.656,54.969,48.594c7.688,3.313,13.688,5.281,18.375,6.781c7.719,2.438,14.75,2.094,20.313,1.281c6.188-0.938,19.25-7.875,21.938-15.5s2.688-14.125,1.875-15.5S190.75,157.125,187.5,155.5z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      واتساب بيزنس
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      للاستفسارات العملية
                    </p>
                  </div>
                </motion.button>

                {/* واتساب شخصي */}
                <motion.button
                  onClick={() => openWhatsApp('personal')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors duration-200"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0,0,256,256"
                      width="20px"
                      height="20px"
                      className="fill-white"
                    >
                      <path d="M128,0C57.307,0,0,57.307,0,128c0,22.508,5.812,44.299,16.823,63.147L0,256l66.711-17.5C85.309,249.198,106.275,256,128,256c70.693,0,128-57.307,128-128S198.693,0,128,0z M128,234c-19.988,0-39.37-5.688-56.232-16.462l-4.035-2.578l-41.892,10.988l11.013-40.293l-2.827-4.188C22.365,164.605,16,146.735,16,128C16,65.869,65.869,16,128,16s112,49.869,112,112S190.131,234,128,234z M187.5,155.5c-3.25-1.625-19.25-9.5-22.25-10.625s-5.125-1.625-7.25,1.625s-8.375,10.625-10.25,12.75s-3.75,2.438-7,0.813s-13.625-5.031-25.938-16c-9.594-8.563-16.063-19.125-17.938-22.375s-0.188-5,1.438-6.625c1.469-1.469,3.25-3.813,4.875-5.688s2.188-3.25,3.25-5.375s0.563-4.063-0.188-5.688s-7.25-17.5-9.938-23.938c-2.625-6.281-5.281-5.438-7.25-5.531c-1.875-0.094-4.063-0.094-6.188-0.094s-5.625,0.813-8.563,4.063s-11.313,11.063-11.313,26.938s11.563,31.25,13.188,33.375s22.688,34.656,54.969,48.594c7.688,3.313,13.688,5.281,18.375,6.781c7.719,2.438,14.75,2.094,20.313,1.281c6.188-0.938,19.25-7.875,21.938-15.5s2.688-14.125,1.875-15.5S190.75,157.125,187.5,155.5z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      واتساب شخصي
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      للمحادثات العادية
                    </p>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* زر الواتساب الأساسي */}
      <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.button
        onClick={handleWhatsAppClick}
        className="relative group bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300"
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* أيقونة الواتساب */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0,0,256,256"
          width="24px"
          height="24px"
          fillRule="nonzero"
          className="w-6 h-6"
        >
          <g
            fill="#ffffff"
            fillRule="nonzero"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="start"
            style={{ mixBlendMode: "normal" }}
          >
            <g transform="scale(5.12,5.12)">
              <path d="M25,2c-12.682,0 -23,10.318 -23,23c0,3.96 1.023,7.854 2.963,11.29l-2.926,10.44c-0.096,0.343 -0.003,0.711 0.245,0.966c0.191,0.197 0.451,0.304 0.718,0.304c0.08,0 0.161,-0.01 0.24,-0.029l10.896,-2.699c3.327,1.786 7.074,2.728 10.864,2.728c12.682,0 23,-10.318 23,-23c0,-12.682 -10.318,-23 -23,-23zM36.57,33.116c-0.492,1.362 -2.852,2.605 -3.986,2.772c-1.018,0.149 -2.306,0.213 -3.72,-0.231c-0.857,-0.27 -1.957,-0.628 -3.366,-1.229c-5.923,-2.526 -9.791,-8.415 -10.087,-8.804c-0.295,-0.389 -2.411,-3.161 -2.411,-6.03c0,-2.869 1.525,-4.28 2.067,-4.864c0.542,-0.584 1.181,-0.73 1.575,-0.73c0.394,0 0.787,0.005 1.132,0.021c0.363,0.018 0.85,-0.137 1.329,1.001c0.492,1.168 1.673,4.037 1.819,4.33c0.148,0.292 0.246,0.633 0.05,1.022c-0.196,0.389 -0.294,0.632 -0.59,0.973c-0.296,0.341 -0.62,0.76 -0.886,1.022c-0.296,0.291 -0.603,0.606 -0.259,1.19c0.344,0.584 1.529,2.493 3.285,4.039c2.255,1.986 4.158,2.602 4.748,2.894c0.59,0.292 0.935,0.243 1.279,-0.146c0.344,-0.39 1.476,-1.703 1.869,-2.286c0.393,-0.583 0.787,-0.487 1.329,-0.292c0.542,0.194 3.445,1.604 4.035,1.896c0.59,0.292 0.984,0.438 1.132,0.681c0.148,0.242 0.148,1.41 -0.344,2.771z"></path>
            </g>
          </g>
        </svg>

        {/* تأثير التوهج */}
        <motion.div
          className="absolute inset-0 bg-green-400 rounded-full opacity-0 group-hover:opacity-30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* تأثير النبض */}
        <motion.div
          className="absolute inset-0 border-2 border-green-400 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Tooltip */}
        <motion.div
          className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          initial={{ x: 10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
        >
          Chat on WhatsApp
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-black border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </motion.div>
      </motion.button>
    </motion.div>
    </>
  );
};

export default WhatsAppButton; 