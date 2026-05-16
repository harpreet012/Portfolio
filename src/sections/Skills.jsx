import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaCode,
  FaTools,
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
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
  FaFileExcel,
  FaPuzzlePiece,
  FaSitemap,
} from 'react-icons/fa'
import { skills } from '../data/portfolioData'

const skillIconMap = {
  'React.js': FaReact,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: FaJs,
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
  Excel: FaFileExcel,
  'Machine Learning': FaBrain,
  'Data Visualization': FaChartPie,
  'Problem Solving': FaPuzzlePiece,
  'Data Structures': FaSitemap,
}

const skillMeta = {
  HTML: {
    category: 'Frontend',
    description: 'Semantic page structure and accessible markup.',
  },
  CSS: {
    category: 'Frontend',
    description: 'Responsive layout, polish, and visual hierarchy.',
  },
  JavaScript: {
    category: 'Frontend',
    description: 'Interactive UI logic and client-side behavior.',
  },
  'React.js': {
    category: 'Frontend',
    description: 'Component-based UI development with reusable patterns.',
  },
  'Node.js': {
    category: 'Backend',
    description: 'Server-side JavaScript for APIs and services.',
  },
  MongoDB: {
    category: 'Backend',
    description: 'Flexible NoSQL storage for app data layers.',
  },
  MySQL: {
    category: 'Backend',
    description: 'Structured relational data and query workflows.',
  },
  Python: {
    category: 'Backend & AI',
    description: 'Automation, scripting, and machine learning workflows.',
  },
  Java: {
    category: 'Languages',
    description: 'Object-oriented problem solving and application design.',
  },
  'C++': {
    category: 'Languages',
    description: 'Algorithms, data structures, and performance-focused coding.',
  },
  'Git/GitHub': {
    category: 'Tools',
    description: 'Version control and collaborative development.',
  },
  'VS Code': {
    category: 'Tools',
    description: 'Efficient development and debugging workflow.',
  },
  Pandas: {
    category: 'Data',
    description: 'Data wrangling and analysis in Python.',
  },
  'Scikit-learn': {
    category: 'AI',
    description: 'Model training, evaluation, and ML pipelines.',
  },
  'Power BI': {
    category: 'Data',
    description: 'Interactive dashboards and business reporting.',
  },
  Excel: {
    category: 'Data',
    description: 'Tabular analysis and lightweight data prep.',
  },
  'Machine Learning': {
    category: 'AI',
    description: 'Predictive modeling and intelligent automation.',
  },
  'Data Visualization': {
    category: 'Data',
    description: 'Clear storytelling with charts and dashboards.',
  },
  'Problem Solving': {
    category: 'Core Skill',
    description: 'Breaking down systems into practical solutions.',
  },
  'Data Structures': {
    category: 'Core Skill',
    description: 'Logical foundations for efficient algorithms.',
  },
}

const orbitConfigs = [
  {
    key: 'frontend',
    title: 'Frontend',
    subtitle: 'Interface, motion, and interaction',
    radius: 'clamp(5.6rem, 10vw, 8rem)',
    ringSize: 'clamp(18rem, 30vw, 24rem)',
    duration: 34,
    direction: 'normal',
    theme: 'cyan',
    skills: skills.frontend,
  },
  {
    key: 'backend',
    title: 'Backend',
    subtitle: 'APIs, databases, and logic',
    radius: 'clamp(8rem, 14vw, 11rem)',
    ringSize: 'clamp(26rem, 40vw, 34rem)',
    duration: 48,
    direction: 'reverse',
    theme: 'amber',
    skills: skills.backend,
  },
  {
    key: 'tools',
    title: 'Tools & AI',
    subtitle: 'Productivity, analytics, and intelligence',
    radius: 'clamp(10.6rem, 17vw, 14rem)',
    ringSize: 'clamp(34rem, 52vw, 44rem)',
    duration: 60,
    direction: 'normal',
    theme: 'violet',
    skills: skills.tools,
  },
]

const backgroundParticles = [
  { top: '12%', left: '18%', size: '3px', delay: 0 },
  { top: '18%', left: '78%', size: '2px', delay: 0.8 },
  { top: '32%', left: '10%', size: '2px', delay: 1.6 },
  { top: '58%', left: '84%', size: '3px', delay: 0.4 },
  { top: '72%', left: '22%', size: '2px', delay: 1.2 },
  { top: '78%', left: '64%', size: '3px', delay: 2 },
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
  category: skillMeta['React.js'].category,
  description: skillMeta['React.js'].description,
  icon: skillIconMap['React.js'],
}

