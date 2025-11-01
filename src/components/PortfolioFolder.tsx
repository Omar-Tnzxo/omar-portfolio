import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Folder } from "./Folder";
import { PortfolioCategory } from "../types/portfolio";

type PortfolioFolderProps = {
  category: PortfolioCategory;
  index: number;
  projectCount?: number;
};

export const PortfolioFolder = ({ category, index, projectCount = 0 }: PortfolioFolderProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/portfolio/${category.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onClick={handleClick}
      className="relative group cursor-pointer"
    >
      {/* Folder Component from reactbits.dev */}
      <div className="transition-transform duration-300 hover:-translate-y-3">
        <Folder color={category.color} />
      </div>

      {/* Folder Info */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#915EFF] group-hover:to-[#00D4FF] transition-all">
          {category.name}
        </h3>
        <p className="text-sm text-gray-400 mb-3 max-w-[200px] mx-auto">
          {category.description}
        </p>
        {projectCount > 0 && (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full">
            <span className="text-xs text-gray-400">{projectCount} projects</span>
          </div>
        )}
      </div>

      {/* Glow Effect on Hover */}
      <div
        className="absolute inset-0 -z-10 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full"
        style={{ backgroundColor: category.color }}
      />
    </motion.div>
  );
};
