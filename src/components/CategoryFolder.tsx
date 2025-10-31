import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Folder from "./Folder";
import { SoftwareCategory } from "../types/software";

interface CategoryFolderProps {
  category: SoftwareCategory;
  index: number;
  basePath?: string;
}

export const CategoryFolder: React.FC<CategoryFolderProps> = ({
  category,
  index,
  basePath = "/software",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${basePath}/${category.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="flex flex-col items-center cursor-pointer group"
      onClick={handleClick}
    >
      {/* Folder Component */}
      <div className="relative">
        <Folder color={category.color} size={1.5} />
        
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
          style={{
            background: `radial-gradient(circle, ${category.color}40 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Category Name */}
      <motion.div
        className="mt-6 text-center space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 + index * 0.15 }}
      >
        <h3 className="text-2xl font-bold text-white group-hover:text-[#915EFF] transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-gray-400 max-w-[200px]">
          {category.description}
        </p>
      </motion.div>

      {/* Decorative line */}
      <motion.div
        className="w-16 h-0.5 mt-3 rounded-full"
        style={{ backgroundColor: category.color }}
        initial={{ width: 0 }}
        animate={{ width: 64 }}
        transition={{ delay: 0.5 + index * 0.15, duration: 0.3 }}
      />
    </motion.div>
  );
};
