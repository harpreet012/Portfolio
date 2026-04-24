import { motion } from 'framer-motion'
import clsx from 'clsx'
import { useRef } from 'react'

const GlassCard = ({ children, className = '', delay = 0, hover = true }) => {
  const cardRef = useRef(null)

  return (
    <motion.div
      ref={cardRef}
      data-reveal="card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(event) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        cardRef.current.style.setProperty('--glow-x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
        cardRef.current.style.setProperty('--glow-y', `${((event.clientY - rect.top) / rect.height) * 100}%`)
        cardRef.current.style.setProperty('--glow-opacity', '1')
      }}
      onMouseLeave={() => {
        if (!cardRef.current) return
        cardRef.current.style.setProperty('--glow-opacity', hover ? '0.55' : '0')
        cardRef.current.style.setProperty('--glow-x', '50%')
        cardRef.current.style.setProperty('--glow-y', '42%')
      }}
      whileHover={hover ? { y: -7, scale: 1.01 } : undefined}
      className={clsx(
        'cyber-card group p-6',
        className,
      )}
      style={{ '--glow-opacity': hover ? 0.42 : 0 }}
    >
      <span
        className="pointer-events-none absolute inset-[1px] opacity-60"
        style={{
          clipPath: 'inherit',
          background:
            'linear-gradient(160deg,rgba(0,245,255,0.05),rgba(139,92,246,0.04),rgba(37,99,235,0.05))',
          mixBlendMode: 'screen',
        }}
      />

      <span className="pointer-events-none absolute -inset-x-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-200/15 to-transparent opacity-0 transition-none group-hover:opacity-100 group-hover:[animation:shimmerSweep_0.8s_ease_forwards]" />

      <div className="cyber-card__content">{children}</div>
    </motion.div>
  )
}

export default GlassCard
