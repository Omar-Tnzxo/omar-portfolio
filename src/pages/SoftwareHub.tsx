import { motion } from "framer-motion";
import { CategoryFolder } from "../components/CategoryFolder";
import { SOFTWARE_CATEGORIES } from "../constants/software";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SoftwareHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#915EFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-3xl" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </motion.button>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-black text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Software{" "}
            <span className="bg-gradient-to-r from-[#915EFF] to-[#00D4FF] bg-clip-text text-transparent">
              Arsenal
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore my curated collection of tools, programs, and applications.
            Each piece crafted to solve real-world problems.
          </motion.p>
        </motion.div>

        {/* Folders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {SOFTWARE_CATEGORIES.map((category, index) => (
            <CategoryFolder
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Decorative Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-32"
        >
          <p className="text-sm text-gray-600">
            Click on any folder to explore its contents
          </p>
        </motion.div>
      </div>
    </div>
  );
};
