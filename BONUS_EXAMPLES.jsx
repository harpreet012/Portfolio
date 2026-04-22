/**
 * 🎯 BONUS EXAMPLES - Futuristic Portfolio Enhancements
 * Copy & paste these code blocks to level up your portfolio
 */

// ============================================
// 1️⃣ ALTERNATIVE SKILLS LAYOUT - Premium Cards Only
// ============================================
// File: src/sections/SkillsPremium.jsx
// Replace Skills.jsx with this for maximum "wow factor"

/*
import { motion } from 'framer-motion'
import { SiReact, SiNodedotjs, SiTailwindcss, SiJavascript, SiPython } from 'react-icons/si'
import FuturisticSkillCard from '../components/common/FuturisticSkillCard'
import SectionHeading from '../components/common/SectionHeading'

const SkillsPremium = () => {
  const skillsData = [
    { name: 'React', percent: 90, icon: SiReact, color: 'purple' },
    { name: 'Node.js', percent: 84, icon: SiNodedotjs, color: 'blue' },
    { name: 'Tailwind CSS', percent: 91, icon: SiTailwindcss, color: 'cyan' },
    { name: 'JavaScript', percent: 89, icon: SiJavascript, color: 'purple' },
    { name: 'Python', percent: 90, icon: SiPython, color: 'blue' },
    { name: 'Git', percent: 88, icon: SiReact, color: 'cyan' },
  ]

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  return (
    <section id="skills" className="px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Skills" subtitle="Premium Tech Proficiency" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillsData.map((skill) => (
            <motion.div key={skill.name} variants={itemVariants}>
              <FuturisticSkillCard
                title={skill.name}
                percent={skill.percent}
                icon={skill.icon}
                color={skill.color}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsPremium
*/

// ============================================
// 2️⃣ HYBRID LAYOUT - Best UX (Recommended)
// ============================================
// Keep existing Skills section + add premium showcase below

/*
// Add this to existing Skills.jsx at the END, before export

const FeaturedSkills = () => {
  const featured = [
    { name: 'React', percent: 90, icon: SiReact, color: 'purple' },
    { name: 'Tailwind CSS', percent: 91, icon: SiTailwindcss, color: 'cyan' },
    { name: 'Node.js', percent: 84, icon: SiNodedotjs, color: 'blue' },
  ]

  return (
    <motion.div 
      className="mt-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        ⭐ Featured Proficiency
      </h3>
      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((skill) => (
          <FuturisticSkillCard
            key={skill.name}
            title={skill.name}
            percent={skill.percent}
            icon={skill.icon}
            color={skill.color}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Then in main Skills component, add before closing:
// <FeaturedSkills />
*/

// ============================================
// 3️⃣ CUSTOM GLOW CURSOR (Optional Enhancement)
// ============================================
// File: src/components/effects/GlowCursor.jsx

/*
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const GlowCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="pointer-events-none fixed w-8 h-8 z-50 mix-blend-screen"
      animate={{ x: pos.x - 16, y: pos.y - 16 }}
      transition={{ duration: 0.1, type: 'spring', stiffness: 500, damping: 28 }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-cyan-400"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />

      {/* Inner glow */}
      <motion.div
        className="absolute inset-2 rounded-full bg-cyan-400/30 blur-md"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />

      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  )
}

// Usage in App.jsx:
// import { GlowCursor } from './components/effects/GlowCursor'
// <GlowCursor />
*/

// ============================================
// 4️⃣ FLOATING BLOBS BACKGROUND (Optional)
// ============================================
// File: src/components/effects/FloatingBlobs.jsx

/*
import { motion } from 'framer-motion'

export const FloatingBlobs = () => {
  const blobs = [
    {
      color: 'rgba(168, 85, 247, 0.4)',
      size: 300,
      duration: 25,
      x: 0,
      y: -50,
    },
    {
      color: 'rgba(59, 130, 246, 0.3)',
      size: 250,
      duration: 30,
      x: 100,
      y: 50,
    },
    {
      color: 'rgba(34, 211, 238, 0.35)',
      size: 280,
      duration: 35,
      x: -100,
      y: 100,
    },
  ]

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-60"
          animate={{
            x: [0, blob.x * 2, 0],
            y: [0, blob.y * 2, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            width: blob.size,
            height: blob.size,
            background: blob.color,
            left: `${blob.x}%`,
            top: `${blob.y}%`,
          }}
        />
      ))}
    </div>
  )
}

// Usage in App.jsx:
// <FloatingBlobs />
*/

// ============================================
// 5️⃣ ENHANCED PROJECTS CARD (Bonus)
// ============================================
// Can apply similar effects to Projects section

/*
// Add to Projects.jsx

const projectCardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

// Then wrap project cards:
<motion.div
  variants={projectCardVariants}
  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:shadow-[0_24px_60px_rgba(12,17,42,0.55)]"
  whileHover={{ y: -10, scale: 1.02 }}
>
  {/* Animated border on top */}
  <motion.span
    className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 opacity-60"
    whileHover={{ opacity: 1 }}
  />
  
  {/* Rest of project card */}
</motion.div>
*/

// ============================================
// 6️⃣ TYPED EFFECT ALTERNATIVE
// ============================================
// Better than basic typewriter for Hero

/*
// File: src/hooks/useTypedEffect.js
import { useEffect, useRef, useState } from 'react'

export const useTypedEffect = (text, speed = 50, startDelay = 0) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, index + 1))
        index++

        if (index === text.length) {
          setIsComplete(true)
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(timer)
  }, [text, speed, startDelay])

  return { displayedText, isComplete }
}

// Usage:
// const { displayedText } = useTypedEffect("Full Stack Developer", 50)
// <p>{displayedText}</p>
*/

// ============================================
// 7️⃣ COLOR PALETTE CONFIG (Reference)
// ============================================

const colorPalettes = {
  cyberpunk: {
    primary: '#a855f7', // purple
    secondary: '#22d3ee', // cyan
    accent: '#3b82f6', // blue
    dark: '#0b0f1a',
  },
  neon: {
    primary: '#00ffff', // cyan neon
    secondary: '#ff00ff', // magenta neon
    accent: '#ffff00', // yellow neon
    dark: '#000000',
  },
  minimal: {
    primary: '#3b82f6', // blue
    secondary: '#1e293b', // slate
    accent: '#64748b', // slate
    dark: '#0f172a',
  },
}

// ============================================
// INSTALLATION COMMANDS (if needed)
// ============================================

/*
# If adding particle background
npm install tsparticles react-tsparticles

# If adding 3D tilt cards (GSAP)
npm install gsap

# Dependencies already installed:
✅ framer-motion
✅ react-icons
✅ three.js (via @react-three/fiber)
*/

export { colorPalettes }
