import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CategoryFolder } from "./CategoryFolder";
import { SOFTWARE_CATEGORIES } from "../constants/software";
import { ArrowRight } from "lucide-react";

export const SoftwarePreview = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#915EFF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm uppercase tracking-wider text-gray-500 mb-3"
          >
            Builder & Problem Solver
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            My Software{" "}
            <span className="bg-gradient-to-r from-[#915EFF] to-[#00D4FF] bg-clip-text text-transparent">
              Arsenal
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            A curated collection of tools, programs, and applications I've built
            to solve real-world challenges.
          </motion.p>
        </motion.div>

        {/* Folders Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-12"
        >
          {SOFTWARE_CATEGORIES.map((category, index) => (
            <CategoryFolder
              key={category.id}
              category={category}
              index={index}
              basePath="/software"
            />
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <button
            onClick={() => navigate("/software")}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#915EFF] to-[#00D4FF] rounded-full font-semibold text-white shadow-lg hover:shadow-2xl transition-all hover:scale-105"
          >
            <span>View All Software</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            
            {/* Animated glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#915EFF] to-[#00D4FF] opacity-50 blur-xl group-hover:opacity-75 transition-opacity -z-10"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
