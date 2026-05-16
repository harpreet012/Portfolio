import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCode, FaServer, FaTools, FaReact, FaPython, FaNode, FaGitAlt, FaJava, FaJs, FaHtml5, FaCss3Alt } from 'react-icons/fa'
import { skills, techIcons } from '../data/portfolioData'

const groupIcons = {
  frontend: FaCode,
  backend: FaServer,
  tools: FaTools,
}

const iconMap = {
  FaReact: FaReact,
  FaPython: FaPython,
  FaNode: FaNode,
  FaGitAlt: FaGitAlt,
  FaJava: FaJava,
  FaJs: FaJs,
  FaHtml5: FaHtml5,
  FaCss3Alt: FaCss3Alt,
}

const FloatingTechSymbols = () => {
  const getRandomPosition = (index) => ({
    x: Math.cos((index / techIcons.length) * Math.PI * 2) * 100,
    y: Math.sin((index / techIcons.length) * Math.PI * 2) * 100,
  })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-96 rounded-3xl border-2 border-amber-400/40 bg-white/[0.02] backdrop-blur-sm shadow-[inset_0_0_20px_rgba(251,191,36,0.1),0_0_30px_rgba(251,191,36,0.1)] flex items-center justify-center overflow-hidden my-12"
    >
      {/* Floating Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Floating Icons Grid */}
      <div className="relative w-full h-full flex items-center justify-center">
        {techIcons.map((tech, index) => {
          const Icon = iconMap[tech.icon]
          const angle = (index / techIcons.length) * Math.PI * 2
          const radius = 120
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: tech.delay,
                duration: 0.6,
                type: 'spring',
                stiffness: 100,
              }}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4 + index * 0.3,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.2 }}
              className="absolute w-20 h-20 rounded-2xl bg-white/[0.05] backdrop-blur-md border border-amber-400/20 flex items-center justify-center cursor-pointer hover:bg-white/[0.1] hover:border-amber-400/50 transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
              style={{
                x,
                y,
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon size={32} style={{ color: tech.color }} className="drop-shadow-lg" />
                <span className="text-[10px] font-mono text-gray-300 uppercase tracking-wider text-center">
                  {tech.name}
                </span>
              </div>
            </motion.div>
          )
        })}

        {/* Center Circle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute w-24 h-24 rounded-full border-2 border-amber-400/30 bg-white/[0.03] flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            className="w-20 h-20 rounded-full border-[1px] border-dashed border-amber-400/20"
          />
        </motion.div>
      </div>

      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none">
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </motion.div>
  )
}

const SkillCard = ({ title, items, index, isExpanded, onToggle }) => {
  const Icon = groupIcons[title] || FaCode

  return (
    <motion.div
      layout
      onClick={onToggle}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
      className="cursor-pointer relative overflow-hidden rounded-2xl modern-card border-none bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.05] p-6 flex flex-col transition-all duration-300 group"
      style={{ perspective: 1000 }}
    >
        {/* Header */}
        <motion.div layout className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-400/10 flex items-center justify-center border border-amber-400/20 text-amber-400 group-hover:bg-amber-400/20 transition-all">
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-100 capitalize tracking-wide font-sans">{title}</h3>
        </motion.div>

        {/* Expanding Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              layout
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col gap-5 overflow-hidden"
            >
              {items.map((skill, idx) => (
                <div key={skill.name} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm font-sans">
                    <span className="text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-amber-400 font-mono text-xs">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: idx * 0.1, type: "spring", stiffness: 50 }}
                      className="h-full rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                    />
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">{skill.projects}</div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
    </motion.div>
  )
}

const Skills = () => {
  const [typedText, setTypedText] = useState('')
  const [expandedCard, setExpandedCard] = useState('frontend')
  
  const command = "> harpreet setup --install-skills"

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setTypedText(command.slice(0, index + 1))
      index++
      if (index === command.length) clearInterval(interval)
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="skills" className="relative px-6 py-24 sm:px-10 min-h-screen flex items-center">
      
      {/* Giant Background Number */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-outline opacity-[0.03] pointer-events-none select-none z-0 leading-none">
        03
      </div>

      <div className="mx-auto max-w-5xl w-full z-10 relative">
        
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 rounded-xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          <div className="bg-white/[0.05] px-4 py-3 flex items-center gap-2 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
            </div>
            <div className="ml-4 text-xs font-mono text-gray-400">
              Terminal - Installation
            </div>
          </div>
          <div className="p-6 font-mono text-sm sm:text-base text-amber-300">
            <span>{typedText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2.5 h-4 bg-amber-400 ml-1 translate-y-1"
            ></motion.span>
          </div>
        </motion.div>

        {/* Dynamic Expanding Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-12">
          {Object.entries(skills).map(([category, items], idx) => (
            <SkillCard
              key={category}
              title={category}
              items={items}
              index={idx}
              isExpanded={expandedCard === category}
              onToggle={() => setExpandedCard(expandedCard === category ? null : category)}
            />
          ))}
        </div>

        {/* Floating Tech Symbols Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-100 mb-8 text-center tracking-wide">
            My <span className="text-amber-400">Tech Stack</span>
          </h3>
          <FloatingTechSymbols />
        </motion.div>

      </div>
    </section>
  )
}

export default Skills
