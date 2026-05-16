import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaCode,
  FaTools,
  FaReact,
  FaJs,
  FaHtml5,
  FaPython,
  FaJava,
  FaNode,
  FaGithub,
  FaCube,
  FaLeaf,
  FaDatabase,
  FaChartBar,
  FaBrain,
  FaChartPie,
} from 'react-icons/fa'
import { skills } from '../data/portfolioData'

const skillIconMap = {
  'React.js': FaReact,
  JavaScript: FaJs,
  'HTML/CSS': FaHtml5,
  Python: FaPython,
  Java: FaJava,
  'C++': FaCube,
  'Node.js': FaNode,
  MongoDB: FaLeaf,
  MySQL: FaDatabase,
  'Git/GitHub': FaGithub,
  'VS Code': FaCode,
  Pandas: FaChartBar,
  'Scikit-learn': FaBrain,
  'Power BI': FaChartPie,
  'Machine Learning': FaBrain,
  'Data Visualization': FaChartPie,
}

const orbitConfigs = [
  {
    key: 'frontend',
    title: 'Frontend',
    subtitle: 'Interface, motion, and interaction',
    radius: 'clamp(6.5rem, 11vw, 9rem)',
    ringSize: 'clamp(20rem, 34vw, 28rem)',
    duration: 26,
    direction: 'normal',
    theme: 'cyan',
    skills: skills.frontend,
  },
  {
    key: 'backend',
    title: 'Backend',
    subtitle: 'APIs, databases, and logic',
    radius: 'clamp(9rem, 15vw, 12rem)',
    ringSize: 'clamp(28rem, 44vw, 38rem)',
    duration: 36,
    direction: 'reverse',
    theme: 'amber',
    skills: skills.backend,
  },
  {
    key: 'tools',
    title: 'Tools & AI',
    subtitle: 'Productivity, analytics, and intelligence',
    radius: 'clamp(11rem, 18vw, 14.5rem)',
    ringSize: 'clamp(36rem, 56vw, 48rem)',
    duration: 46,
    direction: 'normal',
    theme: 'violet',
    skills: skills.tools,
  },
]

const themeStyles = {
  cyan: {
    label: 'text-cyan-300',
    glow: 'shadow-[0_0_30px_rgba(34,211,238,0.18)]',
    border: 'border-cyan-300/20',
    borderStrong: 'border-cyan-300/40',
    ring: 'border-cyan-300/10',
    accent: 'bg-cyan-300',
    badge: 'bg-cyan-300/10 text-cyan-100 border-cyan-300/20',
  },
  amber: {
    label: 'text-amber-300',
    glow: 'shadow-[0_0_30px_rgba(251,191,36,0.18)]',
    border: 'border-amber-300/20',
    borderStrong: 'border-amber-300/40',
    ring: 'border-amber-300/10',
    accent: 'bg-amber-300',
    badge: 'bg-amber-300/10 text-amber-100 border-amber-300/20',
  },
  violet: {
    label: 'text-violet-300',
    glow: 'shadow-[0_0_30px_rgba(167,139,250,0.18)]',
    border: 'border-violet-300/20',
    borderStrong: 'border-violet-300/40',
    ring: 'border-violet-300/10',
    accent: 'bg-violet-300',
    badge: 'bg-violet-300/10 text-violet-100 border-violet-300/20',
  },
}

const defaultActiveSkill = {
  name: 'React.js',
  level: 90,
  projects: 'Frontend Interfaces',
  orbit: 'Frontend',
  category: 'Interface, motion, and interaction',
}

