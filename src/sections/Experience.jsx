import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "../components/common/SectionHeading";
import { experience } from "../data/portfolioData";

/* ── Experience card with cursor-follow radial light ── */
const ExperienceCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const [light, setLight] = useState({ x: 50, y: 50, visible: false });
  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback((e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setLight({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      visible: true,
    });
  }, []);

  const handleLeave = useCallback(() => {
    setLight((s) => ({ ...s, visible: false }));
    setHovered(false);
  }, []);

  return (
    <motion.div
      key={item.role}
      initial={{ opacity: 0, x: -35 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.22 + index * 0.12,
      }}
      className="relative mb-12 pl-4"
    >
      {/* Glowing timeline dot with pulse ring */}
      <div className="absolute -left-7.5 top-6 sm:-left-11.5">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-40" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)] border-[3px] border-[#030014]" />
        </span>
      </div>

      {/* Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onMouseEnter={() => setHovered(true)}
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative overflow-hidden p-6 rounded-2xl bg-white/3 backdrop-blur-md cursor-default transition-all duration-300"
        style={{
          border: hovered
            ? "1px solid rgba(212,169,55,0.3)"
            : "1px solid rgba(255,255,255,0.04)",
          boxShadow: hovered
            ? "0 12px 32px rgba(0,0,0,0.5), 0 0 20px rgba(212,169,55,0.06)"
            : "none",
        }}
      >
        {/* Cursor radial light */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(212,169,55,0.07) 0%, transparent 60%)`,
            opacity: light.visible ? 1 : 0,
          }}
        />

        {/* Header */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <h3 className="text-xl font-bold text-gray-100">{item.role}</h3>
            <p className="text-md text-amber-400 mt-1">{item.company}</p>
          </div>
          <span className="inline-block px-3 py-1 bg-amber-400/10 border border-amber-400/20 text-xs font-mono text-amber-300 rounded-full shrink-0 h-fit">
            {item.period}
          </span>
        </div>

        <p className="relative z-10 text-sm leading-relaxed text-gray-400 mt-2">
          {item.details}
        </p>
      </motion.div>
    </motion.div>
  );
};

/* ── Animated timeline line ── */
const TimelineLine = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 bottom-0 w-px overflow-hidden"
    >
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: inView ? 1 : 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top" }}
        className="w-full h-full bg-linear-to-b from-amber-400/40 via-amber-400/20 to-transparent"
      />
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="px-6 py-24 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl"
      >
        <SectionHeading title="Experience" subtitle="Career Timeline" />

        <div className="relative pl-6 sm:pl-10 mt-12 border-l border-transparent">
          <TimelineLine />
          {experience.map((item, index) => (
            <ExperienceCard key={item.role} item={item} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
