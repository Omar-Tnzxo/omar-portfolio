import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Folder as FolderIcon } from "lucide-react";
import { SoftwareCard } from "../components/SoftwareCard";
import { getSoftwareByCategory, getCategoryBySlug } from "../constants/software";
import { useEffect, useState } from "react";
import { SoftwareItem } from "../types/software";

export const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<SoftwareItem[]>([]);
  const category = getCategoryBySlug(slug || "");

  useEffect(() => {
    if (slug) {
      const categoryItems = getSoftwareByCategory(slug);
      setItems(categoryItems);
    }
  }, [slug]);

  // If category doesn't exist, redirect to software hub
  useEffect(() => {
    if (!category && slug) {
      navigate("/software");
    }
  }, [category, slug, navigate]);

  if (!category) {
    return null;
  }

  return (
    <div className="min-h-screen bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${category.color}20` }}
        />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#915EFF]/10 rounded-full blur-3xl" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate("/software")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Arsenal</span>
        </motion.button>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="p-3 rounded-xl"
              style={{ backgroundColor: `${category.color}20` }}
            >
              <FolderIcon
                className="w-8 h-8"
                style={{ color: category.color }}
              />
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-black text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {category.name}
            </motion.h1>
          </div>
          <motion.p
            className="text-lg text-gray-400 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {category.description}
          </motion.p>
        </motion.div>

        {/* Software Grid */}
        {items.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {items.map((item, index) => (
              <SoftwareCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-20"
          >
            <div
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${category.color}20` }}
            >
              <FolderIcon className="w-10 h-10" style={{ color: category.color }} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-400">
              Software items in this category are currently being developed.
            </p>
          </motion.div>
        )}

        {/* Item Count */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-sm text-gray-600">
              Showing {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
