import { motion } from 'framer-motion'

const SectionHeading = ({ title, subtitle }) => (
  <motion.div
    data-reveal="heading"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    className="mb-12 text-center"
  >
    <motion.p
      initial={{ opacity: 0, letterSpacing: '0.1em' }}
      whileInView={{ opacity: 1, letterSpacing: '0.32em' }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="mb-3 text-xs font-semibold uppercase text-cyan-300/90"
    >
      {subtitle}
    </motion.p>

    <h2 className="relative inline-block text-balance text-3xl font-bold text-white sm:text-4xl">
      {title}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
        className="absolute -bottom-2 left-1/2 block h-[3px] w-16 origin-center -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-400 via-blue-400 to-cyan-400"
      />
    </h2>
  </motion.div>
)

export default SectionHeading
