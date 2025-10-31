import { motion } from "framer-motion";
import { ArrowLeft, Filter } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import {
  PORTFOLIO_CATEGORIES,
  PROJECT_SUB_CATEGORIES,
  getProjectsByCategoryAndSub,
} from "../constants/portfolio";

export const PortfolioCategoryPage = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [activeFilter, setActiveFilter] = useState("all");

  // Find category
  const category = PORTFOLIO_CATEGORIES.find((cat) => cat.slug === categorySlug);
  const subCategories = PROJECT_SUB_CATEGORIES[categorySlug || ""] || [
    { id: "all", name: "All", slug: "all" },
  ];

  // Get filtered projects
  const projects = getProjectsByCategoryAndSub(categorySlug || "", activeFilter);

  // Handle 404
  if (!category) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Category Not Found</h1>
          <button
            onClick={() => navigate("/portfolio")}
            className="text-[#915EFF] hover:underline"
          >
            Back to Portfolio Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: category.color }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: category.color }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate("/portfolio")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Portfolio Hub</span>
        </motion.button>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm text-gray-400">Category</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-black text-white mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {category.name}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-400 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {category.description}
          </motion.p>

          {/* Project Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 text-sm text-gray-500"
          >
            {projects.length} {projects.length === 1 ? "project" : "projects"} found
          </motion.div>
        </motion.div>

        {/* Sub-Filter System */}
        {subCategories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-400">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {subCategories.map((subCat) => (
                <button
                  key={subCat.id}
                  onClick={() => setActiveFilter(subCat.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === subCat.slug
                      ? "bg-gradient-to-r from-[#915EFF] to-[#00D4FF] text-white shadow-lg"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                  style={{
                    ...(activeFilter === subCat.slug && {
                      background: `linear-gradient(135deg, ${category.color}, #915EFF)`,
                    }),
                  }}
                >
                  {subCat.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Filter className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">
              Try selecting a different filter or check back later
            </p>
            <button
              onClick={() => setActiveFilter("all")}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              Show All Projects
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
