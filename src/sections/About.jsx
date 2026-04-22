import { motion } from 'framer-motion'
import { FaCode, FaBrain, FaRocket } from 'react-icons/fa'
import GlassCard from '../components/common/GlassCard'
import SectionHeading from '../components/common/SectionHeading'
import SkillBar from '../components/common/SkillBar'
import { highlights, skills } from '../data/portfolioData'

const icons = [FaCode, FaBrain, FaRocket]
const iconColors = ['text-fuchsia-400', 'text-blue-400', 'text-cyan-400']
const iconBg = ['bg-fuchsia-400/12', 'bg-blue-400/12', 'bg-cyan-400/12']

const highlightVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const highlightItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const About = () => {
  return (
    <section id="about" className="px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="About Me" subtitle="Who I Am" />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left card */}
          <GlassCard className="space-y-6" delay={0.05}>
            <div className="flex items-start gap-5">
              <div className="relative shrink-0">
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-fuchsia-500/60 via-blue-500/60 to-cyan-400/60 blur-xl opacity-70 animate-[pulse_3s_ease-in-out_infinite]" />
                <img
                  src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=300&q=80"
                  alt="Harpreet Jakhar"
                  className="relative h-24 w-24 rounded-2xl border border-white/20 object-cover"
                />
              </div>
              <p className="leading-relaxed text-white/80">
                I started by building tiny web pages out of curiosity, and now I craft polished frontend
                experiences that feel fast, alive, and intuitive. As a B.Tech CSE student, I enjoy blending
                engineering discipline with visual storytelling, from React interfaces to ML-backed features.
              </p>
            </div>

            {/* Highlight cards */}
            <motion.div
              variants={highlightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid gap-3 sm:grid-cols-3"
            >
              {highlights.map((item, index) => {
                const Icon = icons[index]
                return (
                  <motion.div
                    key={item.title}
                    variants={highlightItem}
                    whileHover={{ y: -8, scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 p-4 transition-shadow hover:shadow-[0_12px_40px_rgba(12,17,42,0.5)]"
                  >
                    {/* Top accent line */}
                    <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-fuchsia-400 via-blue-400 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-80" />

                    <span className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg ${iconBg[index]}`}>
                      <Icon className={`text-sm ${iconColors[index]}`} />
                    </span>
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/65">{item.text}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </GlassCard>

          {/* Right card */}
          <GlassCard delay={0.12}>
            <h3 className="mb-6 text-xl font-semibold text-white">Core Strength Snapshot</h3>
            <div className="space-y-5">
              {[
                { name: 'Frontend Engineering', level: 90 },
                { name: 'Backend Development', level: 84 },
                { name: 'Machine Learning', level: 82 },
                { name: 'Problem Solving', level: 93 },
              ].map((skillItem, i) => (
                <motion.div
                  key={skillItem.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.09 }}
                >
                  <SkillBar name={skillItem.name} level={skillItem.level} />
                </motion.div>
              ))}
            </div>
            <div className="mt-6 border-t border-white/10 pt-4 text-sm text-white/60">
              Primary stack:{' '}
              <span className="text-cyan-200/80">{skills.frontend.map((s) => s.name).join(', ')}</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}

export default About
