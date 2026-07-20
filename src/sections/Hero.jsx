import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ROLES = [
  "Software Development Engineer",
  "Full Stack Engineer",
  "Data Analyst",
];

const Hero = () => {
  const [roleIdx, setRoleIdx] = useState(0);

  const heroLine = {
    hidden: { opacity: 0, y: 22, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const ctaGroup = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const ctaItem = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % ROLES.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen px-6 pt-32 pb-20 sm:px-10 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <div className="mx-auto max-w-7xl flex flex-col items-center z-10 w-full relative">
        {/* Large Overlapping Text */}
        <div className="relative w-full flex flex-col items-center justify-center mb-16">
          <motion.h1
            variants={heroLine}
            initial="hidden"
            animate="visible"
            className="text-7xl sm:text-8xl md:text-[150px] font-black leading-none tracking-tight text-white z-20 relative mix-blend-difference"
            style={{ letterSpacing: "-0.04em" }}
          >
            HARPREET
          </motion.h1>

          <motion.h1
            variants={heroLine}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.12 }}
            className="text-7xl sm:text-8xl md:text-[180px] font-black leading-none tracking-tight text-outline absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] w-full whitespace-nowrap z-10"
            style={{ letterSpacing: "0.02em" }}
          >
            JAKHAR
          </motion.h1>
        </div>

        {/* Inline Role Switcher */}
        <motion.div
          variants={heroLine}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.25 }}
          className="mt-12 flex items-center justify-center overflow-hidden px-2"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.18em] sm:tracking-[0.22em] text-center leading-none">
            {ROLES.map((role, index) => {
              const isActive = index === roleIdx;

              return (
                <motion.span
                  key={role}
                  animate={{
                    opacity: isActive ? 1 : 0.56,
                    scale: isActive ? 1.03 : 1,
                    letterSpacing: isActive ? "0.24em" : "0.18em",
                    color: isActive ? "#f6d46b" : "rgba(255,255,255,0.72)",
                    textShadow: isActive
                      ? "0 0 18px rgba(246,212,107,0.42), 0 0 5px rgba(246,212,107,0.24)"
                      : "0 0 0 rgba(0,0,0,0)",
                  }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center whitespace-nowrap"
                >
                  {role.toUpperCase()}
                  {index < ROLES.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mx-2 sm:mx-3 text-[rgba(255,255,255,0.35)]"
                      style={{ letterSpacing: 0 }}
                    >
                      •
                    </span>
                  )}
                </motion.span>
              );
            })}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={ctaGroup}
          initial="hidden"
          animate="visible"
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          <motion.a
            variants={ctaItem}
            href="#projects"
            className="px-8 py-3 border border-white/20 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Explore Projects
          </motion.a>
        </motion.div>

        {/* Bottom Left Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-0 flex flex-col items-start gap-2"
        >
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest font-bold">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            AVAILABLE FOR WORK
          </div>
          <span className="text-[10px] text-gray-500 font-mono tracking-widest ml-5">
            ROHTAK, INDIA
          </span>
        </motion.div>

        {/* Bottom Right Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 right-0 hidden sm:flex items-center gap-4 text-[10px] font-mono tracking-[0.25em] text-gray-500"
        >
          SCROLL TO EXPLORE
          <div className="w-12 h-px bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
