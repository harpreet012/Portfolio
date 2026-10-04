import { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import SectionHeading from "../components/common/SectionHeading";
import { projects } from "../data/portfolioData";

/* ── Featured Horizontal Project Card (Desktop 280-320px, Alternating) ── */
const FeaturedProjectCard = ({ project, index, isReversed }) => {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
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
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(212, 169, 55, 0.16) 0%, transparent 60%)`,
  );

  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(relX);
      y.set(relY);
      glareX.set(((e.clientX - rect.left) / rect.width) * 100);
      glareY.set(((e.clientY - rect.top) / rect.height) * 100);
      glareOpacity.set(1);
    },
    [x, y, glareX, glareY, glareOpacity],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
    setHovered(false);
  }, [x, y, glareOpacity]);

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

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative rounded-2xl overflow-hidden bg-[#0a0a0a]/70 border border-amber-400/30 hover:border-amber-400/60 transition-colors duration-400 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_rgba(251,191,36,0.08)]"
    >
      {/* Glare effect */}
      <motion.div
        style={{ background: glareBg, opacity: smoothGlareOpacity }}
        className="absolute inset-0 pointer-events-none z-30 rounded-2xl"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[280px] md:h-[300px]">
        {/* Project Image Column */}
        <div
          className={`relative overflow-hidden bg-black/50 h-52 md:h-full md:col-span-5 ${
            isReversed
              ? "md:order-2 border-t md:border-t-0 md:border-l border-white/8"
              : "border-b md:border-b-0 md:border-r border-white/8"
          }`}
        >
          <motion.img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            initial={{ scale: 1.05, opacity: 0.9 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            animate={{ scale: hovered ? 1.04 : 1 }}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div
            className="absolute inset-0 z-10 transition-all duration-400"
            style={{
              background: hovered
                ? "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)"
                : "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%)",
            }}
          />

          <div className="absolute top-3 left-3 z-20 px-2.5 py-0.5 rounded-lg border border-amber-400/50 bg-black/80 backdrop-blur-md text-xs font-mono uppercase tracking-wider text-amber-300">
            Featured
          </div>
        </div>

        {/* Project Content Column */}
        <div
          className={`flex flex-col justify-between p-6 sm:p-7 md:col-span-7 relative z-20 ${
            isReversed ? "md:order-1" : ""
          }`}
        >
          <div>
            <span className="text-xs font-mono tracking-wide text-amber-400/90 font-medium block mb-1.5">
              {project.category}
            </span>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-100 group-hover:text-amber-300 transition-colors duration-300 leading-snug">
              {project.title}
            </h3>

            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-300/90 font-light line-clamp-2 sm:line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-0.5 bg-white/4 rounded-full border border-white/8 text-xs font-mono text-gray-300 transition-colors group-hover:border-amber-400/25 group-hover:text-amber-200 cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {(hasGithub || hasDemo) && (
            <div className="flex items-center gap-5 pt-3.5 mt-4 border-t border-white/8">
              {hasGithub && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`}
                  className="flex items-center gap-1.5 text-gray-300 hover:text-amber-400 transition-colors duration-200 text-xs font-mono"
                >
                  <FaGithub size={14} className="text-amber-400" />
                  <span>Source Code</span>
                </a>
              )}
              {hasDemo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} live demo (opens in a new tab)`}
                  className="flex items-center gap-1.5 text-gray-300 hover:text-amber-400 transition-colors duration-200 text-xs font-mono"
                >
                  <FaExternalLinkAlt size={12} className="text-amber-400" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const featuredTitles = [
    "AI Predictive Maintenance System",
    "ShopSphere",
  ];

  const featuredProjects = featuredTitles
    .map((title) => projects.find((p) => p.title === title))
    .filter(Boolean);

  return (
    <section
      id="projects"
      className="relative px-6 py-20 sm:px-10 overflow-hidden scroll-mt-24"
    >
      {/* Giant Background Number */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-outline opacity-10 pointer-events-none select-none z-0 leading-none"
      >
        02
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl relative z-10"
      >
        <SectionHeading title="Selected Works" subtitle="Engineering Projects" />

        {/* Featured horizontal cards */}
        <div className="flex flex-col gap-8 mt-12">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.title}
              project={project}
              index={index}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>

        {/* CTA to /projects page */}
        <div className="flex justify-center mt-12">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400 hover:text-black text-amber-300 font-mono text-xs sm:text-sm tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.08)]"
              aria-label="View all 10 engineering projects"
            >
              View All Projects →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
