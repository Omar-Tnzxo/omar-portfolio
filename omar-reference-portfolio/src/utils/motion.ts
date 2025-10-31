// Text Variant motion
export const textVariant = (delay?: number) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        duration: 1.25,
        delay: delay,
      },
    },
  };
};

// FadeIn motion
export const fadeIn = (
  direction: "left" | "right" | "up" | "down" | "",
  type: "tween" | "spring" | "inertia",
  delay: number,
  duration: number,
) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut" as const,
      },
    },
  };
};

// zoom in motion
export const zoomIn = (delay: number, duration: number) => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween" as const,
        delay: delay,
        duration: duration,
        ease: "easeOut" as const,
      },
    },
  };
};

// slide in motion - optimized for smooth performance
export const slideIn = (
  direction: "left" | "right" | "up" | "down" | "",
  type: "tween" | "spring" | "inertia",
  delay: number,
  duration: number,
) => {
  return {
    hidden: {
      x: direction === "left" ? "-30%" : direction === "right" ? "30%" : 0,
      y: direction === "up" ? "30%" : direction === "down" ? "30%" : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        delay: delay,
        duration: duration * 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
};

// staggered container motion
export const staggerContainer = (
  staggerChildren?: number,
  delayChildren?: number,
) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};
