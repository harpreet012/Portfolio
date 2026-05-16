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
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: FaJs,
  'React.js': FaReact,
  'Node.js': FaNode,
  MongoDB: FaLeaf,
  MySQL: FaDatabase,
  Python: FaPython,
  Java: FaJava,
  'C++': FaCube,
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
    description: 'Semantic structure for clean and accessible interfaces.',
  },
  CSS: {
    category: 'Frontend',
    description: 'Responsive styling and premium visual hierarchy.',
  },
  JavaScript: {
    category: 'Frontend',
    description: 'Interactive behavior and client-side logic.',
  },
  'React.js': {
    category: 'Frontend',
    description: 'Component-driven UI systems and reusable patterns.',
  },
  'Node.js': {
    category: 'Backend',
    description: 'Server-side JavaScript for APIs and services.',
  },
  MongoDB: {
    category: 'Backend',
    description: 'Flexible NoSQL storage for application data.',
  },
  MySQL: {
    category: 'Backend',
    description: 'Structured relational storage and query workflows.',
  },
  Python: {
    category: 'Languages & AI',
    description: 'Automation, scripting, and machine learning work.',
  },
  Java: {
    category: 'Languages & AI',
    description: 'Object-oriented development and application design.',
  },
  'C++': {
    category: 'Languages & AI',
    description: 'Algorithms and efficient problem solving.',
  },
  'Git/GitHub': {
    category: 'Tools',
    description: 'Version control and collaborative workflows.',
  },
  'VS Code': {
    category: 'Tools',
    description: 'Fast and focused development environment.',
  },
  Pandas: {
    category: 'Data',
    description: 'Data analysis and transformation in Python.',
  },
  'Scikit-learn': {
    category: 'AI',
    description: 'Model training, evaluation, and pipelines.',
  },
  'Power BI': {
    category: 'Data',
    description: 'Dashboarding and visual reporting.',
  },
  Excel: {
    category: 'Data',
    description: 'Spreadsheet analysis and lightweight data prep.',
  },
  'Machine Learning': {
    category: 'AI',
    description: 'Predictive systems and intelligent automation.',
  },
  'Data Visualization': {
    category: 'Data',
    description: 'Insightful charting and storytelling.',
  },
  'Problem Solving': {
    category: 'Core Skill',
    description: 'Breaking down problems into clear solutions.',
  },
  'Data Structures': {
    category: 'Core Skill',
    description: 'Efficient foundations for algorithms.',
  },
}

const colorByCategory = {
  Frontend: 'text-cyan-300',
  Backend: 'text-amber-200',
  'Languages & AI': 'text-violet-200',
  Tools: 'text-emerald-200',
  Data: 'text-sky-200',
  AI: 'text-fuchsia-200',
  'Core Skill': 'text-zinc-100',
}

const skillList = [
  ...skills.frontend,
  ...skills.backend,
  ...skills.tools,
].map((skill) => ({
  ...skill,
  icon: skillIconMap[skill.name] || FaTools,
  category: skillMeta[skill.name]?.category ?? 'Skill',
  description: skillMeta[skill.name]?.description ?? skill.projects,
}))

const placementGrid = [
  { x: '8%', y: '10%' },
  { x: '28%', y: '14%' },
  { x: '52%', y: '11%' },
  { x: '74%', y: '16%' },
  { x: '86%', y: '12%' },
  { x: '12%', y: '35%' },
  { x: '32%', y: '31%' },
  { x: '54%', y: '33%' },
  { x: '76%', y: '32%' },
  { x: '88%', y: '36%' },
  { x: '7%', y: '58%' },
  { x: '27%', y: '54%' },
  { x: '50%', y: '57%' },
  { x: '70%', y: '55%' },
  { x: '88%', y: '59%' },
  { x: '14%', y: '79%' },
  { x: '36%', y: '77%' },
  { x: '57%', y: '79%' },
  { x: '76%', y: '75%' },
  { x: '90%', y: '80%' },
]

