import { motion } from 'framer-motion'
import SectionHeading from '../components/common/SectionHeading'
import { experience } from '../data/portfolioData'

const Experience = () => {
  return (
    <section id="experience" className="px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Experience" subtitle="Career Timeline" />

        <div className="relative pl-6 sm:pl-10">
          {/* Animated timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute left-0 top-0 h-full w-[2px] origin-top bg-gradient-to-b from-cyan-400/80 via-blue-500/50 to-transparent"
          />

          {experience.map((item, index) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, x: -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative mb-8"
            >
              {/* Glowing timeline dot */}
              <motion.span
                animate={{ boxShadow: ['0 0 10px 3px rgba(34,211,238,0.5)', '0 0 20px 6px rgba(34,211,238,0.15)', '0 0 10px 3px rgba(34,211,238,0.5)'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-[2.2rem] top-6 h-3.5 w-3.5 rounded-full border-2 border-cyan-400 bg-slate-950 sm:-left-[2.6rem]"
              />

              {/* Card */}
              <motion.div
                data-reveal="card"
                whileHover={{ y: -6, scale: 1.012 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="modern-card relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-shadow duration-300 group-hover:shadow-[0_20px_60px_rgba(12,17,42,0.55)]"
              >
                {/* Left accent bar */}
                <span className="absolute inset-y-0 left-0 w-[3px] rounded-l-2xl bg-gradient-to-b from-cyan-400 via-blue-500 to-fuchsia-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Shimmer */}
                <span className="pointer-events-none absolute -inset-x-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/6 to-transparent opacity-0 transition-none group-hover:opacity-100 group-hover:[animation:shimmerSweep_0.75s_ease_forwards]" />

                <span className="inline-block rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  {item.period}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.role}</h3>
                <p className="text-sm text-white/75">{item.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{item.details}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
