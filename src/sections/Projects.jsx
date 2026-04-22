import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import SectionHeading from '../components/common/SectionHeading'
import { projects } from '../data/portfolioData'

/* ─── Magnetic 3-D tilt card ─── */
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 180, damping: 22 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig)

  const handleMouse = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.article
      data-reveal="card"
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className="modern-card group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-[0_10px_50px_rgba(7,11,29,0.5)] transition-shadow duration-300 hover:shadow-[0_24px_80px_rgba(7,11,29,0.8)]"
    >
      {/* Gradient border glow */}
      <span className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-inset ring-transparent transition-all duration-500 group-hover:opacity-100 group-hover:ring-cyan-400/30" />
      <span className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'linear-gradient(135deg,rgba(168,85,247,0.15),rgba(59,130,246,0.12),rgba(34,211,238,0.15))' }} />

      {/* Image */}
      <div className="relative h-48 shrink-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

        {/* Category badge */}
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.4 }}
          className="absolute right-3 top-3 rounded-full border border-cyan-300/40 bg-slate-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200 backdrop-blur-sm"
        >
          {project.category}
        </motion.span>

        {/* Shimmer sweep on image hover */}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col space-y-4 p-5">
        <div>
          <h3 className="text-base font-semibold text-white transition-colors group-hover:text-cyan-100">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/65">{project.description}</p>
        </div>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-cyan-300/25 bg-cyan-300/8 px-2.5 py-0.5 text-[11px] font-medium text-cyan-200 transition-colors group-hover:border-cyan-300/45"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-auto flex items-center gap-3 pt-1 text-sm">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-white/80 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-200"
          >
            <FaGithub size={13} /> GitHub
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-white/80 transition hover:border-fuchsia-400/50 hover:bg-fuchsia-400/10 hover:text-fuchsia-200"
          >
            <FaExternalLinkAlt size={11} /> Live Demo
          </a>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-blue-500/10 to-cyan-400/10 blur-3xl" />
      </div>
    </motion.article>
  )
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = useMemo(() => {
    const tags = new Set(['All'])
    projects.forEach((p) => tags.add(p.category || 'Other'))
    return [...tags]
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((p) => (p.category || 'Other') === activeFilter)
  }, [activeFilter])

  return (
    <section id="projects" className="px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Projects" subtitle="Featured Work" />

        {/* Filter pills */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.12em] transition-all duration-250 ${
                activeFilter === filter
                  ? 'border-cyan-300/70 bg-cyan-300/15 text-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.2)]'
                  : 'border-white/15 bg-white/5 text-white/70 hover:border-cyan-300/40 hover:text-cyan-200'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
