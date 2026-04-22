import { motion } from 'framer-motion'

const CircularSkill = ({ name, level }) => {
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (level / 100) * circumference

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur transition hover:border-cyan-400/50 hover:bg-white/10">
      <div className="relative mx-auto h-24 w-24">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} className="stroke-white/15" fill="none" strokeWidth="8" />
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
        <span className="absolute inset-0 grid place-items-center text-sm font-semibold text-white">
          {level}%
        </span>
      </div>
      <p className="mt-3 text-sm font-medium text-white/90">{name}</p>
    </div>
  )
}

export default CircularSkill
