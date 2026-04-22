import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

const SkillBar = ({ name, level, icon: Icon }) => {
  const barRef = useRef(null)
  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 25 })
  const glowOpacity = useTransform(springX, [-50, 0, 50], [0.4, 1, 0.4])

  return (
    <div
      className="group space-y-2"
      onMouseMove={(e) => {
        if (!barRef.current) return
        const rect = barRef.current.getBoundingClientRect()
        x.set(e.clientX - rect.left - rect.width / 2)
      }}
      onMouseLeave={() => x.set(0)}
      ref={barRef}
    >
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 font-medium text-white/90">
          {Icon ? (
            <motion.span
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
            >
              <Icon className="text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
            </motion.span>
          ) : null}
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="font-mono text-xs text-cyan-200"
        >
          {level}%
        </motion.span>
      </div>

      <div className="relative h-[6px] overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400"
        >
          {/* Animated glow dot at end */}
          <motion.span
            style={{ opacity: glowOpacity }}
            className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_4px_rgba(34,211,238,0.7)]"
          />
          {/* Shimmer */}
          <span className="absolute inset-0 animate-[barShimmer_2.2s_ease_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </motion.div>
      </div>
    </div>
  )
}

export default SkillBar
