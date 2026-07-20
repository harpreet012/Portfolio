import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import SectionHeading from "../components/common/SectionHeading";
import { projects } from "../data/portfolioData";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  // 3D tilt motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 180 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  const smoothGlareX = useSpring(glareX, springConfig);
  const smoothGlareY = useSpring(glareY, springConfig);
  const smoothGlareOpacity = useSpring(glareOpacity, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const imgX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const imgY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  const glareBg = useTransform(
    [smoothGlareX, smoothGlareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(212, 169, 55, 0.14) 0%, transparent 55%)`,
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

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
      whileHover={{ y: -7, transition: { duration: 0.22, ease: "easeOut" } }}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        perspective: 1000,
      }}
      className="flex flex-col h-full group cursor-pointer relative rounded-2xl p-4 bg-[#0a0a0a]/40 border border-white/5 hover:border-amber-400/25 transition-colors duration-500 backdrop-blur-sm"
    >
      {/* Glare */}
      <motion.div
        style={{ background: glareBg, opacity: smoothGlareOpacity }}
        className="absolute inset-0 pointer-events-none z-30 rounded-2xl"
      />

      {/* Image */}
      <div
        className="w-full relative overflow-hidden rounded-xl border border-white/5 bg-black/40 aspect-video mb-4"
        style={{ transform: "translateZ(15px)" }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          initial={{ scale: 1.06, opacity: 0.94 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.05,
          }}
          style={{ x: imgX, y: imgY, scale: hovered ? 1.02 : 1 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark gradient overlay — lightens on hover */}
        <div
          className="absolute inset-0 z-10 transition-all duration-500"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)"
              : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 60%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="flex flex-col space-y-3.5 grow"
        style={{ transform: "translateZ(25px)" }}
      >
        <div className="flex flex-col space-y-1.5">
          <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-amber-400/80">
            Featured Project
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-gray-100 group-hover:text-amber-300 transition-colors duration-300">
            {project.title}
          </h3>
        </div>

        <div className="p-3.5 bg-white/2 border border-white/5 rounded-xl">
          <p className="text-[13px] leading-relaxed text-gray-400 font-light font-sans">
            {project.description}
          </p>
        </div>

        {/* Tech badges — animate on hover */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {project.tech.map((item, i) => (
            <motion.span
              key={item}
              initial={false}
              animate={hovered ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
              transition={{ delay: i * 0.03, duration: 0.2 }}
              whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
              className="px-2.5 py-0.5 bg-white/4 backdrop-blur-sm rounded-full border border-white/5 text-[9px] font-mono text-gray-300 transition-colors group-hover:border-amber-400/25 group-hover:text-amber-200 cursor-default"
            >
              {item}
            </motion.span>
          ))}
        </div>

        {/* Link buttons — slide up smoothly */}
        <div
          className="flex items-center gap-4 pt-2 mt-auto"
          style={{
            transform: hovered ? "translateY(0)" : "translateY(4px)",
            opacity: hovered ? 1 : 0.62,
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="group/link flex items-center gap-1.5 text-gray-400 hover:text-amber-400 transition-all duration-300 hover:translate-x-0.5"
          >
            <FaGithub
              size={15}
              className="group-hover/link:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
            />
            <span className="text-[11px] font-medium group-hover/link:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
              Source
            </span>
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="group/link flex items-center gap-1.5 text-gray-400 hover:text-amber-400 transition-all duration-300 hover:translate-x-0.5"
          >
            <FaExternalLinkAlt
              size={12}
              className="group-hover/link:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
            />
            <span className="text-[11px] font-medium group-hover/link:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
              Visit
            </span>
          </a>
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative px-6 py-20 sm:px-10 overflow-hidden"
    >
      {/* Giant Background Number */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-outline opacity-10 pointer-events-none select-none z-0 leading-none">
        02
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-5xl relative z-10"
      >
        <SectionHeading title="Selected Works" subtitle="Archives" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
