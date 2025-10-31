import { motion } from "framer-motion";
import { SoftwareItem } from "../types/software";
import { ExternalLink } from "lucide-react";
import { cn } from "../lib/utils";

interface SoftwareCardProps {
  item: SoftwareItem;
  index: number;
}

const priceModelColors = {
  Free: "bg-green-500/20 text-green-400 border-green-500/30",
  Paid: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Both: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export const SoftwareCard: React.FC<SoftwareCardProps> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
    >
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden bg-black/40">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            // Fallback placeholder
            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23151030' width='400' height='300'/%3E%3Ctext fill='%23915EFF' font-family='sans-serif' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E" + item.title.substring(0, 1) + "%3C/text%3E%3C/svg%3E";
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-[#915EFF] transition-colors">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Tags Row */}
        <div className="flex items-center gap-2 flex-wrap pt-2">
          {/* Type Badge */}
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-gray-300 border border-white/10">
            {item.type}
          </span>

          {/* Price Model Badge */}
          <span
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-full border",
              priceModelColors[item.priceModel]
            )}
          >
            {item.priceModel}
          </span>

          {/* Link Icon */}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto p-2 rounded-full bg-[#915EFF]/10 hover:bg-[#915EFF]/20 text-[#915EFF] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#915EFF]/10 to-transparent"></div>
      </div>
    </motion.div>
  );
};
