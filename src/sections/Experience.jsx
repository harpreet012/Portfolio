import { motion } from 'framer-motion'
import SectionHeading from '../components/common/SectionHeading'
import { experience } from '../data/portfolioData'

const Experience = () => {
  return (
    <section id="experience" className="px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Experience" subtitle="Career Timeline" />

        <div className="relative pl-6 sm:pl-10 mt-12 border-l border-amber-400/20">
          {experience.map((item, index) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, x: -50, rotateY: -15, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.4, delay: index * 0.15 }}
              style={{ perspective: 1000 }}
              className="relative mb-12 pl-4"
            >
              {/* Glowing timeline dot */}
              <div className="absolute -left-[30px] top-6 sm:-left-[46px] h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)] border-[3px] border-[#030014]" />

              {/* Glass Card Wrapper */}
              <div className="p-6 rounded-2xl modern-card border-none bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.05] transition-colors">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                   <div>
                     <h3 className="text-xl font-bold text-gray-100">{item.role}</h3>
                     <p className="text-md text-amber-400 mt-1">{item.company}</p>
                   </div>
                   <span className="inline-block px-3 py-1 bg-amber-400/10 border border-amber-400/20 text-xs font-mono text-amber-300 rounded-full shrink-0 h-fit">
                     {item.period}
                   </span>
                </div>
                
                {/* Details */}
                <p className="text-sm leading-relaxed text-gray-400 mt-2">{item.details}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
