import { motion } from "framer-motion";
import { ArrowLeft, Calendar, ExternalLink, Github, Play, User, Briefcase, CheckCircle2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectBySlug, PORTFOLIO_CATEGORIES } from "../constants/portfolio";

export const ProjectCaseStudy = () => {
  const navigate = useNavigate();
  const { categorySlug, projectSlug } = useParams<{ categorySlug: string; projectSlug: string }>();

  // Get project data
  const project = getProjectBySlug(categorySlug || "", projectSlug || "");
  const category = PORTFOLIO_CATEGORIES.find((cat) => cat.slug === categorySlug);

  // Handle 404
  if (!project || !category) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
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
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        {/* Background Image/Video */}
        {project.video ? (
          <video
            src={project.video}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-project.svg";
            }}
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-primary" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-6 pb-20">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate(`/portfolio/${categorySlug}`)}
            className="absolute top-8 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors group bg-black/30 backdrop-blur-md px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to {category.name}</span>
          </motion.button>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md mb-6 w-fit"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm text-white">{category.name}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black text-white mb-4 max-w-4xl"
          >
            {project.title}
          </motion.h1>

          {/* Short Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-300 max-w-3xl"
          >
            {project.shortDescription}
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Project Summary Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl p-8 mb-16 border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Client */}
            <div>
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Briefcase className="w-5 h-5" />
                <span className="text-sm font-medium">Client</span>
              </div>
              <p className="text-white font-semibold">{project.client}</p>
            </div>

            {/* My Role */}
            <div>
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">My Role</span>
              </div>
              <p className="text-white font-semibold">{project.myRole}</p>
            </div>

            {/* Project Date */}
            <div>
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium">Date</span>
              </div>
              <p className="text-white font-semibold">{project.projectDate}</p>
            </div>

            {/* Links */}
            <div>
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <ExternalLink className="w-5 h-5" />
                <span className="text-sm font-medium">Links</span>
              </div>
              <div className="flex items-center gap-3">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#915EFF] hover:text-[#00D4FF] transition-colors"
                  >
                    {project.liveLink.includes('play.google.com') ? (
                      <Play className="w-5 h-5" />
                    ) : (
                      <ExternalLink className="w-5 h-5" />
                    )}
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-16">
            {/* Full Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.fullDescription}
              </p>
            </motion.section>

            {/* Challenge */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl p-8 border border-red-500/20"
            >
              <h2 className="text-3xl font-bold text-white mb-6">The Challenge</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.challenge}
              </p>
            </motion.section>

            {/* Solution */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-8 border border-green-500/20"
            >
              <h2 className="text-3xl font-bold text-white mb-6">The Solution</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.solution}
              </p>
            </motion.section>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer"
                    >
                      <img
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder-project.svg";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Case-Specific Content */}
            {project.caseSpecificContent && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl p-8 border border-white/10"
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  {project.caseSpecificContent.type === 'script' && 'Script Sample'}
                  {project.caseSpecificContent.type === 'social-media' && 'Social Media Examples'}
                  {project.caseSpecificContent.type === 'design' && 'Design Samples'}
                  {project.caseSpecificContent.type === 'code' && 'Code Samples'}
                </h2>
                <div className="space-y-4">
                  {Array.isArray(project.caseSpecificContent.content) ? (
                    project.caseSpecificContent.content.map((item, index) => (
                      <div key={index} className="text-gray-300 bg-black/30 p-4 rounded-lg">
                        {item}
                      </div>
                    ))
                  ) : (
                    <pre className="text-gray-300 bg-black/30 p-6 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono text-sm">
                      {project.caseSpecificContent.content}
                    </pre>
                  )}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Tech Stack */}
            {project.techStack && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl p-6 border border-white/10 sticky top-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Tech Stack</h3>
                
                {project.techStack.frontend && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Frontend</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.frontend.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-[#915EFF]/20 border border-[#915EFF]/30 rounded-full text-sm text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.techStack.backend && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Backend</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.backend.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-[#00D4FF]/20 border border-[#00D4FF]/30 rounded-full text-sm text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.techStack.tools && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Skills Applied</h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Results</h3>
                <div className="space-y-3">
                  {project.results.map((result, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-300 text-sm">{result}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => navigate(`/portfolio/${categorySlug}`)}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all"
            >
              Back to {category.name}
            </button>
            <button
              onClick={() => navigate("/portfolio")}
              className="px-8 py-4 bg-gradient-to-r from-[#915EFF] to-[#00D4FF] text-white rounded-full font-semibold transition-all hover:shadow-xl hover:shadow-[#915EFF]/50"
            >
              Browse All Portfolio
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
