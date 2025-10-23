import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { SERVICES } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { omarImage } from "../assets";

type ServiceCardProps = {
  index: number;
  title: string;
  icon: string;
};

// Service Card - محسّن للموبايل
const ServiceCard = ({ index, title, icon }: ServiceCardProps) => {
  return (
    <Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
      className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] min-w-[140px] max-w-[280px]"
    >
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div className="bg-tertiary rounded-[20px] py-4 px-4 sm:py-6 sm:px-8 min-h-[200px] sm:min-h-[240px] lg:min-h-[280px] flex justify-evenly items-center flex-col">
          <img src={icon} alt={title} loading="lazy" className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
          <h3 className="text-white text-[14px] sm:text-[18px] lg:text-[20px] font-bold text-center leading-tight">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

// About
export const About = () => {
  return (
    <SectionWrapper idName="about">
      <>
        {/* Title */}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Introduction</p>
          <h2 className={styles.sectionHeadText}>Overview.</h2>
        </motion.div>

        {/* Content Container - Text and Image */}
        <div className="mt-12 lg:mt-16 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
          {/* Text Content */}
          <motion.div
            variants={fadeIn("left", "tween", 0.1, 1)}
            className="flex-1 space-y-4 lg:space-y-6 order-2 lg:order-1"
          >
            <motion.p
              variants={fadeIn("", "tween", 0.1, 1)}
              className="text-secondary text-[16px] lg:text-[18px] leading-[28px] lg:leading-[32px] text-center lg:text-left"
            >
              My journey into marketing wasn't a full circle. I started on the front lines as a real estate consultant, understanding customer needs and motivations. This insight drove me to learn marketing not just as a set of tools, but as a way to solve business problems.
            </motion.p>
            
            <motion.p
              variants={fadeIn("", "tween", 0.2, 1)}
              className="text-secondary text-[16px] lg:text-[18px] leading-[28px] lg:leading-[32px] text-center lg:text-left"
            >
              When I saw a problem that needed a better tool, I taught myself to code and built the solution myself. I thrive on blending empathy, strategy, and technology to achieve real, measurable results.
            </motion.p>

            {/* Skills Highlights */}
            <motion.div
              variants={fadeIn("", "tween", 0.3, 1)}
              className="flex flex-wrap gap-2 lg:gap-3 pt-4 justify-center lg:justify-start"
            >
              <span className="px-3 lg:px-4 py-1.5 lg:py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs lg:text-sm font-medium">
                Marketing Strategy
              </span>
              <span className="px-3 lg:px-4 py-1.5 lg:py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-300 text-xs lg:text-sm font-medium">
                Web Development
              </span>
              <span className="px-3 lg:px-4 py-1.5 lg:py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs lg:text-sm font-medium">
                Business Solutions
              </span>
            </motion.div>
          </motion.div>

          {/* Image Container */}
          <motion.div
            variants={fadeIn("right", "tween", 0.3, 1)}
            className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative group">
              {/* Enhanced Background Gradient Effect */}
              <div className="absolute -inset-1 lg:-inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-lg lg:blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              {/* Additional Glow Effect */}
              <div className="absolute -inset-0.5 lg:-inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              
              {/* Image Container */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative overflow-hidden rounded-full border-2 lg:border-4 border-purple-500/30 shadow-xl lg:shadow-2xl shadow-purple-500/20 lg:hover:scale-105 lg:hover:rotate-y-1"
                >
                  <img
                    src={omarImage}
                    alt="Omar Hassan - Marketing & Development Professional"
                    loading="lazy"
                    className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover rounded-full"
                  />
                  
                  {/* Enhanced Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shine Effect - Hidden on mobile */}
                  <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </motion.div>
                
                {/* Enhanced Floating Elements - Smaller on mobile */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-3 -right-3 lg:-top-6 lg:-right-6 w-6 h-6 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-90 shadow-lg shadow-purple-500/50"
                ></motion.div>
                
                <motion.div
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute -bottom-3 -left-3 lg:-bottom-6 lg:-left-6 w-5 h-5 lg:w-8 lg:h-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full opacity-90 shadow-lg shadow-pink-500/50"
                ></motion.div>

                {/* Additional Small Elements - Hidden on mobile */}
                <motion.div
                  animate={{ 
                    y: [0, -5, 0],
                    x: [0, 3, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="hidden lg:block absolute top-1/2 -right-8 w-3 h-3 bg-blue-400 rounded-full opacity-70"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Service Cards - محسّن للموبايل */}
        <div className="mt-12 sm:mt-16 lg:mt-24 flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} index={i} {...service} />
          ))}
        </div>
      </>
    </SectionWrapper>
  );
};
