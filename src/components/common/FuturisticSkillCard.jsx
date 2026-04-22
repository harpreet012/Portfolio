import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

export default function FuturisticSkillCard({ title, percent, icon: Icon, color = 'purple' }) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const colorConfig = {
    purple: {
      from: 'from-purple-500',
      via: 'via-blue-500',
      to: 'to-cyan-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      glow: 'rgba(168, 85, 247, 0.3)',
    },
    blue: {
      from: 'from-blue-500',
      via: 'via-cyan-400',
      to: 'to-emerald-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      glow: 'rgba(59, 130, 246, 0.3)',
    },
    cyan: {
      from: 'from-cyan-400',
      via: 'via-emerald-400',
      to: 'to-teal-500',
      bg: 'bg-cyan-400/10',
      border: 'border-cyan-400/30',
      glow: 'rgba(34, 211, 238, 0.3)',
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
      className={`group relative p-[2px] rounded-2xl overflow-hidden`}
      style={{
        background: `linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #22d3ee 100%)`,
      }}
    >
      {/* Inner card */}
      <div className={`relative ${cfg.bg} backdrop-blur-xl rounded-2xl p-5 shadow-xl overflow-hidden`}>
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
          className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500`}
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
          <h3 className="text-white font-semibold flex-1">{title}</h3>
        </div>

        {/* Animated progress bar */}
        <div className="mt-4 space-y-2">
          <div className="h-2.5 bg-slate-900/40 rounded-full overflow-hidden border border-white/10">
            <motion.div
              variants={progressVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`h-full bg-gradient-to-r ${cfg.from} ${cfg.via} ${cfg.to} rounded-full shadow-lg`}
              style={{
                boxShadow: `0 0 20px ${cfg.glow}`,
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400">Proficiency</p>
            <motion.p
              className="text-sm font-mono text-white font-semibold"
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
        <motion.span
          className={`absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r ${cfg.from} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />
      </div>
    </motion.div>
  )
}
