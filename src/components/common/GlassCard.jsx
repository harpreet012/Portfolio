import { motion } from 'framer-motion'
import clsx from 'clsx'

const GlassCard = ({ children, className = '', delay = 0, hover = true }) => {
  return (
    <motion.div
      data-reveal="card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -6, scale: 1.012 } : undefined}
      className={clsx(
        'modern-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6',
        'shadow-[0_8px_40px_rgba(12,17,42,0.4)] backdrop-blur-lg',
        'transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(12,17,42,0.6)]',
        className,
      )}
    >
      {/* Gradient border glow on hover */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(135deg,rgba(168,85,247,0.18),rgba(59,130,246,0.14),rgba(34,211,238,0.18))',
        }}
      />

      {/* Shimmer sweep */}
      <span className="pointer-events-none absolute -inset-x-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0 transition-none group-hover:opacity-100 group-hover:[animation:shimmerSweep_0.7s_ease_forwards]" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

export default GlassCard
