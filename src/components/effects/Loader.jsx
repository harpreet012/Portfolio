import { AnimatePresence, motion } from 'framer-motion'

const Loader = ({ loading }) => {
  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-[100] grid place-items-center bg-slate-950"
        >
          <div className="space-y-4 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="mx-auto h-16 w-16 rounded-full border-2 border-fuchsia-400 border-t-cyan-300"
            />
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Loading Portfolio</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default Loader
