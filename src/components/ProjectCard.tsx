import { motion } from "framer-motion";
import { ExternalLink, Github, Play } from "lucide-react";
import { PortfolioProject } from "../types/portfolio";
import { useNavigate } from "react-router-dom";

type ProjectCardProps = {
  project: PortfolioProject;
  index: number;
};

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/portfolio/${project.category}/${project.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={handleCardClick}
      className="group relative bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        {project.video ? (
          <video
            src={project.video}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-project.svg";
            }}
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-medium text-white">
          {project.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#915EFF] group-hover:to-[#00D4FF] transition-all">
          {project.title}
        </h3>

        {/* Client & Role */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <span className="font-medium">{project.client}</span>
          <span>•</span>
          <span className="text-gray-500">{project.myRole}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300"
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 4 && (
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
              +{project.skills.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-sm text-[#915EFF] hover:text-[#00D4FF] transition-colors"
            >
              {project.liveLink.includes('play.google.com') ? (
                <Play className="w-4 h-4" />
              ) : (
                <ExternalLink className="w-4 h-4" />
              )}
              <span className="font-medium">
                {project.liveLink.includes('play.google.com') ? 'Download' : 'Live Demo'}
              </span>
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="font-medium">GitHub</span>
            </a>
          )}
          <div className="ml-auto">
            <span className="text-xs text-gray-500 group-hover:text-[#915EFF] transition-colors">
              View Case Study →
            </span>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#915EFF]/50 rounded-2xl pointer-events-none transition-all duration-300" />
    </motion.div>
  );
};
