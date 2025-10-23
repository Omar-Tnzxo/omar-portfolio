import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Approach = () => {
  return (
    <section className="w-full py-20">
              <div className="text-center mb-16">
          <h1 className="font-bold text-4xl md:text-5xl text-white mb-4">
            My <span className="text-purple font-bold">approach</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            A proven, three-phase process designed to turn business goals into measurable marketing success.
          </p>
        </div>
      {/* Approach Cards - محسّن للموبايل */}
      <div className="my-10 sm:my-12 lg:my-20 flex flex-col lg:flex-row items-stretch justify-center w-full gap-4 sm:gap-5 lg:gap-4 px-4 sm:px-6">
        <Card
          title="Discovery & Strategy"
          icon={<AceternityIcon order="Phase 1" />}
          des="This is the foundation. Before a single post is created, I dive deep to understand the 'why' behind your brand. We'll collaborate to define your business objectives, profile your ideal target audience, and analyze the competitive landscape. The outcome of this phase is a rock-solid strategic plan, complete with key performance indicators (KPIs) and the core content pillars that will guide our entire campaign."
          gradient="bg-gradient-to-br from-emerald-900 to-emerald-700"
        />
        <Card
          title="Creative Execution & Management"
          icon={<AceternityIcon order="Phase 2" />}
          des="This is where strategy comes to life. I translate our plan into compelling, high-value content tailored for each social media platform. This includes everything from writing engaging copy and directing creative teams, to managing the content calendar and ensuring every post aligns perfectly with your brand voice. I handle the entire content lifecycle to ensure a consistent and professional online presence."
          gradient="bg-gradient-to-br from-pink-900 to-pink-700"
        />
        <Card
          title="Analysis & Optimization"
          icon={<AceternityIcon order="Phase 3" />}
          des="Marketing is a continuous loop of learning and improvement. I meticulously track performance against our set KPIs, analyzing the data to understand what truly resonates with your audience. Based on these insights, I provide clear, actionable reports and constantly refine our approach. This data-driven feedback loop allows us to optimize for better results and ensure we are always moving the needle."
          gradient="bg-gradient-to-br from-sky-600 to-sky-800"
        />
      </div>
    </section>
  );
};

export default Approach;

const Card = ({
  title,
  icon,
  des,
  gradient,
}: {
  title: string;
  icon: React.ReactNode;
  des: string;
  gradient: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center
       dark:border-white/[0.2] w-full max-w-lg mx-auto p-4 sm:p-5 lg:p-4 relative min-h-[350px] sm:min-h-[400px] lg:h-[35rem] rounded-2xl sm:rounded-3xl"
      style={{
        background: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <Icon className="absolute h-10 w-10 -top-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -top-3 -right-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -right-3 dark:text-white text-black opacity-30" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`h-full w-full absolute inset-0 rounded-3xl ${gradient}`}
          />
        )}
      </AnimatePresence>

      <div className="relative z-20 px-4 sm:px-6 lg:px-8">
        <div
          className="text-center group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
        group-hover/canvas-card:opacity-0 transition duration-200 min-w-40 mx-auto flex items-center justify-center"
        >
          {icon}
        </div>
        <h2
          className="dark:text-white text-center text-xl sm:text-2xl lg:text-3xl opacity-0 group-hover/canvas-card:opacity-100
         relative z-10 text-black mt-3 sm:mt-4 font-bold group-hover/canvas-card:text-white
         group-hover/canvas-card:-translate-y-2 transition duration-200"
        >
          {title}
        </h2>
        <p
          className="text-[11px] sm:text-xs lg:text-sm opacity-0 group-hover/canvas-card:opacity-100
         relative z-10 mt-3 sm:mt-4 group-hover/canvas-card:text-white text-center
         group-hover/canvas-card:-translate-y-2 transition duration-200 leading-relaxed"
          style={{ color: "#E4ECFF" }}
        >
          {des}
        </p>
      </div>
    </div>
  );
};

const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div>
      <button className="relative inline-flex overflow-hidden rounded-full p-[1px]">
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
         bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        />
        <span
          className="inline-flex h-full w-full cursor-pointer items-center
        justify-center rounded-full bg-slate-950 px-4 sm:px-5 py-1.5 sm:py-2 text-purple backdrop-blur-3xl font-bold text-lg sm:text-xl lg:text-2xl"
        >
          {order}
        </span>
      </button>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
}; 