import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

export default function FuturisticSkillCard({ title, percent, icon: Icon, color = 'purple' }) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const colorConfig = {
    purple: {
      from: 'from-violet-500',
      via: 'via-sky-500',
      to: 'to-cyan-300',
      bg: 'bg-violet-500/10',
      border: 'border-cyan-300/20',
      glow: 'rgba(139, 92, 246, 0.28)',
    },
    blue: {
      from: 'from-sky-500',
      via: 'via-cyan-300',
      to: 'to-violet-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-300/20',
      glow: 'rgba(37, 99, 235, 0.3)',
    },
    cyan: {
      from: 'from-cyan-300',
      via: 'via-sky-400',
      to: 'to-violet-400',
      bg: 'bg-cyan-400/10',
      border: 'border-cyan-300/30',
      glow: 'rgba(0, 245, 255, 0.32)',
    },
  }

  const cfg = colorConfig[color] || colorConfig.purple

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${percent}%`,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className="cyber-card group relative overflow-hidden p-[2px]"
      style={{
        background: `linear-gradient(135deg, rgba(0,245,255,0.55) 0%, rgba(139,92,246,0.45) 50%, rgba(37,99,235,0.55) 100%)`,
      }}
    >
      <div className={`cyber-card__content relative overflow-hidden ${cfg.bg} p-5 backdrop-blur-xl`}>
        {/* Mouse-follow glow effect */}
        {isHovering && (
          <motion.div
            className="pointer-events-none absolute h-40 w-40 rounded-full opacity-0 blur-3xl"
            style={{
              left: mousePos.x - 80,
              top: mousePos.y - 80,
              background: `radial-gradient(circle, ${cfg.glow}, transparent)`,
              opacity: 0.5,
            }}
            animate={{ opacity: 0.5 }}
          />
        )}

        {/* Top glow accent */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${cfg.glow}, transparent 70%)`,
          }}
        />

        {/* Header section */}
        <div className="flex items-center gap-3 mb-4">
          {Icon && (
            <motion.div
              className="text-3xl"
              animate={{ rotate: isHovering ? 360 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <Icon />
            </motion.div>
          )}
          <h3 className="text-cyan-100 font-semibold flex-1">{title}</h3>
        </div>

        {/* Animated progress bar */}
        <div className="mt-4 space-y-2">
          <div className="h-2.5 overflow-hidden border border-cyan-300/10 bg-[#07101f]">
            <motion.div
              variants={progressVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`h-full bg-gradient-to-r ${cfg.from} ${cfg.via} ${cfg.to}`}
              style={{
                boxShadow: `0 0 22px ${cfg.glow}`,
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-[color:var(--text-muted)]">Proficiency</p>
            <motion.p
              className="text-sm font-mono text-cyan-100 font-semibold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              {percent}%
            </motion.p>
          </div>
        </div>

        {/* Bottom shimmer line */}
        <motion.span className={`absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r ${cfg.from} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
      </div>
    </motion.div>
  )
}
