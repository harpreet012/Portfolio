import { motion } from 'framer-motion'
import { FaCode, FaDatabase, FaTools } from 'react-icons/fa'
import { useRef, useState } from 'react'
import {
  SiExpress, SiGit, SiGithub, SiHtml5, SiJavascript,
  SiNodedotjs, SiPostman, SiPython, SiReact, SiTailwindcss,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa6'
import { VscVscode } from 'react-icons/vsc'
import SectionHeading from '../components/common/SectionHeading'
import SkillBar from '../components/common/SkillBar'
import { skills } from '../data/portfolioData'

const groups = [
  { key: 'frontend', title: 'Frontend', icon: FaCode, accent: 'from-fuchsia-500/20 to-blue-500/20', dot: 'bg-fuchsia-400', glowColor: 'rgba(232,121,249,0.25)' },
  { key: 'backend', title: 'Backend', icon: FaDatabase, accent: 'from-blue-500/20 to-cyan-400/20', dot: 'bg-blue-400', glowColor: 'rgba(96,165,250,0.25)' },
  { key: 'tools', title: 'Tools', icon: FaTools, accent: 'from-cyan-400/20 to-emerald-400/20', dot: 'bg-cyan-400', glowColor: 'rgba(34,211,238,0.25)' },
]

const skillIcons = {
  HTML: SiHtml5,
  'CSS / Tailwind': SiTailwindcss,
  JavaScript: SiJavascript,
  React: SiReact,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  Python: SiPython,
  Java: FaJava,
  Git: SiGit,
  GitHub: SiGithub,
  'VS Code': VscVscode,
  Postman: SiPostman,
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const SkillGroupCard = ({ group }) => {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const Icon = group.icon

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      data-reveal="card"
      ref={cardRef}
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="modern-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(12,17,42,0.55)]"
    >
      {/* Mouse-follow light effect */}
      {isHovering && (
        <motion.div
          className="pointer-events-none absolute h-48 w-48 rounded-full opacity-0 blur-3xl"
          style={{
            left: mousePos.x - 96,
            top: mousePos.y - 96,
            background: `radial-gradient(circle, ${group.glowColor}, transparent)`,
            opacity: 0.35,
          }}
        />
      )}

      {/* Animated top-edge gradient - enhanced */}
      <motion.span
        className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${group.accent} opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
        whileHover={{ opacity: 1 }}
      />

      {/* Ambient glow blob - larger and more vibrant */}
      <motion.span
        className={`pointer-events-none absolute -top-8 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full ${group.dot} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40`}
        whileHover={{ scale: 1.2 }}
      />

      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <motion.span
          className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${group.accent} backdrop-blur`}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Icon className="text-white" />
        </motion.span>
        <h3 className="text-base font-semibold text-white">{group.title}</h3>
      </div>

      <div className="space-y-4">
        {skills[group.key].map((skill, si) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: si * 0.07 }}
            className="space-y-2 rounded-xl border border-white/8 bg-slate-900/40 p-3 transition-colors group-hover:border-white/12"
          >
            <SkillBar name={skill.name} level={skill.level} icon={skillIcons[skill.name]} />
            <p className="text-xs text-white/55">{skill.projects}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const Skills = () => {
  return (
    <section id="skills" className="px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Skills" subtitle="Tech Toolbox" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-7 lg:grid-cols-3"
        >
          {groups.map((group) => (
            <SkillGroupCard key={group.key} group={group} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
