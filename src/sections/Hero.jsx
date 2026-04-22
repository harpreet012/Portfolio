import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'
import { heroRoles } from '../data/portfolioData'
import useTypewriter from '../hooks/useTypewriter'

const statItems = [
  { label: 'Projects Built', value: '12+', color: 'text-fuchsia-300', glow: 'rgba(232,121,249,0.25)' },
  { label: 'Internship',     value: '1+',  color: 'text-blue-300',    glow: 'rgba(96,165,250,0.25)' },
  { label: 'Stack Depth',    value: 'Full Stack', color: 'text-cyan-300', glow: 'rgba(34,211,238,0.25)' },
  { label: 'AI Focus',       value: 'ML Systems', color: 'text-violet-300', glow: 'rgba(167,139,250,0.25)' },
]

const Hero = () => {
  const role = useTypewriter(heroRoles, 100, 1000)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 100, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), springConfig)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const resetMouse = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <section
      id="hero"
      className="relative min-h-screen px-6 pt-40 pb-20 sm:px-10"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">

        {/* ── Left column ── */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-200"
          >
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-cyan-400" />
            Welcome to My Universe
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-balance bg-gradient-to-r from-fuchsia-300 via-cyan-200 to-blue-300 bg-clip-text text-5xl font-bold leading-tight text-transparent sm:text-7xl"
          >
            Harpreet Jakhar
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 text-xl text-white/90 sm:text-2xl"
          >
            Full Stack Developer | ML Enthusiast
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-3 h-8 text-lg text-cyan-200"
          >
            {role}
            <span className="ml-1 animate-pulse">|</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            I build delightful digital products where performance, aesthetics, and intelligent systems work
            together. Focused on creating scalable full-stack experiences with a futuristic design mindset.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="glow-border group relative overflow-hidden rounded-full bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 px-8 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(56,189,248,0.35)] transition"
            >
              <span className="relative z-10">View Projects</span>
              <span className="absolute inset-0 translate-y-full bg-white/20 transition duration-300 group-hover:translate-y-0" />
            </motion.a>
            <motion.a
              href="/resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="glow-border rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-cyan-300/50 hover:bg-white/15"
            >
              Download Resume
            </motion.a>
          </motion.div>
        </div>

        {/* ── Right column — stat card with 3D tilt ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-slate-900/70 to-white/5 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(2,6,23,0.6)]">
            {/* Inner glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/5 via-transparent to-fuchsia-500/5" />

            <p className="text-xs uppercase tracking-[0.26em] text-cyan-200">At a Glance</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {statItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.07 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition-shadow hover:shadow-[0_8px_24px_var(--stat-glow)]"
                  style={{ '--stat-glow': item.glow }}
                >
                  <span
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${item.glow}, transparent 70%)` }}
                  />
                  <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                  <p className="mt-1 text-xs text-white/60">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Ambient blobs */}
          <div className="pointer-events-none absolute -right-5 -bottom-5 h-24 w-24 rounded-full bg-cyan-300/25 blur-2xl" />
          <div className="pointer-events-none absolute -left-5 -top-5 h-20 w-20 rounded-full bg-fuchsia-400/15 blur-2xl" />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
