import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FaDownload,
  FaGithub,
  FaReact,
  FaNode,
  FaDocker,
  FaBrain,
} from "react-icons/fa";
import { SiSpring, SiMongodb } from "react-icons/si";
import profileImage from "../assets/WhatsApp Image 2026-07-19 at 2.42.14 PM.jpeg";

const skillChips = [
  { name: "React", icon: FaReact, color: "#61dafb" },
  { name: "Node.js", icon: FaNode, color: "#339933" },
  { name: "Spring Boot", icon: SiSpring, color: "#6db33f" },
  { name: "Docker", icon: FaDocker, color: "#2496ed" },
  { name: "AI", icon: FaBrain, color: "#a855f7" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
];

const highlights = [
  { label: "12+ Projects", desc: "Production-ready apps & platforms" },
  { label: "MERN Stack", desc: "Seamless full-stack integrations" },
  { label: "Machine Learning", desc: "Predictive modeling & frameworks" },
  { label: "Data Analytics", desc: "Turning data into strategy" },
];

/* ── Highlight card with cursor-follow radial light ── */
const HighlightCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const [light, setLight] = useState({ x: 50, y: 50, visible: false });

  const handleMove = useCallback((e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setLight({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      visible: true,
    });
  }, []);

  const handleLeave = useCallback(
    () => setLight((s) => ({ ...s, visible: false })),
    [],
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="relative overflow-hidden p-4 rounded-xl border border-white/5 bg-white/2 hover:border-amber-400/30 transition-colors duration-300 cursor-default"
    >
      {/* Cursor radial light */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-xl"
        style={{
          background: `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(212,169,55,0.08) 0%, transparent 62%)`,
          opacity: light.visible ? 1 : 0,
        }}
      />
      <div className="text-amber-400 font-bold text-sm sm:text-base mb-1 font-mono relative z-10">
        {item.label}
      </div>
      <div className="text-[11px] sm:text-xs text-gray-400 leading-normal relative z-10">
        {item.desc}
      </div>
    </motion.div>
  );
};

/* ── Profile card with 3D tilt + moving gloss ── */
const ProfileCard = () => {
  const cardRef = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { damping: 22, stiffness: 180 };
  const sx = useSpring(mx, springCfg);
  const sy = useSpring(my, springCfg);

  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const glossX = useTransform(sx, [-0.5, 0.5], [0, 100]);
  const glossY = useTransform(sy, [-0.5, 0.5], [0, 100]);

  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [mx, my],
  );

  const handleLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  }, [mx, my]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="lg:col-span-5 flex justify-center lg:justify-end"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onMouseEnter={() => setHovered(true)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="relative w-full max-w-90 group cursor-default"
      >
        {/* Backglow */}
        <div
          className="absolute -inset-4 rounded-3xl pointer-events-none transition-all duration-500"
          style={{
            background: hovered
              ? "radial-gradient(circle, rgba(250,204,21,0.22), rgba(250,204,21,0.06) 50%, transparent 75%)"
              : "radial-gradient(circle, rgba(250,204,21,0.14), rgba(250,204,21,0.03) 50%, transparent 75%)",
            filter: "blur(20px)",
          }}
        />

        {/* Card */}
        <div
          className="relative overflow-hidden rounded-2xl p-4 backdrop-blur-2xl shadow-2xl transition-all duration-500"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            border: hovered
              ? "1px solid rgba(212,169,55,0.4)"
              : "1px solid rgba(255,255,255,0.08)",
            boxShadow: hovered
              ? "0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212,169,55,0.2)"
              : "0 16px 40px rgba(0,0,0,0.7)",
          }}
        >
          {/* Moving gloss reflection */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            style={{
              background: useTransform(
                [glossX, glossY],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.07) 0%, transparent 55%)`,
              ),
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Photo */}
          <div className="relative overflow-hidden rounded-xl border border-white/5 bg-black/30">
            <img
              src={profileImage}
              alt="Harpreet Jakhar profile"
              className="h-90 sm:h-100 w-full object-cover transition-transform duration-500"
              style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[9px] font-mono uppercase tracking-widest text-amber-300">
              HJ.Dev
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-5 text-left px-1">
            <h3 className="text-xl font-bold text-white tracking-wide">
              Harpreet Jakhar
            </h3>
            <p className="text-[10px] font-mono text-amber-400 mt-1.5 uppercase tracking-widest leading-relaxed">
              Full Stack Developer / AI & Data Analyst
            </p>
            <div className="h-px w-full bg-white/5 my-4" />
            <div className="flex justify-between gap-4 text-[10px] font-mono text-gray-400">
              <div>
                <span className="text-white block font-bold text-sm mb-0.5">
                  1+ Years
                </span>
                Experience
              </div>
              <div className="text-center">
                <span className="text-white block font-bold text-sm mb-0.5">
                  12+ Projects
                </span>
                Completed
              </div>
              <div className="text-right">
                <span className="text-white block font-bold text-sm mb-0.5">
                  Active
                </span>
                Status
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Main About component ── */
const About = () => {
  const revealGroup = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const revealItem = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="about"
      className="relative px-6 py-24 sm:px-10 overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(212,169,55,0.03),transparent_35%)]" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column */}
          <motion.div
            variants={revealGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Label */}
            <motion.div
              variants={revealItem}
              className="flex items-center gap-3 mb-2"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-amber-400 font-semibold">
                Who I Am
              </span>
              <div className="h-px w-8 bg-amber-400/30" />
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={revealItem}
              className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase mb-4"
            >
              About Me
            </motion.h2>

            {/* Tagline */}
            <motion.p
              variants={revealItem}
              className="text-lg sm:text-xl font-medium text-amber-300/90 mb-6 tracking-wide leading-relaxed"
            >
              Bridging high-performance backend systems with intuitive user
              experiences.
            </motion.p>

            {/* Paragraphs */}
            <motion.div
              variants={revealItem}
              className="space-y-4 text-gray-400 text-[14.5px] leading-relaxed mb-8"
            >
              <p>
                I am a full-stack engineer and computer science enthusiast
                dedicated to building high-performance web applications and
                intelligent data solutions. My work bridges the gap between
                elegant client interfaces and scalable database systems.
              </p>
              <p>
                With a strong foundation in software engineering, I specialize
                in crafting robust backend architectures, orchestrating
                containerized environments, and extracting insights using
                machine learning and data analytics.
              </p>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div
              variants={revealItem}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {highlights.map((item, index) => (
                <HighlightCard key={item.label} item={item} index={index} />
              ))}
            </motion.div>

            {/* Skill Chips */}
            <motion.div variants={revealItem} className="mb-10">
              <h4 className="text-[9px] font-mono uppercase tracking-[0.25em] text-gray-500 mb-3">
                Core Technologies
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {skillChips.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/2 text-[11px] text-gray-300 hover:border-amber-400/30 hover:bg-white/4 transition-colors duration-300 cursor-default"
                      style={{
                        "--chip-color": skill.color,
                      }}
                    >
                      <Icon
                        style={{
                          color: skill.color,
                          filter: `drop-shadow(0 0 5px ${skill.color}88)`,
                        }}
                        size={12}
                      />
                      <span className="font-mono">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={revealItem} className="flex flex-wrap gap-4">
              <a
                href="/resume.html"
                download="Harpreet_Jakhar_Resume.html"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full overflow-hidden border border-amber-400/60 bg-amber-400/5 text-amber-300 hover:text-white font-medium text-xs transition-all duration-300"
                style={{ boxShadow: "0 0 15px rgba(251, 191, 36, 0.05)" }}
              >
                <div className="absolute inset-0 bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <FaDownload className="text-xs group-hover:scale-110 transition-transform duration-300" />
                <span className="font-mono tracking-wider">Download CV</span>
              </a>

              <a
                href="https://github.com/harpreet012"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full overflow-hidden border border-white/10 bg-white/2 text-gray-300 hover:text-white hover:border-white/20 font-medium text-xs transition-all duration-300"
              >
                <FaGithub className="text-sm group-hover:scale-110 transition-transform duration-300" />
                <span className="font-mono tracking-wider">GitHub Profile</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column — 3D Profile Card */}
          <ProfileCard />
        </div>
      </div>
    </section>
  );
};

export default About;
