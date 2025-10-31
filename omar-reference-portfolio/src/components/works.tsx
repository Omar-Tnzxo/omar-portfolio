import { motion } from "framer-motion";
import { FaLocationArrow } from "react-icons/fa6";

import { PROJECTS } from "../constants";
import { preview } from "../assets";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { PinContainer } from "./ui/Pin";

type ProjectCardProps = (typeof PROJECTS)[number] & {
  index: number;
};

// Project Card - كارد كبير جداً على الموبايل
const ProjectCard = ({
  index,
  id,
  title,
  des,
  img,
  iconLists,
  link,
  actualLink,
}: ProjectCardProps) => (
  <div
    className="h-[60rem] sm:h-[55rem] lg:h-[60rem] flex items-center justify-center w-[95vw] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)] min-w-[340px] max-w-[600px] sm:max-w-none"
    key={index}
  >
    <PinContainer
      title={link}
      href="#"
    >
      <div className="relative flex items-center justify-center w-full overflow-hidden h-[42vh] sm:h-[40vh] lg:h-[45vh] mb-8 sm:mb-10 lg:mb-12">
        <div
          className="relative w-full h-full overflow-hidden lg:rounded-3xl"
          style={{ backgroundColor: "#13162D" }}
        >
          <img src="/bg.webp" alt="bgimg" loading="lazy" />
        </div>
            <img
          src={img}
          alt="cover"
          loading="lazy"
          className="z-10 absolute bottom-0"
            />
          </div>

      <h1 className="font-bold text-4xl sm:text-3xl lg:text-4xl line-clamp-1">
        {title}
      </h1>

      <p
        className="font-light text-2xl sm:text-xl lg:text-3xl line-clamp-2"
        style={{
          color: "#BEC1DD",
          margin: "2vh 0",
        }}
      >
        {des}
      </p>

      <div className="flex items-center justify-between mt-7 sm:mt-6 lg:mt-8 mb-3">
        <div className="flex items-center">
          {iconLists.map((icon, index) => (
            <div
              key={index}
              className="border border-white/[.2] rounded-full bg-black w-16 h-16 sm:w-14 sm:h-14 lg:w-18 lg:h-18 flex justify-center items-center"
              style={{
                transform: `translateX(-${6 * index + 2}px)`,
              }}
          >
              <img src={icon} alt={`Technology icon ${index + 1}`} className="p-3 sm:p-2.5 lg:p-3.5" />
          </div>
          ))}
      </div>

        <a
          href={actualLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <p className="flex text-2xl sm:text-xl lg:text-3xl text-purple font-semibold">
            {link}
          </p>
          <FaLocationArrow className="ms-4 sm:ms-3 lg:ms-4 text-xl sm:text-lg lg:text-2xl" color="#CBACF9" />
        </a>
      </div>
    </PinContainer>
  </div>
);

// Works - كروت كبيرة ومسافات مضبوطة
export const Works = () => {
  return (
    <div id="work" className="py-10 sm:py-12 lg:py-20">
      <h1 className="heading px-4">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-stretch justify-center px-3 sm:px-4 lg:px-6 gap-4 sm:gap-5 lg:gap-5 xl:gap-6 mt-8 sm:mt-10 lg:mt-12">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
    </div>
  );
};
