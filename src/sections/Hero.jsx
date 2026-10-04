import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ROLES = [
  "Software Engineer",
  "Full-Stack Developer",
  "Backend Developer",
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
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen px-6 pt-32 pb-20 sm:px-10 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <div className="mx-auto max-w-7xl flex flex-col items-center z-10 w-full relative">
        {/* Large Overlapping Text */}
        <div className="relative w-full flex flex-col items-center justify-center mb-10">
          <motion.h1
            variants={heroLine}
            initial="hidden"
            animate="visible"
            className="text-7xl sm:text-8xl md:text-[150px] font-black leading-none tracking-tight text-white z-20 relative mix-blend-difference"
            style={{ letterSpacing: "-0.04em" }}
          >
            HARPREET
          </motion.h1>

          <motion.div
            aria-hidden="true"
            variants={heroLine}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.12 }}
            className="text-7xl sm:text-8xl md:text-[180px] font-black leading-none tracking-tight text-outline absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] w-full whitespace-nowrap z-10"
            style={{ letterSpacing: "0.02em" }}
          >
            JAKHAR
          </motion.div>
        </div>

        {/* Primary Role Indicator */}
        <motion.div
          variants={heroLine}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="mt-6 flex flex-col items-center max-w-2xl px-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/5 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <span className="text-xs sm:text-sm font-mono text-amber-300 tracking-wide font-medium">
              Software Engineer | Full-Stack Developer
            </span>
          </div>

          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xl">
            Final-year CSE student building scalable web applications, backend services, and reliable software solutions with modern engineering practices.
          </p>
        </motion.div>

        {/* Inline Focus Area Switcher */}
        <motion.div
          variants={heroLine}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.28 }}
          className="mt-6 flex items-center justify-center overflow-hidden px-2"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap text-xs sm:text-sm font-mono tracking-wide text-center leading-none">
            {ROLES.map((role, index) => {
              const isActive = index === roleIdx;

              return (
                <motion.span
                  key={role}
                  animate={{
                    opacity: isActive ? 1 : 0.45,
                    scale: isActive ? 1.02 : 1,
                    color: isActive ? "#f6d46b" : "rgba(255,255,255,0.6)",
                    textShadow: isActive
                      ? "0 0 16px rgba(246,212,107,0.35)"
                      : "0 0 0 rgba(0,0,0,0)",
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center whitespace-nowrap"
                >
                  {role}
                  {index < ROLES.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mx-2 sm:mx-3 text-white/25"
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
          className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6"
        >
          <motion.a
            variants={ctaItem}
            href="#projects"
            className="px-7 py-3 border border-amber-400/40 bg-amber-400/10 text-amber-300 rounded-full text-xs sm:text-sm font-mono tracking-wide hover:bg-amber-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(251,191,36,0.1)]"
          >
            Explore Projects
          </motion.a>
          <motion.a
            variants={ctaItem}
            href="#contact"
            className="px-7 py-3 border border-white/20 rounded-full text-xs sm:text-sm font-mono tracking-wide hover:bg-white hover:text-black transition-all duration-300"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Bottom Left Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-0 flex flex-col items-start gap-2"
        >
          <div className="flex items-center gap-3 text-xs font-mono tracking-wider font-semibold text-gray-300">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            Available for Work
          </div>
          <span className="text-xs text-gray-500 font-mono tracking-wide ml-5">
            Rohtak, India
          </span>
        </motion.div>

        {/* Bottom Right Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 right-0 hidden sm:flex items-center gap-4 text-xs font-mono tracking-wider text-gray-500"
        >
          Scroll to explore
          <div className="w-12 h-px bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
