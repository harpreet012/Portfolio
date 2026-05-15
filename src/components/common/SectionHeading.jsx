import { motion } from 'framer-motion'

const SectionHeading = ({ title, subtitle, className = '', titleClassName = '' }) => (
  <motion.div
    data-reveal="heading"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className={`mb-16 md:mb-20 ${className}`}
  >
    <div className="flex items-center gap-4 mb-4">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-xs font-mono font-medium uppercase tracking-[0.25em] text-amber-500"
      >
        {subtitle}
      </motion.p>
      <div className="h-[1px] w-12 bg-amber-500/30"></div>
    </div>

    <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-100 ${titleClassName}`}>
      {title}
    </h2>
  </motion.div>
)

export default SectionHeading
