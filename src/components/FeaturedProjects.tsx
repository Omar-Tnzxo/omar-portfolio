import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { getFeaturedProjects } from "../constants/portfolio";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

export const FeaturedProjects = () => {
  const navigate = useNavigate();
  const featuredProjects = getFeaturedProjects();

  return (
    <SectionWrapper idName="featured-projects">
      <>
        {/* Title */}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My Work</p>
          <h2 className={styles.sectionHeadText}>Featured Projects.</h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={textVariant()}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Explore a curated selection of my best work across mobile development,
          digital marketing, and web applications. Each project represents a unique
          challenge solved with creative thinking and technical expertise.
        </motion.p>

        {/* Projects Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <button
            onClick={() => navigate("/portfolio")}
            className="group relative px-8 py-4 bg-gradient-to-r from-[#915EFF] to-[#00D4FF] rounded-full font-semibold text-white text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#915EFF]/50 hover:scale-105"
          >
            {/* Button Content */}
            <span className="relative z-10 flex items-center gap-3">
              Browse All Portfolio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>

            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#915EFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>
      </>
    </SectionWrapper>
  );
};
