import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaCertificate } from "react-icons/fa";
import SectionHeading from "../components/common/SectionHeading";
import { certifications } from "../data/portfolioData";

const CertCard = ({ cert, index }) => {
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
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={() => setHovered(true)}
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      animate={{ y: hovered ? -6 : 0 }}
      className="modern-card p-6 flex flex-col items-center text-center group relative overflow-hidden cursor-default"
      style={{
        border: hovered ? "1px solid rgba(212,169,55,0.35)" : undefined,
        boxShadow: hovered
          ? "0 16px 40px rgba(0,0,0,0.5), 0 0 24px rgba(212,169,55,0.12)"
          : undefined,
        transition: "border 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Cursor radial light */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[inherit]"
        style={{
          background: `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(212,169,55,0.09) 0%, transparent 60%)`,
          opacity: light.visible ? 1 : 0,
        }}
      />

      {/* Badge icon with rotation on hover */}
      <motion.div
        animate={{ rotate: hovered ? 8 : 0, scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-10 h-12 w-12 rounded-full bg-amber-400/10 flex flex-col items-center justify-center mb-4 text-amber-400 border border-amber-400/20 group-hover:bg-amber-400/20 transition-colors duration-300"
        style={{
          boxShadow: hovered ? "0 0 20px rgba(212,169,55,0.25)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <FaCertificate size={20} />
      </motion.div>

      <h3 className="relative z-10 text-sm font-semibold text-gray-200 mb-1 leading-snug">
        {cert.title}
      </h3>
      <p className="relative z-10 text-xs text-gray-500 mb-3">
        {cert.platform}
      </p>
      <div className="mt-auto pointer-events-none inline-block border border-amber-400/30 px-3 py-1 text-[10px] uppercase font-mono tracking-widest text-amber-300 rounded-full relative z-10">
        {cert.date}
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="px-6 py-24 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl"
      >
        <SectionHeading title="Certifications" subtitle="Credentials" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, index) => (
            <CertCard key={cert.title} cert={cert} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;
