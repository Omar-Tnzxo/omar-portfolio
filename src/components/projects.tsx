import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { project1, project2, project3, project4, preview } from "../assets";
import { Navbar } from "./navbar";
import googlePlayIcon from "../assets/socials/google-play.svg";

const projects = [
  {
    title: "CalcRealty - Real Estate Calculator",
    description:
      "A Flutter mobile app I developed from scratch to solve complex payment plan calculations for real estate agents. Successfully acquired over 1,500 organic users within 24 hours of launch.",
    src: project1,
    link: project1,
    color: "#5196fd",
    category: "real-estate",
    categoryName: "Real Estate",
    projectType: "mobile-app",
    githubLink: "https://github.com/omar-tnzxo/CalcRealty",
    liveLink: "https://play.google.com/store/apps/details?id=com.calcrealty",
  },
  {
    title: "Real Estate Lead Engine",
    description:
      "Designed and executed a content-driven strategy for a real estate consultancy that was overly reliant on paid ads. This system established the brand as a market authority and generated consistent qualified leads daily.",
    src: project2,
    link: project2,
    color: "#8f89ff",
    category: "marketing",
    categoryName: "Marketing",
    projectType: "strategy",
    githubLink: "https://github.com/omar-tnzxo",
    liveLink: "#",
  },
  {
    title: "Fashion E-commerce Store",
    description:
      "A comprehensive project where I built a complete women's fashion brand from the ground up. This involved creating the brand identity, setting up and managing the e-commerce storefront, designing all content, and running targeted paid advertising campaigns on Meta platforms.",
    src: project3,
    link: project3,
    color: "#fff",
    category: "ecommerce",
    categoryName: "E-commerce",
    projectType: "ecommerce",
    githubLink: "https://github.com/omar-tnzxo",
    liveLink: "#",
  },
  {
    title: "Digital Marketing Portfolio",
    description:
      "A modern portfolio website showcasing digital marketing expertise, built with React and Tailwind CSS. Features advanced animations, responsive design, and professional presentation of skills and projects.",
    src: project4,
    link: project4,
    color: "#ed649e",
    category: "web-development",
    categoryName: "Web Development",
    projectType: "website",
    githubLink: "https://github.com/omar-tnzxo/omar-portfolio",
    liveLink: "https://omar-portfolio.netlify.app",
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Get unique categories
  const categories = [
    { id: "all", name: "All Projects" },
    ...Array.from(new Set(projects.map(project => project.category))).map(category => {
      const project = projects.find(p => p.category === category);
      return { id: category, name: project?.categoryName || category };
    })
  ];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    // Add specific styles for 1366x768 resolution
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (width: 1366px) and (height: 768px),
             screen and (width: 1367px) and (height: 768px),
             screen and (width: 1368px) and (height: 769px) {
        .project-card {
          scale: 0.85;
          margin-top: -5vh;
        }
        .project-container {
          height: 90vh;
        }
      }
    `;
    document.head.appendChild(style);

    // Resolution check function
    const checkResolution = () => {
      const isTargetResolution =
        window.innerWidth >= 1360 &&
        window.innerWidth <= 1370 &&
        window.innerHeight >= 760 &&
        window.innerHeight <= 775;

      if (isTargetResolution) {
        document.documentElement.style.setProperty("--project-scale", "0.85");
        document.documentElement.style.setProperty("--project-margin", "-5vh");
      } else {
        document.documentElement.style.setProperty("--project-scale", "1");
        document.documentElement.style.setProperty("--project-margin", "0");
      }
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("resize", checkResolution);
    };
  }, []);

  return (
    <>
      <Navbar />
      <ReactLenis root>
        <main className="bg-black" ref={container}>
          {/* Page Title */}
          <div className="pt-20 pb-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              My <span className="text-[#915EFF]">Projects</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto px-4">
              Explore my latest work and creative solutions
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 px-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? "bg-[#915EFF] text-white shadow-lg shadow-[#915EFF]/30"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <section className="text-white w-full bg-slate-950">
            {filteredProjects.map((project, i) => {
              const targetScale = 1 - (filteredProjects.length - i) * 0.05;
              return (
                <Card
                  key={`p_${i}`}
                  i={i}
                  url={project.link}
                  title={project.title}
                  color={project.color}
                  description={project.description}
                  progress={scrollYProgress}
                  range={[i * 0.25, 1]}
                  targetScale={targetScale}
                  githubLink={project.githubLink}
                  liveLink={project.liveLink}
                  projectType={project.projectType}
                />
              );
            })}
          </section>
        </main>
      </ReactLenis>
    </>
  );
}

function Card({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
  githubLink,
  liveLink,
  projectType,
}: {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  progress: any;
  range: number[];
  targetScale: number;
  githubLink: string;
  liveLink: string;
  projectType: string;
}) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 project-container"
    >
      <div
        style={{
          top: `calc(-5vh + ${i * 25}px)`,
          transform: `scale(var(--project-scale, 1))`,
          marginTop: "var(--project-margin, 0)",
        }}
        className="relative -top-[25%] h-auto w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] origin-top project-card"
      >
        {/* Modern split card design */}
        <div className="w-full flex flex-col md:flex-row bg-zinc-900 rounded-2xl overflow-hidden shadow-xl">
          {/* Image section - full width on mobile, 55% on desktop */}
          <div className="w-full md:w-[55%] h-[250px] md:h-[400px] lg:h-[450px] relative overflow-hidden">
            <img
              src={url}
              alt={title}
              className="w-full h-full object-cover"
            />

            {/* Colored overlay on hover */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: color, mixBlendMode: "overlay" }}
            />

            {/* Project number */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/50 backdrop-blur-md text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
              Project {i + 1}
            </div>
          </div>

          {/* Content section - full width on mobile, 45% on desktop */}
          <div className="w-full md:w-[45%] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div className="h-[1px] w-12 md:w-20 bg-gray-600" />
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4">
                {title}
              </h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed line-clamp-3 md:line-clamp-none max-w-md">
                {description}
              </p>
            </div>

            <div className="mt-4 md:mt-auto pt-4">
              <div className="w-full h-[1px] bg-gray-800 mb-4 md:mb-6" />

              <div className="flex items-center gap-4">
                {/* First Action Button - Dynamic based on project type */}
                {projectType === "mobile-app" ? (
                  // Google Play Store for mobile apps
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2"
                  >
                    <img
                      src={googlePlayIcon}
                      alt="Google Play"
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                    <span
                      className="text-xs md:text-sm font-medium"
                      style={{ color }}
                    >
                      Download
                    </span>
                  </a>
                ) : projectType === "website" ? (
                  // External link for websites
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15,3 21,3 21,9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    <span
                      className="text-xs md:text-sm font-medium"
                      style={{ color }}
                    >
                      Visit
                    </span>
                  </a>
                                 ) : (
                   // Preview icon for other projects (non-clickable)
                   <div className="group flex items-center gap-2 cursor-default">
                     <img
                       src={preview}
                       alt="Preview"
                       className="w-5 h-5 md:w-6 md:h-6"
                     />
                     <span
                       className="text-xs md:text-sm font-medium"
                       style={{ color }}
                     >
                       Preview
                     </span>
                   </div>
                 )}

                {/* Second Action Button - Dynamic based on project type */}
                {projectType === "mobile-app" ? (
                  // GitHub for mobile apps
                  <div className="group flex items-center gap-2 cursor-default">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                    <span
                      className="text-xs md:text-sm font-medium"
                      style={{ color }}
                    >
                      Preview
                    </span>
                  </div>
                ) : projectType === "website" ? (
                   // Preview for websites (non-clickable)
                   <div className="group flex items-center gap-2 cursor-default">
                     <img
                       src={preview}
                       alt="Preview"
                       className="w-5 h-5 md:w-6 md:h-6"
                     />
                     <span
                       className="text-xs md:text-sm font-medium"
                       style={{ color }}
                     >
                       Preview
                     </span>
                   </div>
                ) : projectType === "ecommerce" ? (
                  // Store icon for e-commerce
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <span
                      className="text-xs md:text-sm font-medium"
                      style={{ color }}
                    >
                      Shop
                    </span>
                  </a>
                ) : (
                  // Strategy icon for marketing projects
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span
                      className="text-xs md:text-sm font-medium"
                      style={{ color }}
                    >
                      Strategy
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 