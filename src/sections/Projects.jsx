import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import SectionHeading from '../components/common/SectionHeading'
import { projects } from '../data/portfolioData'

const ProjectCard = ({ project, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 80, rotateX: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.3, delay: index * 0.1 }}
      style={{ perspective: 1200 }}
      className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center group ${isEven ? '' : 'lg:flex-row-reverse'}`}
    >
      {/* Image Side */}
      <div className="w-full lg:w-1/2 relative overflow-hidden rounded-2xl modern-card border-none bg-transparent">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/5 transition-colors duration-500 group-hover:border-amber-400/30">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-slate-900/60 transition-opacity duration-500 group-hover:opacity-0" />
        </div>
      </div>

      {/* Content Side */}
      <div className={`w-full flex lg:w-1/2 flex-col space-y-5 ${isEven ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'}`}>
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-amber-400">
          Featured Project
        </span>
        
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-100 group-hover:text-amber-300 transition-colors">
          {project.title}
        </h3>

        <div className="modern-card p-6 w-full lg:w-[110%] z-10">
          <p className="text-sm sm:text-base leading-relaxed text-gray-400">
            {project.description}
          </p>
        </div>

        {/* Tech chips */}
        <div className={`flex flex-wrap gap-2 pt-2 ${isEven ? 'justify-start' : 'lg:justify-end'}`}>
          {project.tech.map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-white/[0.05] backdrop-blur-sm rounded-full border border-white/10 text-[11px] font-mono text-gray-300 transition-colors group-hover:border-amber-400/20 group-hover:text-amber-200"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className={`flex items-center gap-6 pt-4 ${isEven ? 'justify-start' : 'lg:justify-end'}`}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="group/link flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-all duration-300 hover:translate-x-2"
          >
            <FaGithub size={20} className="group-hover/link:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" /> 
            <span className="text-sm font-medium group-hover/link:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">Source</span>
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="group/link flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-all duration-300 hover:translate-x-2"
          >
            <FaExternalLinkAlt size={16} className="group-hover/link:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" /> 
            <span className="text-sm font-medium group-hover/link:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">Visit Target</span>
          </a>
        </div>
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
    <section id="projects" className="relative px-6 py-24 sm:px-10 overflow-hidden">
      {/* Giant Background Number */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-outline opacity-10 pointer-events-none select-none z-0 leading-none">
        02
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <SectionHeading title="Selected Works" subtitle="Archives" />

        {/* Filter pills */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-amber-400/10 border border-amber-400 text-amber-400'
                  : 'bg-transparent border border-white/10 text-gray-400 hover:border-amber-400/50 hover:text-amber-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-24">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
