import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary via-tertiary to-black-100 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-[180px] md:text-[250px] font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-none mb-8"
        >
          404
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Oops! Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg md:text-xl text-secondary mb-8 px-4"
        >
          The page you're looking for seems to have wandered off into the digital void.
          Let's get you back on track!
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg
                     hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200
                     shadow-lg shadow-purple-500/50 min-w-[180px]"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate("/#contact")}
            className="px-8 py-4 border-2 border-purple-500 text-purple-400 font-bold rounded-lg
                     hover:bg-purple-500/10 transform hover:scale-105 transition-all duration-200
                     min-w-[180px]"
          >
            Contact Me
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mt-16 text-6xl"
        >
          🚀
        </motion.div>
      </div>
    </div>
  );
};
