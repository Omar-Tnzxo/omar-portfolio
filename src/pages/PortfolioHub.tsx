import { motion } from "framer-motion";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PortfolioFolder } from "../components/PortfolioFolder";
import { PORTFOLIO_CATEGORIES, getProjectsByCategory } from "../constants/portfolio";

export const PortfolioHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#915EFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF6B9D]/10 rounded-full blur-3xl" />
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
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#915EFF]/20 to-[#00D4FF]/20 mb-8"
          >
            <FolderOpen className="w-10 h-10 text-[#915EFF]" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-black text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Portfolio{" "}
            <span className="bg-gradient-to-r from-[#915EFF] to-[#00D4FF] bg-clip-text text-transparent">
              Library
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Browse through my comprehensive case study library. Each folder contains
            detailed project showcases demonstrating expertise, problem-solving, and
            results across different disciplines.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-8 mt-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {PORTFOLIO_CATEGORIES.length}
              </div>
              <div className="text-sm text-gray-500">Categories</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {PORTFOLIO_CATEGORIES.reduce((acc, cat) => 
                  acc + getProjectsByCategory(cat.slug).length, 0
                )}
              </div>
              <div className="text-sm text-gray-500">Projects</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Folders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {PORTFOLIO_CATEGORIES.map((category, index) => {
            const projectCount = getProjectsByCategory(category.slug).length;
            return (
              <PortfolioFolder
                key={category.id}
                category={category}
                index={index}
                projectCount={projectCount}
              />
            );
          })}
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-500 text-sm">
            Click any folder to explore detailed case studies
          </p>
        </motion.div>
      </div>
    </div>
  );
};
