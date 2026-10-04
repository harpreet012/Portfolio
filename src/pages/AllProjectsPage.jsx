import { useRef, useState, useCallback, useEffect } from "react";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/layout/Navbar";
import { projects } from "../data/portfolioData";

/* ─────────────────────────────────────────────────────────────────────────
   Compact Project Card — reused for all 10 projects on the /projects page
───────────────────────────────────────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 200 };
  const smoothGlareX = useSpring(glareX, springConfig);
  const smoothGlareY = useSpring(glareY, springConfig);
  const smoothGlareOpacity = useSpring(glareOpacity, springConfig);

  const glareBg = useTransform(
    [smoothGlareX, smoothGlareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(212, 169, 55, 0.13) 0%, transparent 55%)`,
  );

  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      glareX.set(((e.clientX - rect.left) / rect.width) * 100);
      glareY.set(((e.clientY - rect.top) / rect.height) * 100);
      glareOpacity.set(1);
    },
    [glareX, glareY, glareOpacity],
  );

  const handleMouseLeave = useCallback(() => {
    glareOpacity.set(0);
    setHovered(false);
  }, [glareOpacity]);

  const hasGithub = Boolean(
    project.links?.github &&
      project.links.github.trim() !== "" &&
      project.links.github !== "#",
  );
  const hasDemo = Boolean(
    project.links?.demo &&
      project.links.demo.trim() !== "" &&
      project.links.demo !== "#",
  );

  const isFeatured = Boolean(project.featured);

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
      whileHover={{ y: -4, transition: { duration: 0.22, ease: "easeOut" } }}
      className={`flex flex-col group relative rounded-2xl overflow-hidden bg-[#0a0a0a]/60 border transition-colors duration-300 backdrop-blur-md h-full ${
        isFeatured
          ? "border-amber-400/35 hover:border-amber-400/65 shadow-[0_4px_24px_rgba(251,191,36,0.05)]"
          : "border-white/8 hover:border-amber-400/30"
      }`}
    >
      {/* Glare */}
      <motion.div
        style={{ background: glareBg, opacity: smoothGlareOpacity }}
        className="absolute inset-0 pointer-events-none z-30 rounded-2xl"
      />

      {/* Project Image */}
      <div className="w-full relative overflow-hidden border-b border-white/5 bg-black/40 h-44 sm:h-48 shrink-0">
        <motion.img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          initial={{ scale: 1.05, opacity: 0.9 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          animate={{ scale: hovered ? 1.03 : 1 }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          className="absolute inset-0 z-10 transition-all duration-300"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)"
              : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.25) 60%)",
          }}
        />

        {isFeatured && (
          <div className="absolute top-3 left-3 z-20 px-2.5 py-0.5 rounded-lg border border-amber-400/50 bg-black/80 backdrop-blur-md text-xs font-mono uppercase tracking-wider text-amber-300">
            Featured
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col justify-between grow p-5 gap-3">
        <div>
          <span className="text-xs font-mono tracking-wide text-amber-400/80 font-medium block mb-1">
            {project.category}
          </span>

          <h3 className="text-base sm:text-lg font-bold text-gray-100 group-hover:text-amber-300 transition-colors duration-300 leading-snug">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm leading-relaxed text-gray-400 font-light mt-1.5 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tech.map((item) => (
              <span
                key={item}
                className="px-2.5 py-0.5 bg-white/4 rounded-full border border-white/5 text-xs font-mono text-gray-300 transition-colors group-hover:border-amber-400/20 group-hover:text-amber-200 cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {(hasGithub || hasDemo) && (
          <div className="flex items-center gap-4 pt-2.5 mt-2 border-t border-white/5">
            {hasGithub && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`}
                className="flex items-center gap-1.5 text-gray-400 hover:text-amber-400 transition-colors duration-200 text-xs font-mono"
              >
                <FaGithub size={13} className="text-amber-400" />
                <span>Source</span>
              </a>
            )}
            {hasDemo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo (opens in a new tab)`}
                className="flex items-center gap-1.5 text-gray-400 hover:text-amber-400 transition-colors duration-200 text-xs font-mono"
              >
                <FaExternalLinkAlt size={11} className="text-amber-400" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   All Projects Page
───────────────────────────────────────────────────────────────────────── */
const AllProjectsPage = ({ theme, onToggleTheme }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Navbar */}
      <Navbar theme={theme} onToggleTheme={onToggleTheme} isProjectsPage />

      {/* Page content */}
      <main className="relative z-10 pt-32 pb-24 px-6 sm:px-10">
        <div className="mx-auto max-w-6xl">

          {/* ── Page Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <p className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Engineering Projects
              </p>
              <div className="h-px w-12 bg-amber-400/30" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-100">
              All Projects
            </h1>

            <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl">
              Selected engineering work across full-stack development, AI/ML, analytics, and application security.
            </p>

            <div className="mt-6 h-px w-full bg-white/5" />
          </motion.div>

          {/* ── Project Count ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              {projects.length} Projects
            </span>
            <div className="h-px grow bg-white/10" />
          </motion.div>

          {/* ── 2-Column Project Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          {/* ── Back to Portfolio CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mt-20 pt-12 border-t border-white/5"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href="/#projects"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400 hover:text-black text-amber-300 font-mono text-xs sm:text-sm tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.08)]"
                aria-label="Back to portfolio projects section"
              >
                <FaArrowLeft size={12} />
                Back to Portfolio
              </a>
            </motion.div>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default AllProjectsPage;
