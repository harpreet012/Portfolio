import { motion } from 'framer-motion'
import { FaMedal } from 'react-icons/fa'
import { useRef, useState } from 'react'
import SectionHeading from '../components/common/SectionHeading'
import { certifications } from '../data/portfolioData'

const palette = [
  { border: 'border-fuchsia-400/25', bg: 'bg-fuchsia-400/8', dot: 'bg-fuchsia-400', glow: 'rgba(232,121,249,0.18)' },
  { border: 'border-blue-400/25',    bg: 'bg-blue-400/8',    dot: 'bg-blue-400',    glow: 'rgba(96,165,250,0.18)' },
  { border: 'border-cyan-400/25',    bg: 'bg-cyan-400/8',    dot: 'bg-cyan-400',    glow: 'rgba(34,211,238,0.18)' },
  { border: 'border-violet-400/25',  bg: 'bg-violet-400/8',  dot: 'bg-violet-400',  glow: 'rgba(167,139,250,0.18)' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const CertCard = ({ cert, palette }) => {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      data-reveal="card"
      ref={cardRef}
      variants={cardVariants}
      whileHover={{ y: -10, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`modern-card group relative overflow-hidden rounded-2xl border ${palette.border} ${palette.bg} p-5 backdrop-blur-md transition-shadow duration-300`}
      style={{ '--glow': palette.glow }}
    >
      {/* Mouse-follow light effect */}
      {isHovering && (
        <motion.div
          className="pointer-events-none absolute h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-300"
          style={{
            left: mousePos.x - 80,
            top: mousePos.y - 80,
            background: `radial-gradient(circle, ${palette.glow}, transparent)`,
            opacity: 0.4,
          }}
        />
      )}

      {/* Hover glow overlay */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 40px var(--glow)` }}
      />

      {/* Medal icon badge */}
      <span className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl ${palette.bg} border ${palette.border}`}>
        <FaMedal className={`${palette.dot.replace('bg-', 'text-')}`} />
      </span>

      {/* Dot accent */}
      <span className={`absolute right-4 top-4 h-2 w-2 rounded-full ${palette.dot} opacity-70 shadow-[0_0_8px_3px_var(--glow)]`} />

      <p className="text-sm font-semibold leading-snug text-white group-hover:text-white">
        {cert.title}
      </p>
      <p className={`mt-2 text-xs font-medium ${palette.dot.replace('bg-', 'text-')}`}>
        {cert.platform}
      </p>
      <p className="mt-1 text-xs text-white/50">{cert.date}</p>

      {/* Bottom shimmer line */}
      <span className={`absolute inset-x-0 bottom-0 h-[2px] ${palette.dot} opacity-0 transition-opacity duration-300 group-hover:opacity-60`} />
    </motion.div>
  )
}

const Certifications = () => {
  return (
    <section id="certifications" className="px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Certifications" subtitle="Proof of Learning" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {certifications.map((cert, index) => (
            <CertCard key={cert.title} cert={cert} palette={palette[index % palette.length]} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
