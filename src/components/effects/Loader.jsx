import { AnimatePresence, motion } from 'framer-motion'

const Loader = ({ loading }) => {
  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
           initial={{ opacity: 1 }}
           exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
           className="fixed inset-0 z-[100] grid place-items-center bg-[#030014]"
        >
          <div className="relative flex flex-col items-center">
            {/* Elegant Orbital Spinner */}
            <div className="relative flex h-24 w-24 items-center justify-center">
              <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                 className="absolute inset-0 rounded-full border border-slate-800"
              />
               <motion.div
                 animate={{ rotate: -360 }}
                 transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                 className="absolute inset-2 rounded-full border border-transparent border-t-amber-400 border-b-amber-400 opacity-80"
              />
              <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                 className="absolute inset-4 rounded-full border border-dashed border-amber-600/50"
              />
            </div>

            {/* Loading text */}
            <div className="mt-8">
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-[10px] uppercase font-mono tracking-[0.4em] text-amber-400/80"
              >
                Initializing
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default Loader
