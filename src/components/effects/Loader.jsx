import { AnimatePresence, motion } from 'framer-motion'

const Loader = ({ loading }) => {
  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
           initial={{ opacity: 1 }}
           exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
           className="fixed inset-0 z-[100] overflow-hidden bg-[#020202]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.14)_0%,_rgba(251,191,36,0.05)_18%,_transparent_48%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_transparent_62%,_rgba(251,191,36,0.08)_78%,_transparent_100%)] opacity-80" />

          <motion.div
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.96, 1.02, 0.96] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(251,191,36,0.22)_0%,_rgba(251,191,36,0.08)_28%,_transparent_68%)] blur-3xl"
          />

          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(251,191,36,0.03)_0%,transparent_28%,transparent_72%,rgba(251,191,36,0.03)_100%)]" />

          <div className="relative flex h-full w-full items-center justify-center">
            <div className="relative flex flex-col items-center">
              <div className="relative flex h-36 w-36 items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 9, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-amber-500/20 shadow-[0_0_40px_rgba(251,191,36,0.08)]"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 5.5, ease: 'linear' }}
                  className="absolute inset-3 rounded-full border border-transparent border-t-amber-300 border-b-amber-500/80 opacity-90"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 7.5, ease: 'linear' }}
                  className="absolute inset-7 rounded-full border border-dashed border-amber-600/60"
                />
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
                  transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
                  className="absolute h-14 w-14 rounded-full bg-[radial-gradient(circle,_rgba(251,191,36,0.9)_0%,_rgba(251,191,36,0.4)_32%,_rgba(251,191,36,0.08)_68%,_transparent_100%)] shadow-[0_0_50px_rgba(251,191,36,0.45)]"
                />
              </div>

              <motion.div
                animate={{ opacity: [0.45, 1, 0.45], letterSpacing: ['0.45em', '0.52em', '0.45em'] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="mt-9 text-[10px] font-mono uppercase tracking-[0.5em] text-amber-300/90"
              >
                Initializing
              </motion.div>

              <div className="mt-6 h-px w-40 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{ x: ['-100%', '220%'] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  className="h-full w-1/2 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default Loader
