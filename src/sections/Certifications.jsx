import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaCertificate, FaTools } from "react-icons/fa";
import SectionHeading from "../components/common/SectionHeading";
import { education, certifications, workshops } from "../data/portfolioData";

/* ── Interactive Credential Card ── */
const CredentialCard = ({ title, subtitle, date, details, score, skills, icon: Icon, index }) => {
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
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      animate={{ y: hovered ? -4 : 0 }}
      className="modern-card p-6 flex flex-col group relative overflow-hidden cursor-default h-full"
      style={{
        border: hovered ? "1px solid rgba(212,169,55,0.4)" : "1px solid rgba(255,255,255,0.06)",
        boxShadow: hovered
          ? "0 16px 40px rgba(0,0,0,0.5), 0 0 24px rgba(212,169,55,0.1)"
          : undefined,
        transition: "border 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Cursor radial light */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[inherit]"
        style={{
          background: `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(212,169,55,0.08) 0%, transparent 60%)`,
          opacity: light.visible ? 1 : 0,
        }}
      />

      <div className="flex items-start gap-4 mb-4 relative z-10">
        <motion.div
          animate={{ rotate: hovered ? 6 : 0, scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-11 w-11 shrink-0 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400 border border-amber-400/20 group-hover:bg-amber-400/20 transition-colors duration-300"
        >
          <Icon size={18} />
        </motion.div>

        <div className="grow">
          <h3 className="text-base font-bold text-gray-100 group-hover:text-amber-300 transition-colors duration-300 leading-snug">
            {title}
          </h3>
          <p className="text-xs font-mono text-gray-400 mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {details && (
        <p className="text-xs text-gray-400 font-light leading-relaxed mb-4 relative z-10">
          {details}
        </p>
      )}

      {skills && (
        <p className="text-xs font-mono text-gray-400 relative z-10 mb-4">
          <span className="text-amber-400/90 font-medium mr-1.5 inline">Focus:</span>
          {skills}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5 relative z-10">
        {score ? (
          <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
            {score}
          </span>
        ) : (
          <span className="text-xs font-mono text-gray-500">Verified</span>
        )}

        <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
          {date}
        </span>
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
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl space-y-16"
      >
        <SectionHeading title="Education & Credentials" subtitle="Qualifications" />

        {/* Education Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Academic Background
            </span>
            <div className="h-px grow bg-white/10" />
          </div>

          <div className="grid gap-6 md:grid-cols-1">
            {education.map((edu, index) => (
              <CredentialCard
                key={edu.degree}
                title={edu.degree}
                subtitle={edu.institution}
                date={edu.period}
                details={edu.details}
                score={edu.score}
                icon={FaGraduationCap}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Certifications & Workshops Grid */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Certifications Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Professional Certifications
              </span>
              <div className="h-px grow bg-white/10" />
            </div>

            <div className="grid gap-5">
              {certifications.map((cert, index) => (
                <CredentialCard
                  key={cert.title}
                  title={cert.title}
                  subtitle={cert.issuer}
                  date={cert.date}
                  skills={cert.skills}
                  icon={FaCertificate}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Workshops Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Technical Workshops
              </span>
              <div className="h-px grow bg-white/10" />
            </div>

            <div className="grid gap-5">
              {workshops.map((ws, index) => (
                <CredentialCard
                  key={ws.title}
                  title={ws.title}
                  subtitle={ws.issuer}
                  date={ws.date}
                  skills={ws.skills}
                  icon={FaTools}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;

