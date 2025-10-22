import { TECHNOLOGIES } from "../constants";
import { SectionWrapper } from "../hoc";
import { motion } from "framer-motion";

// Technologies
export const Tech = () => {
  return (
    <SectionWrapper>
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {/* Iterate over each technology */}
        {TECHNOLOGIES.map((technology, index) => (
          <motion.div 
            className="w-28 h-28 flex items-center justify-center" 
            key={technology.name}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <motion.div
              className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#915EFF]/20 to-transparent p-4 backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src={technology.icon} 
                alt={technology.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};
