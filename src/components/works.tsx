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

// Project Card
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
    className="lg:min-h-[32.5rem] h-[28rem] md:h-[26rem] flex items-center justify-center sm:w-96 w-[95vw] max-w-[320px] md:max-w-sm"
    key={index}
  >
    <PinContainer
      title={link}
      href="#"
    >
      <div className="relative flex items-center justify-center sm:w-96 w-[95vw] max-w-[320px] md:max-w-sm overflow-hidden h-[25vh] md:h-[22vh] lg:h-[30vh] mb-8 md:mb-10">
        <div
          className="relative w-full h-full overflow-hidden lg:rounded-3xl"
          style={{ backgroundColor: "#13162D" }}
        >
          <img src="/bg.png" alt="bgimg" />
        </div>
            <img
          src={img}
          alt="cover"
          className="z-10 absolute bottom-0"
            />
          </div>

      <h1 className="font-bold lg:text-2xl md:text-xl text-xl line-clamp-1">
        {title}
      </h1>

      <p
        className="lg:text-xl lg:font-normal font-light text-base md:text-lg line-clamp-2"
        style={{
          color: "#BEC1DD",
          margin: "1vh 0",
        }}
      >
        {des}
      </p>

      <div className="flex items-center justify-between mt-6 md:mt-7 mb-3">
        <div className="flex items-center">
          {iconLists.map((icon, index) => (
            <div
              key={index}
              className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-9 h-9 md:w-10 md:h-10 flex justify-center items-center"
              style={{
                transform: `translateX(-${5 * index + 2}px)`,
              }}
          >
              <img src={icon} alt={`Technology icon ${index + 1}`} className="p-1.5 md:p-2" />
          </div>
          ))}
      </div>

        <a
          href={actualLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <p className="flex lg:text-xl md:text-sm text-sm md:text-base text-purple">
            {link}
          </p>
          <FaLocationArrow className="ms-2 md:ms-3" color="#CBACF9" />
        </a>
      </div>
    </PinContainer>
  </div>
);

// Works
export const Works = () => {
  return (
    <div id="work" className="py-20">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-6 md:gap-8 lg:gap-12 mt-10">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
    </div>
  );
};
