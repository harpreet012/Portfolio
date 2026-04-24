import { motion } from 'framer-motion'

const CircularSkill = ({ name, level }) => {
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (level / 100) * circumference

  return (
    <div className="cyber-card group p-4 text-center">
      <div className="cyber-card__content">
        <div className="relative mx-auto h-24 w-24">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} className="stroke-cyan-100/10" fill="none" strokeWidth="8" />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className="stroke-cyan-300"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: dashOffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-sm font-semibold text-cyan-100">
          {level}%
        </span>
        </div>
        <p className="mt-3 text-sm font-medium text-[color:var(--text-soft)]">{name}</p>
      </div>
    </div>
  )
}

export default CircularSkill