const getSkillInfo = (skill, orbit) => ({
  ...skill,
  orbit: orbit.title,
  category: skillMeta[skill.name]?.category ?? orbit.subtitle,
  description: skillMeta[skill.name]?.description ?? orbit.subtitle,
  icon: skillIconMap[skill.name] || FaTools,
})

const SkillOrbitChip = ({ skill, orbit, index, isActive, setActiveSkill, paused }) => {
  const Icon = skillIconMap[skill.name] || FaTools
  const angle = (360 / orbit.skills.length) * index
  const styles = themeStyles[orbit.theme]

  return (
    <motion.button
      type="button"
      onMouseEnter={() =>
        setActiveSkill(getSkillInfo(skill, orbit))
      }
      onFocus={() =>
        setActiveSkill(getSkillInfo(skill, orbit))
      }
      whileHover={{ scale: 1.04 }}
      className="absolute left-1/2 top-1/2 outline-none"
      style={{
        transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${orbit.radius})`,
      }}
      aria-label={`${skill.name} skill`}
    >
      <motion.div
        className={`orbit-counter-spin flex items-center gap-2 rounded-full border bg-white/[0.04] px-3.5 py-2.5 backdrop-blur-2xl transition-all duration-300 ${styles.border} ${isActive ? `${styles.glow} ${styles.borderStrong} bg-white/[0.09] shadow-[0_0_26px_rgba(255,255,255,0.08)]` : 'shadow-[0_0_14px_rgba(0,0,0,0.16)]'} ${paused ? 'paused' : ''}`}
        style={{
          animationDuration: `${orbit.duration}s`,
          animationDirection: orbit.direction,
        }}
      >
        <motion.div
          className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] ${styles.ring}`}
          animate={{
            scale: isActive ? 1.08 : 1,
            boxShadow: isActive
              ? '0 0 14px rgba(251,191,36,0.16)'
              : '0 0 0 rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.3 }}
        >
          <Icon size={16} className={styles.label} />
        </motion.div>
        <div className="min-w-0 text-left">
          <div className="truncate text-[0.82rem] font-semibold text-white">{skill.name}</div>
          <div className="truncate text-[9px] uppercase tracking-[0.28em] text-white/40">
            {orbit.title}
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {backgroundParticles.map((particle, index) => (
          <motion.span
            key={`${particle.top}-${index}`}
            className="absolute rounded-full bg-amber-200/35 blur-[1px]"
            style={{
              top: particle.top,
              left: particle.left,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              opacity: [0.15, 0.65, 0.15],
              y: [0, -12, 0],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

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
              className="relative flex h-[clamp(15rem,24vw,21rem)] w-[clamp(15rem,24vw,21rem)] flex-col items-center justify-center rounded-full border border-amber-300/20 bg-white/[0.04] px-7 text-center backdrop-blur-3xl shadow-[0_0_42px_rgba(251,191,36,0.1)]"
            >
              <motion.div
                className="absolute inset-[-1rem] rounded-full border border-amber-300/20"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-[-1.9rem] rounded-full border border-dashed border-white/10"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 42, ease: 'linear' }}
              />
              <div className="absolute inset-4 rounded-full border border-dashed border-white/10" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.08),transparent_60%)]" />

              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border border-amber-300/20 bg-black/30 text-4xl font-black tracking-tight text-white shadow-[0_0_24px_rgba(251,191,36,0.12)] orbit-glow-pulse">
                  HJ
                </div>
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.5em] text-amber-200/75">
                  Harpreet
                </div>
                <h3 className="text-xl font-bold text-white sm:text-2xl">Full Stack Developer</h3>
                <p className="text-sm text-white/68">AI &amp; Data Enthusiast</p>
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
                  className="relative z-10 mt-5 w-full rounded-2xl border border-white/10 bg-black/24 px-4 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.24)]"
                >
                  <div className="flex items-start gap-3 text-left">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-amber-200 shadow-[0_0_14px_rgba(251,191,36,0.1)]">
                      <activeSkill.icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200/70">
                        Hover Focus
                      </div>
                      <div className="mt-1 text-lg font-semibold text-white">{activeSkill.name}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.28em] text-white/45">
                        {activeSkill.category}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/64">{activeSkill.description}</p>
                  <div className="mt-4 flex items-center justify-between text-[11px] text-white/50">
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