const SkillOrbitChip = ({ skill, orbit, index, isActive, setActiveSkill, paused }) => {
  const Icon = skillIconMap[skill.name] || FaTools
  const angle = (360 / orbit.skills.length) * index
  const styles = themeStyles[orbit.theme]

  return (
    <motion.button
      type="button"
      onMouseEnter={() =>
        setActiveSkill({
          ...skill,
          orbit: orbit.title,
          category: orbit.subtitle,
        })
      }
      onFocus={() =>
        setActiveSkill({
          ...skill,
          orbit: orbit.title,
          category: orbit.subtitle,
        })
      }
      whileHover={{ scale: 1.08 }}
      className="absolute left-1/2 top-1/2 outline-none"
      style={{
        transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${orbit.radius})`,
      }}
      aria-label={`${skill.name} skill`}
    >
      <motion.div
        className={`orbit-counter-spin flex items-center gap-3 rounded-2xl border bg-white/[0.08] px-4 py-3 backdrop-blur-2xl transition-all duration-300 ${styles.border} ${styles.glow} ${isActive ? `${styles.borderStrong} bg-white/[0.14] shadow-[0_0_35px_rgba(255,255,255,0.12)]` : 'shadow-[0_0_22px_rgba(0,0,0,0.22)]'} ${paused ? 'paused' : ''}`}
        style={{
          animationDuration: `${orbit.duration}s`,
          animationDirection: orbit.direction,
        }}
      >
        <motion.div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] ${styles.ring}`}
          animate={{
            scale: isActive ? 1.08 : 1,
            boxShadow: isActive
              ? '0 0 18px rgba(251,191,36,0.25)'
              : '0 0 0 rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.3 }}
        >
          <Icon size={18} className={styles.label} />
        </motion.div>
        <div className="min-w-0 text-left">
          <div className="truncate text-sm font-semibold text-white">{skill.name}</div>
          <div className="truncate text-[10px] uppercase tracking-[0.32em] text-white/45">
            {skill.projects}
          </div>
        </div>
      </motion.div>
    </motion.button>
  )
}

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState(defaultActiveSkill)
  const [pausedOrbit, setPausedOrbit] = useState(null)

  const orbitSummary = useMemo(
    () => [
      { label: 'Orbits', value: '3' },
      { label: 'Skills', value: '16+' },
      { label: 'Focus', value: 'Full Stack + AI' },
    ],
    []
  )

  return (
    <section id="skills" className="relative flex min-h-screen items-center overflow-hidden px-6 py-24 sm:px-10">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.08),transparent_34%),radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_24%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_20%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="mx-auto w-full max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.55em] text-amber-300/75">
            My Tech Stack
          </p>
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Solar-system style skill orbit
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base">
            Center: Harpreet. Inner orbit: Frontend. Middle orbit: Backend. Outer orbit: Tools &amp; AI.
          </p>
        </motion.div>

        <div className="relative mx-auto aspect-square w-full max-w-[84rem] min-h-[44rem]">
          {orbitConfigs.map((orbit) => {
            const styles = themeStyles[orbit.theme]
            return (
              <div
                key={orbit.key}
                className={`orbit-spin absolute inset-0 ${pausedOrbit === orbit.key ? 'paused' : ''}`}
                style={{
                  animationDuration: `${orbit.duration}s`,
                  animationDirection: orbit.direction,
                  animationPlayState: pausedOrbit === orbit.key ? 'paused' : 'running',
                }}
                onMouseEnter={() => setPausedOrbit(orbit.key)}
                onMouseLeave={() => setPausedOrbit(null)}
              >
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${styles.ring}`}
                  style={{ width: orbit.ringSize, height: orbit.ringSize }}
                />

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className={`rounded-full border border-white/10 bg-white/[0.03] px-4 py-1 text-[10px] uppercase tracking-[0.42em] ${styles.label}`}>
                    {orbit.title}
                  </div>
                </div>

                {orbit.skills.map((skill, index) => {
                  const isActive = activeSkill?.name === skill.name
                  return (
                    <SkillOrbitChip
                      key={`${orbit.key}-${skill.name}`}
                      skill={skill}
                      orbit={orbit}
                      index={index}
                      isActive={isActive}
                      paused={pausedOrbit === orbit.key}
                      setActiveSkill={setActiveSkill}
                    />
                  )
                })}
              </div>
            )
          })}

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="relative flex h-[clamp(16rem,26vw,22rem)] w-[clamp(16rem,26vw,22rem)] flex-col items-center justify-center rounded-full border border-amber-300/25 bg-white/[0.06] px-8 text-center backdrop-blur-3xl shadow-[0_0_50px_rgba(251,191,36,0.16)]"
            >
              <div className="absolute inset-4 rounded-full border border-dashed border-white/10" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.08),transparent_60%)]" />

              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-amber-300/25 bg-black/30 text-4xl font-black tracking-tight text-white shadow-[0_0_35px_rgba(251,191,36,0.18)]">
                  HJ
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.45em] text-amber-200/80">
                  Harpreet
                </div>
                <h3 className="text-2xl font-bold text-white">Full Stack Developer</h3>
                <p className="text-sm text-white/70">AI &amp; Data Enthusiast</p>
              </div>

              <div className="relative z-10 mt-5 flex flex-wrap justify-center gap-2">
                {orbitSummary.map((item) => (
                  <span
                    key={item.label}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70"
                  >
                    {item.value}
                  </span>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10 mt-6 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                >
                  <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200/70">
                    Active Skill
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">{activeSkill.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.3em] text-white/45">
                    {activeSkill.orbit}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/65">{activeSkill.category}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-white/55">
                    <span>{activeSkill.projects}</span>
                    <span>{activeSkill.level}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      key={activeSkill.name}
                      initial={{ width: 0 }}
                      animate={{ width: `${activeSkill.level}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full bg-amber-300 shadow-[0_0_14px_rgba(251,191,36,0.45)]"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
