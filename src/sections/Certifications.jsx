import { motion } from 'framer-motion'
import { FaCertificate } from 'react-icons/fa'
import SectionHeading from '../components/common/SectionHeading'
import { certifications } from '../data/portfolioData'

const Certifications = () => {
  return (
    <section id="certifications" className="px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Certifications" subtitle="Credentials" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 40, rotateX: -20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, type: 'spring', bounce: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02, rotateX: 5 }}
              style={{ perspective: 1000 }}
              className="modern-card p-6 flex flex-col items-center text-center group"
            >
              <div className="h-12 w-12 rounded-full bg-amber-400/10 flex flex-col items-center justify-center mb-4 text-amber-400 border border-amber-400/20 group-hover:bg-amber-400/20 transition-colors">
                <FaCertificate size={20} />
              </div>
              <h3 className="text-sm font-semibold text-gray-200 mb-1 leading-snug">{cert.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{cert.platform}</p>
              <div className="mt-auto pointer-events-none inline-block border border-amber-400/30 px-3 py-1 text-[10px] uppercase font-mono tracking-widest text-amber-300 rounded-full">
                {cert.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
