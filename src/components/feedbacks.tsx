import { motion } from "framer-motion";

import { TESTIMONIALS } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { cn } from "../utils/lib";
import { fadeIn, textVariant } from "../utils/motion";

type FeedbackCardProps = {
  index: number;
  testimonial: string;
  name: string;
  designation: string;
  company: string;
};

// Feedback Card
const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
}: FeedbackCardProps) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl border border-white/10 p-8 rounded-3xl xs:w-[320px] w-full shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:border-purple-500/30 group"
  >
    {/* Quote Icon - Enhanced */}
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full flex items-center justify-center group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all duration-300">
        <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
      </div>
      {/* Star Rating */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
      </div>
    </div>

    <div className="mt-2">
      {/* Testimonial - Improved Typography */}
      <p className="text-white/90 tracking-wide text-base leading-relaxed font-light">
        {testimonial}
      </p>

      {/* Divider */}
      <div className="mt-6 mb-4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="flex items-center gap-3">
        {/* Avatar Placeholder */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {name.charAt(0)}
        </div>

        <div className="flex-1">
          {/* Name */}
          <p className="text-white font-semibold text-base flex items-center gap-2">
            {name}
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
          </p>
          <p className="mt-0.5 text-secondary text-sm font-medium">
            {designation} <span className="text-purple-400">@</span> {company}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

// Feedbacks
export const Feedbacks = () => {
  return (
    <SectionWrapper>
      <div className="mt-12 bg-black-100 rounded-[20px]">
        <div
          className={cn(
            styles.padding,
            "bg-tertiary rounded-2xl min-h-[300px]"
          )}
        >
          {/* Title */}
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>What others say</p>
            <h2 className={styles.sectionHeadText}>Testimonials.</h2>
          </motion.div>
        </div>

        {/* Feedback Card */}
        <div
          className={cn(styles.paddingX, "-mt-20 pb-14 flex flex-wrap gap-7")}
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <FeedbackCard key={testimonial.name} index={i} {...testimonial} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