const spacingPresets = [
  { x: [-4, 4, -4], y: [-3, 3, -3], rotate: [-1, 1, -1], duration: 8 },
  { x: [3, -3, 3], y: [-4, 4, -4], rotate: [1, -1, 1], duration: 9 },
  { x: [-3, 3, -3], y: [2, -2, 2], rotate: [-1, 1, -1], duration: 10 },
  { x: [4, -4, 4], y: [3, -3, 3], rotate: [1, -1, 1], duration: 11 },
]

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState(skillList[0])
  const [pausedSkill, setPausedSkill] = useState(null)

  const titleStats = useMemo(
    () => [
      { label: 'Skills', value: '20+' },
      { label: 'Themes', value: 'Dark + Gold' },
      { label: 'Style', value: 'Futuristic Minimal' },
    ],
    []
  )

  return (
    <section id="skills" className="relative min-h-screen overflow-hidden px-6 py-24 sm:px-10">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(212,169,55,0.08),transparent_28%),radial-gradient(circle_at_center,rgba(56,189,248,0.04),transparent_32%),linear-gradient(to_bottom,rgba(255,255,255,0.015),transparent_22%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:84px_84px]" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {skillList.slice(0, 14).map((skill, index) => {
          const drift = spacingPresets[index % spacingPresets.length]
          return (
            <motion.span
              key={`${skill.name}-particle`}
              className="absolute rounded-full bg-white/20 blur-[1px]"
              style={{
                left: placementGrid[index].x,
                top: placementGrid[index].y,
                width: '2px',
                height: '2px',
              }}
              animate={{
                opacity: [0.15, 0.55, 0.15],
                x: drift.x,
                y: drift.y,
              }}
              transition={{
                duration: drift.duration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )
        })}
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.55em] text-amber-200/70">
            Premium Tech Stack
          </p>
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            My Tech Stack
          </h2>
          <div className="mx-auto mt-5 flex h-px w-40 items-center justify-center bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
          <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base">
            A clean floating grid of all core skills, designed to keep the section readable, immersive, and recruiter-friendly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(6,8,14,0.82)] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,169,55,0.08),transparent_52%),radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.02),transparent_40%)]" />
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:120px_120px]" />
          <div className="absolute inset-0 rounded-[2rem] border border-amber-300/10" />

          <div className="relative min-h-[42rem] px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
            <div className="pointer-events-none absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />
            <div className="pointer-events-none absolute inset-x-8 bottom-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {[...Array(18)].map((_, index) => (
                <motion.span
                  key={index}
                  className="absolute rounded-full bg-amber-100/25 blur-[0.5px]"
                  style={{
                    left: `${8 + ((index * 7) % 84)}%`,
                    top: `${10 + ((index * 13) % 76)}%`,
                    width: `${1 + (index % 3)}px`,
                    height: `${1 + (index % 3)}px`,
                  }}
                  animate={{ opacity: [0.08, 0.42, 0.08], y: [-2, 2, -2] }}
                  transition={{
                    duration: 6 + (index % 4),
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            <div className="relative h-[42rem] w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                className="absolute left-1/2 top-1/2 z-20 flex h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-amber-200/18 bg-[rgba(10,12,18,0.88)] text-center shadow-[0_0_40px_rgba(212,169,55,0.08)] backdrop-blur-3xl sm:h-[17rem] sm:w-[17rem]"
              >
                <motion.div
                  className="absolute inset-[-0.9rem] rounded-full border border-amber-200/20"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-[-1.35rem] rounded-full border border-dashed border-white/10"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 38, ease: 'linear' }}
                />
                <div className="absolute inset-[0.9rem] rounded-full border border-white/8" />
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(212,169,55,0.08),transparent_58%)]" />

                <div className="relative z-10 flex flex-col items-center px-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-amber-200/18 bg-black/35 text-3xl font-black text-white shadow-[0_0_20px_rgba(212,169,55,0.1)]">
                    HJ
                  </div>
                  <div className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-amber-100/70">
                    Harpreet
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-white sm:text-[1.6rem]">
                    Full Stack Developer
                  </h3>
                  <p className="mt-2 text-sm text-white/68">AI &amp; Data Enthusiast</p>
                </div>
              </motion.div>

              <div className="absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-200/10 sm:h-[28rem] sm:w-[28rem]" />
                <div className="absolute left-1/2 top-1/2 h-[31rem] w-[31rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8 sm:h-[35rem] sm:w-[35rem]" />
                <div className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-200/8 sm:h-[42rem] sm:w-[42rem]" />
              </div>

              {skillList.map((skill, index) => {
                const Icon = skill.icon
                const gridPoint = placementGrid[index]
                const drift = spacingPresets[index % spacingPresets.length]
                const category = skillMeta[skill.name]?.category ?? 'Skill'
                const description = skillMeta[skill.name]?.description ?? skill.projects
                const isActive = activeSkill.name === skill.name

                return (
                  <motion.button
                    key={skill.name}
                    type="button"
                    onMouseEnter={() => {
                      setActiveSkill(skill)
                      setPausedSkill(skill.name)
                    }}
                    onMouseLeave={() => setPausedSkill(null)}
                    onFocus={() => setActiveSkill(skill)}
                    onBlur={() => setPausedSkill(null)}
                    className="absolute left-0 top-0 outline-none"
                    style={{ left: gridPoint.x, top: gridPoint.y }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className={`flex items-center gap-2 rounded-full border px-3 py-2.5 backdrop-blur-xl transition-all duration-300 ${isActive ? 'border-amber-200/30 bg-white/[0.09] shadow-[0_0_18px_rgba(212,169,55,0.12)]' : 'border-white/10 bg-white/[0.04] shadow-[0_8px_24px_rgba(0,0,0,0.18)]'}`}
                      animate={{
                        y: pausedSkill === skill.name ? 0 : drift.y,
                        x: pausedSkill === skill.name ? 0 : drift.x,
                        rotate: pausedSkill === skill.name ? 0 : drift.rotate,
                      }}
                      transition={{
                        duration: drift.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/25 ${colorByCategory[category] || 'text-white/80'}`}>
                        <Icon size={15} />
                      </div>
                      <div className="min-w-0 text-left">
                        <div className="truncate text-sm font-semibold text-white">
                          {skill.name}
                        </div>
                        <div className="truncate text-[9px] uppercase tracking-[0.24em] text-white/45">
                          {category}
                        </div>
                      </div>
                    </motion.div>
                  </motion.button>
                )
              })}

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-1/2 bottom-8 z-30 w-[min(92vw,22rem)] -translate-x-1/2"
                >
                  <div className="rounded-2xl border border-white/10 bg-[rgba(8,10,15,0.88)] px-4 py-4 shadow-[0_18px_35px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-amber-100 shadow-[0_0_14px_rgba(212,169,55,0.08)]">
                        <activeSkill.icon size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] uppercase tracking-[0.38em] text-amber-100/70">
                          Hover Focus
                        </div>
                        <div className="mt-1 text-lg font-semibold text-white">
                          {activeSkill.name}
                        </div>
                        <div className="mt-1 text-xs uppercase tracking-[0.28em] text-white/45">
                          {skillMeta[activeSkill.name]?.category ?? 'Skill'}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/64">
                      {skillMeta[activeSkill.name]?.description ?? activeSkill.projects}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-[11px] text-white/50">
                      <span>{activeSkill.projects}</span>
                      <span>{activeSkill.level}%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        key={activeSkill.name}
                        initial={{ width: 0 }}
                        animate={{ width: `${activeSkill.level}%` }}
                        transition={{ duration: 0.75, ease: 'easeOut' }}
                        className="h-full rounded-full bg-amber-200 shadow-[0_0_12px_rgba(212,169,55,0.28)]"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
