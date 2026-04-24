import { motion } from 'framer-motion'
import { FaCode, FaBrain, FaRocket } from 'react-icons/fa'
import SectionHeading from '../components/common/SectionHeading'
import { highlights, skills } from '../data/portfolioData'

const icons = [FaCode, FaBrain, FaRocket]

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
    <section id="about" className="relative px-6 py-24 sm:px-10 overflow-hidden">
      {/* Giant Background Number */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-outline opacity-[0.03] pointer-events-none select-none z-0 leading-none">
        01
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <SectionHeading title="About Me" subtitle="Who I Am" />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Area */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -15, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className="flex flex-col space-y-6"
          >
            <p className="leading-relaxed text-lg text-gray-400">
              I started by building tiny web pages out of curiosity, and now I craft <span className="gold-accent-text font-medium">polished frontend experiences</span> that feel fast, alive, and intuitive. 
            </p>
            <p className="leading-relaxed text-lg text-gray-400">
              As a B.Tech CSE student, I enjoy blending engineering discipline with visual storytelling, from robust React interfaces to ML-backed features. Let's create something stellar.
            </p>

            {/* Highlights Grid */}
            <motion.div
              variants={highlightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid gap-4 sm:grid-cols-3 mt-4"
            >
              {highlights.map((item, index) => {
                const Icon = icons[index]
                return (
                  <motion.div
                    key={item.title}
                    variants={highlightItem}
                    whileHover={{ y: -4 }}
                    className="p-4 rounded-xl modern-card border-none bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.08]"
                  >
                    <Icon className="text-xl text-amber-400 mb-3" />
                    <h3 className="text-sm font-semibold text-gray-100 mb-2">{item.title}</h3>
                    <p className="text-xs leading-relaxed text-gray-400">{item.text}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Area - Skills overview */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4, delay: 0.2 }}
            style={{ perspective: 1000 }}
            className="modern-card p-8 lg:p-10"
          >
            <h3 className="mb-8 text-2xl font-bold text-gray-100">Core Expertise</h3>
            <div className="space-y-6">
              {[
                { name: 'Frontend Engineering', level: 90 },
                { name: 'Backend Development', level: 84 },
                { name: 'Machine Learning', level: 82 },
                { name: 'Problem Solving', level: 93 },
              ].map((skillItem, i) => (
                <div key={skillItem.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-mono text-gray-300">{skillItem.name}</span>
                    <span className="text-amber-400 font-mono">{skillItem.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skillItem.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.15 + 0.5, ease: "easeOut" }}
                      className="h-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 border-t border-white/5 pt-6 text-sm text-gray-500 font-mono">
              Primary stack:{' '}
              <span className="text-amber-300">{skills.frontend.map((s) => s.name).join(', ')}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
