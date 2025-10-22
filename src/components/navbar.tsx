import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

import { logo, menu, close } from "../assets";
import { NAV_LINKS } from "../constants";
import { styles } from "../styles";
import { cn } from "../utils/lib";
import MagicButton from "./ui/MagicButton";

// Navbar
export const Navbar = () => {
  // state variables
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // دالة الانتقال السلس
  const smoothScrollTo = (elementId: string) => {
    setTimeout(() => {
      const element = document.getElementById(elementId);

      if (element) {
        // استخدام getBoundingClientRect بدلاً من offsetTop
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
      } else {
        // محاولة ثانية باستخدام scrollIntoView كبديل
        const alternativeElement = document.querySelector(`[id*="${elementId}"]`);
        if (alternativeElement) {
          alternativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        styles.paddingX,
        "w-full flex items-center py-4 fixed top-0 z-[999] transition-all duration-300 overflow-x-hidden",
        isAtBottom 
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-2xl" 
          : "bg-transparent"
      )}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto overflow-x-hidden relative">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
        <Link
          to="/"
            className="flex items-center gap-3 group"
          onClick={() => {
            setActive("");
              // انتقال سلس للصفحة الرئيسية
              smoothScrollTo("home");
          }}
          >
            <motion.div
              className="relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
        >
              <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
            </motion.div>
            <div className="flex flex-col">
              <p className="text-white text-[20px] font-bold cursor-pointer flex items-center">
                Omar
                <motion.span 
                  className="ml-2 text-[#915EFF]"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  |
                </motion.span>
              </p>
              <p className="text-gray-400 text-[12px] font-medium sm:block hidden">
                Marketing Specialist
              </p>
            </div>
        </Link>
        </motion.div>

        {/* Nav Links (Desktop) */}
        <ul className="list-none hidden sm:flex flex-row items-center gap-6">
          {NAV_LINKS.map((link, index) => (
            <motion.li
              key={link.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-center"
            >
              {link.link && link.link.startsWith('http') ? (
                <motion.a
                  href={link.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-secondary hover:text-white text-[16px] font-medium cursor-pointer transition-colors duration-300 relative group px-3 py-2"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.title}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#915EFF] to-[#7c4dff] group-hover:w-full transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                  />
                </motion.a>
              ) : link.link ? (
                <motion.a
                  href={link.link}
                  className="text-secondary hover:text-white text-[16px] font-medium cursor-pointer transition-colors duration-300 relative group px-3 py-2"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.title}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#915EFF] to-[#7c4dff] group-hover:w-full transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                  />
                </motion.a>
              ) : link.id === "contact" ? (
                <motion.button
                  onClick={() => smoothScrollTo(link.id)}
                  className="relative inline-flex h-10 w-auto md:w-48 overflow-hidden rounded-lg p-[1px] focus:outline-none bg-gradient-to-r from-[#915EFF] to-[#7c4dff] hover:from-[#7c4dff] hover:to-[#915EFF] transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
                    <FaEnvelope />
                    {link.title}
                  </span>
                </motion.button>
              ) : (
                <motion.a 
                  href={`#${link.id}`}
                  className={cn(
                    active === link.title ? "text-white" : "text-secondary",
                    "hover:text-white text-[16px] font-medium cursor-pointer transition-colors duration-300 relative group px-3 py-2"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(link.title);
                    smoothScrollTo(link.id);
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.title}
                  <motion.div
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#915EFF] to-[#7c4dff] transition-all duration-300",
                      active === link.title ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </motion.a>
              )}
            </motion.li>
          ))}
        </ul>

        {/* Hamburger Menu (Mobile) */}
        <div className="sm:hidden flex flex-1 justify-end items-center relative">
          <motion.button
            className="relative z-50 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
            onClick={() => setToggle(!toggle)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={toggle ? close : menu}
              alt="Menu"
              className="w-6 h-6 object-contain cursor-pointer"
              animate={{ rotate: toggle ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute top-full mt-2 right-0 w-64 p-6 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-[1000] max-h-[80vh] overflow-y-auto"
              >
                {/* Nav Links (Mobile) */}
                <ul className="list-none flex flex-col gap-4">
                  {NAV_LINKS.map((link, index) => (
                    <motion.li
                  key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {link.link && link.link.startsWith('http') ? (
                        <motion.a
                      href={link.link}
                      target="_blank"
                      rel="noreferrer noopener"
                          className="text-secondary hover:text-white font-medium cursor-pointer text-[16px] transition-colors duration-300 block py-2 px-3 rounded-lg hover:bg-white/5"
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setToggle(false)}
                    >
                      {link.title}
                        </motion.a>
                      ) : link.link ? (
                        <motion.a
                      href={link.link}
                          className="text-secondary hover:text-white font-medium cursor-pointer text-[16px] transition-colors duration-300 block py-2 px-3 rounded-lg hover:bg-white/5"
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setToggle(false)}
                    >
                      {link.title}
                        </motion.a>
                      ) : link.id === "contact" ? (
                        <motion.button
                          onClick={() => {
                            setToggle(false);
                            smoothScrollTo(link.id);
                          }}
                          className="relative inline-flex h-10 w-full overflow-hidden rounded-lg p-[1px] focus:outline-none bg-gradient-to-r from-[#915EFF] to-[#7c4dff] hover:from-[#7c4dff] hover:to-[#915EFF] transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
                            <FaEnvelope />
                            {link.title}
                          </span>
                        </motion.button>
                      ) : (
                        <motion.a 
                          href={`#${link.id}`}
                          className={cn(
                            active === link.title ? "text-white bg-white/10" : "text-secondary",
                            "hover:text-white font-medium cursor-pointer text-[16px] transition-all duration-300 block py-2 px-3 rounded-lg hover:bg-white/5"
                          )}
                          onClick={(e) => {
                            e.preventDefault();
                            setActive(link.title);
                            setToggle(false);
                            smoothScrollTo(link.id);
                          }}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {link.title}
                        </motion.a>
                  )}
                    </motion.li>
              ))}
            </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};
